import { Link } from 'react-router-dom';
import { Instagram, Mail, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#2C3E50] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <svg
                className="w-8 h-8 text-[#C9A86C]"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="16"
                  cy="16"
                  r="14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <circle
                  cx="16"
                  cy="16"
                  r="8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <circle cx="16" cy="16" r="3" fill="currentColor" />
              </svg>
              <span className="text-xl font-medium tracking-wider">禅晶</span>
            </Link>
            <p className="text-sm text-white/70 leading-relaxed">
              专注于天然水晶手链的定制与设计，将禅意美学与现代工艺完美融合，为您带来灵性之美。
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider mb-4">
              快速链接
            </h3>
            <ul className="space-y-2">
              {[
                { href: '/products', label: '全部产品' },
                { href: '/about', label: '关于我们' },
                { href: '/login', label: '我的账户' },
                { href: '/orders', label: '订单查询' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/70 hover:text-[#C9A86C] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-medium uppercase tracking-wider mb-4">
              联系方式
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 mt-0.5 text-[#C9A86C]" />
                <span className="text-sm text-white/70">
                  上海市静安区南京西路1266号
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-[#C9A86C]" />
                <a
                  href="mailto:contact@zencrystal.com"
                  className="text-sm text-white/70 hover:text-[#C9A86C] transition-colors"
                >
                  contact@zencrystal.com
                </a>
              </li>
            </ul>

            {/* Social */}
            <div className="flex items-center space-x-4 mt-6">
              <a
                href="#"
                className="text-white/70 hover:text-[#C9A86C] transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-center text-xs text-white/50">
            © 2024 禅晶 ZenCrystal. 保留所有权利.
          </p>
        </div>
      </div>
    </footer>
  );
}
