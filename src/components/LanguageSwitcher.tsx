'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { i18n, localeNames, type Locale } from '@/lib/i18n/config';

export function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const pathname = usePathname();

  const getLocalePath = (locale: Locale) => {
    if (!pathname) return `/${locale}`;
    const segments = pathname.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  return (
    <div className="flex items-center gap-1">
      {i18n.locales.map((locale) => (
        <Link
          key={locale}
          href={getLocalePath(locale)}
          className={`px-2 py-1 text-sm rounded transition-colors ${
            currentLocale === locale
              ? 'bg-blue-600 text-white'
              : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
          }`}
        >
          {localeNames[locale]}
        </Link>
      ))}
    </div>
  );
}
