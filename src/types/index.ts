// User and Auth Types
export interface User {
  id: string;
  email: string;
  name: string;
  is_admin: boolean;
  created_at: string;
}

// Product Types
export interface Product {
  id: string;
  name: string;
  name_en?: string;
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

// Cart Types
export interface CartItem {
  product: Product;
  quantity: number;
}

// Order Types
export interface OrderItem {
  product_id: string;
  product_name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  user_id: string;
  user_email?: string;
  user_name?: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shipping_address: ShippingAddress;
  payment_intent_id: string;
  created_at: string;
}

export interface ShippingAddress {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postal_code: string;
  country: string;
}

// Checkout Types
export interface CheckoutData {
  shipping: ShippingAddress;
  payment_intent_id: string;
}
