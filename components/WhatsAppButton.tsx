'use client';

import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/8613115825523?text=Hi,%20I'm%20interested%20in%20your%20products"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white" />
      
      {/* Tooltip */}
      <span className="absolute right-full mr-3 px-3 py-2 bg-charcoal-800 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Chat with us
      </span>
    </a>
  );
}
