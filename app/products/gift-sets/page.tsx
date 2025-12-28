import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Link from 'next/link';
import { ArrowRight, Package, Heart, Gift, Building2 } from 'lucide-react';
import { getProductsByCategory } from '@/lib/db';

export const metadata = {
  title: 'Islamic Gift Sets | ArabGold Factory Wholesale',
  description: 'Wholesale Islamic gift sets for weddings, Ramadan, Eid, and corporate gifting. Complete bakhoor sets, serving collections. Factory direct.',
};

export default async function GiftSetsPage() {
  const products = await getProductsByCategory('gift-sets');

  return (
    <main className="min-h-screen">
      <Header />
      <WhatsAppButton />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-charcoal-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-charcoal-400 mb-6">
            <Link href="/products" className="hover:text-gold-500 transition-colors">Products</Link>
            <span>/</span>
            <span className="text-gold-500">Islamic Gift Sets</span>
          </nav>
          
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-6">
              <span className="text-gold-gradient">Islamic</span> Gift Sets
            </h1>
            <p className="text-xl text-charcoal-300">
              Curated gift collections for weddings, Eid celebrations, Ramadan, 
              and corporate gifting. Complete sets with premium packaging.
            </p>
          </div>
        </div>
      </section>

      {/* Sub-categories */}
      <section className="py-12 bg-charcoal-800 border-b border-charcoal-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                title: 'Wedding Gift Sets',
                description: 'Traditional Arabic wedding sets. Mabkhara, perfume holders, and mirror trays for dowry.',
                icon: Heart,
              },
              {
                title: 'Ramadan & Eid Sets',
                description: 'Festive gift collections. Bakhoor sets with dates bowls and serving pieces.',
                icon: Gift,
              },
              {
                title: 'Corporate Gifts',
                description: 'Premium branded gift sets for corporate clients. Custom packaging available.',
                icon: Building2,
              },
            ].map((sub, i) => (
              <div key={i} className="p-6 bg-charcoal-900 border border-charcoal-700 rounded-sm">
                <sub.icon className="w-10 h-10 text-gold-500 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">{sub.title}</h3>
                <p className="text-charcoal-400 text-sm">{sub.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-charcoal-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-display font-bold text-white">
              All Gift Sets
            </h2>
            <span className="text-charcoal-400 text-sm">
              {products.length} products
            </span>
          </div>

          {products.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group bg-charcoal-800 border border-charcoal-700 rounded-sm overflow-hidden luxury-card"
                >
                  <div className="aspect-square bg-charcoal-700 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Package className="w-16 h-16 text-gold-500/20" />
                    </div>
                    {product.featured && (
                      <span className="absolute top-4 left-4 px-2 py-1 bg-gold-500 text-charcoal-900 text-xs font-medium rounded-sm">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-gold-500 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-charcoal-400 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gold-500 font-medium">
                        {product.priceRange || 'Contact for price'}
                      </span>
                      <span className="text-charcoal-500">
                        MOQ: {product.specifications.moq || 30}
                      </span>
                    </div>
                    <a
                      href={`https://wa.me/8613115825523?text=Hi,%20I'm%20interested%20in%20${encodeURIComponent(product.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 w-full btn-outline block text-center text-sm py-2"
                    >
                      Inquire Now
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-charcoal-800 border border-charcoal-700 rounded-sm">
              <Package className="w-16 h-16 text-gold-500/20 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Products Coming Soon</h3>
              <p className="text-charcoal-400 mb-6">
                We're updating our catalog. Contact us directly for current inventory.
              </p>
              <Link href="/contact" className="btn-gold inline-flex items-center gap-2">
                Contact Us
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Gift Set Contents */}
      <section className="py-16 bg-charcoal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-display font-bold text-white mb-8 text-center">
            What's Included in Our Gift Sets
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-charcoal-900 border border-charcoal-700 rounded-sm">
              <h3 className="text-lg font-semibold text-white mb-4">Classic Bakhoor Set</h3>
              <ul className="space-y-2 text-charcoal-400 text-sm">
                <li>✓ Mabkhara (incense burner)</li>
                <li>✓ Mirror serving tray</li>
                <li>✓ Perfume/oud holder</li>
                <li>✓ Rosewater sprayer</li>
                <li>✓ Gift box packaging</li>
              </ul>
            </div>
            <div className="p-6 bg-charcoal-900 border border-charcoal-700 rounded-sm">
              <h3 className="text-lg font-semibold text-white mb-4">Luxury Wedding Set</h3>
              <ul className="space-y-2 text-charcoal-400 text-sm">
                <li>✓ Large mabkhara</li>
                <li>✓ Ornate tray with handles</li>
                <li>✓ Crystal perfume bottles</li>
                <li>✓ Dates/candy bowls</li>
                <li>✓ Premium velvet box</li>
              </ul>
            </div>
            <div className="p-6 bg-charcoal-900 border border-charcoal-700 rounded-sm">
              <h3 className="text-lg font-semibold text-white mb-4">Ramadan Hospitality Set</h3>
              <ul className="space-y-2 text-charcoal-400 text-sm">
                <li>✓ Tabletop mabkhara</li>
                <li>✓ Rotating fruit tray</li>
                <li>✓ Dates serving bowl</li>
                <li>✓ Water/juice glasses</li>
                <li>✓ Festive gift wrap</li>
              </ul>
            </div>
          </div>
          
          <p className="text-charcoal-500 text-center mt-8">
            All sets can be customized with different combinations and your branding.
          </p>
        </div>
      </section>

      {/* Custom Sets */}
      <section className="py-16 bg-charcoal-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-display font-bold text-white mb-4">
            Create Your Own Gift Set
          </h2>
          <p className="text-charcoal-400 mb-8 max-w-2xl mx-auto">
            Mix and match any products from our catalog to create unique gift combinations. 
            We'll handle the packaging and presentation.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {[
              'Choose products from any category',
              'Custom packaging with your branding',
              'MOQ as low as 30 sets',
            ].map((feature, i) => (
              <div key={i} className="p-4 bg-charcoal-800 border border-charcoal-700 rounded-sm">
                <p className="text-charcoal-300 text-sm">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-gold-600 to-gold-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-display font-bold text-charcoal-900 mb-4">
            Ready to Order Gift Sets?
          </h2>
          <p className="text-charcoal-800 mb-6">
            Perfect for resellers, corporate buyers, and event planners.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/8613115825523?text=Hi,%20I'm%20interested%20in%20your%20Islamic%20gift%20sets"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-charcoal-900 text-gold-500 font-semibold rounded-sm hover:bg-charcoal-800 transition-colors"
            >
              WhatsApp Us
            </a>
            <Link
              href="/contact"
              className="px-8 py-4 bg-transparent border-2 border-charcoal-900 text-charcoal-900 font-semibold rounded-sm hover:bg-charcoal-900 hover:text-gold-500 transition-colors"
            >
              Send Inquiry
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
