"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { 
  Home, 
  Search, 
  Users, 
  Building2, 
  List, 
  CreditCard, 
  Settings,
  Zap
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Prospect Leads', href: '/dashboard/prospector', icon: Search },
  { name: 'People', href: '/dashboard/people', icon: Users },
  { name: 'Companies', href: '/dashboard/companies', icon: Building2 },
  { name: 'Lists', href: '/dashboard/lists', icon: List },
  { name: 'Billing', href: '/dashboard/billing', icon: CreditCard },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <div className="flex items-center gap-2">
          <Zap className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-900">LeadFuel</span>
        </div>
      </div>
      
      <nav className="px-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}