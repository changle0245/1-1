import { NextRequest, NextResponse } from 'next/server';
import { createInquiry, getInquiries, updateInquiry, deleteInquiry } from '@/lib/db';

// GET - List all inquiries (for admin)
export async function GET(request: NextRequest) {
  try {
    const inquiries = await getInquiries();
    return NextResponse.json({ success: true, data: inquiries });
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch inquiries' },
      { status: 500 }
    );
  }
}

// POST - Create new inquiry (public)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { name, email, phone, country, products, message } = body;
    
    if (!name || !email || !phone || !country || !products?.length || !message) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create inquiry
    const inquiry = await createInquiry({
      name,
      email,
      phone,
      country,
      company: body.company || '',
      products,
      quantity: body.quantity || '',
      message,
    });

    // TODO: Send email notification
    // await sendEmailNotification(inquiry);

    return NextResponse.json({ success: true, data: inquiry });
  } catch (error) {
    console.error('Error creating inquiry:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create inquiry' },
      { status: 500 }
    );
  }
}

// PATCH - Update inquiry status (admin)
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Inquiry ID required' },
        { status: 400 }
      );
    }

    const inquiry = await updateInquiry(id, updates);

    if (!inquiry) {
      return NextResponse.json(
        { success: false, error: 'Inquiry not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: inquiry });
  } catch (error) {
    console.error('Error updating inquiry:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update inquiry' },
      { status: 500 }
    );
  }
}

// DELETE - Delete inquiry (admin)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Inquiry ID required' },
        { status: 400 }
      );
    }

    const success = await deleteInquiry(id);

    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Inquiry not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting inquiry:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete inquiry' },
      { status: 500 }
    );
  }
}
