import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Eye, EyeOff, Check, X } from 'lucide-react';

export function RegisterPage() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const passwordRequirements = [
    { met: password.length >= 8, text: '至少8个字符' },
    { met: /[A-Z]/.test(password), text: '包含大写字母' },
    { met: /[0-9]/.test(password), text: '包含数字' },
  ];

  const allRequirementsMet = passwordRequirements.every((r) => r.met);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('两次输入的密码不一致');
      return;
    }

    if (!allRequirementsMet) {
      setError('请满足所有密码要求');
      return;
    }

    setLoading(true);

    try {
      await signUp(email, password, name);
      navigate('/login', { replace: true });
    } catch (err) {
      setError('注册失败，请重试');
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
            创建账户
          </h1>
          <p className="text-sm text-[#6B7280] text-center mb-8">
            加入禅晶，开始您的灵性之旅
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 bg-[#9B4D4D]/10 border border-[#9B4D4D] rounded text-sm text-[#9B4D4D]">
                {error}
              </div>
            )}

            <Input
              label="姓名"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="请输入您的姓名"
              required
            />

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

            {/* Password Requirements */}
            <div className="space-y-2 p-3 bg-[#FAFAF8] rounded">
              <p className="text-xs text-[#6B7280] mb-2">密码要求:</p>
              {passwordRequirements.map((req, index) => (
                <div key={index} className="flex items-center text-xs">
                  {req.met ? (
                    <Check className="w-3 h-3 text-[#4A7C59] mr-2" />
                  ) : (
                    <X className="w-3 h-3 text-[#9B4D4D] mr-2" />
                  )}
                  <span className={req.met ? 'text-[#4A7C59]' : 'text-[#9B7280]'}>
                    {req.text}
                  </span>
                </div>
              ))}
            </div>

            <Input
              label="确认密码"
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
            />

            <Button
              type="submit"
              className="w-full"
              loading={loading}
              disabled={!allRequirementsMet}
            >
              注册
            </Button>
          </form>

          <div className="mt-6 text-center">
            <span className="text-sm text-[#6B7280]">
              已有账户?{' '}
            </span>
            <Link
              to="/login"
              className="text-sm text-[#C9A86C] hover:underline font-medium"
            >
              立即登录
            </Link>
          </div>

          <p className="mt-4 text-xs text-center text-[#9CA3AF]">
            注册即表示您同意我们的{' '}
            <Link to="/terms" className="text-[#C9A86C] hover:underline">
              服务条款
            </Link>{' '}
            和{' '}
            <Link to="/privacy" className="text-[#C9A86C] hover:underline">
              隐私政策
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
