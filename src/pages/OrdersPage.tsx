import { Link } from 'react-router-dom';
import { useOrders } from '../hooks/useOrders';
import { formatCurrency } from '../lib/utils';
import { format } from 'date-fns';
import { Package, ChevronRight } from 'lucide-react';

const statusMap = {
  pending: { label: '待处理', color: 'bg-yellow-100 text-yellow-800' },
  processing: { label: '处理中', color: 'bg-blue-100 text-blue-800' },
  shipped: { label: '已发货', color: 'bg-purple-100 text-purple-800' },
  delivered: { label: '已送达', color: 'bg-green-100 text-green-800' },
  cancelled: { label: '已取消', color: 'bg-red-100 text-red-800' },
};

export function OrdersPage() {
  const { orders, loading } = useOrders();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] pt-20 sm:pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#C9A86C] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#6B7280]">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-20 sm:pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-light text-[#2C3E50] mb-8">我的订单</h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg border border-[#E8E8E6] p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-[#FAFAF8] rounded-full flex items-center justify-center">
              <Package className="w-10 h-10 text-[#E8E8E6]" />
            </div>
            <h2 className="text-xl text-[#2C3E50] mb-2">暂无订单</h2>
            <p className="text-[#6B7280] mb-6">
              您还没有任何订单记录
            </p>
            <Link
              to="/products"
              className="inline-block px-6 py-2 bg-[#2C3E50] text-white font-medium rounded hover:bg-[#34495E] transition-colors"
            >
              浏览产品
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg border border-[#E8E8E6] overflow-hidden"
              >
                <div className="p-4 sm:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <div>
                      <p className="text-xs text-[#6B7280]">订单号</p>
                      <p className="font-medium text-[#1A1A1A]">
                        {order.id.slice(0, 8).toUpperCase()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#6B7280]">下单时间</p>
                      <p className="text-sm text-[#1A1A1A]">
                        {format(new Date(order.created_at), 'yyyy-MM-dd HH:mm')}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        statusMap[order.status]?.color || statusMap.pending.color
                      }`}
                    >
                      {statusMap[order.status]?.label || '未知'}
                    </span>
                  </div>

                  {/* Items */}
                  <div className="space-y-3 py-4 border-t border-[#E8E8E6]">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-[#1A1A1A]">
                          {item.product_name} x{item.quantity}
                        </span>
                        <span className="text-[#6B7280]">
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#E8E8E6]">
                    <p className="text-sm text-[#6B7280]">
                      共 {order.items.reduce((acc, i) => acc + i.quantity, 0)} 件商品
                    </p>
                    <p className="text-lg font-medium text-[#2C3E50]">
                      合计: {formatCurrency(order.total)}
                    </p>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="px-4 sm:px-6 py-3 bg-[#FAFAF8] border-t border-[#E8E8E6]">
                  <p className="text-xs text-[#6B7280]">收货地址</p>
                  <p className="text-sm text-[#1A1A1A]">
                    {order.shipping_address.name} · {order.shipping_address.address},{' '}
                    {order.shipping_address.city} · {order.shipping_address.phone}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
