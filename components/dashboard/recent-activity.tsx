"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Mail, Phone, UserPlus, Download } from 'lucide-react'

export function RecentActivity() {
  // Mock data - replace with actual data from Supabase
  const activities = [
    {
      id: 1,
      type: 'unlock_email',
      description: 'Unlocked email for John Smith at TechCorp',
      credits: 2,
      timestamp: '2 minutes ago',
      icon: Mail
    },
    {
      id: 2,
      type: 'unlock_phone',
      description: 'Unlocked phone for Sarah Johnson at StartupXYZ',
      credits: 5,
      timestamp: '15 minutes ago',
      icon: Phone
    },
    {
      id: 3,
      type: 'list_add',
      description: 'Added 12 contacts to "Q1 Prospects" list',
      credits: 0,
      timestamp: '1 hour ago',
      icon: UserPlus
    },
    {
      id: 4,
      type: 'export',
      description: 'Exported "Enterprise Leads" list as CSV',
      credits: 0,
      timestamp: '2 hours ago',
      icon: Download
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest actions and credit usage</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
              <div className="p-2 rounded-full bg-white">
                <activity.icon className="h-4 w-4 text-gray-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{activity.description}</p>
                <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
              </div>
              {activity.credits > 0 && (
                <Badge variant="secondary" className="text-xs">
                  -{activity.credits} credits
                </Badge>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}