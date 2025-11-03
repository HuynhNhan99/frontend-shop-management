import React, { useEffect, useRef, useState } from 'react'
import productApi from '../api/productApi'
import ChartCard from '../components/ChartCard'
import { formatMoney } from '../utils/helpers'

export default function Dashboard() {
  const [stats, setStats] = useState({ totalProducts: 0, totalValue: 0 })
  const [chart, setChart] = useState({ labels: [], values: [] })
  const isLoaded  = useRef(false) // 🧠 Ngăn gọi API 2 lần

  useEffect(() => {
    if (isLoaded .current) return // nếu đã gọi rồi thì bỏ qua
    isLoaded .current = true

    async function load() {
      try {
        const res = await productApi.getAll()
        const data = res.data || res

        const totalProducts = data.length
        const totalValue = data.reduce(
          (sum, p) => sum + ((p.quantity_in_stock || 0) * (p.cost_price || 0)),
          0
        )

        // Dữ liệu giả lập biểu đồ
        const labels = Array.from({ length: 7 }, (_, i) => `D-${6 - i}`)
        const values = labels.map(() => Math.round(Math.random() * 500 + 200))

        setStats({ totalProducts, totalValue })
        setChart({ labels, values })
      } catch (e) {
        console.error('Load products failed:', e)
      }
    }

    load()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Dashboard</h1>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-sm text-gray-500">Sản phẩm</h3>
          <p className="text-2xl font-bold">{stats.totalProducts}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-sm text-gray-500">Giá trị tồn</h3>
          <p className="text-2xl font-bold">{formatMoney(stats.totalValue)}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-sm text-gray-500">Người dùng</h3>
          <p className="text-2xl font-bold">—</p>
        </div>
      </div>

      <ChartCard
        title="Doanh thu (giả lập)"
        labels={chart.labels}
        data={chart.values}
      />
    </div>
  )
}
