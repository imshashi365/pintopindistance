import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    nodeEnv: process.env.NODE_ENV,
    apiKeyExists: !!process.env.OPENROUTE_API_KEY,
    apiKeyLength: process.env.OPENROUTE_API_KEY?.length,
    apiKeyFirst10: process.env.OPENROUTE_API_KEY?.substring(0, 10) + '...',
    mongoUriExists: !!process.env.MONGODB_URI,
  });
}
