# Project Requirements Document

## 1. Project Overview

LeadFuel is a B2B lead generation SaaS platform designed to help sales teams, SDRs, recruiters, and growth agencies discover, enrich, and engage high-quality prospects. Instead of juggling multiple databases or manual scraping, users get a single, data-rich interface with powerful search filters, real-time enrichment, and an easy credit-based unlock system. The goal is to replace tedious prospecting workflows with a fast, intuitive web app that surfaces accurate emails, phone numbers, and firmographics.

We’re building LeadFuel to accelerate pipeline creation and lower the cost per lead by combining a modern UI with robust backend services (Supabase, Stripe, Python ETL). Success will be measured by user adoption (daily active users), credits consumed per team, list-export volumes, and feedback on data accuracy and UI responsiveness. A smooth onboarding experience and consistent performance under load are also key success criteria.

## 2. In-Scope vs. Out-of-Scope

### In-Scope (MVP v1)

*   **Authentication & Onboarding**: Email/password sign-up, password reset, onboarding wizard, free 10-credit lifetime plan.
*   **Dashboard**: Credit balance, recent activity, team usage charts, shortcuts to core features.
*   **Advanced Lead Prospector**: 20+ filters (industry, location, size, tech stack), full-text search, instant result updates.
*   **Contact & Company Profiles**: Enriched details (job history, company data, social links), unlock gated data with credits.
*   **Credit-Based Unlock System**: Email = 2 credits, Phone = 5 credits; no double charging; transaction logs.
*   **List Management & Team Sharing**: Create/rename/delete personal & shared lists, bulk add/remove, CSV/XML export, custom column mappings.
*   **Subscription & Billing**: Stripe integration, free/starter/pro/business tiers, pay-as-you-go add-ons, invoices, upgrade/downgrade flows.
*   **Notifications**: In-app banners and email alerts for low credits, unlock confirmations, renewals.
*   **Roles & Permissions**: Organization Admin vs. Member; credit allocation, list-sharing permissions.
*   **Compliance Basics**: GDPR/CCPA consent flows, data deletion requests, CAN-SPAM–compliant emails.

### Out-of-Scope (Later Phases)

*   Native mobile apps or offline support.
*   Deep CRM integrations or two-way sync (Salesforce, HubSpot).
*   Slack, SMS, or other third-party notification channels.
*   AI-powered lookalike matching or automated email drafting.
*   Advanced scheduling beyond daily/weekly ETL pipelines.
*   Multi-lingual support or accessibility audits.

## 3. User Flow

A new user visits the landing page, clicks “Sign Up,” and enters email and password. After email verification, they step through a brief onboarding wizard that highlights credits, search, lists, and billing. They select the free plan (10 lifetime credits) or choose a paid plan. Once onboarded, they land on a personalized dashboard showing current credit balance, recent unlocks, and quick links to prospecting.

From the dashboard, the user opens the Advanced Lead Prospector screen. They apply filters (e.g., industry, location), type keywords in the full-text search, and scan live results. Clicking a contact opens the profile page with enrichment data; the user clicks “Unlock Email” or “Unlock Phone,” spends credits, and sees data revealed instantly. They save contacts to a personal or shared list, export via CSV/XML using a saved template, or invite teammates if they’re an Admin. Admins can allocate credits, manage billing, and review transaction logs in the billing section.

## 4. Core Features

*   **Authentication & Onboarding**

    *   Email/password sign-up, password reset, email verification.
    *   Onboarding wizard highlighting features and initial credit grant.

*   **User Dashboard**

    *   Credit balance widget, activity timeline, usage charts.
    *   Quick actions: “Prospect Leads,” “Manage Lists,” “Top Up Credits.”

*   **Advanced Lead Prospector**

    *   20+ attribute filters, full-text search, type-ahead suggestions.
    *   Instant result refresh, preview pane with enrichment indicators.

*   **Contact & Company Profiles**

    *   Enriched data: job history, social links, firmographics, technology stack.
    *   Gated fields (email, phone) unlocked via credits.

*   **Credit-Based Unlock System**

    *   Deduct 2 credits per email, 5 per phone; prevent double-charging.
    *   Transaction logs stored per user.

*   **List Management & Team Sharing**

    *   Create/rename/delete lists, assign view/edit/export permissions.
    *   Bulk add/remove contacts, CSV/XML export, custom column templates.

*   **Subscription & Billing**

    *   Stripe–powered plans (Free, Starter, Pro, Business) plus pay-as-you-go.
    *   Upgrade/downgrade, real-time credit top-ups, invoice history.

*   **Notifications**

    *   In-app banners and email alerts for low credits, unlock success, renewals.

*   **Roles & Permissions**

    *   Organization Admin: manage plan, allocate credits, invite members, view logs.
    *   Member: use allocated credits, manage personal lists, view shared lists.

*   **Compliance & Privacy**

    *   GDPR/CCPA consent capture, data retention policies, deletion workflows.
    *   CAN-SPAM–compliant email templates with opt-out links.

## 5. Tech Stack & Tools

*   **Frontend**

    *   Next.js 14, React, TypeScript
    *   BOlt.dev scaffold, Tailwind CSS, shadcn/ui, Radix UI, daisyUI
    *   Lucide Icons

*   **Backend & Database**

    *   Supabase (Postgres with RLS, Auth, Storage)
    *   Supabase Edge Functions for webhooks and light business logic
    *   PostgreSQL pg_trgm extension for fast fuzzy search

*   **ETL & Data Refresh**

    *   Python jobs orchestrated by Airbyte/Epify, scheduled daily/weekly

*   **Payments & Billing**

    *   Stripe Billing & Webhooks

*   **Hosting & Deployment**

    *   Vercel for frontend, Supabase managed backend

*   **AI (Future)**

    *   OpenAI GPT-4 for lookalike matching, email drafts, ICP suggestions

*   **IDE & Plugins**

    *   VSCode with Bolt extension, GitHub Copilot or Cursor

## 6. Non-Functional Requirements

*   **Performance**:

    *   Search queries respond within 300ms under typical load.
    *   Page load Time to Interactive <1 second.

*   **Scalability & Availability**:

    *   Support 1,000+ concurrent users; 99.9% uptime.
    *   Horizontal scaling of Supabase and Vercel functions.

*   **Security & Compliance**:

    *   TLS encryption in transit, AES-256 at rest.
    *   Row-Level Security for gated fields.
    *   GDPR/CCPA data subject access and deletion workflows.

*   **Usability & Accessibility**:

    *   Responsive design (desktop optimized).
    *   Keyboard navigation, correct ARIA roles.

## 7. Constraints & Assumptions

*   **API Rate Limits**:

    *   LinkedIn , [apolloi.io](http://apolloi.io) and Crunchbase official APIs impose request caps; implement backoff and caching.

*   **Data Licensing**:

    *   All scraping must comply with source terms of service.

*   **Credit Model**:

    *   Credits never expire; Org Admin allocates and reclaims credits.

*   **No CRM Integration**:

    *   MVP excludes Salesforce/HubSpot sync; planned for Phase 2.

*   **Design Guidelines Available**:

    *   UI will follow provided color palette, typography, and logo assets.

## 8. Known Issues & Potential Pitfalls

*   **API Rate Limiting**

    *   Mitigation: implement request queue, exponential backoff, and local caching of rare fields.

*   **RLS Misconfiguration**

    *   Mitigation: automated tests for each permission scenario; staging audit logs.

*   **Credit Deduction Race Conditions**

    *   Mitigation: wrap unlock flows in database transactions; optimistic locking.

*   **GDPR/CCPA Compliance Complexity**

    *   Mitigation: build modular consent and deletion endpoints from day one; log user consents.

*   **Search Performance at Scale**

    *   Mitigation: index key columns, monitor slow queries, add Redis cache for hot filters.

This PRD is the single source of truth for the AI to generate subsequent documents (Tech Stack, Frontend Guidelines, Backend Structure, etc.) without ambiguity.
