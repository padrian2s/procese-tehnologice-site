import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getDictionary } from '@/lib/i18n/get-dictionary';
import { i18n, type Locale } from '@/lib/i18n/config';

const valuesConfig = [
  {
    slug: 'innovation',
    key: 'innovation',
    icon: 'lightbulb',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=80',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    slug: 'reliability',
    key: 'reliability',
    icon: 'shield',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&q=80',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    slug: 'partnership',
    key: 'partnership',
    icon: 'handshake',
    image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&q=80',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    slug: 'quality',
    key: 'quality',
    icon: 'star',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&q=80',
    gradient: 'from-amber-500 to-orange-500',
  },
];

export async function generateStaticParams() {
  const params = [];
  for (const loc of i18n.locales) {
    for (const value of valuesConfig) {
      params.push({ lang: loc, slug: value.slug });
    }
  }
  return params;
}

interface ValueData {
  title: string;
  description: string;
  long_description: string;
  points: string[];
  approach: string;
}

export default async function ValuePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const locale = lang as Locale;
  const valueConfig = valuesConfig.find((v) => v.slug === slug);

  if (!valueConfig) {
    notFound();
  }

  const dict = await getDictionary(locale);
  const valueData = dict.about.values[valueConfig.key as keyof typeof dict.about.values] as ValueData;

  const otherValues = valuesConfig.filter((v) => v.slug !== slug);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden text-white min-h-[400px]">
        <div className="absolute inset-0">
          <Image
            src={valueConfig.image}
            alt={valueData.title}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className={`absolute inset-0 bg-gradient-to-r ${valueConfig.gradient} opacity-80`} />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <Link
            href={`/${locale}/about`}
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <span className="material-icons text-lg">arrow_back</span>
            {locale === 'ro' ? 'Înapoi la Despre Noi' : locale === 'de' ? 'Zurück zu Über Uns' : 'Back to About Us'}
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center">
              <span className="material-icons-outlined text-4xl text-white">{valueConfig.icon}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold">{valueData.title}</h1>
          </div>
          <p className="text-xl text-white/90 max-w-3xl">
            {valueData.description}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 sm:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-12">
            {valueData.long_description}
          </p>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            {locale === 'ro' ? 'Ce ne definește' : locale === 'de' ? 'Was uns definiert' : 'What defines us'}
          </h2>

          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            {valueData.points.map((point, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
              >
                <div className={`w-8 h-8 bg-gradient-to-br ${valueConfig.gradient} rounded-full flex items-center justify-center flex-shrink-0`}>
                  <span className="material-icons text-white text-lg">check</span>
                </div>
                <span className="text-gray-700 dark:text-gray-300">
                  {point}
                </span>
              </div>
            ))}
          </div>

          <div className={`p-8 rounded-2xl bg-gradient-to-r ${valueConfig.gradient}`}>
            <h3 className="text-xl font-bold text-white mb-4">
              {locale === 'ro' ? 'Abordarea Noastră' : locale === 'de' ? 'Unser Ansatz' : 'Our Approach'}
            </h3>
            <p className="text-white/90 text-lg">
              {valueData.approach}
            </p>
          </div>
        </div>
      </section>

      {/* Other Values Section */}
      <section className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            {locale === 'ro' ? 'Alte Valori' : locale === 'de' ? 'Andere Werte' : 'Other Values'}
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {otherValues.map((value) => {
              const data = dict.about.values[value.key as keyof typeof dict.about.values] as ValueData;
              return (
                <Link
                  key={value.slug}
                  href={`/${locale}/about/values/${value.slug}`}
                  className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-32 overflow-hidden">
                    <Image
                      src={value.image}
                      alt={data.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-r ${value.gradient} opacity-70`} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="material-icons-outlined text-4xl text-white">{value.icon}</span>
                    </div>
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-bold text-gray-900 dark:text-white">
                      {data.title}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`relative py-16 sm:py-24 overflow-hidden`}>
        <div className="absolute inset-0">
          <Image
            src={valueConfig.image}
            alt={valueData.title}
            fill
            className="object-cover"
          />
        </div>
        <div className={`absolute inset-0 bg-gradient-to-r ${valueConfig.gradient} opacity-90`} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {locale === 'ro'
              ? 'Vrei să afli mai multe?'
              : locale === 'de'
                ? 'Möchten Sie mehr erfahren?'
                : 'Want to learn more?'}
          </h2>
          <p className="text-xl text-white/90 mb-8">
            {locale === 'ro'
              ? 'Contactați-ne pentru a discuta despre cum putem ajuta afacerea dumneavoastră'
              : locale === 'de'
                ? 'Kontaktieren Sie uns, um zu besprechen, wie wir Ihrem Unternehmen helfen können'
                : 'Contact us to discuss how we can help your business'}
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
