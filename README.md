# ArabGold Factory Website

Premium Arabic home decor B2B website with full CMS backend.

## 🚀 Features

### Frontend (Public)
- **Homepage** - Hero, product categories, trust signals, export markets
- **Products** - Category pages for Mabkhara, Serving Trays, Gift Sets
- **Services** - OEM/ODM manufacturing services
- **About** - Factory story and advantages
- **FAQ** - Common questions and answers
- **Contact** - Inquiry form with product selection

### Backend (Admin)
- **Dashboard** - Overview stats and recent inquiries
- **Products** - Add, edit, delete products with specifications
- **Inquiries** - View and manage customer inquiries
- **Settings** - Password change and site configuration

## 📁 Project Structure

```
arabgold-factory/
├── app/
│   ├── admin/              # Admin panel
│   │   ├── layout.tsx      # Admin layout with sidebar
│   │   ├── page.tsx        # Dashboard
│   │   ├── products/       # Product management
│   │   ├── inquiries/      # Inquiry management
│   │   └── settings/       # Settings
│   ├── api/
│   │   ├── products/       # Products API
│   │   └── inquiries/      # Inquiries API
│   ├── about/              # About page
│   ├── contact/            # Contact page
│   ├── faq/                # FAQ page
│   ├── products/           # Product pages
│   │   ├── mabkhara/
│   │   ├── fruit-trays/
│   │   └── gift-sets/
│   ├── services/           # Services page
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   └── globals.css         # Global styles
├── components/
│   ├── Header.tsx          # Navigation header
│   ├── Footer.tsx          # Footer
│   └── WhatsAppButton.tsx  # Floating WhatsApp button
├── lib/
│   ├── db.ts               # Database operations
│   └── types.ts            # TypeScript types
└── public/
    └── images/             # Static images
```

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Database**: Vercel KV (Redis)
- **File Storage**: Vercel Blob
- **Hosting**: Vercel (free tier)
- **Icons**: Lucide React

## 📦 Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Vercel Storage

1. Go to Vercel Dashboard
2. Create a KV database
3. Create a Blob store
4. Copy environment variables

### 3. Configure Environment
```bash
cp .env.example .env.local
# Fill in your values
```

### 4. Run Development Server
```bash
npm run dev
```

### 5. Deploy to Vercel
```bash
vercel deploy
```

## 🔐 Admin Access

- URL: `/admin`
- Default Password: `arabgold2025`
- **Change this immediately after first login!**

## 📝 Content Updates

### Adding Products
1. Login to admin panel
2. Go to Products
3. Click "Add Product"
4. Fill in details and save

### Managing Inquiries
1. Login to admin panel
2. Go to Inquiries
3. Click on inquiry to view details
4. Update status as needed
5. Reply via WhatsApp or email

## 🌐 SEO Keywords

- Arabic incense burner manufacturer
- Mabkhara wholesale
- Gold serving tray supplier
- Islamic gifts manufacturer
- Bakhoor burner factory

## 📱 WhatsApp Integration

WhatsApp button is configured with:
- Phone: +86 131 1582 5523
- Pre-filled messages for each product category

## 💰 Cost Breakdown

| Service | Cost |
|---------|------|
| Vercel Hosting | Free |
| Vercel KV | Free (up to 256MB) |
| Vercel Blob | Free (up to 1GB) |
| Domain | $15-50/year |
| **Total** | ~$15-50/year |

## 🔧 Customization

### Colors
Edit `tailwind.config.js` to change:
- Gold primary colors
- Charcoal background colors

### Fonts
Default fonts:
- Display: Playfair Display
- Body: Source Sans Pro
- Arabic: Noto Sans Arabic

### Logo
Replace the text logo in `Header.tsx` and `Footer.tsx` with your image.

## 📄 License

Private - ArabGold Factory
