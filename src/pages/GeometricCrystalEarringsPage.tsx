import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ProductCard, ProductCardSkeleton } from '../components/product/ProductCard';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../contexts/CartContext';
import { ShoppingBag, Heart, Check, Package, RefreshCw, Shield, Truck } from 'lucide-react';
import { cn } from '../lib/utils';

const productImages = [
  '/images/e71f4b167bcc2aec2e9f88e5fb0bce4c.jpg',
  '/images/e96aa71e70eb0ba3c4cf98d88adf446d.jpg',
];

const product = {
  id: 'geometric-crystal-earrings',
  name: 'YY003 | 几何水晶耳坠',
  nameEn: 'Geometric Stone-in-Stone Crystal Earrings',
  price: 42800, // $428 in cents
  priceDisplay: '$428',
  sku: 'YY003',
  description: '这款独特的几何水晶耳坠，将透明水晶与粉色宝石完美融合。采用创新的"石中石"设计，内部的彩色宝石仿佛悬浮在透明晶体内部，创造出深邃的立体感。三层几何形状（正方形、长方形、水滴形）垂直串联，配以金色底座，呈现出兼具艺术感与时尚感的视觉效果。',
  material: '合金镀18K金 + 天然白水晶 + 粉色碧玺',
  colors: '透明、粉色、玫瑰金',
  size: '约 35-40mm 长度',
  packaging: '精美礼盒包装，适合送礼',
  images: productImages,
  featured: true,
};

export function GeometricCrystalEarringsPage() {
  const { products, loading: productsLoading } = useProducts();
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      image_url: product.images[0],
      stone_type: '几何水晶',
      size: '35-40mm',
      length: '可调节',
      stock: 10,
      featured: true,
      created_at: new Date().toISOString(),
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const relatedProducts = products.filter(p => p.id !== 'geometric-crystal-earrings').slice(0, 4);

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-20 sm:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-[#6B7280] mb-8">
          <Link to="/" className="hover:text-[#C9A86C]">首页</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-[#C9A86C]">产品</Link>
          <span className="mx-2">/</span>
          <span className="text-[#1A1A1A]">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-sm">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={cn(
                    'aspect-square bg-white rounded-lg overflow-hidden border-2 transition-all',
                    selectedImage === index
                      ? 'border-[#C9A86C] shadow-md'
                      : 'border-transparent hover:border-[#E8E8E6]'
                  )}
                >
                  <img
                    src={img}
                    alt={`产品图 ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <span className="inline-block px-3 py-1 bg-[#C9A86C] text-white text-xs font-medium rounded mb-4">
                设计师系列
              </span>
              <h1 className="text-3xl sm:text-4xl font-light text-[#2C3E50]">
                {product.name}
              </h1>
              <p className="text-[#6B7280] mt-1">{product.nameEn}</p>
            </div>

            <div className="text-3xl font-medium text-[#2C3E50]">
              {product.priceDisplay}
            </div>

            {/* Description */}
            <div className="py-6 border-y border-[#E8E8E6]">
              <h3 className="text-sm font-medium text-[#1A1A1A] mb-2 uppercase tracking-wider">产品描述</h3>
              <p className="text-[#6B7280] leading-relaxed">{product.description}</p>
            </div>

            {/* Details */}
            <div className="space-y-3">
              <div className="flex py-3 border-b border-[#E8E8E6]">
                <span className="w-28 text-[#6B7280]">材质</span>
                <span className="text-[#1A1A1A]">{product.material}</span>
              </div>
              <div className="flex py-3 border-b border-[#E8E8E6]">
                <span className="w-28 text-[#6B7280]">水晶颜色</span>
                <span className="text-[#1A1A1A]">{product.colors}</span>
              </div>
              <div className="flex py-3 border-b border-[#E8E8E6]">
                <span className="w-28 text-[#6B7280]">尺寸</span>
                <span className="text-[#1A1A1A]">{product.size}</span>
              </div>
              <div className="flex py-3">
                <span className="w-28 text-[#6B7280]">包装</span>
                <span className="text-[#1A1A1A]">{product.packaging}</span>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Package, text: '精美礼盒包装' },
                { icon: RefreshCw, text: '30天退换保障' },
                { icon: Shield, text: '专业防锈处理' },
                { icon: Truck, text: '全球免费运送' },
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-white rounded-lg text-sm text-[#6B7280]">
                  <feature.icon className="w-5 h-5 text-[#4A7C59]" />
                  {feature.text}
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <Button
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
              >
                {added ? (
                  <>
                    <Check className="mr-2 w-5 h-5" />
                    已添加
                  </>
                ) : (
                  <>
                    <ShoppingBag className="mr-2 w-5 h-5" />
                    加入购物车
                  </>
                )}
              </Button>
              <button
                className="p-4 border border-[#E8E8E6] rounded-lg hover:border-[#9B4D4D] hover:text-[#9B4D4D] transition-colors"
                title="收藏"
              >
                <Heart className="w-5 h-5" />
              </button>
            </div>

            {/* Shipping Info */}
            <div className="p-4 bg-white rounded-lg space-y-3">
              <div className="flex items-center gap-3 text-sm text-[#6B7280]">
                <Truck className="w-5 h-5 text-[#C9A86C]" />
                全球免费标准配送
              </div>
              <div className="flex items-center gap-3 text-sm text-[#6B7280]">
                <Shield className="w-5 h-5 text-[#C9A86C]" />
                2年品质保证
              </div>
              <div className="flex items-center gap-3 text-sm text-[#6B7280]">
                <RefreshCw className="w-5 h-5 text-[#C9A86C]" />
                30天无忧退换
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-20 pt-12 border-t border-[#E8E8E6]">
          <h2 className="text-2xl font-light text-[#2C3E50] mb-8 text-center">您可能也喜欢</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {productsLoading
              ? Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)
              : relatedProducts.map((p) => <ProductCard key={p.id} product={p} />)
            }
          </div>
        </div>
      </div>
    </div>
  );
}
