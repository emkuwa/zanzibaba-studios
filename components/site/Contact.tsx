'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Send, MessageCircle, MapPin, Mail, Phone, Check, ArrowUpRight } from 'lucide-react';
import { Reveal } from './Reveal';
import { siteConfig } from '@/lib/site';

const SERVICE_KEYS = [
  'tourismVideo',
  'hotelPhoto',
  'drone',
  'villa',
  'documentary',
  'campaign',
  'social',
  'events',
  'live',
  'commercial',
] as const;

const BUDGETS = ['<$1,500', '$1,500–$3,500', '$3,500–$8,000', '$8,000+', 'Custom'];

export function Contact() {
  const t = useTranslations('contact');
  const tServices = useTranslations('services.items');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    budget: '',
    message: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus('error');
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      setStatus('error');
      return;
    }
    setStatus('sending');

    const lines = [
      'Hello Zanzibaba Studios!',
      '',
      `Name: ${form.name}`,
      `Company: ${form.company || '-'}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone || '-'}`,
      `Service: ${form.service || '-'}`,
      `Budget: ${form.budget || '-'}`,
      '',
      form.message,
    ];
    const waMessage = encodeURIComponent(lines.join('\n'));
    const waLink = `https://wa.me/${siteConfig.whatsapp}?text=${waMessage}`;

    window.open(waLink, '_blank', 'noopener,noreferrer');

    setTimeout(() => {
      setStatus('sent');
      setForm({ name: '', email: '', company: '', phone: '', service: '', budget: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    }, 700);
  };

  return (
    <section id="contact" className="relative py-20 sm:py-24 md:py-32">
      <div className="container-z">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">
              <span className="inline-block h-1 w-6 bg-coral-500" aria-hidden="true" />
              <span>{t('eyebrow')}</span>
            </p>
            <h2 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
              {t('title')}
            </h2>
            <p className="mt-5 max-w-md text-pretty text-base leading-relaxed text-white/65 md:text-lg">
              {t('subtitle')}
            </p>

            <div className="mt-8 space-y-3">
              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-3 rounded-2xl border border-[#25D366]/30 bg-[#25D366]/[0.07] p-4 transition-colors hover:bg-[#25D366]/[0.12] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-[#25D366] text-white">
                    <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-white">{t('whatsappCard')}</div>
                    <div className="text-xs text-white/65">
                      {t('whatsapp')} • {siteConfig.whatsappDisplay}
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-[#25D366]" aria-hidden="true" />
              </a>

              <a
                href={`mailto:${siteConfig.email}`}
                className="group flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-colors hover:border-coral-400/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral-400"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-coral-500/20 text-coral-300">
                    <Mail className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-white">{t('emailCard')}</div>
                    <div className="text-xs text-white/65">{t('email_label')}</div>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-white/50" aria-hidden="true" />
              </a>

              <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-lagoon-500/15 text-lagoon-300">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-white">{t('studioCard')}</div>
                    <div className="text-xs text-white/65">{t('location_label')}</div>
                  </div>
                </div>
                <Phone className="h-4 w-4 text-white/50" aria-hidden="true" />
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-7">
            <form
              onSubmit={submit}
              noValidate
              className="glass-strong relative overflow-hidden rounded-3xl p-6 md:p-8"
              aria-label="Contact form"
            >
              <div
                className="pointer-events-none absolute -right-32 -top-32 h-64 w-64 rounded-full bg-coral-500/15 blur-3xl"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -left-32 -bottom-32 h-64 w-64 rounded-full bg-lagoon-500/15 blur-3xl"
                aria-hidden="true"
              />

              <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field
                  label={t('name')}
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  required
                  autoComplete="name"
                />
                <Field
                  label={t('email')}
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  required
                  autoComplete="email"
                />
                <Field
                  label={t('company')}
                  name="company"
                  value={form.company}
                  onChange={onChange}
                  autoComplete="organization"
                />
                <Field
                  label={t('phone')}
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={onChange}
                  autoComplete="tel"
                />
                <Select
                  label={t('service')}
                  name="service"
                  value={form.service}
                  onChange={onChange}
                  options={SERVICE_KEYS.map((k) => ({ value: k, label: tServices(`${k}.title`) }))}
                  placeholder={t('select')}
                />
                <Select
                  label={t('budget')}
                  name="budget"
                  value={form.budget}
                  onChange={onChange}
                  options={BUDGETS.map((b) => ({ value: b, label: b }))}
                  placeholder={t('selectBudget')}
                />
                <div className="sm:col-span-2">
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.28em] text-white/55"
                  >
                    {t('message')}
                    <span className="text-coral-400"> *</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={onChange}
                    className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/35 transition-colors focus:border-coral-400/50 focus:outline-none"
                  />
                </div>

                <div className="mt-2 flex flex-wrap items-center justify-between gap-4 sm:col-span-2">
                  <p className="max-w-xs text-xs text-white/50">{t('privacy')}</p>
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    aria-label={t('send')}
                    className="group inline-flex items-center gap-2 rounded-full bg-coral-500 px-6 py-3 text-sm font-semibold text-white shadow-glow-coral transition-all hover:bg-coral-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:opacity-60"
                  >
                    {status === 'sent' ? (
                      <>
                        <Check className="h-4 w-4" aria-hidden="true" /> {t('thanks')}
                      </>
                    ) : status === 'sending' ? (
                      <>{t('sending')}</>
                    ) : (
                      <>
                        <Send
                          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                        {t('send')}
                      </>
                    )}
                  </button>
                </div>

                {status === 'error' && (
                  <p className="text-sm text-coral-300 sm:col-span-2" role="alert">
                    {t('errors.required')}
                  </p>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  type = 'text',
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  const id = `field-${name}`;
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.28em] text-white/55"
      >
        {label}
        {required && <span className="text-coral-400"> *</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/35 transition-colors focus:border-coral-400/50 focus:outline-none"
      />
    </div>
  );
}

function Select({
  label,
  name,
  value,
  onChange,
  options,
  placeholder,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  placeholder: string;
}) {
  const id = `field-${name}`;
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.28em] text-white/55"
      >
        {label}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full appearance-none rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white transition-colors focus:border-coral-400/50 focus:outline-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%23ffffff80'%3E%3Cpath d='M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z'/%3E%3C/svg%3E\")",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 1rem center',
          backgroundSize: '1.25rem',
        }}
      >
        <option value="" className="bg-ink-900 text-white/70">
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-ink-900 text-white">
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
