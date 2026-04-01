import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { formatCurrency } from '../../lib/utils';
import { useCart } from '../../contexts/CartContext';
import { ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className="group block bg-white rounded-sm overflow-hidden transition-all duration-500 hover:shadow-xl"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#FAFAF8]">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Crystal+Bracelet';
          }}
        />

        {/* Quick Add Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

        {/* Quick Add Button */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-4 right-4 p-3 bg-white rounded-full shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-[#C9A86C] hover:text-white"
          title="加入购物车"
        >
          <ShoppingBag className="w-5 h-5" />
        </button>

        {/* Featured Badge */}
        {product.featured && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-[#C9A86C] text-white text-xs font-medium rounded">
            精选
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-medium text-[#1A1A1A] group-hover:text-[#C9A86C] transition-colors line-clamp-1">
            {product.name}
          </h3>
        </div>

        <p className="text-xs text-[#6B7280]">{product.stone_type}</p>

        <div className="flex items-center justify-between pt-2">
          <span className="text-lg font-medium text-[#2C3E50]">
            {formatCurrency(product.price)}
          </span>
          <span className="text-xs text-[#9CA3AF]">
            {product.stock > 0 ? '有货' : '缺货'}
          </span>
        </div>
      </div>
    </Link>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-sm overflow-hidden">
      <div className="aspect-[4/3] bg-[#E8E8E6] animate-pulse" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-[#E8E8E6] rounded animate-pulse w-3/4" />
        <div className="h-3 bg-[#E8E8E6] rounded animate-pulse w-1/2" />
        <div className="h-5 bg-[#E8E8E6] rounded animate-pulse w-1/3" />
      </div>
    </div>
  );
}
