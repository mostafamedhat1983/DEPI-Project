import React from 'react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">About TestShop</h1>
      
      <div className="prose prose-lg">
        <p className="mb-6">
          Welcome to TestShop, your trusted destination for quality products and exceptional shopping experiences.
          Founded with a vision to provide customers with a seamless online shopping platform, we've grown to
          become a leading e-commerce destination.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
        <p className="mb-6">
          Our mission is to provide customers with high-quality products at competitive prices while delivering
          outstanding customer service. We believe in making online shopping accessible, enjoyable, and secure
          for everyone.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Values</h2>
        <ul className="list-disc pl-6 mb-6">
          <li>Customer Satisfaction</li>
          <li>Quality Products</li>
          <li>Transparent Business Practices</li>
          <li>Innovation</li>
          <li>Sustainability</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Why Choose Us?</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-2">Quality Assurance</h3>
            <p>All our products undergo strict quality control measures.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-2">Fast Shipping</h3>
            <p>We ensure quick and reliable delivery services.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-2">Secure Shopping</h3>
            <p>Your transactions are protected by advanced security measures.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-2">24/7 Support</h3>
            <p>Our customer service team is always here to help.</p>
          </div>
        </div>
      </div>
    </div>
  );
};