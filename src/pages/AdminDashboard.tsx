import { useState } from 'react';
import { Link, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useAdminOrders } from '../hooks/useOrders';
import { useProducts } from '../hooks/useProducts';
import { formatCurrency } from '../lib/utils';
import { format } from 'date-fns';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { db } from '../lib/supabase';
import { useToast, ToastContainer } from '../components/ui/Toast';
import { LayoutDashboard, Package, ShoppingCart, Users, LogOut, Plus, Edit, Trash2, Eye, Check, Clock, Truck } from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../contexts/AuthContext';
import type { Product, Order } from '../types';

const statusOptions = [
  { value: 'pending', label: '待处理', icon: Clock, color: 'text-yellow-600' },
  { value: 'processing', label: '处理中', icon: Check, color: 'text-blue-600' },
  { value: 'shipped', label: '已发货', icon: Truck, color: 'text-purple-600' },
  { value: 'delivered', label: '已送达', icon: Check, color: 'text-green-600' },
];

export function AdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const toast = useToast();
  const location = useLocation();

  // Redirect non-admin users
  if (user && !user.is_admin) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-[#2C3E50] mb-4">权限不足</h2>
          <p className="text-[#6B7280] mb-4">您没有访问管理后台的权限</p>
          <Link to="/" className="text-[#C9A86C] hover:underline">
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  const navItems = [
    { id: 'dashboard', label: '概览', icon: LayoutDashboard },
    { id: 'products', label: '产品管理', icon: Package },
    { id: 'orders', label: '订单管理', icon: ShoppingCart },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-16">
      <ToastContainer toasts={toast.toasts} onClose={toast.removeToast} />

      <div className="flex">
        {/* Sidebar */}
        <aside className="fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-[#E8E8E6] p-4">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded transition-colors',
                  activeTab === item.id
                    ? 'bg-[#2C3E50] text-white'
                    : 'text-[#6B7280] hover:bg-[#FAFAF8] hover:text-[#1A1A1A]'
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="absolute bottom-4 left-4 right-4">
            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-3 text-sm text-[#6B7280] hover:bg-[#FAFAF8] rounded transition-colors"
            >
              <LogOut className="w-5 h-5" />
              返回商城
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="ml-64 flex-1 p-8">
          {activeTab === 'dashboard' && (
            <DashboardOverview toast={toast} />
          )}
          {activeTab === 'products' && (
            <ProductsManagement toast={toast} />
          )}
          {activeTab === 'orders' && (
            <OrdersManagement toast={toast} />
          )}
        </main>
      </div>
    </div>
  );
}

function DashboardOverview({ toast }: { toast: ReturnType<typeof useToast> }) {
  const { orders } = useAdminOrders();
  const { products } = useProducts();

  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);
  const pendingOrders = orders.filter((o) => o.status === 'pending').length;

  return (
    <div>
      <h1 className="text-2xl font-medium text-[#2C3E50] mb-8">管理概览</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg border border-[#E8E8E6]">
          <p className="text-sm text-[#6B7280] mb-2">产品总数</p>
          <p className="text-3xl font-medium text-[#2C3E50]">{products.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-[#E8E8E6]">
          <p className="text-sm text-[#6B7280] mb-2">待处理订单</p>
          <p className="text-3xl font-medium text-[#2C3E50]">{pendingOrders}</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-[#E8E8E6]">
          <p className="text-sm text-[#6B7280] mb-2">总收入</p>
          <p className="text-3xl font-medium text-[#2C3E50]">{formatCurrency(totalRevenue)}</p>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg border border-[#E8E8E6]">
        <div className="px-6 py-4 border-b border-[#E8E8E6]">
          <h2 className="font-medium text-[#2C3E50]">最近订单</h2>
        </div>
        <div className="divide-y divide-[#E8E8E6]">
          {orders.slice(0, 5).map((order) => (
            <div key={order.id} className="px-6 py-4 flex items-center justify-between">
              <div>
                <p className="font-medium text-[#1A1A1A]">
                  {order.id.slice(0, 8).toUpperCase()}
                </p>
                <p className="text-sm text-[#6B7280]">
                  {order.user_email || 'Guest'} · {format(new Date(order.created_at), 'MM-dd HH:mm')}
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">{formatCurrency(order.total)}</p>
                <p className="text-sm text-[#6B7280]">
                  {statusOptions.find((s) => s.value === order.status)?.label}
                </p>
              </div>
            </div>
          ))}
          {orders.length === 0 && (
            <div className="px-6 py-8 text-center text-[#6B7280]">
              暂无订单
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProductsManagement({ toast }: { toast: ReturnType<typeof useToast> }) {
  const { products, loading, refetch } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stone_type: '',
    size: '',
    length: '',
    image_url: '',
    stock: '',
    featured: false,
  });

  const openModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        description: product.description,
        price: (product.price / 100).toString(),
        stone_type: product.stone_type,
        size: product.size,
        length: product.length,
        image_url: product.image_url,
        stock: product.stock.toString(),
        featured: product.featured,
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        stone_type: '',
        size: '',
        length: '',
        image_url: '',
        stock: '',
        featured: false,
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        price: Math.round(parseFloat(formData.price) * 100),
        stock: parseInt(formData.stock),
      };

      if (editingProduct) {
        await db.updateProduct(editingProduct.id, data);
        toast.success('产品更新成功');
      } else {
        await db.createProduct(data);
        toast.success('产品添加成功');
      }

      setIsModalOpen(false);
      refetch();
    } catch (err) {
      toast.error('操作失败');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('确定要删除这个产品吗？')) return;
    try {
      await db.deleteProduct(id);
      toast.success('产品已删除');
      refetch();
    } catch (err) {
      toast.error('删除失败');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-medium text-[#2C3E50]">产品管理</h1>
        <Button onClick={() => openModal()}>
          <Plus className="w-4 h-4 mr-2" />
          添加产品
        </Button>
      </div>

      <div className="bg-white rounded-lg border border-[#E8E8E6] overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#FAFAF8]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">产品</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">材质</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">价格</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">库存</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E8E8E6]">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-[#6B7280]">
                  加载中...
                </td>
              </tr>
            ) : products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium text-[#1A1A1A]">{product.name}</p>
                      {product.featured && (
                        <span className="text-xs text-[#C9A86C]">精选</span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-[#6B7280]">{product.stone_type}</td>
                <td className="px-6 py-4 text-sm font-medium">{formatCurrency(product.price)}</td>
                <td className="px-6 py-4 text-sm text-[#6B7280]">{product.stock}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => openModal(product)}
                      className="p-2 text-[#6B7280] hover:text-[#2C3E50] transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="p-2 text-[#6B7280] hover:text-[#9B4D4D] transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProduct ? '编辑产品' : '添加产品'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              label="产品名称"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <Input
              label="材质类型"
              value={formData.stone_type}
              onChange={(e) => setFormData({ ...formData, stone_type: e.target.value })}
              required
            />
            <Input
              label="价格 (元)"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
            />
            <Input
              label="库存"
              type="number"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              required
            />
            <Input
              label="尺寸"
              value={formData.size}
              onChange={(e) => setFormData({ ...formData, size: e.target.value })}
              placeholder="6mm"
              required
            />
            <Input
              label="长度"
              value={formData.length}
              onChange={(e) => setFormData({ ...formData, length: e.target.value })}
              placeholder="18cm"
              required
            />
          </div>

          <Input
            label="图片URL"
            value={formData.image_url}
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
            required
          />

          <div>
            <label className="block text-sm font-medium text-[#1A1A1A] mb-2">
              产品描述
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 border border-[#E8E8E6] rounded focus:outline-none focus:ring-2 focus:ring-[#C9A86C]"
              required
            />
          </div>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-4 h-4 rounded border-[#E8E8E6] text-[#C9A86C] focus:ring-[#C9A86C]"
            />
            <span className="ml-2 text-sm text-[#1A1A1A]">设为精选产品</span>
          </label>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>
              取消
            </Button>
            <Button type="submit">
              {editingProduct ? '保存' : '添加'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

function OrdersManagement({ toast }: { toast: ReturnType<typeof useToast> }) {
  const { orders, loading, refetch } = useAdminOrders();

  const updateStatus = async (orderId: string, status: Order['status']) => {
    try {
      await db.updateOrderStatus(orderId, status);
      toast.success('订单状态已更新');
      refetch();
    } catch (err) {
      toast.error('更新失败');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-medium text-[#2C3E50] mb-8">订单管理</h1>

      <div className="bg-white rounded-lg border border-[#E8E8E6] overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#FAFAF8]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">订单号</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">客户</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">金额</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">状态</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">时间</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E8E8E6]">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-[#6B7280]">
                  加载中...
                </td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-[#6B7280]">
                  暂无订单
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4">
                    <p className="font-medium text-[#1A1A1A]">
                      {order.id.slice(0, 8).toUpperCase()}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-[#1A1A1A]">{order.user_name || 'N/A'}</p>
                    <p className="text-xs text-[#6B7280]">{order.user_email}</p>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    {formatCurrency(order.total)}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value as Order['status'])}
                      className="text-sm border border-[#E8E8E6] rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-[#C9A86C]"
                    >
                      {statusOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 text-sm text-[#6B7280]">
                    {format(new Date(order.created_at), 'yyyy-MM-dd HH:mm')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <p className="text-xs text-[#6B7280]">
                        {order.shipping_address.name}
                      </p>
                      <p className="text-xs text-[#6B7280]">
                        {order.shipping_address.city}
                      </p>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
