import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getDictionary } from '@/lib/i18n/get-dictionary';
import { i18n, type Locale } from '@/lib/i18n/config';

const inter = Inter({ subsets: ['latin'] });

const materialIconsLink = 'https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Outlined';

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return {
    title: dict.metadata.title,
    description: dict.metadata.description,
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return (
    <html lang={locale}>
      <head>
        <link rel="stylesheet" href={materialIconsLink} />
      </head>
      <body className={`${inter.className} antialiased bg-gray-50 dark:bg-gray-950`}>
        <div className="min-h-screen flex flex-col">
          <Header lang={locale} nav={dict.nav} />
          <main className="flex-1">{children}</main>
          <Footer lang={locale} footer={dict.footer} nav={dict.nav} />
        </div>
      </body>
    </html>
  );
}
