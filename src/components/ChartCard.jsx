import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js'
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend)

export default function ChartCard({ title, labels, data }) {
  const chartData = { labels, datasets: [{ label: title, data, tension:0.3, borderColor:'#3b82f6' }] }
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-2">{title}</h3>
      <Line data={chartData} />
    </div>
  )
}
