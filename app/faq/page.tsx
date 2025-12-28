import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'FAQ | ArabGold Factory - Frequently Asked Questions',
  description: 'Common questions about ordering, MOQ, shipping, payment, and customization from ArabGold Factory.',
};

const faqCategories = [
  {
    title: 'Ordering & MOQ',
    questions: [
      {
        q: 'What is the minimum order quantity (MOQ)?',
        a: 'Our standard MOQ is 50 pieces per design for stock items. For custom OEM orders, the MOQ is 100 pieces. We can mix different designs to reach the minimum.',
      },
      {
        q: 'Can I order samples before placing a bulk order?',
        a: 'Yes, we encourage sample orders. Sample cost is typically 2-3x unit price plus shipping. Sample cost is refundable upon bulk order confirmation.',
      },
      {
        q: 'How do I place an order?',
        a: 'Contact us via WhatsApp or email with your requirements. We\'ll provide a quotation, you confirm the order, pay deposit, and we begin production.',
      },
    ],
  },
  {
    title: 'Production & Lead Time',
    questions: [
      {
        q: 'What is the standard production time?',
        a: 'Standard production time is 15 days for stock items, 15-20 days for ODM orders, and 20-30 days for OEM custom designs. Rush orders available with surcharge.',
      },
      {
        q: 'Can you provide progress updates during production?',
        a: 'Yes, we provide regular photo/video updates during production. You can also arrange third-party inspection before shipment.',
      },
      {
        q: 'What if there are quality issues with my order?',
        a: 'We conduct 100% inspection before shipping. If any defects are found after delivery, we offer replacement or refund based on the situation.',
      },
    ],
  },
  {
    title: 'Customization (OEM/ODM)',
    questions: [
      {
        q: 'Can you manufacture my own design?',
        a: 'Yes, we offer full OEM service. Provide your design drawings, dimensions, and specifications. We\'ll create a prototype for approval before bulk production.',
      },
      {
        q: 'Can you modify existing products?',
        a: 'Yes, our ODM service allows you to modify colors, sizes, patterns, and finishes of our existing designs. This has lower MOQ than full OEM.',
      },
      {
        q: 'Can you add my logo/brand to products?',
        a: 'Absolutely. We offer private labeling including logo engraving, custom labels, branded packaging, and product tags.',
      },
    ],
  },
  {
    title: 'Shipping & Logistics',
    questions: [
      {
        q: 'What shipping terms do you offer?',
        a: 'We offer FOB Guangzhou, CIF (to your port), and DDP (door-to-door). Most customers prefer FOB for cost transparency.',
      },
      {
        q: 'How long does shipping take?',
        a: 'Sea freight: 15-35 days depending on destination. Air freight: 5-7 days. Express courier: 3-5 days for samples.',
      },
      {
        q: 'Do you handle export documentation?',
        a: 'Yes, we handle all export documentation including commercial invoice, packing list, certificate of origin, and any required certificates.',
      },
    ],
  },
  {
    title: 'Payment & Pricing',
    questions: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept T/T (bank transfer), PayPal, Western Union, and L/C for large orders. T/T is most common: 30% deposit, 70% before shipment.',
      },
      {
        q: 'Can I get a price list?',
        a: 'Our pricing depends on quantity, customization, and specifications. Contact us with your requirements for a detailed quotation.',
      },
      {
        q: 'Do you offer volume discounts?',
        a: 'Yes, we offer tiered pricing. Larger quantities receive better unit prices. Contact us for volume discount details.',
      },
    ],
  },
  {
    title: 'About Our Company',
    questions: [
      {
        q: 'Are you a factory or trading company?',
        a: 'We are a direct manufacturer with our own factory in Guangzhou, Zengcheng District. Factory visits are welcome - we can arrange pickup from airport.',
      },
      {
        q: 'How long have you been in business?',
        a: 'We have over 10 years of experience in Arabic home decor manufacturing and export, serving customers in 20+ countries.',
      },
      {
        q: 'Which countries do you export to?',
        a: 'We export to Saudi Arabia, UAE, Kuwait, Qatar, Bahrain, Oman, Iraq, Jordan, Egypt, Morocco, Turkey, Pakistan, UK, Germany, France, USA, Canada, and more.',
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <WhatsAppButton />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-charcoal-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-6">
              Frequently Asked <span className="text-gold-gradient">Questions</span>
            </h1>
            <p className="text-xl text-charcoal-300">
              Find answers to common questions about ordering, customization, 
              shipping, and more.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 bg-charcoal-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {faqCategories.map((category, i) => (
              <div key={i}>
                <h2 className="text-2xl font-display font-bold text-white mb-6">
                  {category.title}
                </h2>
                <div className="space-y-4">
                  {category.questions.map((faq, j) => (
                    <div 
                      key={j} 
                      className="p-6 bg-charcoal-900 border border-charcoal-700 rounded-sm"
                    >
                      <h3 className="text-lg font-medium text-white mb-3">
                        {faq.q}
                      </h3>
                      <p className="text-charcoal-400">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 bg-charcoal-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-display font-bold text-white mb-4">
            Still Have Questions?
          </h2>
          <p className="text-charcoal-400 mb-8">
            Can't find the answer you're looking for? Reach out to our team directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/8613115825523"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold inline-flex items-center justify-center gap-2"
            >
              Chat on WhatsApp
            </a>
            <Link href="/contact" className="btn-outline inline-flex items-center justify-center gap-2">
              Send an Inquiry
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
