'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Package, MessageSquare, TrendingUp, Clock, ArrowRight, RefreshCw } from 'lucide-react';

interface DashboardStats {
  totalProducts: number;
  activeProducts: number;
  totalInquiries: number;
  newInquiries: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    activeProducts: 0,
    totalInquiries: 0,
    newInquiries: 0,
  });
  const [recentInquiries, setRecentInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch products
      const productsRes = await fetch('/api/products');
      const productsData = await productsRes.json();
      const products = productsData.data || [];

      // Fetch inquiries
      const inquiriesRes = await fetch('/api/inquiries');
      const inquiriesData = await inquiriesRes.json();
      const inquiries = inquiriesData.data || [];

      setStats({
        totalProducts: products.length,
        activeProducts: products.filter((p: any) => p.active).length,
        totalInquiries: inquiries.length,
        newInquiries: inquiries.filter((i: any) => i.status === 'new').length,
      });

      setRecentInquiries(inquiries.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Dashboard</h1>
          <p className="text-charcoal-400 mt-1">Welcome back to ArabGold Admin</p>
        </div>
        <button
          onClick={fetchData}
          disabled={loading}
          className="btn-outline flex items-center gap-2 py-2 px-4"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-charcoal-800 border border-charcoal-700 rounded-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-charcoal-400 text-sm">Total Products</p>
              <p className="text-3xl font-bold text-white mt-1">{stats.totalProducts}</p>
            </div>
            <div className="w-12 h-12 bg-gold-500/10 rounded-full flex items-center justify-center">
              <Package className="w-6 h-6 text-gold-500" />
            </div>
          </div>
          <div className="mt-4 text-sm text-charcoal-400">
            {stats.activeProducts} active
          </div>
        </div>

        <div className="bg-charcoal-800 border border-charcoal-700 rounded-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-charcoal-400 text-sm">Total Inquiries</p>
              <p className="text-3xl font-bold text-white mt-1">{stats.totalInquiries}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-blue-500" />
            </div>
          </div>
          <div className="mt-4 text-sm">
            <span className="text-green-500">{stats.newInquiries} new</span>
            <span className="text-charcoal-400"> pending response</span>
          </div>
        </div>

        <div className="bg-charcoal-800 border border-charcoal-700 rounded-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-charcoal-400 text-sm">Conversion Rate</p>
              <p className="text-3xl font-bold text-white mt-1">--</p>
            </div>
            <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
          </div>
          <div className="mt-4 text-sm text-charcoal-400">
            Coming soon
          </div>
        </div>

        <div className="bg-charcoal-800 border border-charcoal-700 rounded-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-charcoal-400 text-sm">Avg. Response Time</p>
              <p className="text-3xl font-bold text-white mt-1">--</p>
            </div>
            <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center">
              <Clock className="w-6 h-6 text-purple-500" />
            </div>
          </div>
          <div className="mt-4 text-sm text-charcoal-400">
            Coming soon
          </div>
        </div>
      </div>

      {/* Recent Inquiries */}
      <div className="bg-charcoal-800 border border-charcoal-700 rounded-sm">
        <div className="p-6 border-b border-charcoal-700 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-white">Recent Inquiries</h2>
          <Link href="/admin/inquiries" className="text-gold-500 text-sm hover:text-gold-400 flex items-center gap-1">
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        {recentInquiries.length > 0 ? (
          <div className="divide-y divide-charcoal-700">
            {recentInquiries.map((inquiry) => (
              <div key={inquiry.id} className="p-4 hover:bg-charcoal-700/50 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-white font-medium">{inquiry.name}</p>
                    <p className="text-charcoal-400 text-sm">{inquiry.email}</p>
                    <p className="text-charcoal-500 text-sm mt-1">
                      {inquiry.products.join(', ')}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`badge ${
                      inquiry.status === 'new' ? 'badge-green' :
                      inquiry.status === 'contacted' ? 'badge-gold' :
                      'bg-charcoal-600 text-charcoal-300'
                    }`}>
                      {inquiry.status}
                    </span>
                    <p className="text-charcoal-500 text-xs mt-1">
                      {new Date(inquiry.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-charcoal-400">
            No inquiries yet
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          href="/admin/products"
          className="p-6 bg-charcoal-800 border border-charcoal-700 rounded-sm hover:border-gold-500/50 transition-colors group"
        >
          <Package className="w-8 h-8 text-gold-500 mb-4" />
          <h3 className="text-white font-semibold group-hover:text-gold-500 transition-colors">
            Manage Products
          </h3>
          <p className="text-charcoal-400 text-sm mt-1">
            Add, edit, or remove products
          </p>
        </Link>

        <Link
          href="/admin/inquiries"
          className="p-6 bg-charcoal-800 border border-charcoal-700 rounded-sm hover:border-gold-500/50 transition-colors group"
        >
          <MessageSquare className="w-8 h-8 text-gold-500 mb-4" />
          <h3 className="text-white font-semibold group-hover:text-gold-500 transition-colors">
            View Inquiries
          </h3>
          <p className="text-charcoal-400 text-sm mt-1">
            Respond to customer inquiries
          </p>
        </Link>

        <a
          href="/"
          target="_blank"
          className="p-6 bg-charcoal-800 border border-charcoal-700 rounded-sm hover:border-gold-500/50 transition-colors group"
        >
          <TrendingUp className="w-8 h-8 text-gold-500 mb-4" />
          <h3 className="text-white font-semibold group-hover:text-gold-500 transition-colors">
            View Website
          </h3>
          <p className="text-charcoal-400 text-sm mt-1">
            See your live website
          </p>
        </a>
      </div>
    </div>
  );
}
