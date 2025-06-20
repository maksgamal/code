## 💡 Design Guidelines for LeadsFuel

### 1. **General Design Overview**

LeadsFuel is a **B2B lead-generation SaaS** tailored for high-performance sales and recruiting workflows. Think: **Apollo.io precision**, **Lemlist usability**, and **Uplead data richness**. It’s fast, clean, and responsive—with a priority on clarity and control.

**Design Personality**:

*   Functional, direct, slightly enterprise
*   Information-dense, yet breathable
*   Built for action and efficiency, not flair

**User Goals**:

*   Filter, search, and unlock leads fast
*   Build and manage enriched lists
*   Push leads to downstream tools (CRM, sequences)
*   Access rich contact/company info instantly

1.1 **Core Design Principles**

*   **Structure First** – Clear, nested layout zones with strong alignment
*   **Functional Elegance** – Let data shine through neutral UI
*   **Minimal Friction** – Shorten time-to-action across screens
*   **Consistency** – Unified style across modals, tables, and filters
*   **Keyboard-Friendly UX** – Power users = productivity boosters

### 2. **Color Scheme**

🎨 Primary Colors

|                |           |                                               |
| -------------- | --------- | --------------------------------------------- |
| Name           | HEX       | Usage                                         |
| LeadsFuel Blue | `#3B82F6` | Primary actions (buttons, icons, active tabs) |
| Graphite Gray  | `#111827` | Sidebar background, top bar                   |
| Ice Gray       | `#F9FAFB` | Background, table zones                       |

🎨 Accent & Status Colors

|              |           |                                    |
| ------------ | --------- | ---------------------------------- |
| Name         | HEX       | Usage                              |
| Violet Pulse | `#8B5CF6` | AI/Research actions, smart filters |
| Mint Success | `#10B981` | Success states, active filters     |
| Amber        | `#F59E0B` | Warnings, “low credits” alerts     |
| Red Alert    | `#EF4444` | Error states, invalid unlocks      |
| Yellow Gold  | `#FDE047` | Highlighted “Save” action bar      |

🎨 Neutral Grays

|             |           |                                  |
| ----------- | --------- | -------------------------------- |
| Name        | HEX       | Usage                            |
| Neutral-800 | `#374151` | Main text and titles             |
| Neutral-400 | `#9CA3AF` | Secondary labels, timestamp text |
| Neutral-200 | `#E5E7EB` | Divider lines, table borders     |

### 3. **Typography**

3.1 **Font Family**

*   **Primary**: `Inter` – Clean, modern, optimized for dashboard UIs
*   **Secondary**: `Roboto Mono` – For data tables and small meta labels

3.2 **Font Weights & Hierarchy**

|                |        |                                 |
| -------------- | ------ | ------------------------------- |
| Element        | Weight | Usage                           |
| H1             | 700    | Page headers                    |
| H2             | 600    | Section titles, filters         |
| H3             | 500    | Table headers, card titles      |
| Body           | 400    | Table data, forms, descriptions |
| Labels/Filters | 500    | All caps, slightly smaller      |

3.3 **Font Sizes (Desktop-first)**

|               |      |
| ------------- | ---- |
| Use Case      | Size |
| H1            | 24px |
| H2            | 20px |
| Table Headers | 14px |
| Body Text     | 14px |
| Captions      | 12px |
| CTA Buttons   | 16px |

### 4. **UI Components**

🧭 Global Layout

Left Sidebar

*   Sticky left, collapsible to icon-only
*   Grouped by usage frequency: Home, People, Companies, Lists, Enrichment, etc.
*   Icons: Lucide (stroke, monochrome)

Top Bar

*   Fixed, clean with subtle shadow

*   Contains:

    *   Global Search (`Ctrl+K`)
    *   Credit Balance
    *   Notifications
    *   “Research with AI” (purple)
    *   User Avatar & Menu

### 📋 Core Pages

🔍 People & Companies Search Page

**Left Filter Sidebar**

*   Scrollable, grouped
*   Support AND/OR/NOT filtering logic
*   Show filter count indicators
*   “+ Add Filter” and “More Filters” drawer

**Main Table Area**

*   Resizable, draggable columns
*   Sticky headers
*   Rows clickable to open detail modals
*   Bulk selector on hover

**Visible Columns**

*   Name | Job Title | Company | Email | Phone | Location | Company Size | Industry | Actions

**Bulk Action Bar**

*   Appears when rows are selected
*   Actions: Save, Email, Export, Push to CRM, AI Research
*   “Save” in **highlight yellow**

🧍 Contact Detail Modal

*   Slide-over drawer
*   Action buttons: Save, Unlock, Add to List
*   Info: Name, Title, Email/Phone (with lock), Social, Timeline, Tags

🏢 Company Detail Modal

*   Same structure as contact modal
*   Adds: Website, Tech Stack, NAICS, Revenue, Signals

📦 Lists Page

*   Tabs: People Lists | Company Lists
*   Each row shows: List Name, Type, Created By, # of Records, Tags
*   “Create New List” → modal with tags & visibility settings

📊 Analytics & Usage

*   Dashboard modules:

    *   Usage Graph (by time)
    *   Unlock Log Table
    *   Team Breakdown
    *   Most-used Filters

📑 Saved Filters UX

*   Save any filter combo
*   Editable names, tags
*   “Pin to Top”
*   Show usage frequency

### 5. **Mobile UX & Accessibility**

*   **Responsive Priority**: Desktop-first, Tablet optimized
*   **Mobile (V2)**: Slide-over filters, stacked list UI
*   **Tap targets**: ≥ 44px
*   **Keyboard Shortcuts**: `Ctrl+K`, `E` (email), `/` (search)
*   **High contrast** and **focus rings** for accessibility

### 6. **Icons & Visual Style**

*   **Icon Set**: Lucide (modern, stroke-weight, scalable)
*   **Illustrations**: Only for onboarding, in muted grays/purple
*   **Photos**: Avatar-style, circular, minimal

### 7. **Microinteractions & Animations**

*   Row hover highlights
*   Tooltip fades
*   Unlock progress animation (e.g. spinner or tick)
*   Modal slides or fades

### 8. **Performance Considerations**

*   Lazy-load long tables
*   Virtual scrolling for >100 results
*   Load fonts async with `font-display: swap`
*   Cache filters and table config locally

### 9. **Security & Privacy Design**

*   Email/Phone locked behind confirmation
*   “Unlock with X credits” + tooltip
*   GDPR: Full profile delete + export option
*   Confirmation modals for destructive actions

### 🔄 Conclusion

This unified design system gives **LeadsFuel** a robust and intuitive visual identity that matches the expectations of modern sales teams. It borrows the best interaction patterns from top SaaS tools while reinforcing brand trust and speed. This guide is ready for developer integration, Figma handoff, or AI training ingestion.
