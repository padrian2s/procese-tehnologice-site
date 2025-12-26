'use client';

import { useState } from 'react';
import type { Locale } from '@/lib/i18n/config';

interface ContactFormProps {
  locale: Locale;
  labels: {
    name: string;
    email: string;
    company: string;
    industry: string;
    message: string;
    submit: string;
    success: string;
    error: string;
  };
  industryOptions: {
    id: string;
    icon: string;
    name: string;
  }[];
}

export function ContactForm({ locale, labels, industryOptions }: ContactFormProps) {
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
            {labels.name}
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
            {labels.email}
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
            {labels.company}
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
            {labels.industry}
          </label>
          <select
            id="industry"
            value={formState.industry}
            onChange={(e) => setFormState({ ...formState, industry: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">--</option>
            {industryOptions.map((ind) => (
              <option key={ind.id} value={ind.id}>
                {ind.icon} {ind.name}
              </option>
            ))}
            <option value="other">
              {locale === 'ro' ? 'Altă industrie' : locale === 'de' ? 'Andere Branche' : 'Other industry'}
            </option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {labels.message}
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
          {labels.success}
        </div>
      )}

      {status === 'error' && (
        <div className="p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-lg">
          {labels.error}
        </div>
      )}

      <button
        type="submit"
        className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
      >
        {labels.submit}
      </button>
    </form>
  );
}
