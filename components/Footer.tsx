import Link from 'next/link';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-charcoal-900 border-t border-charcoal-800">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-display font-bold">
                <span className="text-gold-500">ARAB</span>
                <span className="text-white">GOLD</span>
              </span>
            </Link>
            <p className="text-charcoal-400 text-sm leading-relaxed">
              Premium Arabic home decor manufacturer. Factory direct from Guangzhou with 10+ years export experience.
            </p>
            <div className="flex space-x-4 pt-2">
              {/* Social icons placeholder */}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: 'About Us', href: '/about' },
                { name: 'Products', href: '/products' },
                { name: 'Services', href: '/services' },
                { name: 'FAQ', href: '/faq' },
                { name: 'Contact', href: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-charcoal-400 hover:text-gold-500 text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-semibold mb-4">Products</h4>
            <ul className="space-y-3">
              {[
                { name: 'Mabkhara & Incense Burners', href: '/products/mabkhara' },
                { name: 'Serving Trays & Fruit Plates', href: '/products/fruit-trays' },
                { name: 'Islamic Gift Sets', href: '/products/gift-sets' },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-charcoal-400 hover:text-gold-500 text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-charcoal-400 text-sm">WhatsApp</p>
                  <a href="https://wa.me/8613115825523" className="text-white hover:text-gold-500 transition-colors">
                    +86 131 1582 5523
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-charcoal-400 text-sm">Email</p>
                  <a href="mailto:sales@arabgoldfactory.com" className="text-white hover:text-gold-500 transition-colors">
                    sales@arabgoldfactory.com
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-charcoal-400 text-sm">Address</p>
                  <p className="text-white">Zengcheng, Guangzhou, China</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-charcoal-400 text-sm">Business Hours</p>
                  <p className="text-white">Mon-Sat 9AM-6PM (GMT+8)</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-charcoal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-charcoal-500 text-sm">
              © {new Date().getFullYear()} ArabGold Factory. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-charcoal-500 hover:text-gold-500 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-charcoal-500 hover:text-gold-500 text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
