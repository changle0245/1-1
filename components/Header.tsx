'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { 
    name: 'Products', 
    href: '/products',
    children: [
      { name: 'Mabkhara & Incense Burners', href: '/products/mabkhara' },
      { name: 'Serving Trays & Fruit Plates', href: '/products/fruit-trays' },
      { name: 'Islamic Gift Sets', href: '/products/gift-sets' },
    ]
  },
  { name: 'Services', href: '/services' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-charcoal-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-display font-bold">
              <span className="text-gold-500">ARAB</span>
              <span className="text-white">GOLD</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <div 
                key={item.name}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`px-4 py-2 text-sm font-medium transition-colors flex items-center gap-1
                    ${item.children ? 'cursor-pointer' : ''}
                    text-charcoal-200 hover:text-gold-500`}
                >
                  {item.name}
                  {item.children && <ChevronDown className="w-4 h-4" />}
                </Link>
                
                {/* Dropdown */}
                {item.children && activeDropdown === item.name && (
                  <div className="absolute top-full left-0 mt-1 w-64 bg-charcoal-800 border border-charcoal-700 rounded-sm shadow-xl animate-fade-in">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className="block px-4 py-3 text-sm text-charcoal-200 hover:bg-charcoal-700 hover:text-gold-500 transition-colors"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="https://wa.me/8613115825523"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold text-sm py-2.5 px-6"
            >
              WhatsApp
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-charcoal-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-charcoal-900 border-t border-charcoal-800 animate-fade-in">
          <div className="px-4 py-4 space-y-1">
            {navigation.map((item) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  className="block px-4 py-3 text-base font-medium text-charcoal-200 hover:text-gold-500 hover:bg-charcoal-800 rounded-sm"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
                {item.children && (
                  <div className="pl-4">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-charcoal-400 hover:text-gold-500"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 px-4">
              <a
                href="https://wa.me/8613115825523"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold w-full block text-center text-sm py-3"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
