"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

export function UsageCharts() {
  // Mock data - replace with actual data from Supabase
  const weeklyUsage = [
    { day: 'Mon', credits: 45 },
    { day: 'Tue', credits: 32 },
    { day: 'Wed', credits: 67 },
    { day: 'Thu', credits: 28 },
    { day: 'Fri', credits: 89 },
    { day: 'Sat', credits: 12 },
    { day: 'Sun', credits: 8 }
  ]

  const creditTypes = [
    { type: 'Email', count: 156, credits: 312 },
    { type: 'Phone', count: 43, credits: 215 },
    { type: 'Enrichment', count: 89, credits: 89 }
  ]

  return (
    <div className="space-y-6">
      {/* Weekly Usage Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Credit Usage</CardTitle>
          <CardDescription>Credits consumed over the last 7 days</CardDescription>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>

      {/* Credit Types Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Credit Usage by Type</CardTitle>
          <CardDescription>How you're spending your credits</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={creditTypes}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="credits" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}