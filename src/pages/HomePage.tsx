import { Link } from 'react-router-dom';
import { ProductCard, ProductCardSkeleton } from '../components/product/ProductCard';
import { useFeaturedProducts } from '../hooks/useProducts';
import { ArrowRight } from 'lucide-react';

export function HomePage() {
  const { products, loading } = useFeaturedProducts();

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#FAFAF8] via-white to-[#E8E8E6]" />
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.03]"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#2C3E50" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-[#2C3E50] tracking-wide mb-6 animate-fadeInUp">
            灵性之选
            <span className="block text-[#C9A86C]">水晶之韵</span>
          </h1>
          <p className="text-lg sm:text-xl text-[#6B7280] max-w-2xl mx-auto mb-10 leading-relaxed animate-fadeInUp animation-delay-200">
            精选天然水晶，融合东方禅意与现代美学，
            <br />
            为您打造独一无二的灵性配饰
          </p>
          <Link
            to="/products"
            className="inline-flex items-center px-8 py-4 bg-[#2C3E50] text-white font-medium tracking-wide rounded hover:bg-[#34495E] hover:scale-105 transition-all duration-300 animate-fadeInUp animation-delay-400"
          >
            探索系列
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-[#C9A86C] rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-[#C9A86C] rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 sm:py-28 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-light text-[#2C3E50] mb-4">
              精选产品
            </h2>
            <div className="w-16 h-0.5 bg-[#C9A86C] mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))
              : products.slice(0, 4).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-flex items-center text-[#2C3E50] font-medium hover:text-[#C9A86C] transition-colors group"
            >
              查看全部产品
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 sm:py-28 bg-[#2C3E50] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block px-4 py-1 border border-white/20 text-sm tracking-wider">
                品牌理念
              </div>
              <h2 className="text-3xl sm:text-4xl font-light leading-relaxed">
                每一颗水晶都有其独特的能量与故事，我们致力于将这些自然的馈赠，
                <span className="text-[#C9A86C]">以最纯粹的方式呈现给您</span>。
              </h2>
              <p className="text-white/70 leading-relaxed">
                ZenCrystal 源自东方禅意美学，追求"少即是多"的哲学。我们相信，
                真正的美来自内心的平静与专注。每一件作品都经过精心挑选和设计，
                让您在佩戴时感受到身心的和谐与平衡。
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-[#C9A86C]/20 to-transparent rounded-full flex items-center justify-center">
                <svg
                  className="w-3/4 h-3/4 text-white/10"
                  viewBox="0 0 200 200"
                  fill="none"
                >
                  <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="1" />
                  <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="1" />
                  <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="1" />
                  <circle cx="100" cy="100" r="30" stroke="currentColor" strokeWidth="1" />
                  <circle cx="100" cy="100" r="10" fill="currentColor" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 sm:py-28 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: '天然水晶',
                description: '每一颗水晶均来自天然矿藏，经过严格筛选，确保品质卓越',
              },
              {
                title: '手工定制',
                description: '资深工匠手工编织，每一件都是独一无二的艺术品',
              },
              {
                title: '灵性守护',
                description: '每一件作品都承载着美好的祝愿，为您带来正能量',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center p-8 border border-[#E8E8E6] rounded-sm hover:border-[#C9A86C] transition-colors"
              >
                <div className="w-12 h-12 mx-auto mb-6 border border-[#C9A86C] rounded-full flex items-center justify-center">
                  <span className="text-[#C9A86C] font-light">{index + 1}</span>
                </div>
                <h3 className="text-xl font-medium text-[#2C3E50] mb-3">
                  {feature.title}
                </h3>
                <p className="text-[#6B7280] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28 px-4 bg-[#FAFAF8]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-light text-[#2C3E50] mb-6">
            开始您的灵性之旅
          </h2>
          <p className="text-[#6B7280] mb-10">
            探索我们的产品系列，找到属于您的那一款水晶手链
          </p>
          <Link
            to="/products"
            className="inline-flex items-center px-8 py-4 border-2 border-[#2C3E50] text-[#2C3E50] font-medium rounded hover:bg-[#2C3E50] hover:text-white transition-all duration-300"
          >
            浏览全部产品
          </Link>
        </div>
      </section>
    </div>
  );
}
