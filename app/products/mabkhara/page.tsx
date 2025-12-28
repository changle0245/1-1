import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Link from 'next/link';
import { ArrowRight, Package, Hotel, Home, Gift, Church } from 'lucide-react';
import { getProductsByCategory } from '@/lib/db';

export const metadata = {
  title: 'Mabkhara & Incense Burners | ArabGold Factory Wholesale',
  description: 'Wholesale Arabic Mabkhara incense burners. Floor-standing for hotels & mosques, tabletop for homes, gift sets. Factory direct, MOQ 50 pcs.',
};

export default async function MabkharaPage() {
  const products = await getProductsByCategory('mabkhara');

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
            <span className="text-gold-500">Mabkhara & Incense Burners</span>
          </nav>
          
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-6">
              <span className="text-gold-gradient">Mabkhara</span> & Incense Burners
            </h1>
            <p className="text-xl text-charcoal-300">
              Traditional and modern incense burners for homes, hotels, and mosques. 
              From elegant tabletop designs to grand floor-standing pieces.
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
                title: 'Floor-Standing Mabkhara',
                description: 'Height: 60-120cm. Perfect for hotel lobbies, mosques, and wedding halls.',
                icon: Hotel,
              },
              {
                title: 'Tabletop Mabkhara',
                description: 'Height: 15-40cm. Ideal for home use, daily burning, and gifts.',
                icon: Home,
              },
              {
                title: 'Mabkhara Gift Sets',
                description: 'Complete sets with burner, tray, and accessories. Perfect for weddings.',
                icon: Gift,
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
              All Mabkhara Products
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
                        MOQ: {product.specifications.moq || 50}
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

      {/* Use Cases */}
      <section className="py-16 bg-charcoal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-display font-bold text-white mb-8 text-center">
            Where Our Mabkhara Are Used
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              '🏨 5-Star Hotels in Gulf Region',
              '🕌 Mosques & Prayer Rooms',
              '💒 Arab Wedding Ceremonies',
              '🏠 Luxury Home Interiors',
              '🎁 Premium Gift Sets',
              '🏢 Corporate Lobbies',
            ].map((useCase, i) => (
              <span
                key={i}
                className="px-4 py-2 bg-charcoal-900 border border-charcoal-700 rounded-full text-sm text-charcoal-300"
              >
                {useCase}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-charcoal-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-display font-bold text-white mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: 'What is the MOQ for Mabkhara?',
                a: '50 pieces per design for stock items, 100 pieces for custom designs.',
              },
              {
                q: 'Can you customize the size and color?',
                a: 'Yes, we offer full OEM service including custom sizes, colors, and your logo.',
              },
              {
                q: 'What materials do you use?',
                a: 'Iron with gold/silver electroplating. Stainless steel options available.',
              },
              {
                q: 'What is the lead time?',
                a: '15-20 days for standard orders. Rush orders (7-10 days) available with surcharge.',
              },
            ].map((faq, i) => (
              <div key={i} className="p-5 bg-charcoal-800 border border-charcoal-700 rounded-sm">
                <h3 className="text-white font-medium mb-2">{faq.q}</h3>
                <p className="text-charcoal-400 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-gold-600 to-gold-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-display font-bold text-charcoal-900 mb-4">
            Ready to Order Mabkhara?
          </h2>
          <p className="text-charcoal-800 mb-6">
            Get a quote within 24 hours. Custom designs welcome.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/8613115825523?text=Hi,%20I'm%20interested%20in%20Mabkhara%20incense%20burners"
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
