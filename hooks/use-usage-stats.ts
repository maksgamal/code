"use client"

import { useQuery } from '@tanstack/react-query'
import { useSupabase } from '@/utils/supabase/context'
import { useUser } from '@clerk/nextjs'

interface UsageStats {
  weeklyUsage: Array<{ day: string; credits: number }>
  creditTypes: Array<{ type: string; count: number; credits: number }>
  monthlyUsed: number
  monthlyAllocation: number
}

export function useUsageStats() {
  const { user } = useUser()
  const supabase = useSupabase()

  return useQuery({
    queryKey: ['usage-stats', user?.id],
    queryFn: async (): Promise<UsageStats> => {
      if (!user?.id) {
        return {
          weeklyUsage: [],
          creditTypes: [],
          monthlyUsed: 0,
          monthlyAllocation: 0
        }
      }

      // Get user's plan allocation
      const { data: userData } = await supabase
        .from('users')
        .select('plan:plans(monthly_credits)')
        .eq('id', user.id)
        .single()

      const monthlyAllocation = userData?.plan?.monthly_credits || 0

      // Get this month's transactions
      const startOfMonth = new Date()
      startOfMonth.setDate(1)
      startOfMonth.setHours(0, 0, 0, 0)

      const { data: monthlyTransactions } = await supabase
        .from('transactions')
        .select('credits_used')
        .eq('user_id', user.id)
        .gte('created_at', startOfMonth.toISOString())

      const monthlyUsed = monthlyTransactions?.reduce((sum, t) => sum + t.credits_used, 0) || 0

      // Get last 7 days usage
      const sevenDaysAgo = new Date()
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

      const { data: weeklyTransactions } = await supabase
        .from('transactions')
        .select('credits_used, created_at')
        .eq('user_id', user.id)
        .gte('created_at', sevenDaysAgo.toISOString())

      // Group by day
      const weeklyUsage = Array.from({ length: 7 }, (_, i) => {
        const date = new Date()
        date.setDate(date.getDate() - (6 - i))
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' })
        
        const dayCredits = weeklyTransactions?.filter(t => {
          const transactionDate = new Date(t.created_at)
          return transactionDate.toDateString() === date.toDateString()
        }).reduce((sum, t) => sum + t.credits_used, 0) || 0

        return { day: dayName, credits: dayCredits }
      })

      // Get credit types breakdown
      const { data: typeBreakdown } = await supabase
        .from('transactions')
        .select('type, credits_used')
        .eq('user_id', user.id)
        .gte('created_at', startOfMonth.toISOString())

      const creditTypes = typeBreakdown?.reduce((acc, t) => {
        const existing = acc.find(item => item.type === t.type)
        if (existing) {
          existing.count += 1
          existing.credits += t.credits_used
        } else {
          acc.push({
            type: t.type.replace('unlock_', '').replace(/^\w/, c => c.toUpperCase()),
            count: 1,
            credits: t.credits_used
          })
        }
        return acc
      }, [] as Array<{ type: string; count: number; credits: number }>) || []

      return {
        weeklyUsage,
        creditTypes,
        monthlyUsed,
        monthlyAllocation
      }
    },
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}