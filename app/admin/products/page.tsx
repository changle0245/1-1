'use client';

import { useState, useEffect } from 'react';
import { 
  Plus, Search, Edit2, Trash2, Eye, EyeOff, Star, 
  Loader2, Package, X, Save 
} from 'lucide-react';
import { Product } from '@/lib/types';

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    nameAr: '',
    description: '',
    descriptionAr: '',
    category: 'mabkhara' as Product['category'],
    priceRange: '',
    featured: false,
    active: true,
    specifications: {
      material: '',
      size: '',
      weight: '',
      color: '',
      moq: 50,
    },
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data.data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = '/api/products';
      const method = editingProduct ? 'PATCH' : 'POST';
      const body = editingProduct 
        ? { id: editingProduct.id, ...formData }
        : { ...formData, images: [], order: products.length };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (data.success) {
        await fetchProducts();
        closeModal();
      } else {
        alert(data.error || 'Failed to save product');
      }
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product');
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const res = await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
      const data = await res.json();

      if (data.success) {
        setProducts(products.filter(p => p.id !== id));
      } else {
        alert(data.error || 'Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

  const toggleActive = async (product: Product) => {
    try {
      const res = await fetch('/api/products', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: product.id, active: !product.active }),
      });
      const data = await res.json();

      if (data.success) {
        setProducts(products.map(p => 
          p.id === product.id ? { ...p, active: !p.active } : p
        ));
      }
    } catch (error) {
      console.error('Error toggling product:', error);
    }
  };

  const toggleFeatured = async (product: Product) => {
    try {
      const res = await fetch('/api/products', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: product.id, featured: !product.featured }),
      });
      const data = await res.json();

      if (data.success) {
        setProducts(products.map(p => 
          p.id === product.id ? { ...p, featured: !p.featured } : p
        ));
      }
    } catch (error) {
      console.error('Error toggling featured:', error);
    }
  };

  const openModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        nameAr: product.nameAr || '',
        description: product.description,
        descriptionAr: product.descriptionAr || '',
        category: product.category,
        priceRange: product.priceRange || '',
        featured: product.featured,
        active: product.active,
        specifications: {
          material: product.specifications.material || '',
          size: product.specifications.size || '',
          weight: product.specifications.weight || '',
          color: product.specifications.color || '',
          moq: product.specifications.moq || 50,
        },
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        nameAr: '',
        description: '',
        descriptionAr: '',
        category: 'mabkhara',
        priceRange: '',
        featured: false,
        active: true,
        specifications: {
          material: '',
          size: '',
          weight: '',
          color: '',
          moq: 50,
        },
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         p.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Products</h1>
          <p className="text-charcoal-400 mt-1">Manage your product catalog</p>
        </div>
        <button onClick={() => openModal()} className="btn-gold flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="input-field w-full sm:w-48"
        >
          <option value="">All Categories</option>
          <option value="mabkhara">Mabkhara</option>
          <option value="fruit-trays">Fruit Trays</option>
          <option value="gift-sets">Gift Sets</option>
        </select>
      </div>

      {/* Products Table */}
      <div className="bg-charcoal-800 border border-charcoal-700 rounded-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <Loader2 className="w-8 h-8 text-gold-500 animate-spin mx-auto" />
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-charcoal-900">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-charcoal-400">Product</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-charcoal-400">Category</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-charcoal-400">Price</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-charcoal-400">Status</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-charcoal-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal-700">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-charcoal-700/50 transition-colors">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-charcoal-700 rounded-sm flex items-center justify-center">
                          <Package className="w-6 h-6 text-charcoal-500" />
                        </div>
                        <div>
                          <p className="text-white font-medium">{product.name}</p>
                          <p className="text-charcoal-400 text-sm line-clamp-1">{product.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-charcoal-300 text-sm capitalize">
                        {product.category.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-gold-500 text-sm">
                        {product.priceRange || 'Contact'}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`badge ${product.active ? 'badge-green' : 'badge-red'}`}>
                          {product.active ? 'Active' : 'Inactive'}
                        </span>
                        {product.featured && (
                          <Star className="w-4 h-4 text-gold-500 fill-gold-500" />
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => toggleFeatured(product)}
                          className={`p-2 rounded-sm transition-colors ${
                            product.featured 
                              ? 'bg-gold-500/20 text-gold-500' 
                              : 'bg-charcoal-700 text-charcoal-400 hover:text-gold-500'
                          }`}
                          title={product.featured ? 'Remove from featured' : 'Add to featured'}
                        >
                          <Star className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => toggleActive(product)}
                          className={`p-2 rounded-sm transition-colors ${
                            product.active 
                              ? 'bg-green-500/20 text-green-500' 
                              : 'bg-charcoal-700 text-charcoal-400'
                          }`}
                          title={product.active ? 'Deactivate' : 'Activate'}
                        >
                          {product.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => openModal(product)}
                          className="p-2 bg-charcoal-700 text-charcoal-400 hover:text-white rounded-sm transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-2 bg-charcoal-700 text-charcoal-400 hover:text-red-500 rounded-sm transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center">
            <Package className="w-12 h-12 text-charcoal-600 mx-auto mb-4" />
            <p className="text-charcoal-400">No products found</p>
            <button onClick={() => openModal()} className="btn-outline mt-4">
              Add your first product
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
          <div className="bg-charcoal-800 border border-charcoal-700 rounded-sm w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-charcoal-700 flex justify-between items-center sticky top-0 bg-charcoal-800">
              <h2 className="text-xl font-semibold text-white">
                {editingProduct ? 'Edit Product' : 'Add Product'}
              </h2>
              <button onClick={closeModal} className="text-charcoal-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-charcoal-300 mb-2">
                    Product Name (English) *
                  </label>
                  <input
                    type="text"
                    required
                    className="input-field"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal-300 mb-2">
                    Product Name (Arabic)
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    value={formData.nameAr}
                    onChange={(e) => setFormData({...formData, nameAr: e.target.value})}
                    dir="rtl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal-300 mb-2">
                  Description (English) *
                </label>
                <textarea
                  required
                  rows={3}
                  className="input-field resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-charcoal-300 mb-2">
                    Category *
                  </label>
                  <select
                    required
                    className="input-field"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value as Product['category']})}
                  >
                    <option value="mabkhara">Mabkhara & Incense Burners</option>
                    <option value="fruit-trays">Serving Trays & Fruit Plates</option>
                    <option value="gift-sets">Islamic Gift Sets</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal-300 mb-2">
                    Price Range
                  </label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="e.g., $25-35/pc"
                    value={formData.priceRange}
                    onChange={(e) => setFormData({...formData, priceRange: e.target.value})}
                  />
                </div>
              </div>

              <div className="border-t border-charcoal-700 pt-6">
                <h3 className="text-white font-medium mb-4">Specifications</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-charcoal-400 mb-1">Material</label>
                    <input
                      type="text"
                      className="input-field"
                      value={formData.specifications.material}
                      onChange={(e) => setFormData({
                        ...formData, 
                        specifications: {...formData.specifications, material: e.target.value}
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-charcoal-400 mb-1">Size</label>
                    <input
                      type="text"
                      className="input-field"
                      value={formData.specifications.size}
                      onChange={(e) => setFormData({
                        ...formData, 
                        specifications: {...formData.specifications, size: e.target.value}
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-charcoal-400 mb-1">Color</label>
                    <input
                      type="text"
                      className="input-field"
                      value={formData.specifications.color}
                      onChange={(e) => setFormData({
                        ...formData, 
                        specifications: {...formData.specifications, color: e.target.value}
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-charcoal-400 mb-1">MOQ</label>
                    <input
                      type="number"
                      className="input-field"
                      value={formData.specifications.moq}
                      onChange={(e) => setFormData({
                        ...formData, 
                        specifications: {...formData.specifications, moq: parseInt(e.target.value) || 50}
                      })}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.active}
                    onChange={(e) => setFormData({...formData, active: e.target.checked})}
                    className="w-4 h-4 rounded border-charcoal-600"
                  />
                  <span className="text-charcoal-300">Active</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                    className="w-4 h-4 rounded border-charcoal-600"
                  />
                  <span className="text-charcoal-300">Featured</span>
                </label>
              </div>

              <div className="flex gap-4 pt-4 border-t border-charcoal-700">
                <button
                  type="button"
                  onClick={closeModal}
                  className="btn-outline flex-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-gold flex-1 flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      Save Product
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
