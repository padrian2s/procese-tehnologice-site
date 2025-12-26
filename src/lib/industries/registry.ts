// Industry Registry - extensible system for adding new industries
// To add a new industry:
// 1. Add translation keys to dictionaries (ro.json, en.json, de.json)
// 2. Add the industry to this registry

export interface IndustryConfig {
  id: string;
  slug: string;
  icon: string;
  image: string;
  dictionaryKey: string;
  color: {
    primary: string;
    secondary: string;
    gradient: string;
  };
  features: string[];
}

export const industries: IndustryConfig[] = [
  {
    id: 'apicultura',
    slug: 'apicultura',
    icon: '🐝',
    image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&q=80',
    dictionaryKey: 'apicultura',
    color: {
      primary: 'amber',
      secondary: 'yellow',
      gradient: 'from-amber-500 to-yellow-500',
    },
    features: ['field_data', 'traceability', 'quality', 'planning', 'inventory', 'sales'],
  },
  {
    id: 'food_traceability',
    slug: 'trasabilitate-alimentara',
    icon: '🥗',
    image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=800&q=80',
    dictionaryKey: 'food_traceability',
    color: {
      primary: 'green',
      secondary: 'emerald',
      gradient: 'from-green-500 to-emerald-500',
    },
    features: ['event_sourcing', 'bidirectional_trace', 'multi_actor', 'compliance', 'recall', 'integration'],
  },
];

export const getIndustryBySlug = (slug: string): IndustryConfig | undefined => {
  return industries.find((ind) => ind.slug === slug);
};

export const getIndustryById = (id: string): IndustryConfig | undefined => {
  return industries.find((ind) => ind.id === id);
};
