import { useSearchParams, Link } from 'react-router-dom';
import { useOrder } from '../hooks/useOrders';
import { formatCurrency } from '../lib/utils';
import { CheckCircle } from 'lucide-react';

export function OrderConfirmationPage() {
  const [searchParams] = useSearchParams();
  const paymentIntentId = searchParams.get('id') || '';
  const { order, loading } = useOrder(paymentIntentId);

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full text-center">
        <div className="w-20 h-20 mx-auto mb-6 bg-[#4A7C59] rounded-full flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>

        <h1 className="text-3xl font-medium text-[#2C3E50] mb-2">
          订单支付成功
        </h1>
        <p className="text-[#6B7280] mb-8">
          感谢您的购买！我们已将确认邮件发送至您的邮箱
        </p>

        <div className="bg-white p-6 rounded-lg border border-[#E8E8E6] text-left space-y-4">
          <div>
            <p className="text-sm text-[#6B7280]">订单号</p>
            <p className="font-medium text-[#1A1A1A]">
              {paymentIntentId.slice(0, 20)}...
            </p>
          </div>

          {order && (
            <>
              <div>
                <p className="text-sm text-[#6B7280]">订单金额</p>
                <p className="font-medium text-[#1A1A1A]">
                  {formatCurrency(order.total)}
                </p>
              </div>

              <div>
                <p className="text-sm text-[#6B7280]">配送地址</p>
                <p className="font-medium text-[#1A1A1A]">
                  {order.shipping_address.name}
                  <br />
                  {order.shipping_address.address}, {order.shipping_address.city}
                </p>
              </div>

              <div>
                <p className="text-sm text-[#6B7280] mb-2">商品清单</p>
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{item.product_name} x{item.quantity}</span>
                      <span>{formatCurrency(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="mt-8 space-y-3">
          <Link
            to="/orders"
            className="block w-full py-3 bg-[#2C3E50] text-white font-medium rounded hover:bg-[#34495E] transition-colors"
          >
            查看我的订单
          </Link>
          <Link
            to="/products"
            className="block w-full py-3 border border-[#2C3E50] text-[#2C3E50] font-medium rounded hover:bg-[#2C3E50] hover:text-white transition-colors"
          >
            继续购物
          </Link>
        </div>
      </div>
    </div>
  );
}
