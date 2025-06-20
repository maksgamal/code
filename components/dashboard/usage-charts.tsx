"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { useUsageStats } from '@/hooks/use-usage-stats'
import { Skeleton } from '@/components/ui/skeleton'

export function UsageCharts() {
  const { data: stats, isLoading } = useUsageStats()

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Credit Usage</CardTitle>
            <CardDescription>Credits consumed over the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[200px] w-full" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Credit Usage by Type</CardTitle>
            <CardDescription>How you're spending your credits</CardDescription>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[200px] w-full" />
          </CardContent>
        </Card>
      </div>
    )
  }

  const weeklyUsage = stats?.weeklyUsage || []
  const creditTypes = stats?.creditTypes || []

  return (
    <div className="space-y-6">
      {/* Weekly Usage Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Credit Usage</CardTitle>
          <CardDescription>Credits consumed over the last 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          {weeklyUsage.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={weeklyUsage}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="credits" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[200px] flex items-center justify-center text-gray-500">
              No usage data available
            </div>
          )}
        </CardContent>
      </Card>

      {/* Credit Types Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Credit Usage by Type</CardTitle>
          <CardDescription>How you're spending your credits</CardDescription>
        </CardHeader>
        <CardContent>
          {creditTypes.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={creditTypes}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="credits" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[200px] flex items-center justify-center text-gray-500">
              No credit usage data available
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}