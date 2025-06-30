import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import Pincode from '../../../models/Pincode';
import axios from 'axios';

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
    try {
      response = await axios.post(
        'https://api.openrouteservice.org/v2/directions/driving-car/geojson',
        {
          coordinates: [
            [source.longitude, source.latitude],
            [destination.longitude, destination.latitude],
          ],
          preference: 'recommended',
        },
        {
          headers: {
            'Authorization': process.env.OPENROUTE_API_KEY,
            'Content-Type': 'application/json',
          },
          timeout: 10000, // 10 second timeout
        }
      );
      console.log('API Response:', JSON.stringify(response.data, null, 2));
    } catch (error: any) {
      console.error('API Error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.error?.message || 'Failed to connect to routing service');
    }

    if (!response.data.features || response.data.features.length === 0) {
      console.error('No route found in response:', response.data);
      throw new Error('No route could be calculated between these locations');
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
