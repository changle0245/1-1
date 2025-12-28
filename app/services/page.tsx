import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Link from 'next/link';
import { 
  Palette, Package, Tag, Search, Truck, Shield,
  ArrowRight, CheckCircle, Lightbulb, Cog
} from 'lucide-react';

export const metadata = {
  title: 'OEM/ODM Services | ArabGold Factory - Custom Manufacturing',
  description: 'Custom OEM/ODM manufacturing for Arabic home decor. Your design, your brand - we produce. Low MOQ 100 pcs for custom orders.',
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <WhatsAppButton />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-charcoal-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-6">
              Our <span className="text-gold-gradient">Services</span>
            </h1>
            <p className="text-xl text-charcoal-300">
              Comprehensive manufacturing solutions from design to delivery. 
              Your vision, our expertise.
            </p>
          </div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20 bg-charcoal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* OEM */}
            <div className="p-8 bg-charcoal-900 border border-charcoal-700 rounded-sm">
              <div className="w-14 h-14 bg-gold-500/10 rounded-full flex items-center justify-center mb-6">
                <Palette className="w-7 h-7 text-gold-500" />
              </div>
              <h2 className="text-2xl font-display font-bold text-white mb-4">
                OEM Manufacturing
              </h2>
              <p className="text-charcoal-400 mb-6">
                Bring your own designs to life. We manufacture according to your exact 
                specifications - dimensions, materials, finishes, and packaging.
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  'Your complete design drawings',
                  'Custom sizes and dimensions',
                  'Choice of materials and finishes',
                  'Your brand packaging',
                  'MOQ: 100 pieces per design',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-charcoal-300">
                    <CheckCircle className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-gold-500 font-medium">
                Lead time: 20-30 days for first order
              </p>
            </div>

            {/* ODM */}
            <div className="p-8 bg-charcoal-900 border border-charcoal-700 rounded-sm">
              <div className="w-14 h-14 bg-gold-500/10 rounded-full flex items-center justify-center mb-6">
                <Lightbulb className="w-7 h-7 text-gold-500" />
              </div>
              <h2 className="text-2xl font-display font-bold text-white mb-4">
                ODM Customization
              </h2>
              <p className="text-charcoal-400 mb-6">
                Modify our existing designs to suit your market. Change colors, sizes, 
                patterns, or combine elements from different products.
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  'Modify existing product designs',
                  'Custom color combinations',
                  'Size adjustments',
                  'Pattern modifications',
                  'MOQ: 50 pieces per variation',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-charcoal-300">
                    <CheckCircle className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-gold-500 font-medium">
                Lead time: 15-20 days
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-charcoal-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-bold text-white mb-12 text-center">
            Additional Services
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Tag,
                title: 'Private Label',
                description: 'Add your brand logo, labels, and custom packaging to our products.',
              },
              {
                icon: Package,
                title: 'Gift Packaging',
                description: 'Premium gift boxes, velvet pouches, and presentation cases available.',
              },
              {
                icon: Search,
                title: 'Sourcing Service',
                description: 'Can\'t find what you need? We can source other Arabic decor items for you.',
              },
              {
                icon: Cog,
                title: 'Product Development',
                description: 'From concept to prototype to production - full product development support.',
              },
              {
                icon: Shield,
                title: 'Quality Inspection',
                description: '100% inspection before shipping. Third-party QC (SGS, Intertek) available.',
              },
              {
                icon: Truck,
                title: 'Logistics Support',
                description: 'FOB, CIF, DDP terms. We handle export documentation and shipping.',
              },
            ].map((service, i) => (
              <div 
                key={i} 
                className="p-6 bg-charcoal-800 border border-charcoal-700 rounded-sm hover:border-gold-500/30 transition-colors"
              >
                <service.icon className="w-10 h-10 text-gold-500 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
                <p className="text-charcoal-400 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-charcoal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-bold text-white mb-4 text-center">
            OEM/ODM Process
          </h2>
          <p className="text-charcoal-400 text-center mb-12 max-w-2xl mx-auto">
            From initial inquiry to final delivery, we guide you through every step
          </p>

          <div className="grid md:grid-cols-6 gap-4">
            {[
              { step: '1', title: 'Inquiry', desc: 'Share your requirements' },
              { step: '2', title: 'Quote', desc: 'Detailed pricing' },
              { step: '3', title: 'Sample', desc: 'Prototype approval' },
              { step: '4', title: 'Production', desc: 'Bulk manufacturing' },
              { step: '5', title: 'QC', desc: '100% inspection' },
              { step: '6', title: 'Delivery', desc: 'Ship worldwide' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-gold-500 text-charcoal-900 rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg">
                  {item.step}
                </div>
                <h3 className="text-white font-medium mb-1">{item.title}</h3>
                <p className="text-charcoal-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Info */}
      <section className="py-20 bg-charcoal-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-bold text-white mb-8 text-center">
            Pricing Information
          </h2>

          <div className="bg-charcoal-800 border border-charcoal-700 rounded-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-charcoal-900">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-charcoal-400">Service</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-charcoal-400">MOQ</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-charcoal-400">Lead Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-700">
                <tr>
                  <td className="px-6 py-4 text-white">Stock Products</td>
                  <td className="px-6 py-4 text-charcoal-300">50 pcs</td>
                  <td className="px-6 py-4 text-charcoal-300">15 days</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-white">ODM (Color/Size Changes)</td>
                  <td className="px-6 py-4 text-charcoal-300">50 pcs</td>
                  <td className="px-6 py-4 text-charcoal-300">15-20 days</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-white">OEM (Custom Design)</td>
                  <td className="px-6 py-4 text-charcoal-300">100 pcs</td>
                  <td className="px-6 py-4 text-charcoal-300">20-30 days</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-white">Private Label</td>
                  <td className="px-6 py-4 text-charcoal-300">50 pcs</td>
                  <td className="px-6 py-4 text-charcoal-300">+3-5 days</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-charcoal-500 text-sm text-center mt-4">
            * Pricing varies based on design complexity, materials, and quantity. Contact us for detailed quotes.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-gold-600 to-gold-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-display font-bold text-charcoal-900 mb-4">
            Ready to Start Your Custom Order?
          </h2>
          <p className="text-charcoal-800 mb-8">
            Share your requirements and get a detailed quote within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/8613115825523?text=Hi,%20I'm%20interested%20in%20your%20OEM/ODM%20services"
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
