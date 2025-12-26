export const i18n = {
  defaultLocale: 'ro',
  locales: ['ro', 'en', 'de'],
} as const;

export type Locale = (typeof i18n)['locales'][number];

export const localeNames: Record<Locale, string> = {
  ro: 'Română',
  en: 'English',
  de: 'Deutsch',
};
