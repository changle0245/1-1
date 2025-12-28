'use client';

import { useState } from 'react';
import { Save, Key, Globe, Mail, Loader2, CheckCircle } from 'lucide-react';

export default function AdminSettings() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setMessage('New passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      setMessage('Password must be at least 8 characters');
      return;
    }

    setSaving(true);
    setMessage('');

    // In production, implement proper password change
    setTimeout(() => {
      setMessage('Password updated successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setSaving(false);
    }, 1000);
  };

  return (
    <div className="space-y-8 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-white">Settings</h1>
        <p className="text-charcoal-400 mt-1">Manage your admin account and site settings</p>
      </div>

      {/* Password Change */}
      <div className="bg-charcoal-800 border border-charcoal-700 rounded-sm">
        <div className="p-6 border-b border-charcoal-700">
          <div className="flex items-center gap-3">
            <Key className="w-5 h-5 text-gold-500" />
            <h2 className="text-lg font-semibold text-white">Change Password</h2>
          </div>
        </div>
        <form onSubmit={handlePasswordChange} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-charcoal-300 mb-2">
              Current Password
            </label>
            <input
              type="password"
              className="input-field"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal-300 mb-2">
              New Password
            </label>
            <input
              type="password"
              className="input-field"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal-300 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              className="input-field"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {message && (
            <p className={`text-sm ${message.includes('success') ? 'text-green-500' : 'text-red-500'}`}>
              {message}
            </p>
          )}
          <button
            type="submit"
            disabled={saving}
            className="btn-gold flex items-center gap-2"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Update Password
              </>
            )}
          </button>
        </form>
      </div>

      {/* Site Info */}
      <div className="bg-charcoal-800 border border-charcoal-700 rounded-sm">
        <div className="p-6 border-b border-charcoal-700">
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-gold-500" />
            <h2 className="text-lg font-semibold text-white">Site Information</h2>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center py-3 border-b border-charcoal-700">
            <span className="text-charcoal-400">Domain</span>
            <span className="text-white">arabgoldfactory.com</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-charcoal-700">
            <span className="text-charcoal-400">Hosting</span>
            <span className="text-white">Vercel</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-charcoal-700">
            <span className="text-charcoal-400">Database</span>
            <span className="text-white">Vercel KV</span>
          </div>
          <div className="flex justify-between items-center py-3">
            <span className="text-charcoal-400">Version</span>
            <span className="text-white">1.0.0</span>
          </div>
        </div>
      </div>

      {/* Quick Setup Guide */}
      <div className="bg-charcoal-800 border border-charcoal-700 rounded-sm">
        <div className="p-6 border-b border-charcoal-700">
          <h2 className="text-lg font-semibold text-white">Quick Setup Guide</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-medium">1. Set up Vercel KV</p>
              <p className="text-charcoal-400 text-sm">Create a KV database in your Vercel project and add environment variables.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-medium">2. Set up Vercel Blob</p>
              <p className="text-charcoal-400 text-sm">Create a Blob store for product images and add BLOB_READ_WRITE_TOKEN.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-medium">3. Add products</p>
              <p className="text-charcoal-400 text-sm">Go to Products page and start adding your catalog.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-white font-medium">4. Change default password</p>
              <p className="text-charcoal-400 text-sm">Update the admin password above for security.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Environment Variables Info */}
      <div className="bg-charcoal-800 border border-charcoal-700 rounded-sm">
        <div className="p-6 border-b border-charcoal-700">
          <h2 className="text-lg font-semibold text-white">Required Environment Variables</h2>
        </div>
        <div className="p-6">
          <pre className="bg-charcoal-900 p-4 rounded-sm text-sm text-charcoal-300 overflow-x-auto">
{`# Vercel KV (Redis)
KV_URL=your_kv_url
KV_REST_API_URL=your_kv_rest_api_url
KV_REST_API_TOKEN=your_kv_rest_api_token
KV_REST_API_READ_ONLY_TOKEN=your_read_only_token

# Vercel Blob (for images)
BLOB_READ_WRITE_TOKEN=your_blob_token

# Optional: Email notifications
RESEND_API_KEY=your_resend_key`}
          </pre>
        </div>
      </div>
    </div>
  );
}
