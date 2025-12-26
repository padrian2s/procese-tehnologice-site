import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getDictionary } from '@/lib/i18n/get-dictionary';
import { industries, getIndustryBySlug } from '@/lib/industries/registry';
import { i18n, type Locale } from '@/lib/i18n/config';

export async function generateStaticParams() {
  const params = [];
  for (const loc of i18n.locales) {
    for (const industry of industries) {
      params.push({ lang: loc, slug: industry.slug });
    }
  }
  return params;
}

interface IndustryData {
  name: string;
  short_description: string;
  long_description: string;
  features: Record<string, { title: string; description: string }>;
  modules: string[];
  benefits: string[];
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const locale = lang as Locale;
  const industry = getIndustryBySlug(slug);

  if (!industry) {
    notFound();
  }

  const dict = await getDictionary(locale);
  const industryDict = dict[industry.dictionaryKey as keyof typeof dict] as IndustryData;

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden text-white min-h-[500px]">
        <div className="absolute inset-0">
          <Image
            src={industry.image}
            alt={industryDict.name}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className={`absolute inset-0 bg-gradient-to-r ${industry.color.gradient} opacity-80`} />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <Link
            href={`/${locale}/industries`}
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <span className="material-icons text-lg">arrow_back</span>
            {dict.industries.back_to_industries}
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-6xl">{industry.icon}</span>
            <h1 className="text-4xl sm:text-5xl font-bold">{industryDict.name}</h1>
          </div>
          <p className="text-xl text-white/90 max-w-3xl">
            {industryDict.long_description}
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            {dict.industries.features}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industry.features.map((featureKey) => {
              const feature = industryDict.features[featureKey];
              if (!feature) return null;
              return (
                <div
                  key={featureKey}
                  className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6"
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${industry.color.gradient} rounded-lg flex items-center justify-center mb-4`}>
                    <span className="material-icons text-white">check</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Image Banner */}
      <section className="relative h-64 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=80"
          alt="Analytics dashboard"
          fill
          className="object-cover"
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${industry.color.gradient} opacity-80 flex items-center justify-center`}>
          <div className="text-center text-white px-4">
            <span className="material-icons-outlined text-5xl mb-4">insights</span>
            <h3 className="text-2xl font-bold">
              {locale === 'ro' ? 'Date în Timp Real' : locale === 'de' ? 'Echtzeitdaten' : 'Real-Time Data'}
            </h3>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            {dict.industries.modules}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {industryDict.modules.map((module, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm"
              >
                <div className={`w-8 h-8 bg-gradient-to-br ${industry.color.gradient} rounded-full flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white text-sm font-bold">{index + 1}</span>
                </div>
                <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">
                  {module}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 sm:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            {dict.industries.benefits}
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {industryDict.benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4"
              >
                <div className={`w-8 h-8 bg-gradient-to-br ${industry.color.gradient} rounded-full flex items-center justify-center flex-shrink-0`}>
                  <span className="material-icons text-white text-lg">check</span>
                </div>
                <span className="text-gray-700 dark:text-gray-300 text-lg">
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`relative py-16 sm:py-24 overflow-hidden`}>
        <div className="absolute inset-0">
          <Image
            src={industry.image}
            alt={industryDict.name}
            fill
            className="object-cover"
          />
        </div>
        <div className={`absolute inset-0 bg-gradient-to-r ${industry.color.gradient} opacity-90`} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {locale === 'ro'
              ? `Interesați de soluția pentru ${industryDict.name}?`
              : locale === 'de'
                ? `Interessiert an der Lösung für ${industryDict.name}?`
                : `Interested in the ${industryDict.name} solution?`}
          </h2>
          <p className="text-xl text-white/90 mb-8">
            {locale === 'ro'
              ? 'Contactați-ne pentru o demonstrație personalizată'
              : locale === 'de'
                ? 'Kontaktieren Sie uns für eine personalisierte Demonstration'
                : 'Contact us for a personalized demonstration'}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors text-lg"
          >
            {dict.cta.request_demo}
          </Link>
        </div>
      </section>
    </div>
  );
}
