import React from 'react';
import { Metadata } from 'next';
import ContactForm from './ContactForm'; // Import the new client component

export const metadata: Metadata = {
  title: 'Contact Us - Pin To Pin Distance',
  description: 'Get in touch with the Pin To Pin Distance team. We welcome your questions, feedback, and suggestions.',
};

const ContactUsPage = () => {
  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="prose prose-indigo lg:prose-lg mx-auto text-center">
          <h1 className='text-3xl'>Contact Us</h1>
          <p className="lead">
            We'd love to hear from you! Please fill out the form below to get in touch.
          </p>
        </div>

        <ContactForm />

      </div>
    </div>
  );
};

export default ContactUsPage;
