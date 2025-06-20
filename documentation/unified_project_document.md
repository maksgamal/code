# Unified Project Documentation

## Project Requirements Document

### 1. Project Overview

We are building LeadFuel, a B2B lead generation SaaS platform designed to help sales teams, SDRs, recruiters, and growth agencies find, enrich, and unlock high-quality leads quickly. By offering deep enrichment details, advanced filtering, and a transparent credit system, LeadFuel solves the core problem of scattered, outdated, or incomplete contact data that slows down outreach efforts.

The key objectives are to reduce time spent on lead research by at least 50%, enable teams to collaborate seamlessly on shared lists, and provide a frictionless billing and credit management experience. Success will be measured by user adoption rates, average credits consumed per user, and customer satisfaction scores. We’re building this because existing tools often force users to switch between multiple platforms, lack team-sharing features, or have opaque pricing models.

### 2. In-Scope vs. Out-of-Scope

**In-Scope:**

*   Homepage with sign-up, sign-in, password recovery and brief onboarding wizard
*   Advanced Lead Prospector interface with 20+ filters and full-text search
*   Personalized Dashboard showing credit balance, activity, charts, and shortcuts
*   Contact & Company Profile pages with enrichment data and unlock controls
*   List Management for personal and shared team lists, with CSV/XML export
*   Credit-based Unlock System (2 credits/email, 5 credits/phone) and transaction logs
*   Subscription Billing via Stripe: free plan, tiered monthly plans, and pay-as-you-go add-ons
*   Role-based access: Organization Admin and Member, with team credit sharing
*   GDPR, CCPA, and CAN-SPAM compliance flows, data retention, and deletion workflows
*   In-app and email notifications for low-credit warnings, unlock confirmations, and renewals
*   Supabase RLS rules enforcing plan-based data access

**Out-of-Scope (MVP):**

*   Native mobile apps
*   Deep bi-directional CRM integrations (Salesforce, HubSpot)
*   AI-driven features like lookalike matching or automatic email drafting (planned for future)
*   Public API for third-party developers

### 3. User Flow

A new user lands on the public homepage and chooses to sign up by entering their email and password. After confirming their email address, they complete a quick onboarding wizard that highlights credits, search, lists, and billing. They start on the free plan with lifetime credits, but can upgrade at any time. Once onboarded, they see their dashboard with current balance, recent activity, and shortcuts.

From the dashboard, users click “Prospect Leads” to open the Advanced Lead Prospector. They apply filters, view contact and company snippets, then unlock details with credits. Unlocked contacts can be saved into personal or shared team lists. Organization Admins can allocate credits to members and manage shared lists. When credits run low, in-app and email alerts prompt users to top up or upgrade. Users manage profile, payment methods, and notification preferences in the Account Settings area before returning to their main workflow.

### 4. Core Features

*   Homepage & Authentication: Streamlined registration, login, and password recovery
*   Advanced Lead Prospector: 20+ dynamic filters, full-text search, instant result previews
*   User Dashboard: Visual credit balance, usage charts, recent unlocks, and quick actions
*   Contact & Company Profiles: Enrichment data (job history, social links, company info) and gated unlocks
*   List Management & Team Sharing: Create, rename, export, and share personal and team lists
*   Credit-Based Unlock System: Clear costs, no double charging, detailed transaction logs
*   Subscription Billing & Plans: Free, Starter, Pro, Business, Elite with Stripe integration and pay-as-you-go
*   Roles & Permissions: Organization Admin vs. Member, credit allocation, list access controls
*   Notifications: In-app banners and email alerts for key events
*   Compliance & Security: GDPR/CCPA consent flows, data deletion, RLS in Supabase

### 5. Tech Stack & Tools

*   Frontend: Next.js 14, React, TypeScript, Tailwind CSS (daisyUI), shadcn/ui, Radix UI, Lucide Icons, Bolt scaffolding
*   Backend & Database: Supabase (PostgreSQL with RLS, Auth, Storage), Supabase Edge Functions
*   ETL & Data Refresh: Python jobs orchestrated via Epify/Airbyte, scheduled daily/weekly
*   Search: PostgreSQL pg_trgm extension for fast fuzzy matching
*   Payments & Billing: Stripe Billing API and Webhooks
*   Hosting & Deployment: Vercel for frontend, Supabase managed backend
*   AI (Future): OpenAI GPT-4 for lookalike matching and email drafting
*   IDE & Plugins: VSCode with Bolt extension, GitHub Copilot

### 6. Non-Functional Requirements

*   Performance: Search response times under 200ms, dashboard loads under 1s, 99.9% uptime target
*   Security: Encryption at rest and in transit, Supabase RLS, OWASP best practices
*   Compliance: Full GDPR, CCPA, and CAN-SPAM adherence, auditable logs
*   Scalability: Support for tens of thousands of users, auto-scaling backend
*   Monitoring: Real-time logging, error tracking, and alerting via Sentry or similar

### 7. Constraints & Assumptions

*   We rely on Supabase managed services for database and auth, assuming high availability
*   External APIs (LinkedIn, Crunchbase) have rate limits and licensing constraints; usage must respect ToS
*   Python ETL jobs assume consistent data schemas from sources
*   Credit logic assumes uniform costs across all users and no expiration
*   Environment targets Node.js 18+ and modern browsers

### 8. Known Issues & Potential Pitfalls

*   LinkedIn/Crunchbase API rate limits may throttle enrichment pipelines (mitigate with caching and backoff)
*   PostgreSQL pg_trgm performance could degrade on very large tables (use indexing and partitioning)
*   Edge Function cold starts could affect webhook latency (keep functions warm or batch calls)
*   RLS policy complexity might introduce access bugs (thorough testing and audits required)
*   Stripe webhook retries may conflict with duplicate credit charges (idempotency keys needed)
*   GDPR deletion workflows need careful handling to avoid orphaned records (cascade deletes or flags)

## App Flow Document

### Onboarding and Sign-In/Sign-Up

When a user first arrives at the LeadFuel homepage, they see clear prompts to sign up or log in. New users enter their email and password, verify their address via an emailed link, and complete a short onboarding wizard that explains credits, search filters, list management, and billing options. Existing users can log in directly or recover a lost password by requesting a reset link. Once signed in, they land on their dashboard.

### Main Dashboard or Home Page

Upon logging in, users see a personalized dashboard that shows their current credit balance, recent unlock activity, usage charts, and shortcuts like “Prospect Leads” or “Manage Lists.” A sidebar provides navigation to Search, Lists, Billing, and Account Settings. The dashboard highlights low-credit warnings and upcoming subscription renewals with in-app banners and links to the billing page.

### Detailed Feature Flows and Page Transitions

Clicking “Prospect Leads” opens the full-screen Lead Prospector, where users select filters such as industry, location, or company size. As filters are applied, results update instantly and show snippets of contacts and companies. Clicking a contact opens the profile page, which displays enrichment details and an “Unlock” button with the credit cost. After confirming, credits are deducted, the phone or email appears, and the transaction is logged. From here, users can save the contact to a personal or team list by choosing or creating a list. Creating or managing lists leads to the List Management page, where users can rename lists, adjust permissions, add or remove contacts in bulk, and initiate exports. Navigating back to the dashboard or switching to another feature happens smoothly via the sidebar or top navigation links.

### Settings and Account Management

In the Account Settings area, users update profile details, change passwords, and set notification preferences for low credits and renewals. Organization Admins see extra tabs for billing, plan upgrades, credit allocation, and member invites. After making changes, users click “Save” and receive an in-app confirmation before returning to their previous page or the main dashboard.

### Error States and Alternate Paths

If users enter invalid data—like a filter with unsupported parameters—the system shows a red banner explaining the issue and suggests fixes. Lost connectivity triggers a full-page fallback with a “Retry” button. When credits are insufficient, an in-app modal pops up with options to upgrade or buy pay-as-you-go credits. Restricted actions, such as exporting beyond plan limits, display an informative message with upgrade links.

### Conclusion and Overall App Journey

Overall, the user starts by signing up, explores key features via the dashboard, hones in on leads with advanced filters, unlocks and saves contacts, and manages their account and team credits. Every step is guided by clear prompts, informative banners, and fallback paths to keep the experience smooth from first visit to daily high-volume prospecting.

## Tech Stack Document

### Frontend Technologies

*   Next.js 14 (React framework for server-side rendering and static export)
*   React & TypeScript (type safety and strong developer experience)
*   Tailwind CSS with daisyUI (utility-first styling for rapid UI development)
*   shadcn/ui & Radix UI (accessible, customizable component libraries)
*   Lucide Icons (simple, consistent icon set)
*   Bolt Scaffold (AI-powered project setup and best practices)

These choices deliver a fast, responsive, and maintainable user interface.

### Backend Technologies

*   Supabase (PostgreSQL database with Row-Level Security, Auth, Storage)
*   Supabase Edge Functions (lightweight serverless functions for webhooks and business logic)
*   Python ETL jobs via Epify/Airbyte (scheduled data enrichment and refresh pipelines)
*   PostgreSQL pg_trgm (fuzzy search extension for fast lead filtering)
*   Stripe Billing API (subscription management and pay-as-you-go purchases)

Together, these components power reliable data storage, secure access control, and smooth enrichment workflows.

### Infrastructure and Deployment

*   Vercel (hosting and automatic deployments for the frontend)
*   Supabase Managed (hosted database, auth, and edge functions)
*   GitHub Actions CI/CD (automated testing and deployment pipelines)
*   Git for version control with trunk-based branching

This setup ensures fast, reliable deployments and easy rollbacks.

### Third-Party Integrations

*   Stripe (secure payments and subscription logic)
*   LinkedIn & Crunchbase APIs (official enrichment sources, respecting rate limits)
*   Public web scraping tools (compliant data gathering for additional enrichment)
*   Sentry (error tracking and monitoring)

Each integration adds essential data or functionality, improving lead quality and platform reliability.

### Security and Performance Considerations

*   Supabase RLS Policies (fine-grained access control per user and plan)
*   Encryption in transit (TLS) and at rest (AES-256)
*   Input validation and sanitization to prevent injection attacks
*   Response caching and query indexing for sub-200ms search responses
*   Rate limiting and retries for external API calls

These measures keep data safe and maintain fast performance.

### Conclusion and Overall Tech Stack Summary

Our stack centers on modern, well-supported tools that align with LeadFuel’s goals of speed, security, and scalability. By combining Next.js, Supabase, and Stripe, we create a robust foundation for rapid development, seamless user experiences, and straightforward scaling as usage grows.

## Frontend Guidelines Document

### Frontend Architecture

We use a component-based architecture built on Next.js with React and TypeScript. Pages leverage Next.js routing and server-side rendering for fast initial loads, while client-side navigation feels instant. Components live in a shared `components/ui` folder, styled with Tailwind CSS, shadcn/ui, and Radix UI for consistency. This setup supports easy maintenance, clear folder organization, and rapid feature additions.

### Design Principles

Our UI follows these principles:

*   Usability: clear labels, concise instructions, and visible feedback
*   Accessibility: keyboard navigation, ARIA attributes, and sufficient color contrast
*   Responsiveness: layouts adapt smoothly from mobile to desktop
*   Consistency: unified styling and component behavior across the app

### Styling and Theming

We use Tailwind CSS for utility-first styling, enhanced with daisyUI for base components. All colors, typography, and spacing live in `tailwind.config.js` under a shared theme. We follow a flat design aesthetic with a neutral palette of blues and grays, accenting calls to action in green. Fonts come from a single system-set with a sans-serif fallback for readability.

### Component Structure

Components are organized by feature under `components/`. Each component folder contains its React file, tests, and styles if needed. Reusable primitives (buttons, inputs, modals) live in `components/ui`. This keeps code discoverable and encourages reusability, reducing duplication.

### State Management

We use React Query (TanStack Query) for server state (data fetching, caching) and local state hooks or Context API for UI concerns. This approach avoids prop drilling, keeps data fresh, and simplifies optimistic updates when unlocking credits or saving lists.

### Routing and Navigation

Next.js file-based routing handles main pages (`/dashboard`, `/search`, `/lists`, `/billing`, `/settings`). A global `Layout` component wraps each page with a sidebar and header. We use `next/link` for client-side transitions and guard routes server-side in `middleware.ts` to enforce auth.

### Performance Optimization

We enable code splitting and lazy load heavy components (like the Advanced Prospector) with dynamic imports. Images and icons use next/image for optimized delivery. We cache common API responses in React Query and use edge caching via Vercel to reduce server load.

### Testing and Quality Assurance

*   Unit tests with Jest and React Testing Library for components
*   Integration tests using Cypress for critical flows (signup, search, unlock, billing)
*   Linting and formatting enforcement with ESLint and Prettier
*   CI pipeline runs tests and type checks on every pull request

### Conclusion and Overall Frontend Summary

Our frontend guidelines ensure a scalable, maintainable, and performant application that delivers a smooth user experience. By sticking to these architectural and design principles, we make it easy for new developers to onboard and for the product to evolve without sacrificing quality.

## Implementation Plan

1.  **Project Setup**: Use Bolt to scaffold the Next.js 14 + TypeScript project. Install dependencies (Tailwind, shadcn/ui, Radix, React Query, Supabase client, Stripe sdk).
2.  **Authentication & RLS**: Configure Supabase Auth, set up RLS policies for users, plans, and unlocked contacts. Build sign-up, login, and password reset pages.
3.  **Dashboard Skeleton**: Create `Dashboard` page with credit balance, usage charts (mock data), and sidebar navigation.
4.  **Lead Prospector UI**: Implement filter panel with dummy filters, full-text search input, and results grid. Integrate pg_trgm search in a Supabase Edge Function.
5.  **Profile & Unlock Logic**: Create Contact Profile page. Wire unlock button to deduct credits via Supabase function and log transactions.
6.  **List Management**: Build list CRUD UI, team sharing controls, and CSV/XML export logic using serverless API routes.
7.  **Billing Integration**: Integrate Stripe Billing; create subscription plans, checkout flow, and webhook handler in Supabase Edge Function.
8.  **Notifications**: Add in-app banner component and email templates; trigger events on low credit, unlocks, and renewals.
9.  **Settings & Roles**: Develop Account Settings page with profile update, password change, notification preferences. Add admin panel for member invites and credit allocation.
10. **ETL Pipelines**: Set up Python jobs in Epify/Airbyte for LinkedIn/Crunchbase enrichment and schedule them.
11. **Testing & QA**: Write unit and integration tests for all critical flows. Run Cypress tests in CI.
12. **Performance Tuning**: Add caching, optimize queries, and lazy load heavy components.
13. **Compliance & Security Review**: Verify GDPR/CCPA flows, data deletion, and audit logs. Conduct security tests.
14. **Launch & Monitor**: Deploy to Vercel and Supabase. Set up monitoring (Sentry, Postgres stats), and gather user feedback for iteration.

This plan delivers a robust MVP and lays the foundation for future AI features and advanced integrations.
