import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Eye, EyeOff } from 'lucide-react';

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError('邮箱或密码错误，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center space-x-2 mb-8">
          <svg
            className="w-10 h-10 text-[#2C3E50]"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="16" cy="16" r="8" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="16" cy="16" r="3" fill="currentColor" />
          </svg>
          <span className="text-2xl font-medium text-[#2C3E50] tracking-wider">禅晶</span>
        </Link>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm border border-[#E8E8E6] p-8">
          <h1 className="text-2xl font-medium text-[#2C3E50] text-center mb-2">
            登录账户
          </h1>
          <p className="text-sm text-[#6B7280] text-center mb-8">
            欢迎回来，请输入您的账户信息
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 bg-[#9B4D4D]/10 border border-[#9B4D4D] rounded text-sm text-[#9B4D4D]">
                {error}
              </div>
            )}

            <Input
              label="邮箱地址"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />

            <div className="relative">
              <Input
                label="密码"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-[#6B7280] hover:text-[#1A1A1A]"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-[#E8E8E6] text-[#C9A86C] focus:ring-[#C9A86C]"
                />
                <span className="ml-2 text-sm text-[#6B7280]">记住我</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-[#C9A86C] hover:underline"
              >
                忘记密码?
              </Link>
            </div>

            <Button type="submit" className="w-full" loading={loading}>
              登录
            </Button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-sm text-[#6B7280]">
              还没有账户?{' '}
            </span>
            <Link
              to="/register"
              className="text-sm text-[#C9A86C] hover:underline font-medium"
            >
              立即注册
            </Link>
          </div>
        </div>

        {/* Admin Login */}
        <p className="text-center text-xs text-[#9CA3AF] mt-6">
          管理员登录: admin@zencrystal.com / admin123
        </p>
      </div>
    </div>
  );
}
