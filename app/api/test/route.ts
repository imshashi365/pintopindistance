import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/dbConnect';
import Pincode from '../../../models/Pincode';

export async function GET() {
  return NextResponse.json({ message: 'Test API is working' });
}

export async function POST(request: Request) {
  try {
    // Connect to database
    await dbConnect();
    
    // Get pincodes from request
    const { pincode1, pincode2 } = await request.json();
    
    if (!pincode1 || !pincode2) {
      return NextResponse.json(
        { error: 'Both pincodes are required' },
        { status: 400 }
      );
    }

    // Try to find pincodes in database
    const [source, destination] = await Promise.all([
      Pincode.findOne({ pincode: pincode1 }).exec(),
      Pincode.findOne({ pincode: pincode2 }).exec(),
    ]);

    if (!source || !destination) {
      return NextResponse.json(
        { 
          error: 'One or both pincodes not found',
          found: {
            pincode1: !!source,
            pincode2: !!destination
          }
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      source: {
        pincode: source.pincode,
        location: source.officename,
        coordinates: {
          latitude: source.latitude,
          longitude: source.longitude
        }
      },
      destination: {
        pincode: destination.pincode,
        location: destination.officename,
        coordinates: {
          latitude: destination.latitude,
          longitude: destination.longitude
        }
      }
    });

  } catch (error) {
    console.error('Error in test endpoint:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}