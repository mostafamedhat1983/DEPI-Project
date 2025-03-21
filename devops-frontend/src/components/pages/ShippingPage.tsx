import React from 'react';

export const ShippingPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Shipping Information</h1>
      
      <div className="space-y-8 prose prose-lg">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Delivery Options</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-2">Standard Shipping</h3>
              <p className="text-gray-600 mb-2">3-5 business days</p>
              <p className="font-medium">$5.99</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-2">Express Shipping</h3>
              <p className="text-gray-600 mb-2">1-2 business days</p>
              <p className="font-medium">$12.99</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Shipping Policies</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Free standard shipping on orders over $50</li>
            <li>Orders are processed within 24 hours</li>
            <li>Tracking information provided via email</li>
            <li>International shipping available to select countries</li>
            <li>Signature may be required for high-value items</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Delivery Areas</h2>
          <p className="mb-4">
            We currently ship to the following regions:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>United States (all 50 states)</li>
            <li>Canada</li>
            <li>European Union</li>
            <li>United Kingdom</li>
            <li>Australia</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Order Tracking</h2>
          <p className="mb-4">
            Once your order ships, you will receive a confirmation email with tracking information.
            You can also track your order by:
          </p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Logging into your account</li>
            <li>Visiting the order tracking page</li>
            <li>Contacting our customer service team</li>
          </ol>
        </section>
      </div>
    </div>
  );
};