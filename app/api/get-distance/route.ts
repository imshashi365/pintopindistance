import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import Pincode from '../../../models/Pincode';
import FailedDistanceLog from '../../../models/FailedDistanceLog';
import axios from 'axios';

// Helper function to log failed attempts
async function logFailedAttempt(
  pincode1: string,
  pincode2: string,
  fromLat: number,
  fromLng: number,
  toLat: number,
  toLng: number,
  error: any
) {
  const errorMessage = error.response?.data?.error?.message || error.message;
  const errorCode = error.response?.status?.toString() || 'UNKNOWN_ERROR';
  
  try {
    // First, try to find and update an existing failed attempt
    const existingLog = await FailedDistanceLog.findOneAndUpdate(
      { fromPincode: pincode1, toPincode: pincode2 },
      {
        $set: {
          fromLat,
          fromLng,
          toLat,
          toLng,
          errorMessage,
          errorCode,
          responseData: error.response?.data || {},
          lastAttempt: new Date(),
        },
        $inc: { retryCount: 1 },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    // If this is a new record, set the initial timestamp
    if (existingLog.retryCount === 1) {
      await FailedDistanceLog.updateOne(
        { _id: existingLog._id },
        { $set: { timestamp: new Date() } }
      );
    }

    console.log(`Logged failed attempt for pincodes ${pincode1} -> ${pincode2}`);
  } catch (logError) {
    console.error('Failed to log error to database:', logError);
  }
}

export async function POST(request: Request) {
  try {
    const { pincode1, pincode2 } = await request.json();

    if (!pincode1 || !pincode2) {
      return NextResponse.json(
        { error: 'Both pincodes are required' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Find both pincodes in the database
    const [source, destination] = await Promise.all([
      Pincode.findOne({ pincode: pincode1 }).exec(),
      Pincode.findOne({ pincode: pincode2 }).exec(),
    ]);

    if (!source || !destination) {
      return NextResponse.json(
        { error: 'One or both pincodes not found' },
        { status: 404 }
      );
    }

    // Log the coordinates and environment for debugging
    console.log('Environment:', process.env.NODE_ENV);
    console.log('Source coordinates:', [source.longitude, source.latitude]);
    console.log('Destination coordinates:', [destination.longitude, destination.latitude]);
    console.log('API Key exists:', !!process.env.OPENROUTE_API_KEY);
    console.log('API Key length:', process.env.OPENROUTE_API_KEY?.length);
    console.log('MongoDB URI exists:', !!process.env.MONGODB_URI);

    // Call OpenRouteService API
    let response;
    const coordinates = [
      [source.longitude, source.latitude],
      [destination.longitude, destination.latitude]
    ];
    
    try {
      console.log(`Attempting to calculate distance between pincodes: ${pincode1} and ${pincode2}`);
      
      response = await axios.post(
        'https://api.openrouteservice.org/v2/directions/driving-car/geojson',
        {
          coordinates,
          preference: 'recommended',
        },
        {
          headers: {
            'Authorization': process.env.OPENROUTE_API_KEY,
            'Content-Type': 'application/json',
          },
          timeout: 10000,
        }
      );
    } catch (error: any) {
      // Log the detailed error to the database
      await logFailedAttempt(
        pincode1,
        pincode2,
        source.latitude,
        source.longitude,
        destination.latitude,
        destination.longitude,
        error
      );

      // Return a user-friendly error message
      return NextResponse.json(
        { 
          error: `Failed to calculate distance between pincodes ${pincode1} and ${pincode2}`,
          details: error.response?.data?.error?.message || error.message,
          code: error.response?.status || 500
        },
        { status: error.response?.status || 500 }
      );
    }

    if (!response.data.features || response.data.features.length === 0) {
      const error = new Error('No route features in response');
      await logFailedAttempt(
        pincode1,
        pincode2,
        source.latitude,
        source.longitude,
        destination.latitude,
        destination.longitude,
        { response: { data: response.data } }
      );
      
      return NextResponse.json(
        { error: `No route could be calculated between pincodes ${pincode1} and ${pincode2}` },
        { status: 404 }
      );
    }

    const route = response.data.features[0];
    if (!route.properties || !route.properties.summary) {
      console.error('Invalid route data:', route);
      throw new Error('Invalid route data received from service');
    }

    const distance = (route.properties.summary.distance / 1000).toFixed(2); // Convert to km
    const duration = Math.round(route.properties.summary.duration / 60); // Convert to minutes

    return NextResponse.json({
      distance: parseFloat(distance),
      duration,
      source: {
        pincode: source.pincode,
        location: source.officename || 'Unknown Location',
      },
      destination: {
        pincode: destination.pincode,
        location: destination.officename || 'Unknown Location',
      },
    });
  } catch (error) {
    console.error('Error calculating distance:', error);
    return NextResponse.json(
      { error: 'Failed to calculate distance' },
      { status: 500 }
    );
  }
}
