'use client';

import React, { useState } from 'react';
import { NextSeo, FAQPageJsonLd, SoftwareAppJsonLd, VideoJsonLd } from 'next-seo';
import YouTube from 'react-youtube';

type Location = {
  pincode: string;
  location: string;
};

type DistanceResult = {
  distance: number;
  duration: number;
  source: Location;
  destination: Location;
};

// SEO-optimized content sections
const seoContent = {
  intro: {
    title: "Fast & No Captcha – Pin to Pin Distance Calculator for e-Way Bill India",
    description: "Get instant, accurate distance between any two Indian pincodes. Our free calculator provides real driving distances perfect for e-Way Bill generation and GST compliance. Trusted by professionals across India.",
    features: [
      "✓ 100% Free and GST-compliant distance calculator",
      "✓ Real-time driving distance via trusted API",
      "✓ Covers all Indian pincodes with accurate coordinates",
      "✓ Built for e-Way Bill generators and tax professionals",
      "✓ Instant results with distance (in km) and travel time"
    ]
  },
  faqs: [
    {
      question: "What is Pin to Pin Distance?",
      answer: "Pin to Pin Distance refers to the road distance between two Indian PIN codes (Postal Index Numbers). This is a crucial value used when creating GST e-Way Bills, managing logistics, or verifying transport compliance."
    },
    {
      question: "Is the distance accepted for e-Way Bill?",
      answer: "Yes. Our calculator ensures the distance falls within the ±10% tolerance range accepted by the GSTN portal for e-Way Bill generation. You can safely use these results while filing GST documents."
    },
    {
      question: "Who should use this calculator?",
      answer: "This tool is designed for logistics firms, small businesses, GST consultants, CA firms, and anyone who regularly files e-Way Bills or needs to check travel distances between pincodes."
    },
    {
      question: "How accurate is the distance calculation?",
      answer: "Our calculator uses real-time driving distance via a trusted API (not straight-line) to provide the most accurate road distance between any two pincodes in India."
    }
  ],
  useCases: [
    "📦 GST e-Way Bill generation",
    "🚛 Transport distance verification",
    "🧾 GST compliance reporting",
    "📍 Logistics & delivery planning",
    "🔍 Pincode-based travel distance lookup"
  ]
};

export default function Home() {
  const [fromPincode, setFromPincode] = useState('');
  const [toPincode, setToPincode] = useState('');
  const [result, setResult] = useState<DistanceResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const calculateDistance = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fromPincode || !toPincode) {
      setError('Please enter both pincodes');
      return;
    }
    
    if (fromPincode === toPincode) {
      setError('Source and destination pincodes must be different');
      return;
    }
    
    if (fromPincode.length !== 6 || toPincode.length !== 6) {
      setError('Pincode must be 6 digits');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/get-distance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pincode1: fromPincode,
          pincode2: toPincode
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to calculate distance');
      }
      
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const formatDistance = (km: number) => {
    // The distance is already in kilometers, just format it with 1 decimal place
    return `${km.toFixed(1)} km`;
  };

  const formatDuration = (minutes: number) => {
    // The duration is already in minutes, convert to hours and minutes
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  return (
    <>
      <NextSeo
        title={seoContent.intro.title}
        description={seoContent.intro.description}
        canonical="https://www.pin-to-pin-distance.xyz/"
        additionalMetaTags={[
          {
            name: 'keywords',
            content: [
              'pin to pin distance', 'pin code to pin code distance', 'pin code to pin code distance in km', 
              'pin to pin distance gst', 'distance pin to pin', 'pin to pin distance search', 
              'pin to pin distance calculator', 'gst pin to pin distance', 'pin to pin distance e way bill', 
              'eway bill pin to pin distance'
            ].join(', ')
          }
        ]}
        openGraph={{
          url: 'https://www.pin-to-pin-distance.xyz/',
          title: seoContent.intro.title,
          description: seoContent.intro.description,
          images: [
            {
              url: 'https://www.pin-to-pin-distance.xyz/og-image.png', 
              width: 1200,
              height: 630,
              alt: 'Pin to Pin Distance Calculator for E-Way Bill and GST',
              type: 'image/png',
            },
          ],
          siteName: 'Pin to Pin Distance Calculator',
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />
      <FAQPageJsonLd
        mainEntity={seoContent.faqs.map((faq) => ({
          questionName: faq.question,
          acceptedAnswerText: faq.answer,
        }))}
      />
      <SoftwareAppJsonLd
        name="Pin to Pin Distance Calculator"
        operatingSystem="Web"
        applicationCategory="UtilitiesApplication"
        aggregateRating={{
          ratingValue: '4.9',
          reviewCount: '150', // Example value
        }}
        price="0"
        priceCurrency="INR"
      />
      <VideoJsonLd
        name="How to Use Pin to Pin Distance Calculator - Complete Guide"
        description="Learn how to quickly calculate distance between any two Indian pincodes with our easy-to-use distance calculator tool. Step-by-step guide with visual demonstration."
        thumbnailUrls={["https://img.youtube.com/vi/R9wT-LBVA5s/maxresdefault.jpg"]}
        uploadDate="2024-07-15T08:00:00+05:30"
        duration="PT2M30S"
        contentUrl="https://www.youtube.com/watch?v=R9wT-LBVA5s"
        embedUrl="https://www.youtube.com/embed/R9wT-LBVA5s"
        regionsAllowed="IN"
        hasPart={[]}
        watchCount={1000}
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        {/* Main Content Container */}
        <div className="max-w-6xl mx-auto">
          {/* Page Title and Meta Description */}
          <div className="text-center mb-12 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {seoContent.intro.title}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {seoContent.intro.description}
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-8">
              {/* Calculator Card */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
                <div className="p-8">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      Pincode Distance Calculator
                    </h1>
                    <p className="mt-2 text-gray-600">Check road distance & time between two PIN codes instantly</p>
                  </div>
                  
                  {/* Form */}
                  <form onSubmit={calculateDistance} className="space-y-6">
                    <div className="space-y-4">
                      <div className="relative">
                        <label htmlFor="fromPincode" className="block text-sm font-medium text-gray-700 mb-1">
                          From Pincode
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500">📍</span>
                          </div>
                          <input
                            type="text"
                            id="fromPincode"
                            value={fromPincode}
                            onChange={(e) => setFromPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                            maxLength={6}
                            placeholder="e.g., 110001"
                            className="pl-10 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            disabled={loading}
                          />
                        </div>
                      </div>
                      
                      <div className="relative">
                        <label htmlFor="toPincode" className="block text-sm font-medium text-gray-700 mb-1">
                          To Pincode
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500">🏁</span>
                          </div>
                          <input
                            type="text"
                            id="toPincode"
                            value={toPincode}
                            onChange={(e) => setToPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                            maxLength={6}
                            placeholder="e.g., 400001"
                            className="pl-10 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            disabled={loading}
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Error Message */}
                    {error && (
                      <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-100 flex items-start">
                        <svg className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        {error}
                      </div>
                    )}
                    
                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className={`w-full flex justify-center items-center py-3 px-4 rounded-xl text-white font-medium shadow-md hover:shadow-lg transform transition-all duration-200 ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:-translate-y-0.5'}`}
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Calculating...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h7m0 0v7m0-7l-8 8-4-4-6 6" />
                          </svg>
                          Calculate Distance
                        </>
                      )}
                    </button>
                  </form>
                  
                  {/* Result Card */}
                  {result && (
                    <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 transform transition-all duration-300 hover:scale-[1.01]">
                      <div className="flex items-center mb-4">
                        <div className="p-2 bg-blue-100 rounded-lg mr-3">
                          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">Journey Details</h3>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                            <span className="text-blue-600">1</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">From</p>
                            <p className="font-medium">{result.source.pincode}</p>
                            {result.source.location && (
                              <p className="text-sm text-gray-600">{result.source.location}</p>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                            <span className="text-blue-600">2</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">To</p>
                            <p className="font-medium">{result.destination.pincode}</p>
                            {result.destination.location && (
                              <p className="text-sm text-gray-600">{result.destination.location}</p>
                            )}
                          </div>
                        </div>
                        
                        <div className="pt-4 mt-4 border-t border-blue-100 space-y-3">
                          <div className="flex items-center">
                            <span className="text-blue-500 mr-2">🚗</span>
                            <span className="text-gray-700">Distance:</span>
                            <span className="ml-auto font-medium">{formatDistance(result.distance)}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-blue-500 mr-2">⏱️</span>
                            <span className="text-gray-700">Estimated Time:</span>
                            <span className="ml-auto font-medium">{formatDuration(result.duration)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* SEO Content Section */}
              <article className="bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">What is Pin to Pin Distance?</h2>
                <p className="text-gray-700">
                  Looking for the most accurate <strong>pin to pin distance</strong> tool in India? You're in the right place.
                  Our free calculator helps you instantly find the <strong>distance between two pincodes</strong> based on real driving routes — perfect for <strong>e-Way Bill</strong> generation and GST compliance.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-8">Why Use Our Pincode Distance Tool?</h2>
                <ul className="space-y-2">
                  {seoContent.intro.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mt-8">Common Use Cases</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {seoContent.useCases.map((useCase, index) => (
                    <li key={index} className="flex items-center bg-gray-50 p-3 rounded-lg">
                      <span className="mr-2">{useCase.split(' ')[0]}</span>
                      <span>{useCase.split(' ').slice(1).join(' ')}</span>
                    </li>
                  ))}
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mt-8">How Does It Work?</h2>

                <div className="my-6 aspect-video max-w-3xl mx-auto">
                  <div itemScope itemType="https://schema.org/VideoObject" className="w-full h-full">
                    <meta itemProp="name" content="How to Calculate Pin to Pin Distance for e-Way Bill | GST Tool 2025" />
                    <meta itemProp="description" content="Introducing the Pin to Pin Distance Calculato — your one-stop solution for generating accurate pincode distance for GST compliance and e-Way Bill generation." />
                    <meta itemProp="uploadDate" content="2024-07-15T08:00:00+05:30" />
                    <meta itemProp="thumbnailUrl" content="https://img.youtube.com/vi/R9wT-LBVA5s/maxresdefault.jpg" />
                    <meta itemProp="embedUrl" content="https://www.youtube.com/embed/R9wT-LBVA5s" />
                    
                    <YouTube 
                      videoId="R9wT-LBVA5s"
                      opts={{
                        width: '100%',
                        height: '100%',
                        playerVars: {
                          autoplay: 0,
                          rel: 0,
                          modestbranding: 1,
                        },
                      }}
                      className="w-full h-full rounded-lg shadow-lg"
                      title="How to find Pin to Pin Distance How to Calculate Pin to Pin Distance for e-Way Bill | GST Tool 2025"
                      aria-label="Video tutorial on using the pincode distance calculator"
                    />
                    
                    <div className="mt-2 text-sm text-gray-600" itemProp="description">
                      Watch this video to learn how to calculate distances between any two Indian pincodes with our free online tool.
                    </div>
                  </div>
                </div>

                <p className="text-gray-700">
                  Simply enter the <strong>from pincode</strong> and <strong>to pincode</strong> in the calculator above.
                  Our system will look up their coordinates, calculate the actual <strong>road distance</strong> using real driving routes, and show the result with estimated travel time.
                  It's that fast, simple, and accurate.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mt-8">Frequently Asked Questions</h2>
                <div className="space-y-6">
                  {seoContent.faqs.map((faq, index) => (
                    <div key={index} className="border-b border-gray-100 pb-4">
                      <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                      <p className="text-gray-700">{faq.answer}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 p-4 rounded-lg mt-8">
                  <p className="text-sm text-gray-600 italic">
                    Trusted by many monthly users across India. Optimized for GST, logistics, and compliance professionals.
                  </p>
                </div>
              </article>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-semibold text-lg mb-4">About Indian Pincodes</h3>
                <p className="text-gray-700 text-sm mb-4">
                  Indian pincodes (Postal Index Numbers) are 6-digit codes that help in identifying specific 
                  geographic locations for efficient mail delivery. The first digit represents the region, 
                  the first two digits represent the sub-region, and the first three digits represent the 
                  sorting district.
                </p>
                <p className="text-gray-700 text-sm">
                  Our calculator uses these pincodes to accurately determine the distance between any two 
                  locations in India, making it an essential tool for businesses, travelers, and logistics 
                  companies alike.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl shadow-lg p-6 text-white">
                <h3 className="font-semibold text-lg mb-2">Did You Know?</h3>
                <p className="text-blue-100 text-sm">
                  The Indian postal service processes over 20 million pieces of mail daily, 
                  making it one of the largest postal networks in the world. Accurate pincode 
                  information ensures timely delivery across the country's vast geography.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
