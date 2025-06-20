export interface Plan {
  id: number
  name: string
  monthly_credits: number
  price_cents: number
  features: string[]
  is_active: boolean
  created_at: string
}

export interface User {
  id: string
  email: string
  first_name?: string
  last_name?: string
  plan_id: number
  credit_balance: number
  role: 'admin' | 'member'
  organization_id?: string
  created_at: string
  updated_at: string
  plan?: Plan
}

export interface Organization {
  id: number
  name: string
  website?: string
  industry?: string
  size_range?: string
  location?: string
  description?: string
  enrichment_data: Record<string, any>
  created_at: string
}

export interface Contact {
  id: number
  organization_id?: number
  first_name?: string
  last_name?: string
  email?: string
  phone?: string
  title?: string
  linkedin_url?: string
  location?: string
  enrichment_data: Record<string, any>
  is_email_unlocked: boolean
  is_phone_unlocked: boolean
  created_at: string
  organization?: Organization
}

export interface List {
  id: number
  owner_id: string
  name: string
  description?: string
  is_shared: boolean
  created_at: string
  updated_at: string
  contact_count?: number
}

export interface Transaction {
  id: number
  user_id: string
  type: 'unlock_email' | 'unlock_phone' | 'enrichment' | 'export'
  credits_used: number
  contact_id?: number
  description?: string
  metadata: Record<string, any>
  created_at: string
  contact?: Contact
}

export interface CreditPurchase {
  id: number
  user_id: string
  credits_added: number
  amount_cents: number
  stripe_payment_intent_id?: string
  created_at: string
}