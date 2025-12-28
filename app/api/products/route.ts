import { NextRequest, NextResponse } from 'next/server';
import { 
  getProducts, 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct,
  getProductsByCategory,
  getFeaturedProducts 
} from '@/lib/db';

// GET - List products
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');

    // Get single product
    if (id) {
      const product = await getProductById(id);
      if (!product) {
        return NextResponse.json(
          { success: false, error: 'Product not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: product });
    }

    // Get featured products
    if (featured === 'true') {
      const products = await getFeaturedProducts();
      return NextResponse.json({ success: true, data: products });
    }

    // Get products by category
    if (category) {
      const validCategories = ['mabkhara', 'fruit-trays', 'gift-sets'];
      if (!validCategories.includes(category)) {
        return NextResponse.json(
          { success: false, error: 'Invalid category' },
          { status: 400 }
        );
      }
      const products = await getProductsByCategory(category as any);
      return NextResponse.json({ success: true, data: products });
    }

    // Get all products
    const products = await getProducts();
    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// POST - Create product (admin)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { name, description, category } = body;
    
    if (!name || !description || !category) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const product = await createProduct({
      name,
      nameAr: body.nameAr || '',
      description,
      descriptionAr: body.descriptionAr || '',
      category,
      images: body.images || [],
      specifications: body.specifications || {},
      priceRange: body.priceRange || '',
      featured: body.featured || false,
      active: body.active !== false,
      order: body.order || 0,
    });

    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    );
  }
}

// PATCH - Update product (admin)
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Product ID required' },
        { status: 400 }
      );
    }

    const product = await updateProduct(id, updates);

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

// DELETE - Delete product (admin)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Product ID required' },
        { status: 400 }
      );
    }

    const success = await deleteProduct(id);

    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
