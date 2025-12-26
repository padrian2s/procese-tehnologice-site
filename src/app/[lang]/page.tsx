import Link from 'next/link';
import Image from 'next/image';
import { getDictionary } from '@/lib/i18n/get-dictionary';
import { industries } from '@/lib/industries/registry';
import { IndustryCard } from '@/components/IndustryCard';
import type { Locale } from '@/lib/i18n/config';

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white min-h-[600px]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80"
            alt="Digital technology abstract"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-indigo-900/70 to-purple-900/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {dict.hero.title}
            </h1>
            <p className="text-xl sm:text-2xl text-blue-100 mb-8">
              {dict.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/${locale}/industries`}
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
              >
                {dict.hero.cta}
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                {dict.hero.secondary_cta}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {dict.industries.title}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {dict.industries.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {industries.map((industry) => {
              const industryDict = dict[industry.dictionaryKey as keyof typeof dict] as {
                name: string;
                short_description: string;
              };
              return (
                <IndustryCard
                  key={industry.id}
                  industry={industry}
                  lang={locale}
                  name={industryDict.name}
                  description={industryDict.short_description}
                  learnMore={dict.industries.learn_more}
                />
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link
              href={`/${locale}/industries`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              {dict.industries.view_all}
              <span className="material-icons text-lg">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-16 sm:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="relative w-20 h-20 mx-auto mb-4 rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&q=80"
                  alt="Traceability"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {locale === 'ro' ? 'Trasabilitate Completă' : locale === 'de' ? 'Vollständige Rückverfolgbarkeit' : 'Complete Traceability'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {locale === 'ro' ? 'Urmăriți fiecare produs de la origine la consumator final' : locale === 'de' ? 'Verfolgen Sie jedes Produkt vom Ursprung bis zum Endverbraucher' : 'Track every product from origin to end consumer'}
              </p>
            </div>

            <div className="text-center p-6">
              <div className="relative w-20 h-20 mx-auto mb-4 rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&q=80"
                  alt="Compliance"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {locale === 'ro' ? 'Conformitate Garantată' : locale === 'de' ? 'Garantierte Compliance' : 'Guaranteed Compliance'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {locale === 'ro' ? 'Respectați standardele HACCP, ISO și cerințele de export' : locale === 'de' ? 'Erfüllen Sie HACCP-, ISO-Standards und Exportanforderungen' : 'Meet HACCP, ISO standards and export requirements'}
              </p>
            </div>

            <div className="text-center p-6">
              <div className="relative w-20 h-20 mx-auto mb-4 rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=200&q=80"
                  alt="Efficiency"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {locale === 'ro' ? 'Eficiență Operațională' : locale === 'de' ? 'Betriebliche Effizienz' : 'Operational Efficiency'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {locale === 'ro' ? 'Automatizați procesele și reduceți costurile operaționale' : locale === 'de' ? 'Automatisieren Sie Prozesse und reduzieren Sie Betriebskosten' : 'Automate processes and reduce operational costs'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Image Banner Section */}
      <section className="relative h-80 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1920&q=80"
          alt="Technology and coding"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-indigo-900/90 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              {locale === 'ro' ? 'Tehnologie de Ultimă Generație' : locale === 'de' ? 'Modernste Technologie' : 'Cutting-Edge Technology'}
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              {locale === 'ro' ? 'Soluții software construite cu cele mai noi tehnologii pentru performanță și scalabilitate' : locale === 'de' ? 'Softwarelösungen mit modernsten Technologien für Leistung und Skalierbarkeit' : 'Software solutions built with the latest technologies for performance and scalability'}
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {locale === 'ro' ? 'Gata să vă digitalizați afacerea?' : locale === 'de' ? 'Bereit, Ihr Geschäft zu digitalisieren?' : 'Ready to digitize your business?'}
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            {locale === 'ro' ? 'Contactați-ne pentru o consultație gratuită și un demo personalizat' : locale === 'de' ? 'Kontaktieren Sie uns für eine kostenlose Beratung und eine personalisierte Demo' : 'Contact us for a free consultation and personalized demo'}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors text-lg"
          >
            {dict.cta.request_demo}
          </Link>
        </div>
      </section>
    </>
  );
}
