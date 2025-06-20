"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Mail, Phone, UserPlus, Download, Zap } from 'lucide-react'
import { useTransactions } from '@/hooks/use-transactions'
import { Skeleton } from '@/components/ui/skeleton'
import { formatDistanceToNow } from 'date-fns'

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'unlock_email':
      return Mail
    case 'unlock_phone':
      return Phone
    case 'list_add':
      return UserPlus
    case 'export':
      return Download
    case 'enrichment':
      return Zap
    default:
      return Zap
  }
}

const getActivityDescription = (transaction: any) => {
  const contactName = transaction.contact 
    ? `${transaction.contact.first_name || ''} ${transaction.contact.last_name || ''}`.trim()
    : 'Unknown Contact'
  
  const companyName = transaction.contact?.organization?.name || 'Unknown Company'

  switch (transaction.type) {
    case 'unlock_email':
      return `Unlocked email for ${contactName} at ${companyName}`
    case 'unlock_phone':
      return `Unlocked phone for ${contactName} at ${companyName}`
    case 'enrichment':
      return `Enriched data for ${contactName}`
    case 'export':
      return transaction.description || 'Exported data'
    default:
      return transaction.description || 'Unknown activity'
  }
}

export function RecentActivity() {
  const { data: transactions, isLoading } = useTransactions(5)

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest actions and credit usage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <Skeleton className="h-5 w-16" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!transactions || transactions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest actions and credit usage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Zap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No recent activity</p>
            <p className="text-sm text-gray-400">Start prospecting to see your activity here</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest actions and credit usage</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => {
            const ActivityIcon = getActivityIcon(transaction.type)
            return (
              <div key={transaction.id} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                <div className="p-2 rounded-full bg-white">
                  <ActivityIcon className="h-4 w-4 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    {getActivityDescription(transaction)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(transaction.created_at), { addSuffix: true })}
                  </p>
                </div>
                {transaction.credits_used > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    -{transaction.credits_used} credits
                  </Badge>
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}