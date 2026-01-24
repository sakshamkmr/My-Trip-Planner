import { PricingTable } from '@clerk/nextjs'
import React from 'react'

export default function Pricing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 py-20">
      <div className="container mx-auto px-4 md:px-24 lg:px-48">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
            Unlock unlimited trip planning and premium features with our affordable plans.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <PricingTable />
        </div>
      </div>
    </div>
  )
}
