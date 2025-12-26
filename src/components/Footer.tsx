import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';

interface FooterProps {
  lang: Locale;
  footer: {
    description: string;
    quick_links: string;
    legal: string;
    privacy: string;
    terms: string;
    copyright: string;
  };
  nav: {
    home: string;
    industries: string;
    about: string;
    contact: string;
  };
}

export function Footer({ lang, footer, nav }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">TF</span>
              </div>
              <span className="font-bold text-xl text-white">TechFlow Solutions</span>
            </div>
            <p className="text-gray-400 max-w-md">{footer.description}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">{footer.quick_links}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${lang}`} className="hover:text-white transition-colors">
                  {nav.home}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/industries`} className="hover:text-white transition-colors">
                  {nav.industries}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/about`} className="hover:text-white transition-colors">
                  {nav.about}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/contact`} className="hover:text-white transition-colors">
                  {nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">{nav.contact}</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="material-icons-outlined text-sm">email</span>
                <a href="mailto:avr.nrf@gmail.com" className="hover:text-white transition-colors">
                  avr.nrf@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="material-icons-outlined text-sm">phone</span>
                <a href="tel:+40721910503" className="hover:text-white transition-colors">
                  +40 721 910 503
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
          {footer.copyright}
        </div>
      </div>
    </footer>
  );
}
