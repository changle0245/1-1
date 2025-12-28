'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Package, ExternalLink } from 'lucide-react';
import { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
  showInquiryButton?: boolean;
}

export default function ProductCard({ product, showInquiryButton = true }: ProductCardProps) {
  const whatsappLink = `https://wa.me/8613115825523?text=Hi,%20I'm%20interested%20in%20${encodeURIComponent(product.name)}`;

  return (
    <div className="group bg-charcoal-800 border border-charcoal-700 rounded-sm overflow-hidden luxury-card">
      {/* Image */}
      <div className="aspect-square bg-charcoal-700 relative overflow-hidden">
        {product.images.length > 0 ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Package className="w-16 h-16 text-gold-500/20" />
          </div>
        )}
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {product.featured && (
            <span className="px-2 py-1 bg-gold-500 text-charcoal-900 text-xs font-medium rounded-sm">
              Featured
            </span>
          )}
        </div>

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-charcoal-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-gold-500 text-charcoal-900 font-medium rounded-sm hover:bg-gold-400 transition-colors flex items-center gap-2"
          >
            Quick Inquiry
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-gold-500 transition-colors line-clamp-1">
          {product.name}
        </h3>
        
        {product.nameAr && (
          <p className="text-charcoal-500 text-sm mb-2 arabic-text">{product.nameAr}</p>
        )}
        
        <p className="text-charcoal-400 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Specs */}
        <div className="flex flex-wrap gap-2 mb-4">
          {product.specifications.size && (
            <span className="px-2 py-1 bg-charcoal-700 text-charcoal-300 text-xs rounded-sm">
              {product.specifications.size}
            </span>
          )}
          {product.specifications.material && (
            <span className="px-2 py-1 bg-charcoal-700 text-charcoal-300 text-xs rounded-sm">
              {product.specifications.material}
            </span>
          )}
        </div>

        {/* Price & MOQ */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-gold-500 font-medium">
            {product.priceRange || 'Contact for price'}
          </span>
          <span className="text-charcoal-500">
            MOQ: {product.specifications.moq || 50}
          </span>
        </div>

        {/* Inquiry Button */}
        {showInquiryButton && (
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 w-full btn-outline block text-center text-sm py-2"
          >
            Inquire Now
          </a>
        )}
      </div>
    </div>
  );
}
