import { getDictionary } from '@/lib/i18n/get-dictionary';
import { industries } from '@/lib/industries/registry';
import { IndustryCard } from '@/components/IndustryCard';
import type { Locale } from '@/lib/i18n/config';

export default async function IndustriesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {dict.industries.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {dict.industries.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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

      </div>
    </div>
  );
}
