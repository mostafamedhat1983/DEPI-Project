import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export const SitemapPage: React.FC = () => {
  const sections = [
    {
      title: 'Shop',
      links: [
        { name: 'Electronics', path: '/category/electronics' },
        { name: 'Clothing', path: '/category/clothing' },
        { name: 'Books', path: '/category/books' },
        { name: 'Sports', path: '/category/sports' },
        { name: 'Food', path: '/category/food' },
      ],
    },
    {
      title: 'Account',
      links: [
        { name: 'Login', path: '/login' },
        { name: 'Sign Up', path: '/signup' },
        { name: 'My Orders', path: '/orders' },
        { name: 'Wishlist', path: '/wishlist' },
      ],
    },
    {
      title: 'Customer Service',
      links: [
        { name: 'Contact Us', path: '/contact' },
        { name: 'About Us', path: '/about' },
        { name: 'Shipping Information', path: '/shipping' },
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms & Conditions', path: '/terms' },
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Sitemap</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
            <ul className="space-y-2">
              {section.links.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="flex items-center text-gray-600 hover:text-blue-600"
                  >
                    <ChevronRight className="w-4 h-4 mr-2" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};