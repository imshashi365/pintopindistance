import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - Pin To Pin Distance',
  description: 'Learn about Pin To Pin Distance, your trusted source for accurate pincode distance calculations for e-Way Bills and logistics in India.',
  alternates: {
    canonical: 'https://www.pin-to-pin-distance.xyz/about-us',
  },
};

const AboutUsPage = () => {
  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="prose prose-indigo lg:prose-lg mx-auto">
          <h1>About Us</h1>
          <p className="lead">
            Welcome to Pin To Pin Distance, your go-to resource for accurately calculating the distance between any two pincodes in India.
          </p>

          <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
          <p>
            Our mission is to provide a fast, free, and reliable tool for calculating the distance between any two pincodes in India. We built this service to help businesses and individuals with their logistics, e-Way Bill generation, and travel planning needs.
          </p>

          <h2>What We Do</h2>
          <p>
            At <a href="https://www.pin-to-pin-distance.xyz/">Pin To Pin Distance</a>, we leverage advanced mapping technology to provide real-time, road-based distance calculations. Unlike simple straight-line measurements, our tool calculates the actual travel distance, giving you a realistic estimate for your needs.
          </p>
          
          <h3>Key Features:</h3>
          <ul>
            <li><strong>Accuracy:</strong> Get precise road distances, not just straight-line estimates.</li>
            <li><strong>Speed:</strong> Our tool provides instant results, saving you valuable time.</li>
            <li><strong>E-Way Bill Compliance:</strong> Easily find the distance required for generating e-Way Bills under the GST framework.</li>
            <li><strong>Free to Use:</strong> Our core service is completely free for everyone.</li>
          </ul>

          <h2>Who We Are</h2>
          <p>
            We are a team of developers and logistics enthusiasts passionate about creating practical solutions to real-world problems. We built this tool after noticing a need for a simple, no-frills pincode distance calculator that just works.
          </p>

          <h2 className="text-2xl font-bold text-gray-900">Contact Us</h2>
          <p>
            Have questions or feedback? We'd love to hear from you. Please visit our <a href="/contact-us" className="text-blue-600 hover:underline">Contact Page</a> or email us directly at <a href="mailto:contact@pin-to-pin-distance.xyz" className="text-blue-600 hover:underline">contact@pin-to-pin-distance.xyz</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
