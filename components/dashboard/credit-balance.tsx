"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Coins, TrendingUp, AlertTriangle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { useUserData } from '@/hooks/use-user-data'
import { useUsageStats } from '@/hooks/use-usage-stats'
import { Skeleton } from '@/components/ui/skeleton'

export function CreditBalance() {
  const { data: user, isLoading: userLoading } = useUserData()
  const { data: stats, isLoading: statsLoading } = useUsageStats()

  if (userLoading || statsLoading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Credit Balance</CardTitle>
          <Coins className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <Skeleton className="h-8 w-20 mb-2" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-24" />
            </div>
          </div>
          <div className="mt-4">
            <Skeleton className="h-2 w-full" />
          </div>
        </CardContent>
      </Card>
    )
  }

  const creditBalance = user?.credit_balance || 0
  const monthlyAllocation = stats?.monthlyAllocation || 0
  const usedThisMonth = stats?.monthlyUsed || 0
  const isLowCredit = creditBalance < 50

  return (
    <Card className={isLowCredit ? 'border-amber-200 bg-amber-50' : ''}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Credit Balance</CardTitle>
        <Coins className={`h-4 w-4 ${isLowCredit ? 'text-amber-600' : 'text-blue-600'}`} />
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold flex items-center gap-2">
              {creditBalance}
              {isLowCredit && (
                <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Low
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {monthlyAllocation > 0 ? (
                `${usedThisMonth}/${monthlyAllocation} used this month`
              ) : (
                'Lifetime credits remaining'
              )}
            </p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              Buy Credits
            </Button>
            <Button size="sm">
              Upgrade Plan
            </Button>
          </div>
        </div>
        
        {/* Progress bar - only show for monthly plans */}
        {monthlyAllocation > 0 && (
          <div className="mt-4">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Monthly Usage</span>
              <span>{Math.round((usedThisMonth / monthlyAllocation) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min((usedThisMonth / monthlyAllocation) * 100, 100)}%` }}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}