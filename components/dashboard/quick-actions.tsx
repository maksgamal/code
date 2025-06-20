"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Search, Users, List, Download } from 'lucide-react'
import Link from 'next/link'

export function QuickActions() {
  const actions = [
    {
      title: 'Prospect Leads',
      description: 'Find new leads with advanced filters',
      icon: Search,
      href: '/dashboard/prospector',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Manage Lists',
      description: 'Organize and export your saved leads',
      icon: List,
      href: '/dashboard/lists',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'View People',
      description: 'Browse your contact database',
      icon: Users,
      href: '/dashboard/people',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      title: 'Export Data',
      description: 'Download your leads as CSV/XML',
      icon: Download,
      href: '/dashboard/export',
      color: 'bg-orange-500 hover:bg-orange-600'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((action) => (
        <Card key={action.title} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${action.color}`}>
                <action.icon className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm">{action.title}</h3>
                <p className="text-xs text-muted-foreground">{action.description}</p>
                <Link href={action.href}>
                  <Button variant="ghost" size="sm" className="mt-2 p-0 h-auto">
                    Get Started →
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}