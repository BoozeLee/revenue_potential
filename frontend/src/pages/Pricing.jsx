import { useState } from 'react'
import axios from 'axios'

const tiers = [
  {
    name: 'Starter',
    price: 49,
    features: ['1 user', '3 revenue streams', 'Basic forecasting', 'PDF reports'],
    tier: 'starter'
  },
  {
    name: 'Pro',
    price: 99,
    features: ['3 users', 'Unlimited streams', 'AI forecasting', 'Custom reports', 'API access'],
    tier: 'pro',
    popular: true
  },
  {
    name: 'Enterprise',
    price: 199,
    features: ['Unlimited users', 'White-label', 'Priority support', 'Custom integrations', 'Account manager'],
    tier: 'enterprise'
  }
]

export default function Pricing() {
  const [loading, setLoading] = useState(null)

  const handleSubscribe = async (tier) => {
    setLoading(tier)
    try {
      const { data } = await axios.post('http://localhost:5000/api/create-checkout-session', { tier })
      window.location.href = data.url
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Error creating checkout session')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-gray-600">Choose the plan that fits your business</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`relative p-8 bg-white rounded-2xl shadow-sm ${
              tier.popular ? 'ring-2 ring-blue-600' : 'border border-gray-200'
            }`}
          >
            {tier.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 text-white text-sm font-semibold rounded-full">
                Most Popular
              </div>
            )}
            <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold">${tier.price}</span>
              <span className="text-gray-600">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleSubscribe(tier.tier)}
              disabled={loading === tier.tier}
              className={`w-full py-3 rounded-lg font-semibold ${
                tier.popular
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              } disabled:opacity-50`}
            >
              {loading === tier.tier ? 'Loading...' : 'Start Free Trial'}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center text-gray-600">
        <p>All plans include 14-day free trial • No credit card required • Cancel anytime</p>
      </div>
    </div>
  )
}
