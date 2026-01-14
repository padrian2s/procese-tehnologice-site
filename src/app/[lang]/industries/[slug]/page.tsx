import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getDictionary } from '@/lib/i18n/get-dictionary';
import { industries, getIndustryBySlug } from '@/lib/industries/registry';
import { i18n, type Locale } from '@/lib/i18n/config';
import ScreenshotGallery from '@/components/ScreenshotGallery';

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

  const isApicultura = industry.id === 'apicultura';

  return (
    <div className="overflow-hidden">
      {/* Hero Section - Enhanced */}
      <section className="relative min-h-[600px] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={industry.image}
            alt={industryDict.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${industry.color.gradient} opacity-85`} />

        {/* Pattern Overlay */}
        {industry.heroPattern === 'honeycomb' && (
          <div className="absolute inset-0 honeycomb-pattern opacity-50" />
        )}

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

        {/* Floating decorative elements for apicultura */}
        {isApicultura && (
          <>
            <div className="absolute top-20 right-10 text-6xl animate-float opacity-80 hidden lg:block">🐝</div>
            <div className="absolute top-40 right-32 text-4xl animate-float-delayed opacity-60 hidden lg:block">🍯</div>
            <div className="absolute bottom-32 left-16 text-5xl animate-float opacity-70 hidden lg:block">🌻</div>
          </>
        )}

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <Link
            href={`/${locale}/industries`}
            className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-8 transition-all hover:gap-3 group"
          >
            <span className="material-icons text-lg group-hover:-translate-x-1 transition-transform">arrow_back</span>
            {dict.industries.back_to_industries}
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-center gap-8">
            {/* Left: Text content */}
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-6">
                <span className={`text-7xl ${isApicultura ? 'animate-float' : ''}`}>{industry.icon}</span>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white drop-shadow-lg">
                  {industryDict.name}
                </h1>
              </div>
              <p className="text-xl sm:text-2xl text-white/95 max-w-2xl leading-relaxed">
                {industryDict.long_description}
              </p>

              {/* Quick stats for apicultura */}
              {isApicultura && (
                <div className="flex flex-wrap gap-6 mt-10">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/20">
                    <div className="text-3xl font-bold text-white">100%</div>
                    <div className="text-white/80 text-sm">{locale === 'ro' ? 'Trasabilitate' : 'Traceability'}</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/20">
                    <div className="text-3xl font-bold text-white">24/7</div>
                    <div className="text-white/80 text-sm">{locale === 'ro' ? 'Monitorizare' : 'Monitoring'}</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/20">
                    <div className="text-3xl font-bold text-white">QR</div>
                    <div className="text-white/80 text-sm">{locale === 'ro' ? 'Cod unic' : 'Unique code'}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Logo/Image for apicultura */}
            {isApicultura && industry.screenshots && industry.screenshots[0] && (
              <div className="hidden xl:block">
                <div className="relative w-80 h-80 bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 animate-pulse-glow">
                  <Image
                    src={industry.screenshots[0]}
                    alt="Logo"
                    fill
                    className="object-contain p-4"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Demo Card - only show if industry has demo */}
      {industry.demo && (
        <section className="py-8 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 border-b border-amber-200 dark:border-amber-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <div className={`w-16 h-16 bg-gradient-to-br ${industry.color.gradient} rounded-xl flex items-center justify-center`}>
                  <span className="material-icons text-white text-3xl">play_circle</span>
                </div>
              </div>
              <div className="flex-grow text-center sm:text-left">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {dict.industries.demo.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  {dict.industries.demo.description}
                </p>
                <div className="flex flex-wrap gap-4 justify-center sm:justify-start text-sm">
                  <div className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-lg">
                    <span className="text-gray-500 dark:text-gray-400">{dict.industries.demo.username}:</span>{' '}
                    <span className="font-mono font-semibold text-gray-900 dark:text-white">{industry.demo.username}</span>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-lg">
                    <span className="text-gray-500 dark:text-gray-400">{dict.industries.demo.password}:</span>{' '}
                    <span className="font-mono font-semibold text-gray-900 dark:text-white">{industry.demo.password}</span>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0">
                <a
                  href={industry.demo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${industry.color.gradient} text-white font-semibold rounded-lg hover:opacity-90 transition-opacity`}
                >
                  {dict.industries.demo.access_demo}
                  <span className="material-icons text-lg">open_in_new</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features Section - Card Grid */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl sm:text-5xl font-bold mb-4 ${isApicultura ? 'gradient-text-amber' : 'text-gray-900 dark:text-white'}`}>
              {dict.industries.features}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              {locale === 'ro'
                ? 'Soluții complete pentru digitalizarea proceselor'
                : locale === 'de'
                  ? 'Komplette Lösungen für die Prozessdigitalisierung'
                  : 'Complete solutions for process digitization'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industry.features.map((featureKey, index) => {
              const feature = industryDict.features[featureKey];
              if (!feature) return null;
              const icon = industry.featureIcons?.[featureKey] || 'check';

              return (
                <div
                  key={featureKey}
                  className={`group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700 ${
                    isApicultura ? 'hover:border-amber-300 dark:hover:border-amber-500' : ''
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${industry.color.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                    <span className="material-icons text-white text-3xl">{icon}</span>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Decorative corner */}
                  {isApicultura && (
                    <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl ${industry.color.gradient} opacity-5 rounded-tr-2xl rounded-bl-full`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Screenshots Gallery */}
      {industry.screenshots && industry.screenshots.length > 0 && (
        <section className={`py-20 sm:py-28 ${isApicultura ? 'bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-gray-800 dark:to-gray-900' : 'bg-gray-100 dark:bg-gray-800'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScreenshotGallery
              screenshots={industry.screenshots}
              industryName={industryDict.name}
              title={locale === 'ro' ? 'Capturi de Ecran din Aplicație' : locale === 'de' ? 'App Screenshots' : 'Application Screenshots'}
            />
          </div>
        </section>
      )}

      {/* Modules Section - Timeline Style */}
      <section className="py-20 sm:py-28 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl sm:text-5xl font-bold mb-4 ${isApicultura ? 'gradient-text-amber' : 'text-gray-900 dark:text-white'}`}>
              {dict.industries.modules}
            </h2>
          </div>

          <div className="relative">
            {/* Center line for desktop */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-400 via-amber-500 to-yellow-500 rounded-full transform -translate-x-1/2" />

            <div className="grid lg:grid-cols-2 gap-6 lg:gap-12">
              {industryDict.modules.map((module, index) => (
                <div
                  key={index}
                  className={`relative ${index % 2 === 0 ? 'lg:pr-16 lg:text-right' : 'lg:pl-16 lg:col-start-2'}`}
                >
                  {/* Timeline dot */}
                  <div className={`hidden lg:flex absolute top-1/2 ${index % 2 === 0 ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'} -translate-y-1/2 w-10 h-10 bg-gradient-to-br ${industry.color.gradient} rounded-full items-center justify-center shadow-lg z-10`}>
                    <span className="text-white font-bold">{index + 1}</span>
                  </div>

                  <div className={`flex items-center gap-4 bg-gray-50 dark:bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                    <div className={`lg:hidden w-10 h-10 bg-gradient-to-br ${industry.color.gradient} rounded-full flex items-center justify-center flex-shrink-0`}>
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      {module}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section - Clean Grid */}
      <section className={`py-20 sm:py-28 ${isApicultura ? 'bg-gradient-to-br from-amber-500 to-yellow-500' : `bg-gradient-to-br ${industry.color.gradient}`}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              {dict.industries.benefits}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {industryDict.benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-colors"
              >
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className={`material-icons ${isApicultura ? 'text-amber-500' : 'text-green-500'}`}>check</span>
                </div>
                <span className="text-white text-lg leading-relaxed">
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gray-900" />
        {isApicultura && <div className="absolute inset-0 honeycomb-pattern opacity-30" />}

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className={`text-8xl mb-8 block ${isApicultura ? 'animate-float' : ''}`}>{industry.icon}</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            {locale === 'ro'
              ? `Pregătit pentru ${industryDict.name}?`
              : locale === 'de'
                ? `Bereit für ${industryDict.name}?`
                : `Ready for ${industryDict.name}?`}
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            {locale === 'ro'
              ? 'Contactați-ne pentru o demonstrație personalizată și vedeți cum putem transforma afacerea dumneavoastră.'
              : locale === 'de'
                ? 'Kontaktieren Sie uns für eine personalisierte Demonstration und sehen Sie, wie wir Ihr Geschäft transformieren können.'
                : 'Contact us for a personalized demonstration and see how we can transform your business.'}
          </p>
          <Link
            href={`/${locale}/contact`}
            className={`inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r ${industry.color.gradient} text-white font-bold rounded-xl hover:opacity-90 transition-all text-xl shadow-2xl hover:shadow-amber-500/25 hover:scale-105`}
          >
            {dict.cta.request_demo}
            <span className="material-icons ml-2">arrow_forward</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
