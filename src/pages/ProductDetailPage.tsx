import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProduct } from '../hooks/useProducts';
import { ProductCard, ProductCardSkeleton } from '../components/product/ProductCard';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../contexts/CartContext';
import { formatCurrency } from '../lib/utils';
import { Button } from '../components/ui/Button';
import { ShoppingBag, Heart, ChevronLeft, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { isCustomProduct, getCustomProduct } from '../data/customProducts';

// Custom product pages mapping
const customProductRoutes: Record<string, string> = {
  'rainbow-crystal-set': '/products/rainbow-crystal-set',
  'crystal-heart-earrings': '/products/crystal-heart-earrings',
  'geometric-crystal-earrings': '/products/geometric-crystal-earrings',
};

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { product: dbProduct, loading } = useProduct(id || '');
  const { products, loading: productsLoading } = useProducts();
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [added, setAdded] = useState(false);

  // Redirect to custom product page if applicable
  useEffect(() => {
    if (id && isCustomProduct(id) && customProductRoutes[id]) {
      navigate(customProductRoutes[id], { replace: true });
    }
  }, [id, navigate]);

  const product = dbProduct;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] pt-20 sm:pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="aspect-square bg-[#E8E8E6] animate-pulse rounded-lg" />
            <div className="space-y-4">
              <div className="h-8 bg-[#E8E8E6] animate-pulse rounded w-3/4" />
              <div className="h-6 bg-[#E8E8E6] animate-pulse rounded w-1/4" />
              <div className="h-32 bg-[#E8E8E6] animate-pulse rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] pt-20 sm:pt-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-[#2C3E50] mb-4">产品未找到</h2>
          <Link
            to="/products"
            className="text-[#C9A86C] hover:underline"
          >
            返回产品列表
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const relatedProducts = products
    .filter((p) => p.stone_type === product.stone_type && p.id !== product.id)
    .slice(0, 4);

  const allImages = [product.image_url];

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

        {/* Product */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-sm">
              <img
                src={allImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/600x600?text=Crystal+Bracelet';
                }}
              />
            </div>
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              {product.featured && (
                <span className="inline-block px-3 py-1 bg-[#C9A86C] text-white text-xs font-medium rounded mb-4">
                  精选
                </span>
              )}
              <h1 className="text-3xl sm:text-4xl font-light text-[#2C3E50]">
                {product.name}
              </h1>
            </div>

            <div className="text-3xl font-medium text-[#2C3E50]">
              {formatCurrency(product.price)}
            </div>

            {/* Details */}
            <div className="space-y-3 py-6 border-y border-[#E8E8E6]">
              <div className="flex">
                <span className="w-20 text-[#6B7280]">材质</span>
                <span className="text-[#1A1A1A]">{product.stone_type}</span>
              </div>
              <div className="flex">
                <span className="w-20 text-[#6B7280]">尺寸</span>
                <span className="text-[#1A1A1A]">{product.size}</span>
              </div>
              <div className="flex">
                <span className="w-20 text-[#6B7280]">长度</span>
                <span className="text-[#1A1A1A]">{product.length}</span>
              </div>
              <div className="flex">
                <span className="w-20 text-[#6B7280]">库存</span>
                <span className={`${product.stock > 0 ? 'text-[#4A7C59]' : 'text-[#9B4D4D]'}`}>
                  {product.stock > 0 ? `有货 (${product.stock}件)` : '缺货'}
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-sm font-medium text-[#1A1A1A] mb-2">产品描述</h3>
              <p className="text-[#6B7280] leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <Button
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
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
                className="p-4 border border-[#E8E8E6] rounded hover:border-[#9B4D4D] hover:text-[#9B4D4D] transition-colors"
                title="收藏"
              >
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-[#E8E8E6]">
            <h2 className="text-2xl font-light text-[#2C3E50] mb-8">相关产品</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {productsLoading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <ProductCardSkeleton key={i} />
                  ))
                : relatedProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
