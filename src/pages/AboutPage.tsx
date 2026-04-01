import { Link } from 'react-router-dom';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-20 sm:pt-24">
      {/* Hero */}
      <section className="py-20 sm:py-28 px-4 bg-[#2C3E50] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-light mb-6">关于禅晶</h1>
          <p className="text-xl text-white/70 leading-relaxed">
            融合东方禅意与现代工艺，为您呈现独特的灵性配饰
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-1 border border-[#C9A86C] text-sm text-[#C9A86C] mb-6">
                品牌故事
              </div>
              <h2 className="text-3xl font-light text-[#2C3E50] mb-6">
                每一颗水晶都是大自然的馈赠
              </h2>
              <p className="text-[#6B7280] leading-relaxed mb-4">
                ZenCrystal 创立于对自然之美的敬畏与追求。我们相信，每一颗水晶都承载着独特的能量与故事。
                从巴西的紫水晶到马达加斯加的拉长石，我们远赴全球各地，精选最优质的天然水晶。
              </p>
              <p className="text-[#6B7280] leading-relaxed">
                我们的工匠以精湛的手艺，将这些自然的馈赠转化为可以佩戴的艺术品。每一件作品都经过精心设计，
                力求在禅意美学与现代审美之间找到完美的平衡。
              </p>
            </div>
            <div className="aspect-square bg-gradient-to-br from-[#C9A86C]/20 to-transparent rounded-full flex items-center justify-center">
              <svg
                className="w-3/4 h-3/4 text-[#C9A86C]/30"
                viewBox="0 0 200 200"
                fill="none"
              >
                <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="1" />
                <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="1" />
                <circle cx="100" cy="100" r="30" stroke="currentColor" strokeWidth="1" />
                <circle cx="100" cy="100" r="5" fill="currentColor" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-light text-[#2C3E50] text-center mb-12">
            我们的理念
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: '天然纯粹',
                description: '只选用未经处理的天然水晶，确保每一颗都具有独特的能量与美感',
              },
              {
                title: '手工精制',
                description: '由资深工匠全手工编织，每一件都是独一无二的艺术品',
              },
              {
                title: '灵性设计',
                description: '融合五行与脉轮理论，设计出能够带来身心平衡的配饰',
              },
            ].map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 border border-[#C9A86C] rounded-full flex items-center justify-center">
                  <span className="text-2xl font-light text-[#C9A86C]">
                    {index + 1}
                  </span>
                </div>
                <h3 className="text-xl font-medium text-[#2C3E50] mb-3">
                  {value.title}
                </h3>
                <p className="text-[#6B7280]">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-light text-[#2C3E50] mb-6">
            探索我们的产品
          </h2>
          <p className="text-[#6B7280] mb-8">
            找到属于您的那一款水晶手链，开始您的灵性之旅
          </p>
          <Link
            to="/products"
            className="inline-block px-8 py-4 bg-[#2C3E50] text-white font-medium rounded hover:bg-[#34495E] transition-colors"
          >
            浏览全部产品
          </Link>
        </div>
      </section>
    </div>
  );
}
