import { createClient } from '@supabase/supabase-js';
import type { Product, Order, User } from '../types';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database helper functions
export const db = {
  // Products
  async getProducts(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getProduct(id: string): Promise<Product | null> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async getFeaturedProducts(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async createProduct(product: Omit<Product, 'id' | 'created_at'>): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteProduct(id: string): Promise<void> {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // Orders
  async getOrders(): Promise<Order[]> {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getOrdersByUser(userId: string): Promise<Order[]> {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getOrder(id: string): Promise<Order | null> {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async createOrder(order: Omit<Order, 'id' | 'created_at'>): Promise<Order> {
    const { data, error } = await supabase
      .from('orders')
      .insert([order])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateOrderStatus(id: string, status: Order['status']): Promise<Order> {
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Users (Admin)
  async getUsers(): Promise<User[]> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  async getUser(id: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },
};

// Seed initial products if database is empty
export async function seedProducts() {
  const { data: existingProducts } = await supabase.from('products').select('id');

  if (existingProducts && existingProducts.length > 0) {
    return; // Products already exist
  }

  const sampleProducts: Omit<Product, 'id' | 'created_at'>[] = [
    {
      name: '紫水晶灵性手链',
      description: '精选巴西紫水晶，柔和的紫色光芒有助于冥想和心灵平静。6mm天然水晶珠，搭配925纯银配件，适合日常佩戴或冥想修行。',
      price: 88800,
      stone_type: '紫水晶',
      size: '6mm',
      length: '18cm',
      image_url: 'https://i.etsystatic.com/32770098/r/il/1e1e86/7584747411/il_fullxfull.7584747411_s9ug.jpg',
      stock: 15,
      featured: true,
    },
    {
      name: '玫瑰石英爱之链',
      description: '温柔的玫瑰石英被誉为"爱之石"，能够打开心轮，带来爱与和谐。8mm粉红水晶珠，搭配玫瑰金配件，散发浪漫气息。',
      price: 128800,
      stone_type: '玫瑰石英',
      size: '8mm',
      length: '19cm',
      image_url: 'https://m.media-amazon.com/images/I/61tkxAEOi+L._AC_UY1000_.jpg',
      stock: 12,
      featured: true,
    },
    {
      name: '透石膏清透手链',
      description: '纯净的透明石英能够放大能量，清除负能量。5mm透明水晶珠，搭配纯银珠饰，简洁大方，适合任何场合。',
      price: 68800,
      stone_type: '透石膏',
      size: '5mm',
      length: '17cm',
      image_url: 'https://i.ebayimg.com/images/g/uJMAAOSwLzhli-Kl/s-l400.jpg',
      stock: 20,
      featured: false,
    },
    {
      name: '拉长石神秘手链',
      description: '来自马达加斯加的拉长石，拥有独特的闪光效应，被誉为"月光之石"。6mm彩虹拉长石珠，搭配神秘黑曜石，彰显独特品味。',
      price: 158800,
      stone_type: '拉长石',
      size: '6mm',
      length: '18cm',
      image_url: 'https://i.etsystatic.com/20111307/r/il/300dc1/6879497099/il_570xN.6879497099_dy34.jpg',
      stock: 8,
      featured: true,
    },
    {
      name: '绿松石波西米亚手链',
      description: '古老的绿松石被视为神圣的保护石。8mm天然绿松石珠，搭配古铜色配件，营造自由奔放的波西米亚风格。',
      price: 98800,
      stone_type: '绿松石',
      size: '8mm',
      length: '20cm',
      image_url: 'https://m.media-amazon.com/images/I/51rLr2jXJNL._AC_UY1000_.jpg',
      stock: 14,
      featured: false,
    },
    {
      name: '黑曜石守护手链',
      description: '黑曜石是最强大的护身石之一，能够吸收负能量。7mm天然黑曜石珠，搭配钛金配件，沉稳大气，适合男性佩戴。',
      price: 78800,
      stone_type: '黑曜石',
      size: '7mm',
      length: '21cm',
      image_url: 'https://m.media-amazon.com/images/I/71k+9KT-gdL._AC_UY1000_.jpg',
      stock: 18,
      featured: false,
    },
    {
      name: '翡翠禅意手链',
      description: '和田碧玉质地温润细腻，被誉为"玉中之王"。10mm菠菜绿碧玉珠，搭配纯金配件，尽显东方禅意之美。',
      price: 288800,
      stone_type: '翡翠',
      size: '10mm',
      length: '20cm',
      image_url: 'https://cdn.shopify.com/s/files/1/0536/7103/5054/files/New_Product_Images_NOV25_17_600x600_crop_center.jpg?v=1763959937',
      stock: 5,
      featured: true,
    },
    {
      name: '月光石梦幻手链',
      description: '月光石拥有独特的蓝光效应，象征着直觉和想象力。6mm月光石珠，搭配纯银月牙吊坠，梦幻优雅。',
      price: 118800,
      stone_type: '月光石',
      size: '6mm',
      length: '18cm',
      image_url: 'https://cdn01.pinkoi.com/product/e7mr23fc/0/1/640x530.jpg',
      stock: 10,
      featured: false,
    },
    {
      name: '黄水晶财富手链',
      description: '黄水晶被称为"财富之石"，能够吸引财富和好运。8mm金黄水晶珠，搭配玫瑰金配件，金光灿烂，助您心想事成。',
      price: 108800,
      stone_type: '黄水晶',
      size: '8mm',
      length: '19cm',
      image_url: 'https://m.media-amazon.com/images/I/51DhUnb3z1L._AC_UY1000_.jpg',
      stock: 12,
      featured: false,
    },
    {
      name: '熔岩石芳疗手链',
      description: '天然火山熔岩石具有多孔结构，是绝佳的精油扩香石。搭配檀木珠和玫瑰金配件，既时尚又实用，适合追求健康生活的人士。',
      price: 58800,
      stone_type: '熔岩石',
      size: '8mm',
      length: '18cm',
      image_url: 'https://m.media-amazon.com/images/I/61fGr3iLKBL.jpg',
      stock: 25,
      featured: false,
    },
  ];

  for (const product of sampleProducts) {
    await db.createProduct(product);
  }
}
