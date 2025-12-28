import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Link from 'next/link';
import { ArrowRight, Package, CheckCircle } from 'lucide-react';
import { CATEGORIES } from '@/lib/types';

export const metadata = {
  title: 'Products | ArabGold Factory - Arabic Home Decor Wholesale',
  description: 'Browse our collection of Mabkhara incense burners, gold serving trays, and Islamic gift sets. Factory direct wholesale with MOQ 50 pcs.',
};

export default function ProductsPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <WhatsAppButton />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-charcoal-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-6">
              Our <span className="text-gold-gradient">Products</span>
            </h1>
            <p className="text-xl text-charcoal-300">
              Premium Arabic home decor crafted with precision. 
              Factory direct wholesale with low MOQ.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-charcoal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {CATEGORIES.map((category) => (
              <Link
                key={category.id}
                href={`/products/${category.slug}`}
                className="group luxury-card bg-charcoal-900 border border-charcoal-700 rounded-sm overflow-hidden"
              >
                {/* Image placeholder */}
                <div className="aspect-[4/3] bg-charcoal-700 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-transparent to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Package className="w-20 h-20 text-gold-500/20" />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block px-3 py-1 bg-gold-500 text-charcoal-900 text-xs font-medium rounded-sm">
                      View Collection
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-gold-500 transition-colors">
                    {category.name}
                  </h2>
                  <p className="text-charcoal-400 text-sm mb-4">
                    {category.description}
                  </p>
                  <div className="flex items-center text-gold-500 text-sm font-medium">
                    Explore Products
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-charcoal-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-display font-bold text-white mb-8 text-center">
            Why Order From Us
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'MOQ 50 pcs', description: 'Low minimum order, easy to start' },
              { title: '15-Day Lead Time', description: 'Fast production turnaround' },
              { title: 'OEM/ODM Available', description: 'Custom designs welcome' },
              { title: 'Quality Guaranteed', description: '100% inspection before shipping' },
            ].map((benefit, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-white font-medium">{benefit.title}</h3>
                  <p className="text-charcoal-400 text-sm">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-charcoal-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-display font-bold text-white mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-charcoal-400 mb-6">
            We offer custom OEM/ODM services. Send us your design or requirements.
          </p>
          <Link href="/contact" className="btn-gold inline-flex items-center gap-2">
            Contact Us
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
