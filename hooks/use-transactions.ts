"use client"

import { useQuery } from '@tanstack/react-query'
import { useSupabase } from '@/utils/supabase/context'
import { useUser } from '@clerk/nextjs'
import type { Transaction } from '@/types/leadfuel.types'

export function useTransactions(limit = 10) {
  const { user } = useUser()
  const supabase = useSupabase()

  return useQuery({
    queryKey: ['transactions', user?.id, limit],
    queryFn: async (): Promise<Transaction[]> => {
      if (!user?.id) return []

      const { data, error } = await supabase
        .from('transactions')
        .select(`
          *,
          contact:contacts(
            id,
            first_name,
            last_name,
            organization:organizations(name)
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(limit)

      if (error) {
        throw error
      }

      return data || []
    },
    enabled: !!user?.id,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}