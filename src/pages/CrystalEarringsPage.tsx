import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ProductCard, ProductCardSkeleton } from '../components/product/ProductCard';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../contexts/CartContext';
import { ShoppingBag, Heart, Check, Package, RefreshCw, Shield, Truck } from 'lucide-react';
import { cn } from '../lib/utils';

const productImages = [
  '/images/a8972a1751490d1556ac6726046d9c25.jpg',
  '/images/a16bddb040b8aebb913bb13fb3141a0e.jpg',
];

const product = {
  id: 'crystal-heart-earrings',
  name: 'YY002 | 双心水晶耳坠',
  nameEn: 'Crystal Double Heart Drop Earrings',
  price: 52800, // ¥528
  priceDisplay: '$528',
  sku: 'YY002',
  description: '这款精致的双心水晶耳坠，采用独特的"石中石"设计理念。每一个透明水晶中心镶嵌着粉色与绿色心形宝石，形成"心中有心"的视觉效果。左右耳坠采用不对称设计，一侧上粉下绿，一侧上绿下粉，增添灵动时尚感。搭配18K金色镀金底座，优雅而不失活泼。',
  material: '合金镀18K金 + 天然白水晶 + 粉绿碧玺',
  colors: '透明、粉色、绿色、玫瑰金',
  style: '双层心形吊坠设计',
  size: '约 35-45mm',
  packaging: '精美礼盒包装，适合送礼',
  images: productImages,
  featured: true,
};

export function CrystalEarringsPage() {
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
      stone_type: '水晶心形',
      size: '35-45mm',
      length: '多尺寸',
      stock: 15,
      featured: true,
      created_at: new Date().toISOString(),
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 4);

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
                精选单品
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
                <span className="w-28 text-[#6B7280]">宝石颜色</span>
                <span className="text-[#1A1A1A]">{product.colors}</span>
              </div>
              <div className="flex py-3 border-b border-[#E8E8E6]">
                <span className="w-28 text-[#6B7280]">设计风格</span>
                <span className="text-[#1A1A1A]">{product.style}</span>
              </div>
              <div className="flex py-3 border-b border-[#E8E8E6]">
                <span className="w-28 text-[#6B7280]">耳坠长度</span>
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
                { icon: Shield, text: '防过敏处理' },
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
                1年品质保证
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
