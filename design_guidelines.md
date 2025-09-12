# Design Guidelines for Tax Accounting Blog Management System

## Design Approach: Reference-Based (Medium + WordPress Inspired)
Drawing inspiration from Medium's clean reading experience and WordPress's comprehensive admin interface, optimized for professional tax accounting content.

## Core Design Elements

### A. Color Palette
**Primary Colors:**
- Primary: 44 64% 38% (Professional Blue #2C5AA0)
- Secondary: 210 29% 29% (Slate Gray #34495E)
- Background: 0 0% 100% (White #FFFFFF)
- Text: 210 29% 24% (Dark Gray #2C3E50)

**Accent Colors:**
- Accent: 204 70% 53% (Bright Blue #3498DB)
- Success: 145 63% 42% (Green #27AE60)

**Dark Mode:**
- Background: 210 29% 12%
- Surface: 210 29% 16%
- Text: 0 0% 95%

### B. Typography
**Font Stack:** Noto Sans / Source Sans Pro via Google Fonts
- Headings: 600-700 weight, clear hierarchy (2xl, xl, lg)
- Body: 400 weight, 16px base, 1.6 line-height
- UI Elements: 500 weight for buttons and labels

### C. Layout System
**Spacing Units:** Tailwind 2, 4, 8, 12, 16
- Consistent p-4, m-8 patterns
- Component spacing: gap-4, gap-8
- Section padding: py-12, px-4

### D. Component Library

**Public Blog Site:**
- Clean article cards with typography focus
- Minimal navigation bar with search
- Article content with generous whitespace
- Category/tag filtering sidebar
- SEO-optimized meta displays

**Admin Dashboard:**
- WordPress-inspired sidebar navigation
- Rich text editor with toolbar
- Content scheduling interface
- AI generation panel with prompts
- Analytics cards and charts
- Media library with drag-drop upload

**Shared Components:**
- Professional button styles (filled primary, outline secondary)
- Form inputs with focus states
- Modal dialogs for confirmations
- Toast notifications for actions
- Loading states with skeleton screens

### E. Visual Hierarchy
- Bold typography for content emphasis
- Subtle shadows for card elevation
- Clear content sections with borders
- Professional iconography (Heroicons)
- Consistent button sizing and spacing

### F. Content-First Design
- Reading-optimized article layouts
- Clear content categorization
- Intuitive admin workflow
- Mobile-responsive grid system
- Fast-loading optimized images

## Images
No large hero images required. Focus on:
- Article thumbnail images (16:9 aspect ratio)
- Author avatars (circular, small)
- Category icons (minimal, professional)
- Dashboard charts and data visualizations

The design prioritizes content readability and professional aesthetics suitable for tax accounting expertise, balancing clean public presentation with powerful admin functionality.