# Procese Tehnologice - Project Context

## Overview
Multilingual business website for TechFlow Solutions offering technological process digitization solutions for various industries. Built with Next.js 16, TypeScript, and Tailwind CSS.

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Google Material Icons
- **Images**: Unsplash (configured in next.config.ts)
- **Deployment**: Docker (standalone output)

## Languages
- Romanian (ro) - default
- English (en)
- German (de)

## Project Structure
```
src/
├── app/[lang]/
│   ├── page.tsx              # Homepage
│   ├── layout.tsx            # Main layout with Header/Footer
│   ├── about/
│   │   ├── page.tsx          # About page
│   │   └── values/[slug]/    # Individual value pages
│   ├── contact/
│   │   └── page.tsx          # Contact page (server component)
│   ├── industries/
│   │   ├── page.tsx          # Industries list
│   │   └── [slug]/page.tsx   # Industry detail pages
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── IndustryCard.tsx
│   ├── LanguageSwitcher.tsx
│   └── ContactForm.tsx       # Client component for form
├── lib/
│   ├── i18n/
│   │   ├── config.ts         # Locale configuration
│   │   ├── get-dictionary.ts # Dictionary loader
│   │   └── dictionaries/     # ro.json, en.json, de.json
│   └── industries/
│       └── registry.ts       # Industry configuration
└── middleware.ts             # Locale detection & redirect
```

## Adding New Industries
1. Add translations to `src/lib/i18n/dictionaries/{ro,en,de}.json`
2. Add entry to `src/lib/industries/registry.ts`:
```typescript
{
  id: 'new_industry',
  slug: 'new-industry-slug',
  icon: '🏭',
  image: 'https://images.unsplash.com/...',
  dictionaryKey: 'new_industry',
  color: {
    primary: 'blue',
    secondary: 'indigo',
    gradient: 'from-blue-500 to-indigo-500',
  },
  features: ['feature1', 'feature2', ...],
}
```

## Current Industries
1. **Apicultura** (Beekeeping) - Complete IT process management from hive to jar
2. **Trasabilitate Alimentară** (Food Traceability) - Event-sourcing system for food supply chain

## Values Pages
- `/about/values/innovation`
- `/about/values/reliability`
- `/about/values/partnership`
- `/about/values/quality`

## Contact Info
- Email: avr.nrf@gmail.com
- Phone: +40 721 910 503
- Location: București, România

## Docker
```bash
# Build
docker build -t procese-tehnologice .

# Run
docker run -p 3000:3000 procese-tehnologice
```

## Development
```bash
npm run dev    # Start dev server
npm run build  # Build for production
npm run start  # Start production server
```

## GitHub
Repository: https://github.com/padrian2s/procese-tehnologice-site

## Key Patterns
- Server components by default, client components only when needed (useState, etc.)
- Dictionary pattern for i18n (no external library)
- Static generation with `generateStaticParams`
- Extensible registry pattern for industries and values
