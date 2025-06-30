import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: '.env' });

const MONGODB_URI = process.env.MONGODB_URI;

async function testConnection() {
  try {
    console.log('Attempting to connect to MongoDB...');
    console.log('Connection string:', MONGODB_URI.replace(/:([^:]*?)@/, ':***@'));
    
    const conn = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log('Connected to MongoDB!');
    console.log('Host:', conn.connection.host);
    console.log('Database:', conn.connection.name);
    
    // Check if the pincodes collection exists
    const collections = await conn.connection.db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));
    
    // Try to find a sample pincode
    const Pincode = mongoose.model('Pincode', new mongoose.Schema({}));
    const sample = await Pincode.findOne().lean();
    console.log('Sample pincode:', sample);
    
    process.exit(0);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

testConnection();
