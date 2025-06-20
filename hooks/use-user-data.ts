"use client"

import { useQuery } from '@tanstack/react-query'
import { useSupabase } from '@/utils/supabase/context'
import { useUser } from '@clerk/nextjs'
import type { User } from '@/types/leadfuel.types'

export function useUserData() {
  const { user: clerkUser } = useUser()
  const supabase = useSupabase()

  return useQuery({
    queryKey: ['user-data', clerkUser?.id],
    queryFn: async (): Promise<User | null> => {
      if (!clerkUser?.id) return null

      // First, try to get existing user
      const { data: existingUser, error: fetchError } = await supabase
        .from('users')
        .select(`
          *,
          plan:plans(*)
        `)
        .eq('id', clerkUser.id)
        .single()

      if (existingUser) {
        return existingUser
      }

      // If user doesn't exist, create them
      if (fetchError?.code === 'PGRST116') {
        const { data: newUser, error: createError } = await supabase
          .from('users')
          .insert({
            id: clerkUser.id,
            email: clerkUser.primaryEmailAddress?.emailAddress || '',
            first_name: clerkUser.firstName || '',
            last_name: clerkUser.lastName || '',
            plan_id: 1, // Default to Free plan
            credit_balance: 10 // Free tier credits
          })
          .select(`
            *,
            plan:plans(*)
          `)
          .single()

        if (createError) {
          throw createError
        }

        return newUser
      }

      throw fetchError
    },
    enabled: !!clerkUser?.id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}