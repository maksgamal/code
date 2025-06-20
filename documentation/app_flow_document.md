# App Flow Document

## Onboarding and Sign-In/Sign-Up

When a new visitor arrives at the landing page, they will see an invitation to register or log in. The registration page prompts the user to enter an email address, choose a secure password, and confirm the password. After submitting these details, the user receives an email verification link. Clicking the link activates their account and directs them to a brief onboarding wizard.

The onboarding wizard appears as a sequence of screens that introduce the core features: credit balances, advanced lead prospecting, list management, and subscription billing. During this flow, the user is given the choice to accept the free lifetime credits plan or select one of the paid subscription tiers. Once the plan is selected, the onboarding wizard completes and the user is taken to the main dashboard.

Returning users who choose to log in are greeted by a sign-in page where they enter their email and password. If the credentials are valid, they proceed to the dashboard. A sign-out link is always available in the header. Should a user forget their password, they can click a “Forgot Password” link on the sign-in page, enter their registered email, and receive a password reset link. Following the link leads to a form to choose and confirm a new password, after which they are redirected to the sign-in page.

## Main Dashboard or Home Page

After logging in, the user lands on the dashboard, which features a prominent credit balance display at the top along with a summary of recent unlock activity. A sidebar on the left provides links to the Advanced Lead Prospector, List Management, Billing and Subscription, and Settings. Across the top, a header shows the application logo on the left, the user’s name with a dropdown for sign-out on the right, and notification icons for in-app alerts.

The central area of the dashboard is divided into cards and charts that visualize credit usage trends, upcoming subscription renewals, and team activity for users with admin privileges. Quick-access buttons located beneath these visual elements allow the user to jump directly to prospecting leads, create or manage lists, and purchase additional credits.

## Detailed Feature Flows and Page Transitions

### Advanced Lead Prospector

When the user clicks the “Prospect Leads” link in the sidebar, the full-screen prospecting interface opens. At the top is a search input with full-text capabilities. Along the left side, a collapsible panel lists over twenty filter options such as industry, location, company size, and technology stack. As the user adjusts filters or types in the search field, the results grid refreshes instantly.

Search results display company names and contact snippets in rows. Hovering over or clicking a row reveals a preview pane on the right that shows enrichment indicators including email status and phone availability. From this view, the user can click to open the contact’s full profile or add the record directly to a list via a small action button.

### Viewing and Enriching Contacts

Opening a contact from the results or preview pane leads to the Contact Profile page. This page is organized in sections for personal information, employment history, company details, and social profiles. Fields for email and phone number are displayed as gated elements with an icon showing the credit cost: two credits for email and five credits for a phone number.

When the user clicks the unlock icon, a confirmation dialog appears recapping the credit deduction and the user’s remaining balance. Confirming the action deducts the appropriate credits, logs the transaction, and reveals the requested information inline. A toast notification confirms success, and the user can proceed to export or save the contact to a list.

### List Management and Team Sharing

Selecting “Lists” in the sidebar opens the List Management page where the user can view personal and shared team lists. On this page, lists appear in a table that shows each list’s name, owner, and last updated date. To create a new list, the user clicks a button at the top of the page, enters a list name in a modal dialog, and, if they are an admin, sets sharing permissions for team members before saving.

Inside an individual list view, contacts appear in a spreadsheet-style layout. The user can add or remove contacts one at a time or in bulk by selecting multiple rows. Inline editing allows notes or tags to be attached to each record. An export button opens a dialog where the user chooses CSV or XML format, selects a saved column template or customizes a new one, and confirms the export. Shared lists update in real time for all team members, and any changes by one member are immediately visible to others.

### Credit-Based Unlock System

The credit system is woven into every page that offers gated data. The top bar always shows the current credit balance. Whenever the user attempts to unlock an email or phone number, the system checks if that field has been previously unlocked. If it has not, credits are deducted within a consistent, transactional flow that prevents double charging. Each deduction is recorded in the transaction log, accessible to admins in the billing section. If the balance falls below a configured threshold, an in-app banner appears warning of low credits and prompting a top-up.

### Subscription and Billing

Organization admins access the billing page through the sidebar. On this page, they see the current plan, monthly credit allocation, and a history of invoices. A button labeled “Manage Subscription” launches a Stripe-hosted checkout flow where the admin can upgrade or downgrade the plan and purchase pay-as-you-go credit bundles. After completing payment, the user is redirected back to the billing page where the updated credit balance appears immediately and a confirmation email is sent.

In case of payment failures or upcoming renewals, the system sends automated email alerts and displays banners on the dashboard. All billing events are tracked via webhooks and stored in the database for future reference.

### Notifications and Alerts

Critical events such as successful unlocks, low-credit warnings, and subscription renewals trigger in-app banners that slide down from the top of the screen. These banners remain visible until the user dismisses them. At the same time, each event generates an email alert with detailed information, ensuring the user is informed even when not actively using the app.

## Settings and Account Management

The Settings section is reached by clicking the user’s name in the header and selecting “Settings.” The first tab allows the user to update personal information such as name, email, and password. A separate area lists notification preferences where the user can toggle in-app banners and email alerts for each event type. Organization admins see an additional tab for team settings, where they can invite or remove members, allocate credits to individuals, and adjust role-based permissions for list sharing and transaction log access.

A Privacy and Compliance tab offers GDPR and CCPA controls. Here, users can review and withdraw consent for data processing, download their data, or request deletion of their account. After saving changes, the user is returned to the main settings overview, and a toast confirms successful updates.

## Error States and Alternate Paths

If the user enters invalid credentials at sign-in or sign-up, an inline error message explains the issue and prompts correction. During password recovery, entering an unregistered email shows a neutral confirmation message for security. In the prospecting and list pages, network failures display a full-width alert bar with a retry button. Attempting to unlock data with insufficient credits triggers a modal explaining the shortage and offering a link to the billing page.

Should a user without admin privileges try to access billing or team settings, the system redirects them back to the dashboard with an error message indicating insufficient permissions. Rate-limit errors from external enrichment APIs are surfaced as subtle inline warnings within the prospecting interface, and the user can retry the action after a short delay.

## Conclusion and Overall App Journey

From the moment a user signs up to their daily prospecting routines, the application flow guides them seamlessly through discovery, enrichment, and collaboration. They register with email and password, verify their address, and complete a concise onboarding wizard that sets the stage for usage. Arriving at the dashboard, they immediately see their credit balance and recent activity, then dive into the Advanced Lead Prospector to filter and search for leads. Viewing a contact profile lets them spend credits to unlock key data before saving qualified prospects to lists. Teams collaborate through shared lists and transparent credit allocation managed by admins in the billing section. Notifications keep everyone informed of low balances and renewal dates. Settings empower users with control over their personal details, permissions, and compliance needs. In every step, clear navigation and consistent feedback ensure that sales teams, recruiters, and growth agencies can focus on discovering high-quality leads without friction.
