'use client';

import { useState, useEffect } from 'react';
import { 
  Search, Mail, Phone, MapPin, Calendar,
  Loader2, MessageSquare, X, ExternalLink
} from 'lucide-react';
import { Inquiry } from '@/lib/types';

const statusOptions = [
  { value: 'new', label: 'New', color: 'badge-green' },
  { value: 'contacted', label: 'Contacted', color: 'badge-gold' },
  { value: 'quoted', label: 'Quoted', color: 'bg-blue-500/20 text-blue-400' },
  { value: 'closed', label: 'Closed', color: 'bg-charcoal-600 text-charcoal-300' },
];

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/inquiries');
      const data = await res.json();
      setInquiries(data.data || []);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    }
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch('/api/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      const data = await res.json();
      if (data.success) {
        setInquiries(inquiries.map(i => i.id === id ? { ...i, status: status as Inquiry['status'] } : i));
        if (selectedInquiry?.id === id) setSelectedInquiry({ ...selectedInquiry, status: status as Inquiry['status'] });
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm('Delete this inquiry?')) return;
    try {
      const res = await fetch(`/api/inquiries?id=${id}`, { method: 'DELETE' });
      if ((await res.json()).success) {
        setInquiries(inquiries.filter(i => i.id !== id));
        if (selectedInquiry?.id === id) setSelectedInquiry(null);
      }
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  const filteredInquiries = inquiries.filter(i => {
    const matchesSearch = i.name.toLowerCase().includes(searchTerm.toLowerCase()) || i.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch && (!statusFilter || i.status === statusFilter);
  });

  const getStatusBadge = (status: string) => statusOptions.find(o => o.value === status)?.color || 'bg-charcoal-600';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-white">Inquiries</h1>
        <p className="text-charcoal-400 mt-1">Manage customer inquiries</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statusOptions.map(status => (
          <button key={status.value} onClick={() => setStatusFilter(statusFilter === status.value ? '' : status.value)}
            className={`p-4 rounded-sm border ${statusFilter === status.value ? 'bg-gold-500/10 border-gold-500' : 'bg-charcoal-800 border-charcoal-700'}`}>
            <p className="text-2xl font-bold text-white">{inquiries.filter(i => i.status === status.value).length}</p>
            <p className="text-charcoal-400 text-sm">{status.label}</p>
          </button>
        ))}
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-400" />
          <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="input-field pl-10" />
        </div>
      </div>

      <div className="bg-charcoal-800 border border-charcoal-700 rounded-sm">
        {loading ? (
          <div className="p-8 text-center"><Loader2 className="w-8 h-8 text-gold-500 animate-spin mx-auto" /></div>
        ) : filteredInquiries.length > 0 ? (
          <div className="divide-y divide-charcoal-700">
            {filteredInquiries.map((inquiry) => (
              <div key={inquiry.id} className="p-4 hover:bg-charcoal-700/50 cursor-pointer" onClick={() => setSelectedInquiry(inquiry)}>
                <div className="flex justify-between">
                  <div>
                    <p className="text-white font-medium">{inquiry.name} {inquiry.company && <span className="text-charcoal-500">@ {inquiry.company}</span>}</p>
                    <p className="text-charcoal-400 text-sm">{inquiry.email} · {inquiry.country}</p>
                    <p className="text-charcoal-500 text-sm mt-1">{inquiry.products.join(', ')}</p>
                  </div>
                  <div className="text-right">
                    <span className={`badge ${getStatusBadge(inquiry.status)}`}>{inquiry.status}</span>
                    <p className="text-charcoal-500 text-xs mt-2">{new Date(inquiry.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center"><MessageSquare className="w-12 h-12 text-charcoal-600 mx-auto mb-4" /><p className="text-charcoal-400">No inquiries</p></div>
        )}
      </div>

      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
          <div className="bg-charcoal-800 border border-charcoal-700 rounded-sm w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-charcoal-700 flex justify-between sticky top-0 bg-charcoal-800">
              <div><h2 className="text-xl font-semibold text-white">{selectedInquiry.name}</h2>{selectedInquiry.company && <p className="text-charcoal-400">{selectedInquiry.company}</p>}</div>
              <button onClick={() => setSelectedInquiry(null)} className="text-charcoal-400 hover:text-white"><X className="w-6 h-6" /></button>
            </div>
            <div className="p-6 space-y-6">
              <div><label className="block text-sm text-charcoal-400 mb-2">Status</label>
                <div className="flex flex-wrap gap-2">
                  {statusOptions.map(s => (
                    <button key={s.value} onClick={() => updateStatus(selectedInquiry.id, s.value)}
                      className={`px-4 py-2 rounded-sm text-sm ${selectedInquiry.status === s.value ? 'bg-gold-500 text-charcoal-900' : 'bg-charcoal-700 text-charcoal-300'}`}>{s.label}</button>
                  ))}
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 bg-charcoal-900 rounded-sm"><div className="flex items-center gap-2 text-charcoal-400 text-sm mb-1"><Mail className="w-4 h-4" />Email</div><a href={`mailto:${selectedInquiry.email}`} className="text-white hover:text-gold-500">{selectedInquiry.email}</a></div>
                <div className="p-4 bg-charcoal-900 rounded-sm"><div className="flex items-center gap-2 text-charcoal-400 text-sm mb-1"><Phone className="w-4 h-4" />WhatsApp</div><a href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, '')}`} target="_blank" className="text-white hover:text-gold-500 flex items-center gap-1">{selectedInquiry.phone}<ExternalLink className="w-3 h-3" /></a></div>
                <div className="p-4 bg-charcoal-900 rounded-sm"><div className="flex items-center gap-2 text-charcoal-400 text-sm mb-1"><MapPin className="w-4 h-4" />Country</div><p className="text-white">{selectedInquiry.country}</p></div>
                <div className="p-4 bg-charcoal-900 rounded-sm"><div className="flex items-center gap-2 text-charcoal-400 text-sm mb-1"><Calendar className="w-4 h-4" />Received</div><p className="text-white">{new Date(selectedInquiry.createdAt).toLocaleString()}</p></div>
              </div>
              <div><label className="block text-sm text-charcoal-400 mb-2">Products</label><div className="flex flex-wrap gap-2">{selectedInquiry.products.map((p, i) => <span key={i} className="px-3 py-1 bg-gold-500/10 text-gold-500 text-sm rounded-sm">{p}</span>)}</div></div>
              {selectedInquiry.quantity && <div><label className="block text-sm text-charcoal-400 mb-2">Quantity</label><p className="text-white">{selectedInquiry.quantity}</p></div>}
              <div><label className="block text-sm text-charcoal-400 mb-2">Message</label><div className="p-4 bg-charcoal-900 rounded-sm"><p className="text-charcoal-200 whitespace-pre-wrap">{selectedInquiry.message}</p></div></div>
              <div className="flex gap-4 pt-4 border-t border-charcoal-700">
                <a href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, '')}?text=Hi ${selectedInquiry.name}, thank you for your inquiry...`} target="_blank" className="btn-gold flex-1 flex items-center justify-center gap-2"><Phone className="w-5 h-5" />Reply WhatsApp</a>
                <button onClick={() => deleteInquiry(selectedInquiry.id)} className="px-4 py-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-sm">Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
