# Tech Stack Document

This document explains the technology choices for our B2B lead generation platform in simple, everyday language. Each section clarifies why we picked certain tools, how they work together, and what benefits they bring.

## 1. Frontend Technologies

These are the building blocks for everything users see and interact with in their browser.

• Next.js\
– Provides a fast, SEO-friendly foundation for our web app.\
– Lets us create pages that load quickly and update smoothly as users navigate.

• React\
– A popular library for building dynamic, responsive interfaces.\
– Helps us break the UI into reusable pieces (components) for faster development.

• TypeScript\
– Adds checks for common coding mistakes, making our code more reliable.\
– Improves collaboration by clearly defining the shape of data and functions.

• Tailwind CSS\
– A utility-first styling tool that speeds up design by giving us ready-made CSS classes.\
– Keeps our styling consistent and easy to adjust.

• shadcn/ui, Radix UI, daisyUI\
– Collections of pre-built interface components (buttons, modals, inputs).\
– Ensure a polished, accessible look without reinventing the wheel.

• Lucide Icons\
– Lightweight, customizable icons that match our design system.\
– Enhance readability and guide users with familiar visuals.

• Clerk Auth\
– Manages user sign-up, log-in, password resets, and session handling.\
– Offers a smooth, secure authentication experience out of the box.

• OpenAI (future AI features)\
– Powers suggested search terms, email draft generation, and lookalike lead recommendations.\
– Will make prospecting smarter and more automated over time.

Together, these tools create a powerful, data-rich interface that feels fast, modern, and intuitive—exactly what sales teams and recruiters need.

## 2. Backend Technologies

These components power data storage, business logic, and search capabilities behind the scenes.

• Supabase (PostgreSQL database, Storage)\
– Stores users, contacts, companies, lists, transactions, and more in a secure, scalable database.\
– Row-Level Security (RLS) ensures each user or team sees only the data they’re allowed to.

• Supabase Edge Functions\
– Run small pieces of custom code (webhooks, light business logic) close to the database.\
– Handle Stripe billing events, credit deductions, and other real-time tasks without managing servers.

• PostgreSQL pg_trgm extension\
– Accelerates fuzzy, full-text searches for leads.\
– Provides instant, typo-tolerant search results across company names, roles, and other fields.

• Python ETL jobs (Airbyte/Epify)\
– Regularly pull and refresh enrichment data from public sources and partner APIs (LinkedIn, Crunchbase).\
– Clean, normalize, and load data into our database on daily or weekly schedules.

These backend pieces ensure our app can store, secure, enrich, and search large datasets quickly and reliably.

## 3. Infrastructure and Deployment

This layer keeps our app running smoothly, scales with demand, and automates releases.

• Vercel (frontend hosting & CI/CD)\
– Automatically builds and deploys our Next.js code on every commit.\
– Delivers pages from edge locations around the world for super-fast load times.

• Supabase managed hosting\
– Handles database scaling, backups, and high availability without manual operations.\
– Includes built-in monitoring and automated updates.

• Version Control & Collaboration\
– GitHub is used for code hosting, version history, and code reviews.\
– Team members work in branches, submit pull requests, and follow best practices enforced by Bolt and GitHub Actions.

These choices give us reliable uptime, easy rollbacks, and quick feature releases—all with minimal ops overhead.

## 4. Third-Party Integrations

We enhance our core platform with specialized services to deliver extra value.

• Stripe Billing & Webhooks\
– Powers subscription plans, one-time credit purchases, and invoice management.\
– Sends real-time events to our Edge Functions to update user credit balances immediately.

• LinkedIn & Crunchbase APIs, public web scraping\
– Provide fresh contact and company enrichment data (job history, firmographics, social profiles).\
– We follow each service’s usage policies, handle rate limits, and ensure legal, ethical data collection.

• Email Delivery (CAN-SPAM compliant)\
– Sends verification emails, password resets, and notification alerts.\
– Includes opt-out links and accurate sender information to meet compliance requirements.

These integrations let us focus on core lead-generation features while leveraging best-in-class data and billing services.

## 5. Security and Performance Considerations

We put protective measures in place to safeguard data and deliver a smooth user experience.

• Authentication & Authorization\
– Clerk handles secure user sign-in and session management.\
– Supabase Row-Level Security ensures users only access their data and team-shared lists.

• Data Privacy & Compliance\
– GDPR/CCPA consent flows capture user permissions for data processing.\
– Data deletion and export workflows let users control their personal information.\
– CAN-SPAM–compliant email templates guarantee lawful outreach.

• Encryption & Transport Security\
– TLS secures all data in transit between users and our servers.\
– AES-256 encryption at rest protects database backups and file storage.

• Performance Optimizations\
– Fuzzy search powered by pg_trgm lets filters and full-text search return in under 300 ms.\
– CDN caching (via Vercel) and edge rendering reduce page-load times to under 1 second.

• Monitoring & Error Handling\
– Automated alerts for failed ETL jobs, high response latency, or API rate-limit errors.\
– In-app and email notifications inform users of low-credit warnings and system events.

These precautions help us maintain a secure, compliant platform that performs well under load.

## 6. Conclusion and Overall Tech Stack Summary

Our technology choices work together to deliver a fast, secure, and user-friendly B2B lead generation platform:

• A modern frontend (Next.js, React, TypeScript, Tailwind CSS, UI libraries) for a polished, intuitive interface.\
• A robust backend (Supabase, PostgreSQL, Edge Functions, Python ETL) for data storage, security, and enrichment.\
• Automated deployment and scaling (Vercel, Supabase managed) to ensure reliability and rapid updates.\
• Strategic third-party services (Stripe, LinkedIn/Crunchbase APIs, email delivery) to power billing, data, and compliance.\
• Built-in security measures (Clerk Auth, Row-Level Security, GDPR/CCPA workflows) and performance tuning (pg_trgm, CDN caching) for a smooth user experience.

Together, these technologies align perfectly with our goals: making the platform data-rich, powerful, and easy to use—so sales teams and recruiters can focus on what matters most: finding and engaging high-quality leads.”
