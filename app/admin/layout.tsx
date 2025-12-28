'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, Package, MessageSquare, Settings, 
  LogOut, Menu, X, ChevronRight 
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Inquiries', href: '/admin/inquiries', icon: MessageSquare },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    // Check if already authenticated
    const auth = sessionStorage.getItem('admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Simple password check (in production, use proper auth)
    if (password === 'arabgold2025') {
      sessionStorage.setItem('admin_auth', 'true');
      setIsAuthenticated(true);
    } else {
      setError('Invalid password');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    setIsAuthenticated(false);
    setPassword('');
  };

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-charcoal-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-display font-bold">
              <span className="text-gold-500">ARAB</span>
              <span className="text-white">GOLD</span>
            </h1>
            <p className="text-charcoal-400 mt-2">Admin Panel</p>
          </div>
          
          <form onSubmit={handleLogin} className="bg-charcoal-800 border border-charcoal-700 rounded-sm p-8">
            <div className="mb-6">
              <label className="block text-sm font-medium text-charcoal-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="Enter admin password"
                required
              />
            </div>
            
            {error && (
              <p className="text-red-500 text-sm mb-4">{error}</p>
            )}
            
            <button type="submit" className="btn-gold w-full">
              Login
            </button>
          </form>
          
          <p className="text-charcoal-500 text-sm text-center mt-4">
            Default password: arabgold2025
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal-900">
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-charcoal-800 border border-charcoal-700 rounded-sm"
      >
        {sidebarOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-charcoal-800 border-r border-charcoal-700
        transform transition-transform duration-200 lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center px-6 border-b border-charcoal-700">
            <Link href="/admin" className="text-xl font-display font-bold">
              <span className="text-gold-500">ARAB</span>
              <span className="text-white">GOLD</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== '/admin' && pathname.startsWith(item.href));
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-sm transition-colors
                    ${isActive 
                      ? 'bg-gold-500/10 text-gold-500' 
                      : 'text-charcoal-300 hover:bg-charcoal-700 hover:text-white'
                    }
                  `}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                  {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-charcoal-700">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 w-full text-charcoal-400 hover:text-red-500 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-30 bg-black/50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="lg:ml-64 min-h-screen">
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
