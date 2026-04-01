import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://nexvpdztcsuoeuwizyhk.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5leHZwZHp0Y3N1b2V1d2l6eWhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ5NjYxMTgsImV4cCI6MjA5MDU0MjExOH0.y0UoJmKsKmpoafxbs4UQ1QSZx3zAzQTkzmlji3gvsBQ";

const supabase = createClient(supabaseUrl, supabaseKey);

const products = [
  {
    id: 'rainbow-crystal-set',
    name: '彩虹水晶项链套装',
    name_en: 'Rainbow Crystal Bib Necklace Set',
    description: '这款惊艳的彩虹水晶项链套装，采用施华洛世奇风格的高品质多面水晶精制而成。玫瑰金镀金底座搭配彩虹色系水晶，包括紫水晶的浪漫粉红、海蓝宝石的清澈蓝、祖母绿的生机绿，以及琥珀的温暖橙。配套的心形耳坠与项链完美呼应。',
    price: 68800,
    image_url: '/images/a76722a1739c7eb26e7c0c0fa3ac7074.jpg',
    stone_type: '彩虹水晶',
    size: '多尺寸',
    length: '40cm',
    stock: 10,
    featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'crystal-heart-earrings',
    name: '双心水晶耳坠',
    name_en: 'Crystal Double Heart Drop Earrings',
    description: '这款优雅的双心水晶耳坠，采用独特的"石中石"设计，透明水晶包裹着粉色与绿色心形宝石，配以18K金色镀金底座，呈现出梦幻而精致的视觉效果。',
    price: 52800,
    image_url: '/images/bc679a9fb4351368e72ac8a48f5cfeb3.jpg',
    stone_type: '双心水晶',
    size: '12-15mm',
    length: '可调节',
    stock: 10,
    featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'geometric-crystal-earrings',
    name: '几何水晶耳坠',
    name_en: 'Geometric Stone-in-Stone Crystal Earrings',
    description: '这款独特的几何水晶耳坠，将透明水晶与粉色宝石完美融合。采用创新的"石中石"设计，三层几何形状（正方形、长方形、水滴形）垂直串联，配以金色底座。',
    price: 42800,
    image_url: '/images/e71f4b167bcc2aec2e9f88e5fb0bce4c.jpg',
    stone_type: '几何水晶',
    size: '35-40mm',
    length: '可调节',
    stock: 10,
    featured: true,
    created_at: new Date().toISOString(),
  },
];

async function addProducts() {
  console.log('Adding products to database...');

  for (const product of products) {
    const { data, error } = await supabase
      .from('products')
      .upsert(product, { onConflict: 'id' })
      .select();

    if (error) {
      console.error(`Error adding ${product.name}:`, error.message);
    } else {
      console.log(`Added/Updated: ${product.name}`);
    }
  }

  console.log('Done!');
}

addProducts();
