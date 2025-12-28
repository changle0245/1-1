import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Link from 'next/link';
import { 
  Factory, Users, Globe, Award, CheckCircle, ArrowRight,
  Lightbulb, Cog, ClipboardCheck, Truck
} from 'lucide-react';

export const metadata = {
  title: 'About Us | ArabGold Factory - Arabic Home Decor Manufacturer',
  description: 'Learn about ArabGold Factory - your trusted Arabic home decor manufacturer in Guangzhou with 10+ years export experience to Middle East and beyond.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <WhatsAppButton />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-charcoal-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-6">
              About <span className="text-gold-gradient">ArabGold Factory</span>
            </h1>
            <p className="text-xl text-charcoal-300">
              Your trusted partner for premium Arabic home decor manufacturing. 
              Factory direct from Guangzhou, serving the world.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-charcoal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-display font-bold text-white mb-6">Our Story</h2>
              <div className="space-y-4 text-charcoal-300">
                <p>
                  Founded in Guangzhou—China's manufacturing heartland—ArabGold Factory 
                  has spent over a decade perfecting the art of Arabic home decor production. 
                  What started as a small workshop has grown into a comprehensive manufacturing 
                  facility serving clients across 20+ countries.
                </p>
                <p>
                  Our deep understanding of Arabic culture and aesthetics sets us apart. 
                  We don't just manufacture products; we craft pieces that resonate with 
                  the rich traditions of Middle Eastern hospitality—from the intricate 
                  patterns of our Mabkhara to the elegant designs of our serving trays.
                </p>
                <p>
                  Today, our products grace hotel lobbies in Dubai, homes in Riyadh, 
                  wedding halls in Kuwait, and retail stores across Europe and North America. 
                  We take pride in being more than suppliers—we are partners in our 
                  clients' success.
                </p>
              </div>
            </div>
            <div className="bg-charcoal-700 rounded-sm aspect-[4/3] flex items-center justify-center">
              <Factory className="w-24 h-24 text-gold-500/30" />
            </div>
          </div>
        </div>
      </section>

      {/* Factory Overview */}
      <section className="py-20 bg-charcoal-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-bold text-white mb-12 text-center">
            Factory Overview
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Factory, label: 'Location', value: 'Guangzhou, China' },
              { icon: Users, label: 'Team', value: 'Skilled Craftsmen' },
              { icon: Globe, label: 'Export Markets', value: '20+ Countries' },
              { icon: Award, label: 'Experience', value: '10+ Years' },
            ].map((item, i) => (
              <div key={i} className="text-center p-6 bg-charcoal-800 border border-charcoal-700 rounded-sm">
                <item.icon className="w-12 h-12 text-gold-500 mx-auto mb-4" />
                <p className="text-charcoal-400 text-sm mb-1">{item.label}</p>
                <p className="text-white font-semibold text-lg">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Advantages */}
      <section className="py-20 bg-charcoal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-bold text-white mb-4 text-center">
            Our Advantages
          </h2>
          <p className="text-charcoal-400 text-center mb-12 max-w-2xl mx-auto">
            What makes ArabGold Factory your ideal manufacturing partner
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Lightbulb,
                title: 'Deep Cultural Understanding',
                description: '10 years serving Middle East markets means we understand Arabic aesthetics, cultural significance, and consumer preferences.',
              },
              {
                icon: Cog,
                title: 'Vertical Integration',
                description: 'In-house metalworking, electroplating, and assembly. Quality control at every stage of production.',
              },
              {
                icon: ClipboardCheck,
                title: 'Flexible Customization',
                description: 'Full OEM/ODM services. Custom sizes, colors, patterns, and packaging tailored to your market.',
              },
              {
                icon: Factory,
                title: 'Competitive Pricing',
                description: 'Factory direct with no middlemen. Volume discounts and flexible payment terms available.',
              },
              {
                icon: Award,
                title: 'Reliable Quality',
                description: '100% inspection before shipment. Third-party QC (SGS, Intertek) available on request.',
              },
              {
                icon: Truck,
                title: 'Professional Export Service',
                description: '10+ years export documentation experience. FOB, CIF, DDP terms available.',
              },
            ].map((advantage, i) => (
              <div 
                key={i} 
                className="p-6 bg-charcoal-900/50 border border-charcoal-700 rounded-sm hover:border-gold-500/30 transition-colors"
              >
                <advantage.icon className="w-10 h-10 text-gold-500 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">{advantage.title}</h3>
                <p className="text-charcoal-400 text-sm">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-charcoal-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-bold text-white mb-4 text-center">
            How We Work
          </h2>
          <p className="text-charcoal-400 text-center mb-12 max-w-2xl mx-auto">
            Simple and transparent process from inquiry to delivery
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Inquiry', description: 'Share your requirements via WhatsApp or email. We respond within 24 hours.' },
              { step: '02', title: 'Quote & Sample', description: 'Receive detailed quotation. Order samples for quality verification.' },
              { step: '03', title: 'Production', description: 'Upon order confirmation, production begins. 15-20 day lead time.' },
              { step: '04', title: 'Quality Check & Ship', description: '100% inspection before packing. Professional export documentation.' },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="text-6xl font-bold text-gold-500/20 mb-4">{item.step}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-charcoal-400 text-sm">{item.description}</p>
                {i < 3 && (
                  <ArrowRight className="hidden lg:block absolute top-8 -right-4 w-8 h-8 text-gold-500/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-charcoal-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-display font-bold text-white mb-4">
            Partner With Us
          </h2>
          <p className="text-charcoal-400 mb-8">
            Ready to discuss your project? Let's start a conversation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-gold inline-flex items-center justify-center gap-2">
              Contact Us
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/products" className="btn-outline">
              View Products
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
