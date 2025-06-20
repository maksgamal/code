"use client"

import { useUser } from '@clerk/nextjs'
import { CreditBalance } from '@/components/dashboard/credit-balance'
import { RecentActivity } from '@/components/dashboard/recent-activity'
import { UsageCharts } from '@/components/dashboard/usage-charts'
import { QuickActions } from '@/components/dashboard/quick-actions'
import { useUserData } from '@/hooks/use-user-data'
import { Skeleton } from '@/components/ui/skeleton'

export default function Dashboard() {
  const { user: clerkUser } = useUser()
  const { data: userData, isLoading } = useUserData()

  const displayName = userData?.first_name || clerkUser?.firstName || 'User'

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {displayName}!
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