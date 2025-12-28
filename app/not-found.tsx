import Link from 'next/link';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-charcoal-900 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-display font-bold text-gold-500 mb-4">404</div>
        <h1 className="text-2xl font-display font-bold text-white mb-4">
          Page Not Found
        </h1>
        <p className="text-charcoal-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="btn-gold inline-flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
          <Link
            href="/products"
            className="btn-outline inline-flex items-center justify-center gap-2"
          >
            <Search className="w-5 h-5" />
            Browse Products
          </Link>
        </div>
        
        <div className="mt-12 pt-8 border-t border-charcoal-800">
          <p className="text-charcoal-500 text-sm mb-4">Looking for something specific?</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/products/mabkhara" className="text-gold-500 hover:text-gold-400 text-sm">
              Mabkhara
            </Link>
            <Link href="/products/fruit-trays" className="text-gold-500 hover:text-gold-400 text-sm">
              Serving Trays
            </Link>
            <Link href="/products/gift-sets" className="text-gold-500 hover:text-gold-400 text-sm">
              Gift Sets
            </Link>
            <Link href="/contact" className="text-gold-500 hover:text-gold-400 text-sm">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
