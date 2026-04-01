import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { ShoppingBag, User, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';

export function Header() {
  const location = useLocation();
  const { itemCount, setIsCartOpen } = useCart();
  const { user, signOut } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: '首页' },
    { href: '/products', label: '产品' },
    { href: '/about', label: '关于' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-500',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-[#2C3E50] hover:text-[#C9A86C] transition-colors"
          >
            <svg
              className="w-8 h-8"
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'text-sm font-medium tracking-wide transition-colors relative group',
                  location.pathname === link.href
                    ? 'text-[#C9A86C]'
                    : 'text-[#2C3E50] hover:text-[#C9A86C]'
                )}
              >
                {link.label}
                <span
                  className={cn(
                    'absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C9A86C] transition-all duration-300',
                    location.pathname === link.href && 'w-full'
                  )}
                />
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-[#2C3E50] hover:text-[#C9A86C] transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#C9A86C] text-white text-xs font-medium rounded-full flex items-center justify-center">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </button>

            {/* User Button */}
            {user ? (
              <div className="relative group">
                <button className="flex items-center p-2 text-[#2C3E50] hover:text-[#C9A86C] transition-colors">
                  <User className="w-5 h-5" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-[#E8E8E6] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="px-4 py-3 border-b border-[#E8E8E6]">
                    <p className="text-sm font-medium text-[#1A1A1A]">
                      {user.name || user.email}
                    </p>
                    {user.is_admin && (
                      <Link
                        to="/admin"
                        className="text-xs text-[#C9A86C] hover:underline"
                      >
                        管理后台
                      </Link>
                    )}
                  </div>
                  <div className="py-1">
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-sm text-[#6B7280] hover:bg-[#FAFAF8] hover:text-[#1A1A1A]"
                    >
                      我的订单
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="w-full text-left px-4 py-2 text-sm text-[#6B7280] hover:bg-[#FAFAF8] hover:text-[#1A1A1A]"
                    >
                      退出登录
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="p-2 text-[#2C3E50] hover:text-[#C9A86C] transition-colors"
              >
                <User className="w-5 h-5" />
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-[#2C3E50]"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#E8E8E6] animate-fadeIn">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'text-base font-medium tracking-wide py-2',
                    location.pathname === link.href
                      ? 'text-[#C9A86C]'
                      : 'text-[#2C3E50]'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
