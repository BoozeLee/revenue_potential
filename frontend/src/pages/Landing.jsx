import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Landing() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    // TODO: Save to waitlist
    setSubmitted(true)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Hero */}
      <div className="text-center mb-20">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Know Your Revenue. <span className="text-blue-600">Predict Your Future.</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          AI-powered revenue tracking and forecasting for SMBs, startups, and consultants. 
          Stop guessing. Start knowing.
        </p>
        
        {!submitted ? (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
            >
              Join Waitlist
            </button>
          </form>
        ) : (
          <div className="max-w-md mx-auto p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800">✓ You're on the list! We'll notify you when we launch.</p>
          </div>
        )}
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-8 mb-20">
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <div className="text-3xl mb-4">📊</div>
          <h3 className="text-xl font-semibold mb-2">Real-Time Tracking</h3>
          <p className="text-gray-600">Monitor all revenue streams in one dashboard. No spreadsheets needed.</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <div className="text-3xl mb-4">🤖</div>
          <h3 className="text-xl font-semibold mb-2">AI Forecasting</h3>
          <p className="text-gray-600">Predict future revenue with machine learning. Know what's coming.</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <div className="text-3xl mb-4">📈</div>
          <h3 className="text-xl font-semibold mb-2">Beautiful Reports</h3>
          <p className="text-gray-600">Export professional PDF and CSV reports for investors and stakeholders.</p>
        </div>
      </div>

      {/* Social Proof */}
      <div className="text-center mb-20">
        <p className="text-gray-600 mb-4">Trusted by startups and SMBs</p>
        <div className="flex justify-center gap-8 text-gray-400">
          <div className="text-2xl font-bold">50% Cheaper</div>
          <div className="text-2xl font-bold">5-Min Setup</div>
          <div className="text-2xl font-bold">No Training</div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center bg-blue-600 text-white rounded-2xl p-12">
        <h2 className="text-3xl font-bold mb-4">Ready to take control of your revenue?</h2>
        <p className="text-xl mb-6 opacity-90">Start your 14-day free trial. No credit card required.</p>
        <button
          onClick={() => navigate('/pricing')}
          className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 font-semibold text-lg"
        >
          View Pricing
        </button>
      </div>
    </div>
  )
}
