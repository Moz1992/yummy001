import { useState, useMemo } from 'react';
import { ProductCard, ProductCardSkeleton } from '../components/product/ProductCard';
import { useProducts } from '../hooks/useProducts';
import { Filter, Grid, List } from 'lucide-react';
import { cn } from '../lib/utils';
import { customProducts } from '../data/customProducts';

export function ProductsPage() {
  const { products, loading } = useProducts();

  // Merge database products with custom products
  const allProducts = useMemo(() => {
    const merged = [...products];
    customProducts.forEach(cp => {
      if (!merged.find(p => p.id === cp.id)) {
        merged.push(cp);
      }
    });
    return merged;
  }, [products]);
  const [filter, setFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const stoneTypes = useMemo(() => {
    const types = new Set(allProducts.map((p) => p.stone_type));
    return ['all', ...Array.from(types)];
  }, [allProducts]);

  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // Filter
    if (filter !== 'all') {
      result = result.filter((p) => p.stone_type === filter);
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [allProducts, filter, sortBy]);

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-20 sm:pt-24">
      {/* Header */}
      <div className="bg-white border-b border-[#E8E8E6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl sm:text-4xl font-light text-[#2C3E50] text-center">
            产品系列
          </h1>
          <p className="text-center text-[#6B7280] mt-4">
            {loading ? '加载中...' : `${allProducts.length} 件产品`}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters & Sort */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 pb-6 border-b border-[#E8E8E6]">
          {/* Filter */}
          <div className="flex items-center space-x-4 overflow-x-auto">
            <div className="flex items-center text-[#6B7280]">
              <Filter className="w-4 h-4 mr-2" />
              <span className="text-sm">筛选:</span>
            </div>
            <div className="flex space-x-2">
              {stoneTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={cn(
                    'px-4 py-1.5 text-sm rounded-full border transition-colors whitespace-nowrap',
                    filter === type
                      ? 'bg-[#2C3E50] text-white border-[#2C3E50]'
                      : 'border-[#E8E8E6] text-[#6B7280] hover:border-[#2C3E50]'
                  )}
                >
                  {type === 'all' ? '全部' : type}
                </button>
              ))}
            </div>
          </div>

          {/* Sort & View */}
          <div className="flex items-center space-x-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 text-sm border border-[#E8E8E6] rounded bg-white text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#C9A86C]"
            >
              <option value="featured">精选</option>
              <option value="price-low">价格: 低到高</option>
              <option value="price-high">价格: 高到低</option>
              <option value="newest">最新</option>
            </select>

            <div className="hidden sm:flex border border-[#E8E8E6] rounded overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  'p-2 transition-colors',
                  viewMode === 'grid' ? 'bg-[#2C3E50] text-white' : 'bg-white text-[#6B7280]'
                )}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  'p-2 transition-colors',
                  viewMode === 'list' ? 'bg-[#2C3E50] text-white' : 'bg-white text-[#6B7280]'
                )}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div
            className={cn(
              'grid gap-6 lg:gap-8',
              viewMode === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                : 'grid-cols-1'
            )}
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#6B7280]">没有找到符合条件的产品</p>
          </div>
        ) : (
          <div
            className={cn(
              'grid gap-6 lg:gap-8 transition-all',
              viewMode === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                : 'grid-cols-1'
            )}
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
