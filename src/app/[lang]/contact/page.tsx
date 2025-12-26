import { getDictionary } from '@/lib/i18n/get-dictionary';
import { industries } from '@/lib/industries/registry';
import type { Locale } from '@/lib/i18n/config';
import { ContactForm } from '@/components/ContactForm';

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  const industryOptions = industries.map((ind) => {
    const indDict = dict[ind.dictionaryKey as keyof typeof dict] as { name: string };
    return {
      id: ind.id,
      icon: ind.icon,
      name: indDict.name,
    };
  });

  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {dict.contact.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {dict.contact.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
            <ContactForm
              locale={locale}
              labels={dict.contact.form}
              industryOptions={industryOptions}
            />
          </div>
          <div>
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-8 text-white h-fit">
              <h2 className="text-2xl font-bold mb-6">{dict.contact.info.title}</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="material-icons-outlined">email</span>
                  </div>
                  <div>
                    <div className="text-sm text-blue-100 mb-1">Email</div>
                    <a href={`mailto:${dict.contact.info.email}`} className="hover:underline">
                      {dict.contact.info.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="material-icons-outlined">phone</span>
                  </div>
                  <div>
                    <div className="text-sm text-blue-100 mb-1">Telefon</div>
                    <a href={`tel:${dict.contact.info.phone.replace(/\s/g, '')}`} className="hover:underline">
                      {dict.contact.info.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="material-icons-outlined">location_on</span>
                  </div>
                  <div>
                    <div className="text-sm text-blue-100 mb-1">Adresă</div>
                    <span>{dict.contact.info.address}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
