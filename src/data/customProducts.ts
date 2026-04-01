import { Product } from '../types';

// Custom product images that need local paths
// Serial numbers: YY001, YY002, YY003...
export const customProducts: Product[] = [
  {
    id: 'rainbow-crystal-set',
    name: 'YY001 | 彩虹水晶项链套装',
    description: '这款惊艳的彩虹水晶项链套装，采用施华洛世奇风格的高品质多面水晶精制而成。玫瑰金镀金底座搭配彩虹色系水晶，包括紫水晶的浪漫粉红、海蓝宝石的清澈蓝、祖母绿的生机绿，以及琥珀的温暖橙。配套的心形耳坠与项链完美呼应。',
    price: 68800,
    image_url: '/images/a76722a1739c7eb26e7c0c0fa3ac7074.jpg',
    stone_type: '彩虹水晶',
    size: '多尺寸',
    length: '40cm',
    stock: 10,
    featured: true,
    created_at: '2024-01-15T10:00:00Z',
  },
  {
    id: 'crystal-heart-earrings',
    name: 'YY002 | 双心水晶耳坠',
    description: '这款精致的双心水晶耳坠，采用独特的"石中石"设计理念。每一个透明水晶中心镶嵌着粉色与绿色心形宝石，形成"心中有心"的视觉效果。左右耳坠采用不对称设计，增添灵动时尚感。',
    price: 52800,
    image_url: '/images/a8972a1751490d1556ac6726046d9c25.jpg',
    stone_type: '双心水晶',
    size: '35-45mm',
    length: '可调节',
    stock: 10,
    featured: true,
    created_at: '2024-01-16T10:00:00Z',
  },
  {
    id: 'geometric-crystal-earrings',
    name: 'YY003 | 几何水晶耳坠',
    description: '这款独特的几何水晶耳坠，将透明水晶与粉色宝石完美融合。采用创新的"石中石"设计，三层几何形状（正方形、长方形、水滴形）垂直串联，配以金色底座。',
    price: 42800,
    image_url: '/images/e71f4b167bcc2aec2e9f88e5fb0bce4c.jpg',
    stone_type: '几何水晶',
    size: '35-40mm',
    length: '可调节',
    stock: 10,
    featured: true,
    created_at: '2024-01-17T10:00:00Z',
  },
];

// Get all custom product IDs
export const customProductIds = customProducts.map(p => p.id);

// Check if a product ID is a custom product
export const isCustomProduct = (id: string): boolean => customProductIds.includes(id);

// Get a custom product by ID
export const getCustomProduct = (id: string): Product | undefined =>
  customProducts.find(p => p.id === id);
