---
AIGC:
    ContentProducer: Minimax Agent AI
    ContentPropagator: Minimax Agent AI
    Label: AIGC
    ProduceID: fad2f9574bc50c66deae561427dbdb2b
    PropagateID: fad2f9574bc50c66deae561427dbdb2b
    ReservedCode1: 304402203d92f779ab3511f951d05d2a33e096ae555447886a9818ffc1618f61c72832f9022045c2207970f9d06c79cc1d36a1cb87d1e494c44864534d1cbf779f64fd152f64
    ReservedCode2: 3046022100e8923344c08771ac953615e5a0e55a6eeed13f5dac4c0be783a787d60690f0c5022100e6365c74b3e067b74e90557eade221c5b8c5f243c11ab9c6c0d7c213aaee7d08
---

# ZenCrystal - 高端水晶手链禅意电商平台

## 1. Concept & Vision

ZenCrystal 是一个融合东方禅意美学与现代极简主义的高端定制水晶手链电商平台。整体体验追求"静谧、纯粹、高雅"——如同置身于一间禅意空间，让用户在浏览产品时感受到内心的平静与专注。平台强调产品摄影的视觉冲击力，通过大量留白和冷静色调营造奢华感。

## 2. Design Language

### Aesthetic Direction
灵感来源：日式枯山水、禅意花园、斯堪的纳维亚极简主义。追求"少即是多"的哲学，每一元素都经过精心考量。

### Color Palette
- **Primary**: `#2C3E50` (深蓝灰 - 代表沉稳与深邃)
- **Secondary**: `#8B7355` (檀木棕 - 自然与温暖)
- **Accent**: `#C9A86C` (金沙色 - 点睛与高贵)
- **Background**: `#FAFAF8` (月白色 - 纯净与空灵)
- **Surface**: `#FFFFFF` (纯白 - 产品展示)
- **Text Primary**: `#1A1A1A` (墨黑)
- **Text Secondary**: `#6B7280` (烟灰)
- **Border**: `#E8E8E6` (淡灰)
- **Success**: `#4A7C59` (苔绿)
- **Error**: `#9B4D4D` (朱红)

### Typography
- **Primary Font**: "Noto Serif SC" (中文衬线 - 优雅传统)
- **Secondary Font**: "Inter" (英文衬线 - 现代清晰)
- **Display**: 48-72px, font-weight: 300
- **Heading**: 32-40px, font-weight: 400
- **Body**: 16px, font-weight: 400
- **Caption**: 14px, font-weight: 400

### Spatial System
- Base unit: 8px
- Spacing scale: 8, 16, 24, 32, 48, 64, 96, 128px
- Container max-width: 1280px
- Card border-radius: 2px (minimal, almost sharp)
- Button border-radius: 2px

### Motion Philosophy
- **Entrance**: Fade in with subtle upward movement, 600ms ease-out
- **Hover**: Scale 1.02, 300ms ease-out
- **Page transitions**: Crossfade, 400ms
- **Loading states**: Gentle pulse animation
- All animations should feel calm and unhurried

### Visual Assets
- **Icons**: Lucide React (thin stroke weight)
- **Images**: 高质量产品摄影，白色/浅色背景
- **Decorative**: 极简几何线条，无多余装饰

## 3. Layout & Structure

### Page Structure

#### Homepage
```
┌─────────────────────────────────────────────────────────┐
│  [Logo]           [Products] [About] [Cart] [Account]    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│              "灵性之选 · 水晶之韵"                        │
│                                                         │
│        [Explore Collection →]                           │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│    ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐                  │
│    │     │  │     │  │     │  │     │                  │
│    │ IMG │  │ IMG │  │ IMG │  │ IMG │                  │
│    │     │  │     │  │     │  │     │                  │
│    └─────┘  └─────┘  └─────┘  └─────┘                  │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│    Philosophy Section (Zen quote + image)              │
│                                                         │
├─────────────────────────────────────────────────────────┤
│    [Footer: Contact, Social, Newsletter]                │
└─────────────────────────────────────────────────────────┘
```

#### Product Catalog Page
```
┌─────────────────────────────────────────────────────────┐
│  Header (same as homepage)                              │
├─────────────────────────────────────────────────────────┤
│  Filter: [All] [By Stone] [By Price] [By Style]         │
├─────────────────────────────────────────────────────────┤
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐   │
│  │         │  │         │  │         │  │         │   │
│  │ Product │  │ Product │  │ Product │  │ Product │   │
│  │   Card  │  │   Card  │  │   Card  │  │   Card  │   │
│  │         │  │         │  │         │  │         │   │
│  │ Name    │  │ Name    │  │ Name    │  │ Name    │   │
│  │ ¥888    │  │ ¥1288   │  │ ¥688    │  │ ¥1588   │   │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘   │
│                                                         │
│  [Load More]                                            │
└─────────────────────────────────────────────────────────┘
```

#### Product Detail Page
```
┌─────────────────────────────────────────────────────────┐
│  Header                                                 │
├─────────────────────────────────────────────────────────┤
│  ┌───────────────────────┐  ┌────────────────────────┐ │
│  │                       │  │  Crystal Name          │ │
│  │                       │  │  ¥1,288                │ │
│  │    Product Image      │  │                        │ │
│  │    (Large, zoomable)  │  │  Stone: Amethyst       │ │
│  │                       │  │  Size: 6mm beads       │ │
│  │                       │  │  Length: 18cm          │ │
│  │                       │  │                        │ │
│  │                       │  │  [Add to Cart]         │ │
│  │                       │  │                        │ │
│  │                       │  │  ─────────────────      │ │
│  │                       │  │  Description text...   │ │
│  │                       │  │                        │ │
│  └───────────────────────┘  └────────────────────────┘ │
├─────────────────────────────────────────────────────────┤
│  Related Products                                       │
└─────────────────────────────────────────────────────────┘
```

#### Cart Page
```
┌─────────────────────────────────────────────────────────┐
│  Header                                                 │
├─────────────────────────────────────────────────────────┤
│  Shopping Cart (2 items)                                │
│  ┌───────────────────────────────────────────────────┐  │
│  │ [Img] Product Name              ¥888              │  │
│  │         [−] 1 [+]    [Remove]                     │  │
│  └───────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────┐  │
│  │ [Img] Product Name              ¥1288             │  │
│  │         [−] 1 [+]    [Remove]                     │  │
│  └───────────────────────────────────────────────────┘  │
│                                                         │
│  ─────────────────────────────────────────────────────  │
│  Subtotal:                                    ¥2,176    │
│  Shipping:                                    ¥50       │
│  Total:                                       ¥2,226    │
│                                                         │
│  [Continue Shopping]            [Proceed to Checkout →] │
└─────────────────────────────────────────────────────────┘
```

#### Admin Dashboard
```
┌────────────┬────────────────────────────────────────────┐
│            │  Dashboard                                 │
│  Dashboard │  ──────────────────────────────────────── │
│  Products  │                                            │
│  Orders    │  [Stats Cards: Products, Orders, Revenue] │
│  Customers │                                            │
│            │  Recent Orders Table                       │
│  [Logout]  │  ┌────────────────────────────────────────┐│
│            │  │ Order ID | Customer | Total | Status  ││
│            │  │ ORD001   | John    | ¥2,176 | Pending  ││
│            │  └────────────────────────────────────────┘│
└────────────┴────────────────────────────────────────────┘
```

### Responsive Strategy
- Desktop: 1280px+ (4-column product grid)
- Tablet: 768px-1279px (2-column product grid)
- Mobile: <768px (1-column, simplified navigation)

## 4. Features & Interactions

### User Authentication
- **Login**: Email/password with "Remember me" option
- **Register**: Email, password, confirm password, name
- **Error handling**: Inline validation, shake animation on error
- **Success**: Smooth redirect to previous page

### Product Catalog
- **Filter by**: Stone type, price range, style
- **Sort by**: Featured, Price (low-high, high-low), Newest
- **Product card hover**: Slight scale up, show quick-add button
- **Quick view**: Modal with product details

### Shopping Cart
- **Add to cart**: Animated feedback (item flies to cart icon)
- **Update quantity**: Instant total recalculation
- **Remove item**: Slide-out animation
- **Empty state**: Zen illustration with "Your cart is empty" message

### Checkout (Stripe Integration)
- **Steps**: Shipping info → Payment → Confirmation
- **Stripe Elements**: Embedded card input
- **Loading state**: Skeleton loader during processing
- **Success**: Order confirmation with details

### Admin Dashboard
- **Products**: CRUD operations, image upload, stock management
- **Orders**: View details, update status (Pending → Processing → Shipped → Delivered)
- **Customers**: View registered users
- **Protected routes**: Only accessible with admin credentials

### Error States
- **404**: Zen garden illustration with "Page not found"
- **500**: "Something went wrong" with retry button
- **Network error**: Toast notification with retry option

## 5. Component Inventory

### Header
- Fixed position, transparent → solid on scroll
- Logo (left), navigation (center), actions (right)
- Cart icon with badge count
- Mobile: Hamburger menu

### ProductCard
- States: Default, Hover (scale + shadow), Loading (skeleton)
- Image aspect ratio: 4:3
- Name, price, quick-add button on hover

### Button
- Variants: Primary (filled), Secondary (outlined), Ghost (text only)
- States: Default, Hover, Active, Disabled, Loading
- Sizes: sm (32px), md (40px), lg (48px)

### Input
- States: Default, Focus (accent border), Error (red border + message), Disabled
- Label above, helper text below

### Modal
- Centered, backdrop blur
- Close button top-right
- Entrance: Fade + scale from 0.95

### Toast
- Position: Bottom-right
- Types: Success (green), Error (red), Info (gray)
- Auto-dismiss: 5 seconds

### CartDrawer
- Slide from right
- Product list, totals, checkout button
- Empty state when no items

### AdminSidebar
- Fixed left sidebar
- Active state: Accent background
- Collapsible on mobile

## 6. Technical Approach

### Frontend Stack
- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS (styling)
- React Router v6 (routing)
- Lucide React (icons)

### Backend (Supabase)
- **Authentication**: Supabase Auth (email/password)
- **Database**: PostgreSQL
- **Storage**: Supabase Storage (product images)
- **Real-time**: For admin order updates

### Payment (Stripe)
- Stripe Elements for card input
- Server-side: Create PaymentIntent
- Webhook: Handle payment confirmation

### Data Model

#### Products
```typescript
{
  id: string;
  name: string;
  description: string;
  price: number; // in cents
  stone_type: string;
  size: string;
  length: string;
  image_url: string;
  stock: number;
  featured: boolean;
  created_at: string;
}
```

#### Orders
```typescript
{
  id: string;
  user_id: string;
  items: JSON; // [{product_id, quantity, price}]
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  shipping_address: JSON;
  payment_intent_id: string;
  created_at: string;
}
```

#### Users
```typescript
{
  id: string;
  email: string;
  name: string;
  is_admin: boolean;
  created_at: string;
}
```

### API Endpoints
- `POST /api/create-payment-intent` - Create Stripe PaymentIntent
- `POST /api/webhook` - Stripe webhook handler
- Supabase handles: Auth, Database, Storage

### Security
- Row Level Security (RLS) on Supabase tables
- Admin-only routes protected by middleware
- Stripe webhook signature verification
