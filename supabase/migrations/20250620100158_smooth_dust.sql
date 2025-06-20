/*
  # LeadFuel Database Schema

  1. New Tables
    - `plans` - Subscription plans with credit allocations
    - `users` - User profiles with credit balances and plan assignments
    - `organizations` - Company records for lead data
    - `contacts` - Individual lead records with enrichment data
    - `lists` - User-created lists for organizing leads
    - `list_contacts` - Join table for contacts in lists
    - `transactions` - Credit usage history
    - `credit_purchases` - Records of credit top-ups

  2. Security
    - Enable RLS on all tables
    - Add policies for user data access
    - Ensure users can only access their own data
*/

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Plans table
CREATE TABLE IF NOT EXISTS plans (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  monthly_credits INTEGER NOT NULL DEFAULT 0,
  price_cents INTEGER NOT NULL DEFAULT 0,
  features JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Users table (extends Clerk auth)
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY, -- Clerk user ID
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  plan_id INTEGER REFERENCES plans(id) DEFAULT 1,
  credit_balance INTEGER DEFAULT 10, -- Free tier starts with 10 credits
  role TEXT DEFAULT 'member' CHECK (role IN ('admin', 'member')),
  organization_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Organizations table
CREATE TABLE IF NOT EXISTS organizations (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  website TEXT,
  industry TEXT,
  size_range TEXT,
  location TEXT,
  description TEXT,
  enrichment_data JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id SERIAL PRIMARY KEY,
  organization_id INTEGER REFERENCES organizations(id),
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  phone TEXT,
  title TEXT,
  linkedin_url TEXT,
  location TEXT,
  enrichment_data JSONB DEFAULT '{}'::jsonb,
  is_email_unlocked BOOLEAN DEFAULT false,
  is_phone_unlocked BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Lists table
CREATE TABLE IF NOT EXISTS lists (
  id SERIAL PRIMARY KEY,
  owner_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  is_shared BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- List contacts junction table
CREATE TABLE IF NOT EXISTS list_contacts (
  list_id INTEGER REFERENCES lists(id) ON DELETE CASCADE,
  contact_id INTEGER REFERENCES contacts(id) ON DELETE CASCADE,
  added_by TEXT REFERENCES users(id),
  added_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (list_id, contact_id)
);

-- Transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id SERIAL PRIMARY KEY,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('unlock_email', 'unlock_phone', 'enrichment', 'export')),
  credits_used INTEGER NOT NULL DEFAULT 0,
  contact_id INTEGER REFERENCES contacts(id),
  description TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Credit purchases table
CREATE TABLE IF NOT EXISTS credit_purchases (
  id SERIAL PRIMARY KEY,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  credits_added INTEGER NOT NULL,
  amount_cents INTEGER NOT NULL,
  stripe_payment_intent_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE list_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_purchases ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Plans: Public read access
CREATE POLICY "Plans are publicly readable" ON plans
  FOR SELECT USING (true);

-- Users: Users can only access their own data
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.jwt() ->> 'sub' = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.jwt() ->> 'sub' = id);

-- Organizations: Public read access for now
CREATE POLICY "Organizations are publicly readable" ON organizations
  FOR SELECT USING (true);

-- Contacts: Public read access for now
CREATE POLICY "Contacts are publicly readable" ON contacts
  FOR SELECT USING (true);

-- Lists: Users can only access their own lists or shared lists
CREATE POLICY "Users can view own lists" ON lists
  FOR SELECT USING (auth.jwt() ->> 'sub' = owner_id OR is_shared = true);

CREATE POLICY "Users can create lists" ON lists
  FOR INSERT WITH CHECK (auth.jwt() ->> 'sub' = owner_id);

CREATE POLICY "Users can update own lists" ON lists
  FOR UPDATE USING (auth.jwt() ->> 'sub' = owner_id);

CREATE POLICY "Users can delete own lists" ON lists
  FOR DELETE USING (auth.jwt() ->> 'sub' = owner_id);

-- List contacts: Users can manage contacts in their lists
CREATE POLICY "Users can view list contacts" ON list_contacts
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM lists 
      WHERE lists.id = list_contacts.list_id 
      AND (lists.owner_id = auth.jwt() ->> 'sub' OR lists.is_shared = true)
    )
  );

CREATE POLICY "Users can add contacts to their lists" ON list_contacts
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM lists 
      WHERE lists.id = list_contacts.list_id 
      AND lists.owner_id = auth.jwt() ->> 'sub'
    )
  );

CREATE POLICY "Users can remove contacts from their lists" ON list_contacts
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM lists 
      WHERE lists.id = list_contacts.list_id 
      AND lists.owner_id = auth.jwt() ->> 'sub'
    )
  );

-- Transactions: Users can only view their own transactions
CREATE POLICY "Users can view own transactions" ON transactions
  FOR SELECT USING (auth.jwt() ->> 'sub' = user_id);

CREATE POLICY "Users can create transactions" ON transactions
  FOR INSERT WITH CHECK (auth.jwt() ->> 'sub' = user_id);

-- Credit purchases: Users can only view their own purchases
CREATE POLICY "Users can view own credit purchases" ON credit_purchases
  FOR SELECT USING (auth.jwt() ->> 'sub' = user_id);

CREATE POLICY "Users can create credit purchases" ON credit_purchases
  FOR INSERT WITH CHECK (auth.jwt() ->> 'sub' = user_id);

-- Insert default plans
INSERT INTO plans (name, monthly_credits, price_cents, features) VALUES
  ('Free', 10, 0, '["10 lifetime credits", "Basic search", "Email support"]'),
  ('Starter', 500, 2900, '["500 monthly credits", "Advanced filters", "List management", "Email support"]'),
  ('Pro', 2000, 9900, '["2000 monthly credits", "All filters", "Team sharing", "Priority support", "API access"]'),
  ('Business', 5000, 19900, '["5000 monthly credits", "Unlimited lists", "Advanced analytics", "Dedicated support", "Custom integrations"]'),
  ('Enterprise', 20000, 49900, '["20000 monthly credits", "White-label options", "Custom data sources", "24/7 support", "SLA guarantee"]')
ON CONFLICT DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_organization ON contacts(organization_id);
CREATE INDEX IF NOT EXISTS idx_contacts_name ON contacts USING gin((first_name || ' ' || last_name) gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_organizations_name ON organizations USING gin(name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_transactions_user_created ON transactions(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_lists_owner ON lists(owner_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lists_updated_at BEFORE UPDATE ON lists
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();