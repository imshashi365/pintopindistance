import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Pincode from '@/models/Pincode';

export async function GET() {
  try {
    await dbConnect();
    
    // Try to find a sample pincode
    const samplePincode = await Pincode.findOne().limit(1);
    
    if (!samplePincode) {
      return NextResponse.json(
        { 
          connected: true, 
          hasData: false,
          message: 'Successfully connected to MongoDB but no pincodes found in the database.'
        },
        { status: 200 }
      );
    }
    
    return NextResponse.json({
      connected: true,
      hasData: true,
      samplePincode: {
        pincode: samplePincode.pincode,
        officename: samplePincode.officename,
        state: samplePincode.statename,
        district: samplePincode.districtname
      }
    });
    
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json(
      { 
        connected: false, 
        error: 'Failed to connect to MongoDB',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
