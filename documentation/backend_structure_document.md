# Backend Structure Document

This document outlines the complete backend setup for LeadFuel, a B2B lead generation SaaS platform. It’s written in everyday language so anyone can understand how the backend is organized, hosted, and maintained.

## 1. Backend Architecture

**Overall Design**

*   Serverless-first approach:

    *   Core logic lives in Supabase Edge Functions (small, focused units of code).
    *   Heavy lifting (data storage, auth, real-time) handled by Supabase (PostgreSQL).

*   Microservices flavor for ETL jobs:

    *   Python scripts run on Epify/Airbyte for scheduled imports and enrichments.

**Frameworks & Patterns**

*   Supabase for the majority of backend services (Auth, Database, Storage, Edge Functions).
*   Event-driven flows via webhooks (Stripe, external data sources).
*   RESTful access to database tables + custom endpoints in Edge Functions.

**Scalability, Maintainability & Performance**

*   **Scalability**: Serverless functions auto-scale based on load; PostgreSQL scales vertically and horizontally via Supabase.

*   **Maintainability**: Clear separation between data (PostgreSQL), business logic (Edge Functions), and ETL (Python jobs).

*   **Performance**:

    *   `pg_trgm` extension on Postgres for blazing-fast full-text search.
    *   CDN (via Vercel) and caching headers for static assets and API responses.

## 2. Database Management

**Database Technology**

*   Type: Relational (SQL).
*   System: Supabase PostgreSQL with built-in Row-Level Security (RLS).

**Data Organization & Access**

*   Data is organized into logical tables (users, contacts, companies, lists, transactions, etc.).

*   Each table has RLS policies to ensure users only see data they’re allowed to (based on plan, credit balance, ownership).

*   Access patterns:

    *   Real-time reads via Supabase’s client libraries.
    *   Bulk operations via scheduled Python ETL jobs.

**Data Management Practices**

*   Daily/weekly refresh of external data (LinkedIn, Crunchbase, public web scraping) via Airbyte/Epify pipelines.
*   Automated backups and point-in-time recovery handled by Supabase.
*   Migrations versioned and applied via Supabase CLI.

## 3. Database Schema

Below is a human-readable overview followed by SQL definitions for the main tables.

### Human-Readable Schema Overview

*   **users**: Registered accounts, assigned plan, current credit balance.
*   **plans**: Definition of subscription tiers and included features.
*   **contacts**: Individual lead records (name, email, phone, job title, enrichment fields).
*   **organizations**: Company records linked to contacts.
*   **employment_history**: Historical roles for each contact.
*   **lists**: Saved collections of leads (team or personal).
*   **list_contacts**: Join table linking contacts to lists.
*   **transactions**: Credit usage history (which user spent credits, how many, why).
*   **credit_purchases**: Records of credits bought via Stripe.
*   **email_finder_logs**: History of generated emails (Edge Function calls).
*   **email_validation_logs**: SMTP validation results.
*   **hidden_contacts** / **hidden_companies**: User-hidden records.
*   **icp_profiles**: User-saved Ideal Customer Profile filters.

### SQL Schema (PostgreSQL)

`-- 1. Plans CREATE TABLE plans ( id SERIAL PRIMARY KEY, name TEXT NOT NULL, monthly_credits INTEGER NOT NULL, features JSONB, price_cents INTEGER NOT NULL, created_at TIMESTAMPTZ DEFAULT NOW() ); -- 2. Users CREATE TABLE users ( id UUID PRIMARY KEY DEFAULT gen_random_uuid(), email TEXT UNIQUE NOT NULL, plan_id INTEGER REFERENCES plans(id), credit_balance INTEGER DEFAULT 0, role TEXT DEFAULT 'member', created_at TIMESTAMPTZ DEFAULT NOW() ); -- 3. Organizations CREATE TABLE organizations ( id SERIAL PRIMARY KEY, name TEXT NOT NULL, website TEXT, industry TEXT, created_at TIMESTAMPTZ DEFAULT NOW() ); -- 4. Contacts CREATE TABLE contacts ( id SERIAL PRIMARY KEY, organization_id INTEGER REFERENCES organizations(id), first_name TEXT, last_name TEXT, email TEXT, phone TEXT, title TEXT, enrichment JSONB, created_at TIMESTAMPTZ DEFAULT NOW() ); -- 5. Employment History CREATE TABLE employment_history ( id SERIAL PRIMARY KEY, contact_id INTEGER REFERENCES contacts(id), company TEXT, title TEXT, start_date DATE, end_date DATE ); -- 6. Lists CREATE TABLE lists ( id SERIAL PRIMARY KEY, owner_id UUID REFERENCES users(id), name TEXT NOT NULL, is_shared BOOLEAN DEFAULT FALSE, created_at TIMESTAMPTZ DEFAULT NOW() ); -- 7. List_Contacts CREATE TABLE list_contacts ( list_id INTEGER REFERENCES lists(id), contact_id INTEGER REFERENCES contacts(id), added_by UUID REFERENCES users(id), added_at TIMESTAMPTZ DEFAULT NOW(), PRIMARY KEY(list_id, contact_id) ); -- 8. Transactions CREATE TABLE transactions ( id SERIAL PRIMARY KEY, user_id UUID REFERENCES users(id), type TEXT NOT NULL, -- 'unlock_email', 'unlock_phone', etc. credits_used INTEGER NOT NULL, contact_id INTEGER, created_at TIMESTAMPTZ DEFAULT NOW() ); -- 9. Credit Purchases CREATE TABLE credit_purchases ( id SERIAL PRIMARY KEY, user_id UUID REFERENCES users(id), stripe_charge_id TEXT NOT NULL, credits_added INTEGER NOT NULL, amount_cents INTEGER NOT NULL, created_at TIMESTAMPTZ DEFAULT NOW() ); -- 10. Email Finder Logs CREATE TABLE email_finder_logs ( id SERIAL PRIMARY KEY, user_id UUID REFERENCES users(id), contact_id INTEGER, input_data JSONB, output_email TEXT, status TEXT, created_at TIMESTAMPTZ DEFAULT NOW() ); -- 11. Email Validation Logs CREATE TABLE email_validation_logs ( id SERIAL PRIMARY KEY, user_id UUID REFERENCES users(id), email TEXT, smtp_result JSONB, created_at TIMESTAMPTZ DEFAULT NOW() ); -- 12. Hidden Records CREATE TABLE hidden_contacts ( user_id UUID REFERENCES users(id), contact_id INTEGER REFERENCES contacts(id), hidden_at TIMESTAMPTZ DEFAULT NOW(), PRIMARY KEY(user_id, contact_id) ); CREATE TABLE hidden_companies ( user_id UUID REFERENCES users(id), organization_id INTEGER REFERENCES organizations(id), hidden_at TIMESTAMPTZ DEFAULT NOW(), PRIMARY KEY(user_id, organization_id) ); -- 13. ICP Profiles CREATE TABLE icp_profiles ( id SERIAL PRIMARY KEY, user_id UUID REFERENCES users(id), name TEXT NOT NULL, filters JSONB, created_at TIMESTAMPTZ DEFAULT NOW() );`

## 4. API Design and Endpoints

The platform uses a mix of auto-generated RESTful endpoints (via Supabase) and custom Edge Functions.

**RESTful Supabase Endpoints**

*   `GET /rest/v1/contacts?select=...` – fetch contacts (RLS applies).
*   `POST /rest/v1/lists` – create a new list.
*   `PATCH /rest/v1/users/:id` – update credit balance or plan.

**Custom Edge Functions**

*   `/functions/stripe-webhook` (POST): Handle subscription events, create credit purchases, update user plan.
*   `/functions/email-finder` (POST): Enrich contact with predicted email (2 credits).
*   `/functions/validate-email` (POST): SMTP validate an email (1 credit).
*   `/functions/share-list` (POST): Invite team members to a shared list.

**Communication Flow**

1.  Frontend calls Supabase Auth to sign in.
2.  On successful login, client uses Supabase client library to fetch data via REST.
3.  For credit-consuming actions, frontend calls the relevant Edge Function, then updates transactions table.
4.  Stripe webhooks post to Edge Function to keep billing and credit state in sync.

## 5. Hosting Solutions

**Frontend**

*   Vercel:

    *   Global CDN for fast asset delivery.
    *   Automatic scaling, zero-config deployments from GitHub.

**Backend & Database**

*   Supabase:

    *   Managed PostgreSQL with automatic backups and updates.
    *   Edge Functions run in Supabase’s serverless environment (scale-to-zero, then auto-scale).
    *   Storage for file uploads (e.g., CSV exports).

**ETL Jobs**

*   Epify/Airbyte:

    *   Hosted pipelines for scheduled data ingestion.
    *   Connectors for LinkedIn API, Crunchbase API, public web pages.

**Why These Choices?**

*   Reliability: Managed services reduce operational overhead.
*   Scalability: Serverless and managed databases grow with demand.
*   Cost-Effectiveness: Pay only for what you use, free tiers for early stages.

## 6. Infrastructure Components

*   **Load Balancers**:

    *   Built into Vercel and Supabase serverless platforms.

*   **Caching**:

    *   CDN edge caching for static assets (Vercel).
    *   HTTP cache headers for non-sensitive GET requests.

*   **Search Engine**:

    *   PostgreSQL `pg_trgm` for fuzzy matching and full-text search.

*   **Content Delivery Network (CDN)**:

    *   Vercel’s global network for frontend.

*   **Queueing (Future)**:

    *   Possibility to add Redis/Queue (e.g., Supabase Realtime or external) for background tasks if volume grows.

## 7. Security Measures

*   **Authentication**:

    *   Clerk (via Supabase Auth) for email/password, magic links, OAuth providers.

*   **Authorization**:

    *   Row-Level Security on every table to enforce per-user and per-plan access.
    *   Role checks in Edge Functions (`admin`, `member`).

*   **Data Encryption**:

    *   In-transit: HTTPS/TLS on all endpoints.
    *   At-rest: Supabase-managed disk encryption.

*   **Compliance**:

    *   GDPR, CCPA, CAN-SPAM:

        *   Consent capture on signup.
        *   Data deletion workflows on request.
        *   Opt-out tracking for email sends.

## 8. Monitoring and Maintenance

*   **Monitoring Tools**:

    *   Supabase Dashboard: DB metrics (CPU, connections, queries).
    *   Vercel Insights: Deployment and latency metrics.
    *   Logging: Edge Function logs in Supabase; option to forward to Logflare or Sentry.

*   **Alerting**:

    *   Set thresholds on error rates and latency; send alerts via Slack or email.

*   **Maintenance Practices**:

    *   Versioned database migrations with Supabase CLI.
    *   Regular dependency scanning (Dependabot, GitHub Actions).
    *   Scheduled reviews of RLS policies and API usage.

## 9. Conclusion and Overall Backend Summary

LeadFuel’s backend is a modern, serverless-first architecture built on Supabase and Vercel. It:

*   **Supports rapid growth** with auto-scaling functions and managed Postgres.
*   **Keeps data secure** via RLS, encryption, and compliance workflows.
*   **Maintains high performance** with pg_trgm search, CDN caching, and scheduled ETL pipelines.
*   **Is cost-efficient** by relying on pay-as-you-use services and a clear separation of concerns.

This setup aligns with our goal: giving sales teams, recruiters, and agencies a fast, secure, and scalable lead generation tool—without the overhead of traditional infrastructure management.
