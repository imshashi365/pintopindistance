import { createReadStream, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import csv from 'csv-parser';
import dbConnect from '../lib/dbConnect.js';
import Pincode from '../models/Pincode.js';

// Load environment variables from .env.local
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const CSV_PATH = resolve(__dirname, '../../data/datapincode.csv');
console.log('Looking for CSV file at:', CSV_PATH);

if (!existsSync(CSV_PATH)) {
  console.error('Error: CSV file not found at:', CSV_PATH);
  process.exit(1);
}

async function importPincodes() {
  try {
    await dbConnect();
    
    // Clear existing data
    const deleted = await Pincode.deleteMany({});
    console.log(`Cleared ${deleted.deletedCount} existing pincodes`);
    
    let count = 0;
    const batchSize = 1000;
    let batch: any[] = [];
    
    console.log('Starting import process...');
    const stream = createReadStream(CSV_PATH, { encoding: 'utf8' })
      .on('error', (error) => {
        console.error('Error reading CSV file:', error);
        process.exit(1);
      })
      .pipe(csv({
        headers: [
          'circlename', 'regionname', 'divisionname', 'officename',
          'pincode', 'officetype', 'delivery', 'district', 'statename',
          'latitude', 'longitude'
        ],
        skipLines: 1, // Skip header row if exists
        mapValues: ({ value }) => typeof value === 'string' ? value.trim() : value
      }));

    let skippedCount = 0;
    
    for await (const row of stream) {
      if (count % 1000 === 0) {
        process.stdout.write(`\rProcessed ${count} records (${skippedCount} skipped)...`);
      }
      
      // Skip if any required field is missing or 'NA'
      if (!row.pincode || row.latitude === 'NA' || row.longitude === 'NA' || 
          !row.latitude || !row.longitude) {
        skippedCount++;
        continue;
      }
      
      const lat = parseFloat(row.latitude);
      const lng = parseFloat(row.longitude);
      
      // Skip if coordinates are invalid
      if (isNaN(lat) || isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
        skippedCount++;
        continue;
      }
      
      batch.push({
        circlename: row.circlename,
        regionname: row.regionname,
        divisionname: row.divisionname,
        officename: row.officename,
        pincode: row.pincode,
        officetype: row.officetype,
        delivery: row.delivery,
        district: row.district,
        statename: row.statename,
        latitude: lat,
        longitude: lng
      });
      
      count++;
      
      if (batch.length >= batchSize) {
        try {
          // Use bulkWrite with updateOne and upsert to handle duplicates
          const operations = batch.map(doc => ({
            updateOne: {
              filter: { pincode: doc.pincode },
              update: { $setOnInsert: doc },
              upsert: true
            }
          }));
          
          await Pincode.bulkWrite(operations, { ordered: false });
          process.stdout.write(`\rProcessed ${count} records (${skippedCount} skipped)...`);
          batch = [];
        } catch (err) {
          console.error('\nError processing batch:', err);
          throw err;
        }
      }
    }
    
    // Process remaining records
    if (batch.length > 0) {
      const operations = batch.map(doc => ({
        updateOne: {
          filter: { pincode: doc.pincode },
          update: { $setOnInsert: doc },
          upsert: true
        }
      }));
      
      await Pincode.bulkWrite(operations, { ordered: false });
    }
    
    // Get the final count of unique pincodes
    const uniquePincodeCount = await Pincode.countDocuments();
    console.log(`\nSuccessfully processed ${count} records. Total unique pincodes in database: ${uniquePincodeCount}`);
    process.exit(0);
  } catch (error) {
    console.error('Error importing pincodes:', error);
    process.exit(1);
  }
}

importPincodes();
