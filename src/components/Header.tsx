'use client';

import Link from 'next/link';
import { useState } from 'react';
import { LanguageSwitcher } from './LanguageSwitcher';
import type { Locale } from '@/lib/i18n/config';

interface HeaderProps {
  lang: Locale;
  nav: {
    home: string;
    industries: string;
    about: string;
    contact: string;
  };
}

export function Header({ lang, nav }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md dark:bg-gray-900/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href={`/${lang}`} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">TF</span>
            </div>
            <span className="font-bold text-xl text-gray-900 dark:text-white">
              TechFlow
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href={`/${lang}`}
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
            >
              {nav.home}
            </Link>
            <Link
              href={`/${lang}/industries`}
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
            >
              {nav.industries}
            </Link>
            <Link
              href={`/${lang}/about`}
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
            >
              {nav.about}
            </Link>
            <Link
              href={`/${lang}/contact`}
              className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
            >
              {nav.contact}
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <LanguageSwitcher currentLocale={lang} />

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <span className="material-icons">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4">
            <div className="flex flex-col gap-2">
              <Link
                href={`/${lang}`}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg dark:text-gray-300 dark:hover:bg-gray-800"
              >
                {nav.home}
              </Link>
              <Link
                href={`/${lang}/industries`}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg dark:text-gray-300 dark:hover:bg-gray-800"
              >
                {nav.industries}
              </Link>
              <Link
                href={`/${lang}/about`}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg dark:text-gray-300 dark:hover:bg-gray-800"
              >
                {nav.about}
              </Link>
              <Link
                href={`/${lang}/contact`}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg dark:text-gray-300 dark:hover:bg-gray-800"
              >
                {nav.contact}
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
