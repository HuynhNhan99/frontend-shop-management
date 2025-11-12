import React, { useEffect, useState, useRef } from 'react'
import { useApi } from '../hooks/useApi';
import ProductModal from '../components/ProductModal'
import ProductTable from '../components/ProductTable'
import useAuth from '../hooks/useAuth'

export default function ProductPage() {
  const [products, setProducts] = useState([])
  const [editing, setEditing] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { auth } = useAuth()
  const { product } = useApi();
  const user = auth.user
  const isAdmin = user?.role === 'admin'
  const isLoaded = useRef(false)

  const loadProduct = async () => {
    try {
      const res = await product.getAll()
      const data = res.data || res
      setProducts(data)
    } catch (err) {
      alert('Không tải được sản phẩm')
    }
  }

  useEffect(() => {
    if (isLoaded.current) return
    isLoaded.current = true
    loadProduct()
  }, [])

  const handleSave = async (payload) => {
    if (editing) {
      await product.update(editing.product_id, payload)
    } else {
      await product.add(payload)
    }
    setIsModalOpen(false)
    setEditing(null)
    loadProduct()
  }

  const handleDelete = async (id) => {
    if (!confirm('Chắc chắn xóa?')) return
    await product.remove(id)
    loadProduct()
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Sản phẩm</h1>
        {isAdmin && (
          <button
            onClick={() => { setEditing(null); setIsModalOpen(true); }}
            className="px-4 py-2 bg-[var(--color-accent)] text-white rounded-lg hover:bg-[var(--color-accent-dark)]"
          >
            + Thêm sản phẩm
          </button>
        )}
      </div>

      <ProductTable
        products={products}
        onEdit={(p) => { setEditing(p); setIsModalOpen(true); }}
        onDelete={handleDelete}
        isAdmin={isAdmin}
      />

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        product={editing}
      />
    </div>
  )
}
