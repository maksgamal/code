"use client"

import { useUser } from '@clerk/nextjs'
import { CreditBalance } from '@/components/dashboard/credit-balance'
import { RecentActivity } from '@/components/dashboard/recent-activity'
import { UsageCharts } from '@/components/dashboard/usage-charts'
import { QuickActions } from '@/components/dashboard/quick-actions'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Dashboard() {
  const { user } = useUser()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.firstName || 'User'}!
        </h1>
        <p className="text-gray-600 mt-2">
          Here's what's happening with your lead generation today.
        </p>
      </div>

      {/* Credit Balance */}
      <CreditBalance />

      {/* Quick Actions */}
      <QuickActions />

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Usage Charts */}
        <UsageCharts />
        
        {/* Recent Activity */}
        <RecentActivity />
      </div>
    </div>
  )
}