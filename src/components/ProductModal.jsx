import React, { useState, useEffect } from 'react';

export default function ProductModal({ isOpen, onClose, onSave, product }) {
  const [form, setForm] = useState({
    product_code: '',
    product_name: '',
    category: '',
    sale_price: '',
    quantity_in_stock: '',
  });
  const [show, setShow] = useState(false);

  // Load form khi mở modal
  useEffect(() => {
    if (product) setForm(product);
    else
      setForm({
        product_code: '',
        product_name: '',
        category: '',
        sale_price: '',
        quantity_in_stock: '',
      });
  }, [product]);

  // Hiệu ứng fade
  useEffect(() => {
    if (isOpen) {
      setShow(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timeout = setTimeout(() => setShow(false), 200);
      document.body.style.overflow = 'auto';
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center px-4 transition-all duration-200 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Nền mờ */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Hộp nội dung */}
      <div
        className={`relative bg-white rounded-2xl shadow-lg w-full max-w-md p-6 transform transition-all duration-300 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        style={{
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          {product ? 'Sửa sản phẩm' : 'Thêm sản phẩm'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Các input giữ nguyên */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mã sản phẩm
            </label>
            <input
              name="product_code"
              value={form.product_code}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="VD: SP001"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tên sản phẩm
            </label>
            <input
              name="product_name"
              value={form.product_name}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Nhập tên sản phẩm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Danh mục
            </label>
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Nhập danh mục"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Giá bán
            </label>
            <input
              name="sale_price"
              type="number"
              value={form.sale_price}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Nhập giá bán"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Số lượng tồn
            </label>
            <input
              name="quantity_in_stock"
              type="number"
              value={form.quantity_in_stock}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Nhập số lượng"
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[var(--color-accent)] text-white rounded-lg hover:bg-[var(--color-accent-dark)]"
            >
              {product ? 'Lưu' : 'Thêm'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
