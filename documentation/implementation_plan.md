# Implementation plan

## Phase 1: Environment Setup

1.  Prevalidation: Detect if current directory is already a Next.js project by checking for `package.json` and `next.config.js`; if found, skip project initialization. (Summary: Starter Kit)
2.  Install Node.js v20.2.1 and Python 3.11.4. (Summary: Tech Stack)
3.  Validation: Run `node -v` and `python --version` to confirm Node.js v20.2.1 and Python 3.11.4. (Summary: Tech Stack)
4.  Clone the CodeGuide Starter Pro repository to `./leadgen-platform`. (Summary: Starter Kit)
5.  `cd leadgen-platform` and initialize a new Git repository: `git init`. (Summary: Starter Kit)
6.  Install project dependencies: `npm install`. (Summary: Starter Kit)
7.  Create `cursor_metrics.md` in the project root for Cursor metrics tracking. (Summary: IDE / Plugins)
8.  Create a `.cursor` directory in the project root. (Summary: IDE / Plugins)
9.  Create `.cursor/mcp.json` and add it to `.gitignore`. (Summary: IDE / Plugins)
10. Add the following MCP configuration to `.cursor/mcp.json` (macOS example shown; replace `<connection-string>` after step 11):

`{ "mcpServers": { "supabase": { "command": "npx", "args": ["-y", "@modelcontextprotocol/server-postgres", "<connection-string>"] } } } `(Summary: Tech Stack)

1.  Display this link for the Supabase connection string: <https://supabase.com/docs/guides/getting-started/mcp#connect-to-supabase-using-mcp>. Prompt user to paste the production connection string. (Summary: Tech Stack)
2.  After user provides the connection string, replace `<connection-string>` in `.cursor/mcp.json`. (Summary: Tech Stack)
3.  In Cursor, navigate to Settings → MCP and verify a green active status for the Supabase server. (Summary: IDE / Plugins)

## Phase 2: Frontend Development

1.  Create a Next.js 14 TypeScript app at `/frontend` by running:

`npx create-next-app@14 --ts frontend `(Summary: Tech Stack)

1.  Note: Use Next.js 14 (not latest) for compatibility with LLM tools. (Summary: Tech Stack)
2.  `cd frontend` and install Tailwind CSS, shadcn/ui, Radix UI, daisyUI, Lucide Icons, and Clerk SDK:

`npm install tailwindcss@3 shadcn-ui radix-ui daisyui lucide-react @clerk/nextjs `(Summary: Tech Stack)

1.  Initialize Tailwind CSS at `/frontend`:

`npx tailwindcss init -p `(Summary: Tech Stack)

1.  Configure `tailwind.config.js` to include `shadcn-ui` and `daisyUI` in the `content` array. (Summary: Tech Stack)
2.  Create `/frontend/src/styles/globals.css` and import Tailwind directives. (Summary: Tech Stack)
3.  Configure Clerk in Next.js: add `middleware.ts` and `clerk.ts` as per Clerk docs in `/frontend/src/lib/`. (Summary: Tech Stack)
4.  Wrap the entire app in `ClerkProvider` in `/frontend/pages/_app.tsx`. (Summary: Core Features)
5.  Build authenticated homepage at `/frontend/pages/index.tsx` following the design at `preview--leads-fuel-lovable.lovable.app/auth`. (Summary: Core Features)
6.  Validation: Start dev server `npm run dev` and confirm the homepage loads with Clerk sign-in button. (Summary: Core Features)
7.  Scaffold Dashboard page at `/frontend/pages/dashboard.tsx`, including credit balances, recent activity, and shortcuts as per “User Dashboard” spec. (Summary: Core Features)
8.  Validation: Log in via Clerk to ensure `/dashboard` is protected and displays user info. (Summary: Core Features)
9.  Create Lead Prospector UI at `/frontend/components/Prospector.tsx` with 20+ filters and full-text search input. (Summary: Core Features)
10. Validation: Render `<Prospector />` on `/dashboard` and verify filter form appears. (Summary: Core Features)
11. Build List Management components under `/frontend/components/lists/`, including list creation, team sharing, and CSV/XML export buttons. (Summary: Core Features)
12. Configure CSV/XML export: create `/frontend/utils/export.ts` with customizable field mapping. (Summary: Core Features)
13. Validation: Click export button on sample list and inspect generated CSV/XML file. (Summary: Core Features)

## Phase 3: Backend Development

1.  Install Supabase CLI: `npm install -g supabase`. (Summary: Tech Stack)

2.  Run `supabase init` in project root to create `/supabase` folder. (Summary: Tech Stack)

3.  Create tables in PostgreSQL 15.3 via `/supabase/migrations/`:

    *   `users`, `plans`, `contacts`, `organizations`, `employment_history`, `lists`, `list_contacts`, `transactions`, `credit_purchases`, `email_finder_logs`, `email_validation_logs`, `hidden_contacts`, `hidden_companies`, `icp_profiles`. (Summary: Supabase Schema)

4.  Define RLS policies in each table to restrict email/phone fields based on user plan, credits, and unlock history. (Summary: RLS & Pricing)

5.  Validation: Run `supabase db reset` and `supabase db push`; then query `SELECT * FROM contacts LIMIT 1`. (Summary: Supabase Schema)

6.  Develop Supabase Edge Function at `/supabase/functions/webhooks/stripe.ts` to handle Stripe Billing webhooks and insert into `credit_purchases`. (Summary: Payments & Billing)

7.  Validation: Deploy Edge Functions locally with `supabase functions serve` and simulate a Stripe event. (Summary: Payments & Billing)

8.  Create Python ETL jobs under `/etl/` using Airbyte/Epify to fetch and refresh public web scrape, LinkedIn API, and Crunchbase Pro API data. (Summary: ETL & Data Refresh)

9.  Schedule ETL jobs via GitHub Actions or cron to run daily/weekly as per spec. (Summary: ETL & Data Refresh)

10. Validation: Run `python /etl/run_all.py` and confirm data was inserted into `contacts` and `organizations`. (Summary: ETL & Data Refresh)

## Phase 4: Integration

1.  Implement API routes in `/frontend/pages/api/` to proxy Supabase calls for contact search and unlocking. (Summary: Core Features)
2.  In `/frontend/hooks/useSearch.ts`, connect to `/api/search` using `fetch` or `axios`. (Summary: Core Features)
3.  Deduct credits by calling `/api/unlock` which invokes an Edge Function to create a `transaction` record and return email/phone. (Summary: Core Features)
4.  Validation: Unlock an email in UI and verify `transactions` table has a new record via Supabase dashboard. (Summary: Core Features)
5.  Send in-app banners and email alerts by creating notifications service in `/backend/notifications/` triggered on low-credit or unlock events. (Summary: Core Features)
6.  Validation: Simulate low-credit condition and verify email alert is sent via configured SMTP. (Summary: Core Features)

## Phase 5: Deployment

1.  Deploy frontend to Vercel: connect GitHub repo, set env vars (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, Clerk keys, Stripe keys). (Summary: Hosting & Deployment)
2.  Deploy Supabase database and Edge Functions by running `supabase deploy --project-ref YOUR_PROJECT_REF`. (Summary: Hosting & Deployment)
3.  Validation: Run end-to-end test with Cypress hitting the production URL; ensure signup, search, unlock flows succeed. (Summary: Q&A: Pre-Launch Checklist)
4.  Configure CI/CD in GitHub Actions: run lint, tests, and `supabase db push` on `main` branch merges. (Summary: Hosting & Deployment)
