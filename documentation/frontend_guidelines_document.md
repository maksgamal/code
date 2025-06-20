# Frontend Guideline Document

This document outlines the frontend architecture, design principles, and technologies for our B2B lead generation SaaS platform. It’s written in everyday language so that anyone on the team—technical or not—can understand how the frontend is set up and why.

## 1. Frontend Architecture

### Frameworks and Libraries

*   **Next.js 14** (App Router): our core framework for file-based routing, server-side rendering (SSR), and edge functions.
*   **React + TypeScript**: for building UI components with type safety.
*   **Tailwind CSS**: utility-first styling to keep our CSS small and consistent.
*   **shadcn/ui + Radix UI + daisyUI**: prebuilt, accessible UI primitives and components that we customize with Tailwind.
*   **Lucide Icons**: lightweight icons that integrate smoothly with React.
*   **Clerk Auth**: user authentication, session management, and multi-tenant support out of the box.

### Scalability, Maintainability, Performance

*   **Server & Client Components**: Next.js lets us load UI on the server when possible and hand off to the browser only for interactive parts. This reduces bundle sizes and speeds up first paint.
*   **File-based routing with layouts**: nested `app/` folders help us reuse headers, sidebars, and footers across pages.
*   **Utility-first CSS**: Tailwind’s purge step strips unused styles, keeping CSS bundles tiny as the app grows.
*   **Edge Functions**: Supabase + Vercel edge functions let us offload logic to the edge, reducing latency for data-fetching and auth checks.

## 2. Design Principles

### Usability

*   Clear labeling, intuitive filters, and progressive disclosure (showing advanced options only when needed).
*   Consistent button styles, hover/focus states, and in-context help (tooltips, inline hints) for new users.

### Accessibility

*   All interactive elements use proper ARIA roles and keyboard focus outlines.
*   Color contrast meets WCAG AA standards for text and UI controls.
*   Semantic HTML (e.g., `<button>`, `<nav>`, `<main>`) for screen readers.

### Responsiveness

*   Mobile-first design: breakpoints at 640px (sm), 768px (md), 1024px (lg), 1280px (xl).
*   Flexbox and CSS Grid for fluid layouts.
*   Touch-friendly hit areas and collapsible sidebars on small screens.

## 3. Styling and Theming

### Styling Approach

*   **Utility-First** with **Tailwind CSS**: write classes like `px-4 py-2 bg-primary text-white` instead of hand-crafting CSS files.
*   **Component Libraries**: use shadcn/ui and Radix UI primitives for accessibility and daisyUI for ready-made patterns.

### Theming

*   Tailwind’s built-in theming feature (`tailwind.config.js`) defines colors, fonts, and shadows.
*   **Dark Mode** via the `class` strategy—toggle a `dark` class on the `<html>` element.

### Visual Style

*   **Modern Flat** design with subtle shadows and glassmorphism accents on cards and modals.
*   Generous whitespace for readability and clean data tables.

### Color Palette

|            |                     |         |
| ---------- | ------------------- | ------- |
| Name       | Role                | Hex     |
| Primary    | Buttons, links      | #4F46E5 |
| Secondary  | Highlights, badges  | #9333EA |
| Accent     | Callouts, alerts    | #F59E0B |
| Neutral    | Text, borders       | #374151 |
| Background | Page and card BG    | #FFFFFF |
| Info       | Info banners        | #3B82F6 |
| Success    | Success states      | #10B981 |
| Warning    | Warnings and alerts | #FBBF24 |
| Error      | Error messages      | #EF4444 |

### Typography

*   **Font Family**: Inter, sans-serif—clean, modern, highly legible at small sizes.
*   **Scale**: base 16px, headings from 1.5rem (`h1`) down to 1rem (`h4+`).

## 4. Component Structure

### Folder Layout (Next.js App Directory)

`app/ layout.tsx # Root layout (header, footer) page.tsx # Homepage dashboard/ layout.tsx # Dashboard nav/sidebar page.tsx # Dashboard overview prospector/ page.tsx # Lead prospector components/ ui/ # shadcn/ui & Radix wrappers atoms/ # Smallest bits: Button, Input, Icon molecules/ # Composed bits: Card, Modal, Table organisms/ # Larger sections: FilterPanel, ProfileCard hooks/ # Custom React hooks (e.g., useCredits) contexts/ # React Context providers (Auth, Theme) utils/ # Helpers (formatDate, apiClient) styles/ # global.css (Tailwind base imports)`

### Reuse and Consistency

*   **Atomic Design**: build small “atoms” (buttons, inputs) first, then combine into “molecules” and “organisms.”
*   **Single source of truth**: shared UI components in `components/ui` for typography, spacing, and colors.

## 5. State Management

### Local vs. Global State

*   **Local**: React’s `useState` and `useReducer` for per-component UI state (e.g., open/closed modals).
*   **Global**: React Context for theme toggles and user info (Clerk session).

### Data Fetching and Caching

*   Use Next.js **Server Components** for initial data fetches (e.g., lists of contacts).
*   **Client Components** use the Supabase JS SDK for interactive queries (unlocking contacts, credit checks).
*   Optional: introduce **React Query / SWR** later for advanced caching and pagination.

## 6. Routing and Navigation

*   **File-based Routing**: every folder under `app/` becomes a route.
*   **Nested Layouts**: share headers, sidebars, and footers at different route levels.
*   **Navigation**: next/link for client-side transitions, next/navigation’s `useRouter` for programmatic redirects.
*   **Protected Routes**: wrapper components that check Clerk auth session before rendering pages.

## 7. Performance Optimization

*   **SSR & ISR**: Next.js renders critical pages on the server, with incremental static regeneration for less frequent data.
*   **Code Splitting & Lazy Loading**: dynamic `import()` for large modules (e.g., map visualizations or CSV export logic).
*   **Image Optimization**: Next/Image for resizing, responsive srcsets, and built-in lazy loading.
*   **PurgeCSS**: Tailwind automatically removes unused CSS classes in production.
*   **Asset Hosting**: serve static assets (icons, fonts) via CDN (Vercel).

## 8. Testing and Quality Assurance

### Unit and Integration Tests

*   **Jest + React Testing Library**: test individual components and UI interactions (filters, forms, modals).
*   **Vitest**: lighter alternative to Jest, if preferred.

### End-to-End Tests

*   **Cypress** or **Playwright**: simulate user flows (login, search, unlock lead, export CSV).

### Linting and Formatting

*   **ESLint** with the Next.js and TypeScript presets.
*   **Prettier** for consistent code formatting.
*   **Tailwind CSS Linter**: enforce design tokens and utility-first conventions.

## 9. Conclusion and Frontend Summary

Our frontend combines Next.js for server-driven pages, React for dynamic UI, and Tailwind CSS plus shadcn/ui/Radix/daisyUI for a fast, consistent look and feel. We follow clear design principles—usability, accessibility, responsiveness—and keep performance high with SSR, lazy loading, and PurgeCSS. Component-based structure and React Context make our code easy to maintain and extend as we add features like AI-powered matching or email drafting. With this guideline, anyone on the team can confidently build, test, and scale the frontend while keeping a unified user experience.

If you have any questions or want to dive deeper into a specific section, feel free to reach out!
