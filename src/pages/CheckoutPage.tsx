import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../lib/supabase';
import { formatCurrency } from '../lib/utils';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { createPaymentIntent, stripePromise, formatPriceForStripe } from '../lib/stripe';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { ChevronLeft, Check, Lock } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '';
const stripe = loadStripe(stripePublishableKey);

function CheckoutForm() {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const { items, subtotal, shipping, total, clearCart } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    postal_code: '',
    country: '中国',
  });

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingInfo.name || !shippingInfo.email || !shippingInfo.address || !shippingInfo.city) {
      setError('请填写所有必填项');
      return;
    }
    setError('');
    setStep(2);
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError('');

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setError(submitError.message || '支付信息验证失败');
        setLoading(false);
        return;
      }

      // Create payment intent
      const clientSecret = await createPaymentIntent(total);

      const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          return_url: `${window.location.origin}/order-confirmation`,
          receipt_email: shippingInfo.email,
        },
        redirect: 'if_required',
      });

      if (confirmError) {
        setError(confirmError.message || '支付失败，请重试');
        setLoading(false);
        return;
      }

      if (paymentIntent?.status === 'succeeded') {
        // Create order in database
        const orderItems = items.map((item) => ({
          product_id: item.product.id,
          product_name: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
        }));

        await db.createOrder({
          user_id: user?.id || 'guest',
          user_email: shippingInfo.email,
          user_name: shippingInfo.name,
          items: orderItems,
          subtotal,
          shipping,
          total,
          status: 'pending',
          shipping_address: shippingInfo,
          payment_intent_id: paymentIntent.id,
        });

        clearCart();
        navigate(`/order-confirmation?id=${paymentIntent.id}`);
      }
    } catch (err) {
      setError('支付处理失败，请重试');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-20 sm:pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link
            to="/products"
            className="flex items-center text-[#6B7280] hover:text-[#2C3E50] transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            返回购物
          </Link>
        </div>

        {/* Steps */}
        <div className="flex items-center justify-center mb-12">
          {['配送信息', '支付'].map((label, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                  step > index + 1
                    ? 'bg-[#4A7C59] text-white'
                    : step === index + 1
                    ? 'bg-[#2C3E50] text-white'
                    : 'bg-[#E8E8E6] text-[#6B7280]'
                }`}
              >
                {step > index + 1 ? <Check className="w-4 h-4" /> : index + 1}
              </div>
              <span
                className={`ml-2 text-sm ${
                  step >= index + 1 ? 'text-[#2C3E50]' : 'text-[#6B7280]'
                }`}
              >
                {label}
              </span>
              {index < 1 && (
                <div className="w-12 h-px bg-[#E8E8E6] mx-4" />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <div className="lg:col-span-3">
            {step === 1 && (
              <form onSubmit={handleShippingSubmit} className="bg-white p-6 rounded-lg border border-[#E8E8E6]">
                <h2 className="text-xl font-medium text-[#2C3E50] mb-6">配送信息</h2>

                {error && (
                  <div className="mb-4 p-3 bg-[#9B4D4D]/10 border border-[#9B4D4D] rounded text-sm text-[#9B4D4D]">
                    {error}
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label="收货人姓名 *"
                    value={shippingInfo.name}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
                    required
                  />
                  <Input
                    label="联系电话 *"
                    type="tel"
                    value={shippingInfo.phone}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                    required
                  />
                  <Input
                    label="邮箱地址 *"
                    type="email"
                    value={shippingInfo.email}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                    required
                  />
                  <Input
                    label="城市 *"
                    value={shippingInfo.city}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                    required
                  />
                  <Input
                    label="详细地址 *"
                    value={shippingInfo.address}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                    required
                  />
                  <Input
                    label="邮政编码"
                    value={shippingInfo.postal_code}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, postal_code: e.target.value })}
                  />
                </div>

                <Button type="submit" className="w-full mt-6">
                  继续支付
                </Button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handlePaymentSubmit} className="bg-white p-6 rounded-lg border border-[#E8E8E6]">
                <h2 className="text-xl font-medium text-[#2C3E50] mb-6">支付信息</h2>

                {error && (
                  <div className="mb-4 p-3 bg-[#9B4D4D]/10 border border-[#9B4D4D] rounded text-sm text-[#9B4D4D]">
                    {error}
                  </div>
                )}

                <div className="mb-6 p-4 bg-[#FAFAF8] rounded">
                  <PaymentElement
                    options={{
                      layout: 'tabs',
                    }}
                  />
                </div>

                <div className="flex items-center text-xs text-[#6B7280] mb-4">
                  <Lock className="w-3 h-3 mr-1" />
                  您的支付信息已加密保护
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  loading={loading}
                  disabled={!stripe || !elements}
                >
                  支付 {formatCurrency(total)}
                </Button>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full mt-3 py-2 text-sm text-[#6B7280] hover:text-[#2C3E50] transition-colors"
                >
                  返回配送信息
                </button>
              </form>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg border border-[#E8E8E6] sticky top-24">
              <h3 className="text-lg font-medium text-[#2C3E50] mb-4">
                订单摘要
              </h3>

              <div className="space-y-3 mb-4 pb-4 border-b border-[#E8E8E6]">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <img
                      src={item.product.image_url}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#1A1A1A] truncate">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-[#6B7280]">
                        x{item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-medium">
                      {formatCurrency(item.product.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">小计</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7280]">运费</span>
                  <span>{formatCurrency(shipping)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#E8E8E6] font-medium">
                  <span>总计</span>
                  <span className="text-[#2C3E50]">{formatCurrency(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CheckoutPage() {
  const { items } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    if (items.length === 0) {
      navigate('/products');
      return;
    }

    const total = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0) + 5000;
    createPaymentIntent(total).then(setClientSecret).catch(console.error);
  }, [items, navigate]);

  if (!clientSecret) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#C9A86C] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#6B7280]">正在准备支付...</p>
        </div>
      </div>
    );
  }

  return (
    <Elements
      stripe={stripe}
      options={{
        clientSecret,
        appearance: {
          theme: 'stripe',
          variables: {
            colorPrimary: '#2C3E50',
            colorBackground: '#ffffff',
            colorText: '#1A1A1A',
            colorDanger: '#9B4D4D',
            fontFamily: 'Inter, system-ui, sans-serif',
            spacingUnit: '4px',
            borderRadius: '2px',
          },
        },
      }}
    >
      <CheckoutForm />
    </Elements>
  );
}
