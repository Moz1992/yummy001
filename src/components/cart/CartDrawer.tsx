import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { formatCurrency } from '../../lib/utils';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { cn } from '../../lib/utils';

export function CartDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    subtotal,
    shipping,
    total,
    itemCount,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300',
          isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div
        className={cn(
          'fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transition-transform duration-500 ease-out',
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E8E6]">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-[#2C3E50]" />
            <h2 className="text-lg font-medium text-[#1A1A1A]">
              购物车 ({itemCount})
            </h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-[#6B7280] hover:text-[#1A1A1A] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col h-[calc(100%-8rem)]">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center px-6">
              <div className="w-24 h-24 rounded-full bg-[#FAFAF8] flex items-center justify-center mb-6">
                <ShoppingBag className="w-10 h-10 text-[#E8E8E6]" />
              </div>
              <p className="text-[#6B7280] text-center mb-4">
                您的购物车是空的
              </p>
              <Link
                to="/products"
                onClick={() => setIsCartOpen(false)}
                className="px-6 py-2 bg-[#2C3E50] text-white text-sm font-medium rounded hover:bg-[#34495E] transition-colors"
              >
                浏览产品
              </Link>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 p-3 bg-[#FAFAF8] rounded-lg"
                  >
                    <img
                      src={item.product.image_url}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/80x80?text=Crystal';
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-[#1A1A1A] truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-[#6B7280] mt-0.5">
                        {item.product.stone_type}
                      </p>
                      <p className="text-sm font-medium text-[#2C3E50] mt-1">
                        {formatCurrency(item.product.price)}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-[#E8E8E6] rounded">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity - 1
                              )
                            }
                            className="p-1 hover:bg-[#E8E8E6] transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity + 1
                              )
                            }
                            className="p-1 hover:bg-[#E8E8E6] transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-xs text-[#9B4D4D] hover:underline"
                        >
                          移除
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="border-t border-[#E8E8E6] px-6 py-4 bg-white">
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6B7280]">小计</span>
                    <span className="text-[#1A1A1A]">
                      {formatCurrency(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6B7280]">运费</span>
                    <span className="text-[#1A1A1A]">
                      {formatCurrency(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-medium pt-2 border-t border-[#E8E8E6]">
                    <span>总计</span>
                    <span className="text-[#2C3E50]">
                      {formatCurrency(total)}
                    </span>
                  </div>
                </div>

                <Link
                  to="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="block w-full py-3 bg-[#2C3E50] text-white text-center font-medium rounded hover:bg-[#34495E] transition-colors"
                >
                  去结算
                </Link>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="block w-full py-2 mt-2 text-sm text-[#6B7280] hover:text-[#1A1A1A] transition-colors"
                >
                  继续购物
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
