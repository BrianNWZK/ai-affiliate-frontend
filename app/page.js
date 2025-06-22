'use client'
import { useState, useEffect } from 'react'
import AffiliateMarketingAI from '../components/AffiliateMarketingAI'
import NeuralCommerceEcosystem from '../components/NeuralCommerceEcosystem'

export default function Home() {
  const [dashboardData, setDashboardData] = useState({
    revenue: '--',
    content: 0,
    emails: 0,
    posts: 0,
    leads: 0,
    conversions: 0,
    ecosystemStatus: 'INACTIVE',
    loading: true,
    error: null
  })

  const [activityLog, setActivityLog] = useState([
    'System initialized'
  ])

  // Fetch initial dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setDashboardData(prev => ({ ...prev, loading: true }))
        addActivityLog('Fetching dashboard data...')
        
        // Fetch revenue data
        const revenueRes = await fetch('https://ai-affiliate-backend.onrender.com/paystack/revenue?currency=NGN')
        if (!revenueRes.ok) throw new Error('Failed to fetch revenue data')
        const revenueData = await revenueRes.json()
        
        // Fetch ecosystem status
        const ecosystemRes = await fetch('https://ai-affiliate-backend.onrender.com/ecosystem/status')
        const ecosystemData = await ecosystemRes.json()

        setDashboardData({
          revenue: revenueData.amount || '--',
          content: revenueData.content || 0,
          emails: revenueData.emails || 0,
          posts: revenueData.posts || 0,
          leads: revenueData.leads || 0,
          conversions: revenueData.conversions || 0,
          ecosystemStatus: ecosystemData.status || 'INACTIVE',
          loading: false,
          error: null
        })
        
        addActivityLog('Dashboard data loaded successfully', '✅')
      } catch (err) {
        setDashboardData(prev => ({ ...prev, error: err.message, loading: false }))
        addActivityLog(`Error: ${err.message}`, '❌')
      }
    }

    fetchDashboardData()
  }, [])

  const addActivityLog = (message, emoji = 'ℹ️') => {
    const timestamp = new Date().toLocaleTimeString()
    setActivityLog(prev => [
      ...prev.slice(-9), // Keep only last 10 entries
      `${emoji} ${timestamp} ${message}`
    ])
  }

  const handleActivateEcosystem = async () => {
    try {
      addActivityLog('Attempting ecosystem activation...')
      const res = await fetch('https://ai-affiliate-backend.onrender.com/ecosystem/activate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: 'dashboard_user' })
      })
      
      const data = await res.json()
      if (data.success) {
        setDashboardData(prev => ({
          ...prev,
          ecosystemStatus: 'ACTIVE'
        }))
        addActivityLog('Ecosystem activated successfully!', '✅')
      } else {
        throw new Error(data.message || 'Activation failed')
      }
    } catch (err) {
      addActivityLog(`Activation failed: ${err.message}`, '❌')
    }
  }

  if (dashboardData.loading) {
    return (
      <main className="min-h-screen bg-gray-900 text-white px-4 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Loading dashboard data...</p>
        </div>
      </main>
    )
  }

  if (dashboardData.error) {
    return (
      <main className="min-h-screen bg-gray-900 text-white px-4 py-8 flex items-center justify-center">
        <div className="text-center bg-red-900/50 p-6 rounded-lg max-w-md">
          <h2 className="text-2xl font-bold mb-2">Error Loading Dashboard</h2>
          <p className="mb-4">{dashboardData.error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
          >
            Retry
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12">
        Welcome to AI Affiliate Marketing System Dashboard
      </h1>
      
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        <AffiliateMarketingAI 
          revenue={dashboardData.revenue}
          content={dashboardData.content}
          emails={dashboardData.emails}
          posts={dashboardData.posts}
          leads={dashboardData.leads}
          conversions={dashboardData.conversions}
          activityLog={activityLog}
          onRefresh={() => window.location.reload()}
        />
        
        <NeuralCommerceEcosystem 
          status={dashboardData.ecosystemStatus}
          onActivate={handleActivateEcosystem}
        />
      </div>
    </main>
  )
}
