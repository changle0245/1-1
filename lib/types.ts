// Product types
export interface Product {
  id: string;
  name: string;
  nameAr?: string;
  description: string;
  descriptionAr?: string;
  category: 'mabkhara' | 'fruit-trays' | 'gift-sets';
  images: string[];
  specifications: {
    material?: string;
    size?: string;
    weight?: string;
    color?: string;
    moq?: number;
    [key: string]: string | number | undefined;
  };
  priceRange?: string;
  featured: boolean;
  active: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

// Category types
export interface Category {
  id: string;
  slug: 'mabkhara' | 'fruit-trays' | 'gift-sets';
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  image: string;
  productCount: number;
}

// Inquiry types
export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  company?: string;
  products: string[];
  quantity?: string;
  message: string;
  status: 'new' | 'contacted' | 'quoted' | 'closed';
  createdAt: string;
  updatedAt: string;
  notes?: string;
}

// Page content types
export interface PageContent {
  hero: {
    title: string;
    subtitle: string;
    description: string;
  };
  stats: {
    moq: string;
    leadTime: string;
    countries: string;
    service: string;
  };
  about: {
    title: string;
    description: string;
    features: {
      icon: string;
      title: string;
      description: string;
    }[];
  };
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Admin auth
export interface AdminUser {
  username: string;
  role: 'admin' | 'editor';
}

// Form data types
export interface InquiryFormData {
  name: string;
  email: string;
  phone: string;
  country: string;
  company?: string;
  products: string[];
  quantity?: string;
  message: string;
}

export interface ProductFormData {
  name: string;
  nameAr?: string;
  description: string;
  descriptionAr?: string;
  category: Product['category'];
  specifications: Product['specifications'];
  priceRange?: string;
  featured: boolean;
  active: boolean;
}

// Navigation
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

// Country list for forms
export const COUNTRIES = [
  'Saudi Arabia',
  'United Arab Emirates',
  'Kuwait',
  'Qatar',
  'Bahrain',
  'Oman',
  'Iraq',
  'Jordan',
  'Egypt',
  'Morocco',
  'Algeria',
  'Tunisia',
  'Libya',
  'Turkey',
  'Pakistan',
  'United Kingdom',
  'Germany',
  'France',
  'United States',
  'Canada',
  'Other',
] as const;

// Categories data
export const CATEGORIES: Category[] = [
  {
    id: '1',
    slug: 'mabkhara',
    name: 'Mabkhara & Incense Burners',
    nameAr: 'مبخرة وحوامل البخور',
    description: 'Traditional and modern incense burners for homes, hotels, and mosques. From elegant tabletop designs to grand floor-standing pieces.',
    descriptionAr: 'مباخر تقليدية وعصرية للمنازل والفنادق والمساجد',
    image: '/images/category-mabkhara.jpg',
    productCount: 0,
  },
  {
    id: '2',
    slug: 'fruit-trays',
    name: 'Serving Trays & Fruit Plates',
    nameAr: 'صواني التقديم وأطباق الفاكهة',
    description: 'Gold-plated serving trays, rotating fruit plates, and candy boxes. Perfect for Ramadan gatherings, weddings, and daily hospitality.',
    descriptionAr: 'صواني مطلية بالذهب وأطباق فاكهة دوارة وعلب حلوى',
    image: '/images/category-trays.jpg',
    productCount: 0,
  },
  {
    id: '3',
    slug: 'gift-sets',
    name: 'Islamic Gift Sets',
    nameAr: 'مجموعات الهدايا الإسلامية',
    description: 'Curated gift sets for weddings, Eid, and corporate gifting. Includes burner sets, tray combinations, and custom packaging.',
    descriptionAr: 'مجموعات هدايا منتقاة للأعراس والعيد والهدايا المؤسسية',
    image: '/images/category-gifts.jpg',
    productCount: 0,
  },
];
