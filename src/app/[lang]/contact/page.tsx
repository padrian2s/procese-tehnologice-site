'use client';

import { useState, use } from 'react';
import { getDictionary } from '@/lib/i18n/get-dictionary';
import { industries } from '@/lib/industries/registry';
import type { Locale } from '@/lib/i18n/config';

type Dictionary = Awaited<ReturnType<typeof getDictionary>>;

function ContactForm({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    industry: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('success');
    setFormState({ name: '', email: '', company: '', industry: '', message: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {dict.contact.form.name}
          </label>
          <input
            type="text"
            id="name"
            required
            value={formState.name}
            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {dict.contact.form.email}
          </label>
          <input
            type="email"
            id="email"
            required
            value={formState.email}
            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {dict.contact.form.company}
          </label>
          <input
            type="text"
            id="company"
            value={formState.company}
            onChange={(e) => setFormState({ ...formState, company: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="industry" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {dict.contact.form.industry}
          </label>
          <select
            id="industry"
            value={formState.industry}
            onChange={(e) => setFormState({ ...formState, industry: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">--</option>
            {industries.map((ind) => {
              const indDict = dict[ind.dictionaryKey as keyof typeof dict] as { name: string };
              return (
                <option key={ind.id} value={ind.id}>
                  {ind.icon} {indDict.name}
                </option>
              );
            })}
            <option value="other">
              {locale === 'ro' ? 'Altă industrie' : locale === 'de' ? 'Andere Branche' : 'Other industry'}
            </option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {dict.contact.form.message}
        </label>
        <textarea
          id="message"
          rows={5}
          required
          value={formState.message}
          onChange={(e) => setFormState({ ...formState, message: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>

      {status === 'success' && (
        <div className="p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg">
          {dict.contact.form.success}
        </div>
      )}

      {status === 'error' && (
        <div className="p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg">
          {dict.contact.form.error}
        </div>
      )}

      <button
        type="submit"
        className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
      >
        {dict.contact.form.submit}
      </button>
    </form>
  );
}

function ContactInfo({ dict }: { dict: Dictionary }) {
  return (
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

      <div className="mt-8 pt-8 border-t border-white/20">
        <div className="flex gap-4">
          <a href="#" className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors">
            <span className="material-icons">work</span>
          </a>
          <a href="#" className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors">
            <span className="material-icons">tag</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = use(params);
  const locale = lang as Locale;
  const dict = use(getDictionary(locale));

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
            <ContactForm dict={dict} locale={locale} />
          </div>
          <div>
            <ContactInfo dict={dict} />
          </div>
        </div>
      </div>
    </div>
  );
}
