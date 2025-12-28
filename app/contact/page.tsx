'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, Loader2 } from 'lucide-react';
import { COUNTRIES } from '@/lib/types';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    company: '',
    products: [] as string[],
    quantity: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleProductToggle = (product: string) => {
    setFormData(prev => ({
      ...prev,
      products: prev.products.includes(product)
        ? prev.products.filter(p => p !== product)
        : [...prev.products, product]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          country: '',
          company: '',
          products: [],
          quantity: '',
          message: '',
        });
      } else {
        throw new Error(data.error || 'Failed to submit inquiry');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong');
    }
  };

  return (
    <main className="min-h-screen">
      <Header />
      <WhatsAppButton />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-charcoal-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-display font-bold text-white mb-6">
              Contact <span className="text-gold-gradient">Us</span>
            </h1>
            <p className="text-xl text-charcoal-300">
              Get a quote within 24 hours. We're here to help with your order.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-charcoal-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <h2 className="text-2xl font-display font-bold text-white">Get In Touch</h2>
              
              <div className="space-y-6">
                <a 
                  href="https://wa.me/8613115825523"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 bg-charcoal-900 border border-charcoal-700 rounded-sm hover:border-gold-500/50 transition-colors group"
                >
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-charcoal-400 text-sm">WhatsApp (Recommended)</p>
                    <p className="text-white font-medium group-hover:text-gold-500 transition-colors">
                      +86 131 1582 5523
                    </p>
                  </div>
                </a>

                <a 
                  href="mailto:sales@arabgoldfactory.com"
                  className="flex items-start gap-4 p-4 bg-charcoal-900 border border-charcoal-700 rounded-sm hover:border-gold-500/50 transition-colors group"
                >
                  <div className="w-12 h-12 bg-gold-500/20 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-gold-500" />
                  </div>
                  <div>
                    <p className="text-charcoal-400 text-sm">Email</p>
                    <p className="text-white font-medium group-hover:text-gold-500 transition-colors">
                      sales@arabgoldfactory.com
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4 bg-charcoal-900 border border-charcoal-700 rounded-sm">
                  <div className="w-12 h-12 bg-gold-500/20 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-gold-500" />
                  </div>
                  <div>
                    <p className="text-charcoal-400 text-sm">Factory Address</p>
                    <p className="text-white font-medium">
                      Zengcheng District, Guangzhou, China
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-charcoal-900 border border-charcoal-700 rounded-sm">
                  <div className="w-12 h-12 bg-gold-500/20 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-gold-500" />
                  </div>
                  <div>
                    <p className="text-charcoal-400 text-sm">Business Hours</p>
                    <p className="text-white font-medium">
                      Mon-Sat 9:00 AM - 6:00 PM (GMT+8)
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gold-500/10 border border-gold-500/20 rounded-sm">
                <p className="text-gold-500 text-sm">
                  <strong>Factory Visits Welcome</strong><br />
                  Contact us to arrange a visit. We can pick you up from Guangzhou airport or train station.
                </p>
              </div>
            </div>

            {/* Inquiry Form */}
            <div className="lg:col-span-2">
              <div className="bg-charcoal-900 border border-charcoal-700 rounded-sm p-8">
                <h2 className="text-2xl font-display font-bold text-white mb-6">
                  Send an Inquiry
                </h2>

                {status === 'success' ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Inquiry Submitted!
                    </h3>
                    <p className="text-charcoal-400 mb-6">
                      Thank you for your inquiry. We'll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="btn-outline"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-charcoal-300 mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          className="input-field"
                          value={formData.name}
                          onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="John Smith"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-charcoal-300 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          required
                          className="input-field"
                          value={formData.email}
                          onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-charcoal-300 mb-2">
                          WhatsApp / Phone *
                        </label>
                        <input
                          type="tel"
                          required
                          className="input-field"
                          value={formData.phone}
                          onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="+966 50 123 4567"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-charcoal-300 mb-2">
                          Country *
                        </label>
                        <select
                          required
                          className="input-field"
                          value={formData.country}
                          onChange={e => setFormData(prev => ({ ...prev, country: e.target.value }))}
                        >
                          <option value="">Select country</option>
                          {COUNTRIES.map(country => (
                            <option key={country} value={country}>{country}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charcoal-300 mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        className="input-field"
                        value={formData.company}
                        onChange={e => setFormData(prev => ({ ...prev, company: e.target.value }))}
                        placeholder="Your Company Ltd."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charcoal-300 mb-2">
                        Products Interested In *
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {[
                          'Mabkhara & Incense Burners',
                          'Serving Trays & Fruit Plates',
                          'Islamic Gift Sets',
                          'Custom/Other',
                        ].map(product => (
                          <button
                            key={product}
                            type="button"
                            onClick={() => handleProductToggle(product)}
                            className={`px-4 py-2 rounded-sm text-sm transition-colors ${
                              formData.products.includes(product)
                                ? 'bg-gold-500 text-charcoal-900'
                                : 'bg-charcoal-800 text-charcoal-300 border border-charcoal-600 hover:border-gold-500'
                            }`}
                          >
                            {product}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charcoal-300 mb-2">
                        Estimated Quantity
                      </label>
                      <input
                        type="text"
                        className="input-field"
                        value={formData.quantity}
                        onChange={e => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
                        placeholder="e.g., 500 pcs, 1 container"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charcoal-300 mb-2">
                        Message *
                      </label>
                      <textarea
                        required
                        rows={4}
                        className="input-field resize-none"
                        value={formData.message}
                        onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        placeholder="Tell us about your requirements, specific products, customization needs, etc."
                      />
                    </div>

                    {status === 'error' && (
                      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-sm text-red-400 text-sm">
                        {errorMessage}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'loading' || formData.products.length === 0}
                      className="btn-gold w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === 'loading' ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Submit Inquiry
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
