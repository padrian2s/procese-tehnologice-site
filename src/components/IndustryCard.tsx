import Link from 'next/link';
import Image from 'next/image';
import type { IndustryConfig } from '@/lib/industries/registry';
import type { Locale } from '@/lib/i18n/config';

interface IndustryCardProps {
  industry: IndustryConfig;
  lang: Locale;
  name: string;
  description: string;
  learnMore: string;
}

export function IndustryCard({ industry, lang, name, description, learnMore }: IndustryCardProps) {
  return (
    <Link
      href={`/${lang}/industries/${industry.slug}`}
      className="group block bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={industry.image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${industry.color.gradient} opacity-60`} />
        <div className="absolute bottom-4 left-4 flex items-center gap-3">
          <span className="text-4xl">{industry.icon}</span>
          <h3 className="text-2xl font-bold text-white">
            {name}
          </h3>
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {description}
        </p>
        <span className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium group-hover:gap-3 transition-all">
          {learnMore}
          <span className="material-icons text-lg">arrow_forward</span>
        </span>
      </div>
    </Link>
  );
}
