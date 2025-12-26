import Link from 'next/link';
import Image from 'next/image';
import { getDictionary } from '@/lib/i18n/get-dictionary';
import type { Locale } from '@/lib/i18n/config';

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  const values = [
    { key: 'innovation', icon: 'lightbulb', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&q=80' },
    { key: 'reliability', icon: 'shield', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&q=80' },
    { key: 'partnership', icon: 'handshake', image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&q=80' },
    { key: 'quality', icon: 'star', image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&q=80' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden text-white py-24 sm:py-32">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80"
            alt="Team collaboration"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 to-gray-800/90" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{dict.about.title}</h1>
          <p className="text-xl text-gray-300">{dict.about.subtitle}</p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
                  alt="Mission"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/80 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="material-icons-outlined text-4xl text-white">rocket_launch</span>
                </div>
              </div>
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {dict.about.mission_title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  {dict.about.mission}
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
                  alt="Vision"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-600/80 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="material-icons-outlined text-4xl text-white">visibility</span>
                </div>
              </div>
              <div className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {dict.about.vision_title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                  {dict.about.vision}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            {dict.about.values_title}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map(({ key, icon, image }) => {
              const value = dict.about.values[key as keyof typeof dict.about.values];
              return (
                <Link
                  key={key}
                  href={`/${locale}/about/values/${key}`}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm group hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-32 overflow-hidden">
                    <Image
                      src={image}
                      alt={value.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-blue-600/60" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="material-icons-outlined text-4xl text-white">{icon}</span>
                    </div>
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      {value.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium text-sm group-hover:gap-2 transition-all">
                      {dict.about.learn_more}
                      <span className="material-icons text-sm">arrow_forward</span>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team/Stats Section */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
            alt="Office"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-white/90 dark:bg-gray-900/90" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-8 text-center max-w-2xl mx-auto">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-2xl p-8">
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">99.9%</div>
              <div className="text-gray-600 dark:text-gray-300">
                {locale === 'ro' ? 'Uptime Garantat' : locale === 'de' ? 'Garantierte Betriebszeit' : 'Guaranteed Uptime'}
              </div>
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur rounded-2xl p-8">
              <div className="text-4xl font-bold text-amber-600 dark:text-amber-400 mb-2">24/7</div>
              <div className="text-gray-600 dark:text-gray-300">
                {locale === 'ro' ? 'Suport Tehnic' : locale === 'de' ? 'Technischer Support' : 'Technical Support'}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
