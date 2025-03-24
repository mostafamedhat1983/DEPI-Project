import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const menuItems = [
  {
    label: 'Electronics',
    href: '/category/electronics',
    submenu: [
      { label: 'Phones', href: '/category/electronics/phones' },
      { label: 'Laptops', href: '/category/electronics/laptops' },
      { label: 'Accessories', href: '/category/electronics/accessories' }
    ]
  },
  {
    label: 'Clothing',
    href: '/category/clothing',
    submenu: [
      { label: 'Men', href: '/category/clothing/men' },
      { label: 'Women', href: '/category/clothing/women' },
      { label: 'Kids', href: '/category/clothing/kids' }
    ]
  },
  {
    label: 'Sports',
    href: '/category/sports',
    submenu: [
      { label: 'Equipment', href: '/category/sports/equipment' },
      { label: 'Clothing', href: '/category/sports/clothing' },
      { label: 'Nutrition', href: '/category/sports/nutrition' }
    ]
  }
];

export const Navigation: React.FC = () => {
  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);

  return (
    <nav className="bg-gray-800 text-white" data-testid="main-navigation">
      <div className="max-w-7xl mx-auto px-4">
        <ul className="flex">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="relative group"
              onMouseEnter={() => setOpenSubmenu(index)}
              onMouseLeave={() => setOpenSubmenu(null)}
              data-testid={`nav-item-${index}`}
            >
              <Link
                to={item.href}
                className="flex items-center px-4 py-3 hover:bg-gray-700 transition-colors duration-200"
              >
                {item.label}
                {item.submenu && (
                  <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                    openSubmenu === index ? 'rotate-180' : ''
                  }`} />
                )}
              </Link>
              
              {item.submenu && openSubmenu === index && (
                <div
                  className="absolute left-0 top-full min-w-[200px] bg-white rounded-b-lg shadow-lg py-2 z-50"
                  data-testid={`submenu-${index}`}
                >
                  <ul>
                    {item.submenu.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <Link
                          to={subItem.href}
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors duration-200"
                          data-testid={`submenu-item-${index}-${subIndex}`}
                        >
                          {subItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};