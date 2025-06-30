# Pincode Distance Calculator

A full-stack Next.js application that calculates the distance and travel time between two Indian pincodes using OpenRouteService API and MongoDB.

## Features

- Calculate distance between any two Indian pincodes
- View approximate travel time
- Clean, responsive UI built with Tailwind CSS
- Efficient data storage with MongoDB
- Easy CSV import for pincode data

## Prerequisites

- Node.js (v18 or later)
- MongoDB (local or Atlas)
- OpenRouteService API key (get it from [OpenRouteService](https://openrouteservice.org/))

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file in the root directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   OPENROUTE_API_KEY=your_openroute_api_key
   ```
4. Place your pincode CSV file named `pincodes.csv` in the root directory with the following columns:
   ```
   circlename,regionname,divisionname,officename,pincode,officetype,delivery,district,statename,latitude,longitude
   ```
5. Import pincode data to MongoDB:
   ```bash
   npm run import-pincodes
   ```
6. Run the development server:
   ```bash
   npm run dev
   ```
7. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Enter source and destination pincodes
2. Click "Calculate Distance"
3. View the distance in kilometers and estimated travel time

## Tech Stack

- Frontend: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS
- Backend: Next.js API Routes
- Database: MongoDB with Mongoose
- External API: OpenRouteService

## License

MIT
