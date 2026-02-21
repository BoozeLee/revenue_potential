import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import axios from 'axios'

export default function Dashboard() {
  const [revenue, setRevenue] = useState([])
  const [forecast, setForecast] = useState([])
  const [form, setForm] = useState({ name: '', amount: '', date: '', category: 'product' })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const { data: rev } = await axios.get('http://localhost:5000/api/revenue?user_id=1')
    const { data: fore } = await axios.get('http://localhost:5000/api/forecast?user_id=1')
    setRevenue(rev)
    setForecast(fore.forecast)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post('http://localhost:5000/api/revenue', {
      user_id: 1,
      ...form,
      amount: parseFloat(form.amount)
    })
    setForm({ name: '', amount: '', date: '', category: 'product' })
    loadData()
  }

  const chartData = [
    ...revenue.map(r => ({ date: r.date.split('T')[0], actual: r.amount, type: 'actual' })),
    ...forecast.map(f => ({ date: f.date.split('T')[0], forecast: f.amount, type: 'forecast' }))
  ]

  const total = revenue.reduce((sum, r) => sum + r.amount, 0)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Revenue Dashboard</h1>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <p className="text-gray-600 text-sm">Total Revenue</p>
          <p className="text-3xl font-bold text-gray-900">${total.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <p className="text-gray-600 text-sm">Revenue Streams</p>
          <p className="text-3xl font-bold text-gray-900">{revenue.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <p className="text-gray-600 text-sm">Avg per Stream</p>
          <p className="text-3xl font-bold text-gray-900">
            ${revenue.length ? (total / revenue.length).toFixed(0) : 0}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <h2 className="text-xl font-semibold mb-4">Revenue & Forecast</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="actual" stroke="#2563eb" strokeWidth={2} />
            <Line type="monotone" dataKey="forecast" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Add Revenue Form */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <h2 className="text-xl font-semibold mb-4">Add Revenue</h2>
        <form onSubmit={handleSubmit} className="grid md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add
          </button>
        </form>
      </div>

      {/* Revenue List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {revenue.map((r) => (
              <tr key={r.id}>
                <td className="px-6 py-4 whitespace-nowrap">{r.name}</td>
                <td className="px-6 py-4 whitespace-nowrap font-semibold">${r.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap">{r.date.split('T')[0]}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">{r.category}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
