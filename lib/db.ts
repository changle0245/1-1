import { kv } from '@vercel/kv';
import { Product, Inquiry, PageContent } from './types';

// Keys for KV storage
const KEYS = {
  PRODUCTS: 'products',
  INQUIRIES: 'inquiries',
  CONTENT: 'content',
  ADMIN_PASSWORD: 'admin_password',
};

// ==================== Products ====================

export async function getProducts(): Promise<Product[]> {
  try {
    const products = await kv.get<Product[]>(KEYS.PRODUCTS);
    return products || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find(p => p.id === id) || null;
}

export async function getProductsByCategory(category: Product['category']): Promise<Product[]> {
  const products = await getProducts();
  return products
    .filter(p => p.category === category && p.active)
    .sort((a, b) => a.order - b.order);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await getProducts();
  return products
    .filter(p => p.featured && p.active)
    .sort((a, b) => a.order - b.order)
    .slice(0, 6);
}

export async function createProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
  const products = await getProducts();
  
  const newProduct: Product = {
    ...product,
    id: generateId(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  products.push(newProduct);
  await kv.set(KEYS.PRODUCTS, products);
  
  return newProduct;
}

export async function updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
  const products = await getProducts();
  const index = products.findIndex(p => p.id === id);
  
  if (index === -1) return null;
  
  products[index] = {
    ...products[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  
  await kv.set(KEYS.PRODUCTS, products);
  return products[index];
}

export async function deleteProduct(id: string): Promise<boolean> {
  const products = await getProducts();
  const filtered = products.filter(p => p.id !== id);
  
  if (filtered.length === products.length) return false;
  
  await kv.set(KEYS.PRODUCTS, filtered);
  return true;
}

// ==================== Inquiries ====================

export async function getInquiries(): Promise<Inquiry[]> {
  try {
    const inquiries = await kv.get<Inquiry[]>(KEYS.INQUIRIES);
    return inquiries || [];
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return [];
  }
}

export async function getInquiryById(id: string): Promise<Inquiry | null> {
  const inquiries = await getInquiries();
  return inquiries.find(i => i.id === id) || null;
}

export async function createInquiry(inquiry: Omit<Inquiry, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Promise<Inquiry> {
  const inquiries = await getInquiries();
  
  const newInquiry: Inquiry = {
    ...inquiry,
    id: generateId(),
    status: 'new',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  inquiries.unshift(newInquiry); // Add to beginning
  await kv.set(KEYS.INQUIRIES, inquiries);
  
  return newInquiry;
}

export async function updateInquiry(id: string, updates: Partial<Inquiry>): Promise<Inquiry | null> {
  const inquiries = await getInquiries();
  const index = inquiries.findIndex(i => i.id === id);
  
  if (index === -1) return null;
  
  inquiries[index] = {
    ...inquiries[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  
  await kv.set(KEYS.INQUIRIES, inquiries);
  return inquiries[index];
}

export async function deleteInquiry(id: string): Promise<boolean> {
  const inquiries = await getInquiries();
  const filtered = inquiries.filter(i => i.id !== id);
  
  if (filtered.length === inquiries.length) return false;
  
  await kv.set(KEYS.INQUIRIES, filtered);
  return true;
}

// ==================== Content ====================

export async function getContent(): Promise<PageContent | null> {
  try {
    return await kv.get<PageContent>(KEYS.CONTENT);
  } catch (error) {
    console.error('Error fetching content:', error);
    return null;
  }
}

export async function updateContent(content: PageContent): Promise<PageContent> {
  await kv.set(KEYS.CONTENT, content);
  return content;
}

// ==================== Auth ====================

export async function verifyAdminPassword(password: string): Promise<boolean> {
  const storedPassword = await kv.get<string>(KEYS.ADMIN_PASSWORD);
  // Default password if not set
  if (!storedPassword) {
    return password === 'arabgold2025';
  }
  return password === storedPassword;
}

export async function setAdminPassword(password: string): Promise<void> {
  await kv.set(KEYS.ADMIN_PASSWORD, password);
}

// ==================== Utilities ====================

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Initialize with demo data if empty
export async function initializeDemoData(): Promise<void> {
  const products = await getProducts();
  
  if (products.length === 0) {
    const demoProducts: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>[] = [
      {
        name: 'Grand Floor-Standing Mabkhara',
        nameAr: 'مبخرة أرضية كبيرة',
        description: 'Luxurious 100cm tall floor-standing incense burner with intricate gold lattice design. Perfect for hotel lobbies, wedding halls, and luxury homes.',
        descriptionAr: 'مبخرة أرضية فاخرة بارتفاع 100 سم مع تصميم شبكي ذهبي معقد',
        category: 'mabkhara',
        images: ['/images/products/mabkhara-floor-1.jpg'],
        specifications: {
          material: 'Iron with Gold Electroplating',
          size: '100cm Height x 25cm Base',
          weight: '8kg',
          color: 'Gold/Black',
          moq: 50,
        },
        priceRange: '$45-65/pc',
        featured: true,
        active: true,
        order: 1,
      },
      {
        name: 'Rotating 6-Bowl Fruit Tray',
        nameAr: 'صينية فاكهة دوارة 6 أوعية',
        description: 'Elegant rotating serving tray with 6 heart-shaped glass bowls. Gold-plated iron frame with crystal accents.',
        descriptionAr: 'صينية تقديم دوارة أنيقة مع 6 أوعية زجاجية على شكل قلب',
        category: 'fruit-trays',
        images: ['/images/products/tray-rotating-1.jpg'],
        specifications: {
          material: 'Iron Frame + Glass Bowls',
          size: '40cm Diameter x 35cm Height',
          weight: '3.5kg',
          color: 'Gold',
          moq: 50,
        },
        priceRange: '$25-35/pc',
        featured: true,
        active: true,
        order: 1,
      },
      {
        name: 'Luxury Bakhoor Gift Set',
        nameAr: 'مجموعة هدايا البخور الفاخرة',
        description: 'Complete 5-piece gift set including mabkhara, perfume holder, rosewater sprayer, and mirror tray. Perfect for weddings.',
        descriptionAr: 'مجموعة هدايا كاملة من 5 قطع تشمل المبخرة وحامل العطر ورشاش ماء الورد',
        category: 'gift-sets',
        images: ['/images/products/gift-set-1.jpg'],
        specifications: {
          material: 'Mixed - Iron, Glass, Crystal',
          size: 'Tray: 35x25cm',
          weight: '4kg',
          color: 'Gold with Crystal',
          moq: 30,
        },
        priceRange: '$55-75/set',
        featured: true,
        active: true,
        order: 1,
      },
    ];

    for (const product of demoProducts) {
      await createProduct(product);
    }
  }
}
