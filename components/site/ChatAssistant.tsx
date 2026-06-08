'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { MessageCircle, X, Send, ChevronRight, Check, Sparkles, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/lib/site';

type VisitorType = 'hotel' | 'resort' | 'villa' | 'tour' | 'investor' | 'event' | 'other';
type Step = 'greeting' | 'visitor-type' | 'services' | 'budget' | 'contact' | 'summary' | 'done';

const VISITOR_TYPES: VisitorType[] = ['hotel', 'resort', 'villa', 'tour', 'investor', 'event', 'other'];

const VISITOR_LABELS: Record<VisitorType, string> = {
  hotel: 'Hotel',
  resort: 'Resort',
  villa: 'Villa',
  tour: 'Tour Operator',
  investor: 'Investor',
  event: 'Event Organizer',
  other: 'Other',
};

const SERVICE_RECS: Record<VisitorType, string[]> = {
  hotel: ['Photography', 'Video Production', 'Aerial Drone'],
  resort: ['Video Production', 'Photography', 'Aerial Drone', 'Social Content'],
  villa: ['Photography', 'Video Production', 'Aerial Drone'],
  tour: ['Video Production', 'Social Content', 'Photography'],
  investor: ['Video Production', 'Aerial Drone', 'Photography'],
  event: ['Live Streaming', 'Event Photography', 'Video Production'],
  other: ['Video Production', 'Photography', 'Aerial Drone'],
};

const ALL_SERVICES = [
  'Photography',
  'Video Production',
  'Aerial Drone',
  'Social Content',
  'Live Streaming',
  'Event Photography',
];

const BUDGETS = [
  { label: 'Under $1,000', value: 'under-1k' },
  { label: '$1,000 – $3,000', value: '1k-3k' },
  { label: '$3,000 – $6,000', value: '3k-6k' },
  { label: '$6,000 – $10,000', value: '6k-10k' },
  { label: '$10,000+', value: '10k-plus' },
  { label: "Not sure — suggest a package", value: 'unsure' },
];

export function ChatAssistant() {
  const t = useTranslations('chat');
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>('greeting');
  const [visitorType, setVisitorType] = useState<VisitorType | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [budget, setBudget] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [messages, setMessages] = useState<{ from: 'bot' | 'user'; text: string }[]>([]);
  const [visible, setVisible] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ from: 'bot', text: t('greeting') }]);
      setStep('visitor-type');
    }
  }, [open, messages.length, t]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addBot = (text: string) => setMessages((m) => [...m, { from: 'bot', text }]);
  const addUser = (text: string) => setMessages((m) => [...m, { from: 'user', text }]);

  const selectType = (type: VisitorType) => {
    setVisitorType(type);
    addUser(VISITOR_LABELS[type]);
    const recs = SERVICE_RECS[type];
    setTimeout(() => {
      addBot(t('services_question', { services: recs.join(', ') }));
      setStep('services');
    }, 400);
  };

  const toggleService = (s: string) => {
    setSelectedServices((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

  const confirmServices = () => {
    const list = selectedServices.length > 0 ? selectedServices : ALL_SERVICES;
    addUser(list.join(', '));
    setTimeout(() => {
      addBot(t('budget_question'));
      setStep('budget');
    }, 400);
  };

  const selectBudget = (b: string) => {
    setBudget(b);
    const label = BUDGETS.find((x) => x.value === b)?.label || b;
    addUser(label);
    setTimeout(() => {
      addBot(t('contact_intro'));
      setStep('contact');
    }, 400);
  };

  const submitContact = () => {
    if (!name || !whatsapp) return;
    addUser(`${name}${company ? `, ${company}` : ''} — ${whatsapp}${email ? `, ${email}` : ''}`);
    setTimeout(() => {
      const summary = [
        `Visitor: ${visitorType ? VISITOR_LABELS[visitorType] : '—'}`,
        `Services: ${selectedServices.length > 0 ? selectedServices.join(', ') : ALL_SERVICES.join(', ')}`,
        `Budget: ${BUDGETS.find((b) => b.value === budget)?.label || budget || '—'}`,
        `Name: ${name}`,
        `Company: ${company || '—'}`,
        `WhatsApp: ${whatsapp}`,
        `Email: ${email || '—'}`,
      ].join('\n');

      const quoteText = encodeURIComponent(
        `New Lead — Zanzibaba Studios\n\n${summary}\n\nSent via AI Sales Assistant`
      );

      addBot(t('summary_intro'));
      setTimeout(() => {
        setMessages((m) => [
          ...m,
          {
            from: 'bot',
            text: `${t('summary_detail', {
              type: visitorType ? VISITOR_LABELS[visitorType] : '—',
              services: selectedServices.length > 0 ? selectedServices.join(', ') : ALL_SERVICES.join(', '),
              budget: BUDGETS.find((b) => b.value === budget)?.label || budget || '—',
            })}\n\n${t('summary_contact')}\n${name}${company ? `, ${company}` : ''}\n${whatsapp}${email ? `\n${email}` : ''}`,
          },
        ]);
        setStep('summary');
        setTimeout(() => {
          setMessages((m) => [
            ...m,
            {
              from: 'bot',
              text: t('summary_actions', { quoteText }),
            },
          ]);
          setStep('done');
        }, 600);

        const mailto = `mailto:${siteConfig.email}?subject=New Lead — Zanzibaba Studios&body=${quoteText}`;
        const wa = `https://wa.me/${siteConfig.whatsapp}?text=${quoteText}`;
        window.open(mailto, '_blank');
        window.open(wa, '_blank');
      }, 400);
    }, 400);
  };

  const handleProducerHandoff = () => {
    const msg = encodeURIComponent(
      `Hi Zanzibaba Studios! I was talking to the AI Assistant. Here's my project:\n\nType: ${visitorType ? VISITOR_LABELS[visitorType] : '—'}\nServices: ${selectedServices.length > 0 ? selectedServices.join(', ') : ALL_SERVICES.join(', ')}\nBudget: ${BUDGETS.find((b) => b.value === budget)?.label || budget || '—'}\nName: ${name}\nCompany: ${company || '—'}`
    );
    window.open(`https://wa.me/${siteConfig.whatsapp}?text=${msg}`, '_blank');
  };

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className={`fixed bottom-5 left-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-coral-500 text-white shadow-[0_20px_50px_-10px_rgba(255,90,20,0.6)] transition-all duration-500 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 active:scale-95 md:h-16 md:w-16 ${
          visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
        }`}
        aria-label={open ? t('close') : t('open')}
      >
        {open ? (
          <X className="h-6 w-6" aria-hidden="true" />
        ) : (
          <MessageCircle className="h-6 w-6" aria-hidden="true" />
        )}
      </button>

      {open && (
        <div className="fixed bottom-20 left-5 z-50 flex w-[360px] max-w-[calc(100vw-40px)] flex-col rounded-2xl border border-white/10 bg-ink-950/95 shadow-2xl backdrop-blur-2xl md:bottom-24 md:left-7 md:w-[400px]">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-coral-500">
                <Sparkles className="h-4 w-4 text-white" aria-hidden="true" />
              </span>
              <div>
                <div className="text-sm font-semibold text-white">{t('title')}</div>
                <div className="flex items-center gap-1.5 text-[10px] text-lagoon-300">
                  <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-lagoon-400" />
                  {t('online')}
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="grid h-8 w-8 place-items-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white focus:outline-none"
              aria-label={t('close')}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex max-h-[420px] flex-col gap-3 overflow-y-auto p-5">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.from === 'user'
                      ? 'bg-coral-500/20 text-white'
                      : 'bg-white/5 text-white/90'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {step === 'visitor-type' && (
              <div className="flex flex-wrap gap-2">
                {VISITOR_TYPES.map((type) => (
                  <button
                    key={type}
                    onClick={() => selectType(type)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-white/80 transition-colors hover:border-coral-400/50 hover:bg-coral-500/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-coral-400"
                  >
                    <ChevronRight className="h-3 w-3 text-coral-400" />
                    {t(`types.${type}`)}
                  </button>
                ))}
              </div>
            )}

            {step === 'services' && (
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap gap-2">
                  {ALL_SERVICES.map((s) => (
                    <button
                      key={s}
                      onClick={() => toggleService(s)}
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-coral-400 ${
                        selectedServices.includes(s)
                          ? 'border-coral-400/60 bg-coral-500/15 text-coral-200'
                          : 'border-white/15 bg-white/[0.04] text-white/70 hover:border-white/30 hover:text-white'
                      }`}
                    >
                      {selectedServices.includes(s) && <Check className="h-3 w-3" />}
                      {s}
                    </button>
                  ))}
                </div>
                <button
                  onClick={confirmServices}
                  className="mt-1 self-start rounded-full bg-coral-500 px-5 py-2 text-xs font-semibold text-white transition-colors hover:bg-coral-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral-400"
                >
                  {t('continue')}
                </button>
              </div>
            )}

            {step === 'budget' && (
              <div className="flex flex-wrap gap-2">
                {BUDGETS.map((b) => (
                  <button
                    key={b.value}
                    onClick={() => selectBudget(b.value)}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-coral-400 ${
                      budget === b.value
                        ? 'border-coral-400/60 bg-coral-500/15 text-coral-200'
                        : 'border-white/15 bg-white/[0.04] text-white/70 hover:border-white/30 hover:text-white'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            )}

            {step === 'contact' && (
              <div className="flex flex-col gap-3">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t('form_name')}
                  className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder-white/40 outline-none transition-colors focus:border-coral-400/60 focus:bg-coral-500/[0.04]"
                />
                <input
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder={t('form_company')}
                  className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder-white/40 outline-none transition-colors focus:border-coral-400/60 focus:bg-coral-500/[0.04]"
                />
                <input
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder={t('form_whatsapp')}
                  className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder-white/40 outline-none transition-colors focus:border-coral-400/60 focus:bg-coral-500/[0.04]"
                />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('form_email')}
                  className="w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder-white/40 outline-none transition-colors focus:border-coral-400/60 focus:bg-coral-500/[0.04]"
                />
                <button
                  onClick={submitContact}
                  disabled={!name || !whatsapp}
                  className="mt-1 inline-flex items-center justify-center gap-2 self-start rounded-full bg-coral-500 px-6 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-coral-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-coral-400 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Send className="h-3.5 w-3.5" />
                  {t('send')}
                </button>
              </div>
            )}

            {step === 'done' && (
              <div className="flex flex-col gap-2 pt-1">
                <button
                  onClick={handleProducerHandoff}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-lagoon-300/40 bg-lagoon-300/10 px-5 py-2.5 text-xs font-semibold text-lagoon-200 transition-colors hover:bg-lagoon-300/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-lagoon-400"
                >
                  <ArrowUpRight className="h-3.5 w-3.5" />
                  {t('producer')}
                </button>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        </div>
      )}
    </>
  );
}
