import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Link from 'next/link';
import { 
  Factory, Package, Palette, Rocket, Globe, Clock, 
  ShieldCheck, Truck, ArrowRight, Star, CheckCircle 
} from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <WhatsAppButton />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center hero-pattern overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal-900 via-charcoal-900 to-charcoal-800" />
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gold-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500/10 border border-gold-500/20 rounded-full mb-8 animate-fade-in">
            <Factory className="w-4 h-4 text-gold-500" />
            <span className="text-gold-500 text-sm font-medium">Factory Direct · Guangzhou</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold mb-6 animate-slide-up">
            <span className="text-white">Premium </span>
            <span className="text-gold-gradient">Arabic Home Decor</span>
            <br />
            <span className="text-white">Manufacturer</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-charcoal-300 max-w-3xl mx-auto mb-8 animate-slide-up stagger-1">
            Wholesale Mabkhara Incense Burners, Gold Serving Trays & Islamic Gift Sets.
            <br className="hidden sm:block" />
            10+ Years Export Experience to Middle East & Beyond.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-12 animate-slide-up stagger-2">
            {[
              { value: '50+', label: 'Min. Order', sublabel: 'pcs' },
              { value: '15', label: 'Lead Time', sublabel: 'days' },
              { value: '20+', label: 'Countries', sublabel: 'exported' },
              { value: 'OEM', label: 'Custom', sublabel: 'service' },
            ].map((stat, i) => (
              <div key={i} className="p-4 bg-charcoal-800/50 border border-charcoal-700 rounded-sm">
                <div className="text-2xl sm:text-3xl font-bold text-gold-500">{stat.value}</div>
                <div className="text-sm text-charcoal-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up stagger-3">
            <Link href="/contact" className="btn-gold inline-flex items-center justify-center gap-2">
              Get Quote
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/products" className="btn-outline inline-flex items-center justify-center gap-2">
              View Products
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-charcoal-600 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-gold-500 rounded-full" />
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-24 bg-charcoal-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
              Our Product Categories
            </h2>
            <p className="text-charcoal-400 max-w-2xl mx-auto">
              Premium Arabic home decor crafted with precision and exported worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Mabkhara & Incense Burners',
                description: 'Floor-standing and tabletop incense burners. Traditional designs for hotels, mosques, and luxury homes.',
                href: '/products/mabkhara',
                features: ['Floor-Standing 60-120cm', 'Tabletop Designs', 'Gift Sets'],
              },
              {
                title: 'Serving Trays & Fruit Plates',
                description: 'Gold-plated serving trays, rotating fruit plates, and candy boxes for Ramadan and daily hospitality.',
                href: '/products/fruit-trays',
                features: ['Rotating Trays', 'Cake Stands', 'Candy Boxes'],
              },
              {
                title: 'Islamic Gift Sets',
                description: 'Curated gift collections for weddings, Eid celebrations, and corporate gifting with custom packaging.',
                href: '/products/gift-sets',
                features: ['Wedding Sets', 'Ramadan Gifts', 'Corporate Sets'],
              },
            ].map((category, i) => (
              <Link 
                key={i}
                href={category.href}
                className="group luxury-card bg-charcoal-800 border border-charcoal-700 rounded-sm overflow-hidden"
              >
                {/* Image placeholder */}
                <div className="aspect-[4/3] bg-charcoal-700 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Package className="w-16 h-16 text-gold-500/30" />
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-gold-500 transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-charcoal-400 text-sm mb-4">
                    {category.description}
                  </p>
                  <ul className="space-y-2">
                    {category.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-charcoal-300">
                        <CheckCircle className="w-4 h-4 text-gold-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex items-center text-gold-500 text-sm font-medium">
                    View Collection
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-charcoal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
              Why Choose ArabGold Factory
            </h2>
            <p className="text-charcoal-400 max-w-2xl mx-auto">
              Your trusted partner for Arabic home decor manufacturing
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Factory,
                title: 'Factory Direct',
                description: 'Skip middlemen, get manufacturer pricing directly from our Guangzhou facility.',
              },
              {
                icon: Rocket,
                title: 'Fast Production',
                description: '15-day standard lead time. Rush orders available for urgent needs.',
              },
              {
                icon: Palette,
                title: 'OEM/ODM Service',
                description: 'Custom designs, sizes, colors, and branding. Your vision, our production.',
              },
              {
                icon: Package,
                title: 'Low MOQ',
                description: 'Start with just 50 pieces per design. Perfect for testing new markets.',
              },
              {
                icon: ShieldCheck,
                title: 'Quality Assured',
                description: '100% inspection before shipment. Third-party QC available on request.',
              },
              {
                icon: Globe,
                title: '20+ Countries',
                description: 'Trusted by buyers in Saudi Arabia, UAE, Kuwait, Qatar, Europe, and more.',
              },
              {
                icon: Truck,
                title: 'Global Shipping',
                description: 'FOB, CIF, DDP available. Experienced with international logistics.',
              },
              {
                icon: Clock,
                title: '24h Response',
                description: 'Fast WhatsApp communication. Get quotes within 24 hours.',
              },
            ].map((feature, i) => (
              <div 
                key={i}
                className="p-6 bg-charcoal-900/50 border border-charcoal-700 rounded-sm hover:border-gold-500/30 transition-colors"
              >
                <feature.icon className="w-10 h-10 text-gold-500 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-charcoal-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Export Markets */}
      <section className="py-24 bg-charcoal-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
              Export Markets
            </h2>
            <p className="text-charcoal-400 max-w-2xl mx-auto">
              We proudly serve customers in over 20 countries worldwide
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {[
              '🇸🇦 Saudi Arabia',
              '🇦🇪 UAE',
              '🇰🇼 Kuwait',
              '🇶🇦 Qatar',
              '🇧🇭 Bahrain',
              '🇴🇲 Oman',
              '🇮🇶 Iraq',
              '🇯🇴 Jordan',
              '🇪🇬 Egypt',
              '🇲🇦 Morocco',
              '🇹🇷 Turkey',
              '🇵🇰 Pakistan',
              '🇬🇧 UK',
              '🇩🇪 Germany',
              '🇫🇷 France',
              '🇺🇸 USA',
              '🇨🇦 Canada',
            ].map((country, i) => (
              <span 
                key={i}
                className="px-4 py-2 bg-charcoal-800 border border-charcoal-700 rounded-full text-sm text-charcoal-300"
              >
                {country}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Types */}
      <section className="py-24 bg-charcoal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-4">
              Who We Serve
            </h2>
            <p className="text-charcoal-400 max-w-2xl mx-auto">
              Trusted by businesses across the globe
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Wholesalers & Distributors',
                description: 'Bulk orders for retail distribution across Middle East, Europe, and North America.',
              },
              {
                title: 'Hotel & Hospitality',
                description: 'Luxury decor for hotel lobbies, guest amenities, and hospitality supplies.',
              },
              {
                title: 'Gift & Souvenir Companies',
                description: 'Custom gift sets for Ramadan, Eid, weddings, and corporate gifting.',
              },
              {
                title: 'Amazon/E-commerce Sellers',
                description: 'Private label products with retail-ready packaging and FBA prep.',
              },
              {
                title: 'Fragrance & Bakhoor Brands',
                description: 'Mabkhara and gift sets to complement your fragrance products.',
              },
              {
                title: 'Mosque & Religious Centers',
                description: 'Grand incense burners and ceremonial items for places of worship.',
              },
            ].map((customer, i) => (
              <div 
                key={i}
                className="p-6 bg-charcoal-900/50 border border-charcoal-700 rounded-sm"
              >
                <h3 className="text-lg font-semibold text-white mb-2">{customer.title}</h3>
                <p className="text-charcoal-400 text-sm">{customer.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-gold-600 to-gold-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-charcoal-900 mb-4">
            Ready to Start Your Order?
          </h2>
          <p className="text-charcoal-800 mb-8 max-w-2xl mx-auto">
            Get a quote within 24 hours. WhatsApp us directly or fill out our inquiry form.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/8613115825523"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-charcoal-900 text-gold-500 font-semibold rounded-sm hover:bg-charcoal-800 transition-colors inline-flex items-center justify-center gap-2"
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
