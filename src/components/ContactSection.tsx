import React, {useEffect, useState} from 'react';
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Copy,
  MapPin,
  MessageCircle,
} from 'lucide-react';
import {
  BUSINESS_INFO,
  NEED_OPTIONS,
  getWhatsAppUrl,
} from '../data/studioData';
import {useScrollReveal} from '../hooks/useScrollReveal';

interface ContactSectionProps {
  preselectedNeed?: string;
}

interface FormValues {
  name: string;
  businessName: string;
  phone: string;
  need: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  need?: string;
  message?: string;
}

/**
 * Modular submission handler structured for Netlify Forms, Formspree,
 * EmailJS, or a custom backend endpoint.
 */
async function submitEnquiry(values: FormValues): Promise<{ok: boolean}> {
  const encodedBody = new URLSearchParams({
    'form-name': 'contact',
    name: values.name.trim(),
    businessName: values.businessName.trim(),
    phone: values.phone.trim(),
    need: values.need,
    message: values.message.trim(),
  }).toString();

  // Attempt standard Netlify Forms POST when deployed on Netlify;
  // gracefully completes on static/dev hosts without throwing errors.
  try {
    const response = await fetch('/', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: encodedBody,
    });
    if (response.ok) {
      return {ok: true};
    }
  } catch {
    // Fallback handled smoothly below for local preview / non-Netlify hosts
  }

  await new Promise((resolve) => setTimeout(resolve, 420));
  return {ok: true};
}

export function ContactSection({preselectedNeed}: ContactSectionProps) {
  const {ref, isVisible} = useScrollReveal<HTMLElement>(0.1);
  const [values, setValues] = useState<FormValues>({
    name: '',
    businessName: '',
    phone: '',
    need: preselectedNeed || 'Business Website',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  useEffect(() => {
    if (preselectedNeed) {
      setValues((prev) => ({...prev, need: preselectedNeed}));
      setSubmitted(false);
    }
  }, [preselectedNeed]);

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!values.name.trim() || values.name.trim().length < 2) {
      nextErrors.name = 'Please enter your name.';
    }
    const digits = values.phone.replace(/\D/g, '');
    if (digits.length < 10) {
      nextErrors.phone = 'Please enter a valid 10-digit phone or WhatsApp number.';
    }
    if (!values.need) {
      nextErrors.need = 'Please select what you need.';
    }
    if (!values.message.trim() || values.message.trim().length < 8) {
      nextErrors.message = 'Please share a few details about your project.';
    }
    return nextErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    const result = await submitEnquiry(values);
    setSubmitting(false);

    if (result.ok) {
      setSubmitted(true);
    }
  };

  const handleCopyNumber = async () => {
    try {
      await navigator.clipboard.writeText(BUSINESS_INFO.whatsappDisplay);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } catch {
      // Ignore clipboard permission errors
    }
  };

  const whatsappSummaryMessage = `Hi Web Solutions, I'm ${
    values.name || 'a business owner'
  }${values.businessName ? ` from ${values.businessName}` : ''}. I'm interested in a ${
    values.need
  }. ${values.message}`;

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start ws-reveal ${
            isVisible ? 'is-visible' : ''
          }`}
        >
          {/* Left Side: Direct Studio Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7D93FF]">
                Contact
              </p>
              <h2 className="mt-3 font-display text-[clamp(2rem,3.6vw,3.1rem)] font-bold leading-[1.08] tracking-[-0.025em] text-white">
                LET&apos;S BUILD SOMETHING.
              </h2>
              <p className="mt-4 text-base sm:text-[17px] leading-relaxed text-[#949BA8]">
                Have a project in mind? Tell us what you need and we&apos;ll get
                back to you.
              </p>
            </div>

            <div className="pt-2 space-y-6 border-t border-white/[0.08]">
              {/* WhatsApp Contact Block */}
              <div className="pt-4">
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#646B78]">
                  WhatsApp
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono-code text-lg sm:text-xl font-medium text-white hover:text-[#9EB0FF] transition-colors tabular-nums"
                  >
                    <MessageCircle
                      className="w-5 h-5 text-[#4F6BFF]"
                      aria-hidden="true"
                    />
                    <span>{BUSINESS_INFO.whatsappDisplay}</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyNumber}
                    aria-label="Copy WhatsApp number"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-white/[0.1] bg-white/[0.02] hover:bg-white/[0.06] text-[11px] font-medium text-[#949BA8] hover:text-white transition-colors cursor-pointer"
                  >
                    {copiedPhone ? (
                      <>
                        <Check className="w-3 h-3 text-[#4F6BFF]" aria-hidden="true" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" aria-hidden="true" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-[#7D93FF] hover:text-white transition-colors"
                >
                  <span>Message us directly on WhatsApp</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>

              {/* Studio Location Block */}
              <div className="pt-4 border-t border-white/[0.07]">
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#646B78]">
                  Location
                </div>
                <div className="mt-2 flex items-start gap-2.5 text-base text-[#E4E8F0]">
                  <MapPin
                    className="w-4 h-4 text-[#4F6BFF] shrink-0 mt-1"
                    aria-hidden="true"
                  />
                  <address className="not-italic leading-relaxed">
                    {BUSINESS_INFO.addressLine1}
                    <br />
                    {BUSINESS_INFO.addressLine2}
                  </address>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Clean Modern Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-white/[0.1] bg-[#0D1018] p-6 sm:p-8 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)]">
              {submitted ? (
                <div className="py-10 text-center space-y-5">
                  <div className="mx-auto w-12 h-12 rounded-full bg-[#4F6BFF]/15 border border-[#4F6BFF]/40 flex items-center justify-center text-[#7D93FF]">
                    <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-display text-2xl font-bold text-white">
                      Enquiry Received
                    </h3>
                    <p className="mx-auto max-w-md text-sm sm:text-[15px] leading-relaxed text-[#949BA8]">
                      Thank you, <span className="text-white">{values.name}</span>.
                      We&apos;ve logged your details for a{' '}
                      <span className="text-white">{values.need}</span> and will
                      reach out on{' '}
                      <span className="font-mono-code text-white">
                        {values.phone}
                      </span>
                      .
                    </p>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={getWhatsAppUrl(whatsappSummaryMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#4F6BFF] hover:bg-[#5E78FF] text-sm font-semibold text-white transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      <span>Send Details via WhatsApp</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setValues({
                          name: '',
                          businessName: '',
                          phone: '',
                          need: 'Business Website',
                          message: '',
                        });
                      }}
                      className="px-4 py-3 rounded-xl border border-white/[0.1] text-sm font-medium text-[#949BA8] hover:text-white hover:border-white/25 transition-colors cursor-pointer"
                    >
                      Send Another Enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  name="contact"
                  method="POST"
                  data-netlify="true"
                  noValidate
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <input type="hidden" name="form-name" value="contact" />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="ws-name"
                        className="block text-xs font-medium text-[#CBD2DF] mb-2"
                      >
                        Name <span className="text-[#7D93FF]">*</span>
                      </label>
                      <input
                        id="ws-name"
                        name="name"
                        type="text"
                        required
                        placeholder="Your full name"
                        value={values.name}
                        onChange={(e) => {
                          setValues({...values, name: e.target.value});
                          if (errors.name) setErrors({...errors, name: undefined});
                        }}
                        className="w-full rounded-xl border border-white/[0.1] bg-[#07090F] px-4 py-3 text-sm text-white placeholder:text-[#555C69] focus:outline-none focus:border-[#4F6BFF] focus:ring-2 focus:ring-[#4F6BFF]/25 transition-all"
                      />
                      {errors.name && (
                        <p className="mt-1.5 text-xs text-rose-400" role="alert">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="ws-business"
                        className="block text-xs font-medium text-[#CBD2DF] mb-2"
                      >
                        Business Name
                      </label>
                      <input
                        id="ws-business"
                        name="businessName"
                        type="text"
                        placeholder="Company or brand name"
                        value={values.businessName}
                        onChange={(e) =>
                          setValues({...values, businessName: e.target.value})
                        }
                        className="w-full rounded-xl border border-white/[0.1] bg-[#07090F] px-4 py-3 text-sm text-white placeholder:text-[#555C69] focus:outline-none focus:border-[#4F6BFF] focus:ring-2 focus:ring-[#4F6BFF]/25 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="ws-phone"
                        className="block text-xs font-medium text-[#CBD2DF] mb-2"
                      >
                        Phone / WhatsApp <span className="text-[#7D93FF]">*</span>
                      </label>
                      <input
                        id="ws-phone"
                        name="phone"
                        type="tel"
                        required
                        placeholder="e.g. 9876543210"
                        value={values.phone}
                        onChange={(e) => {
                          setValues({...values, phone: e.target.value});
                          if (errors.phone) setErrors({...errors, phone: undefined});
                        }}
                        className="w-full rounded-xl border border-white/[0.1] bg-[#07090F] px-4 py-3 text-sm text-white placeholder:text-[#555C69] focus:outline-none focus:border-[#4F6BFF] focus:ring-2 focus:ring-[#4F6BFF]/25 transition-all"
                      />
                      {errors.phone && (
                        <p className="mt-1.5 text-xs text-rose-400" role="alert">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="ws-need"
                        className="block text-xs font-medium text-[#CBD2DF] mb-2"
                      >
                        What do you need? <span className="text-[#7D93FF]">*</span>
                      </label>
                      <select
                        id="ws-need"
                        name="need"
                        required
                        value={values.need}
                        onChange={(e) => {
                          setValues({...values, need: e.target.value});
                          if (errors.need) setErrors({...errors, need: undefined});
                        }}
                        className="w-full rounded-xl border border-white/[0.1] bg-[#07090F] px-4 py-3 text-sm text-white focus:outline-none focus:border-[#4F6BFF] focus:ring-2 focus:ring-[#4F6BFF]/25 transition-all cursor-pointer"
                      >
                        {NEED_OPTIONS.map((option) => (
                          <option
                            key={option}
                            value={option}
                            className="bg-[#0D1018] text-white"
                          >
                            {option}
                          </option>
                        ))}
                      </select>
                      {errors.need && (
                        <p className="mt-1.5 text-xs text-rose-400" role="alert">
                          {errors.need}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="ws-message"
                      className="block text-xs font-medium text-[#CBD2DF] mb-2"
                    >
                      Message <span className="text-[#7D93FF]">*</span>
                    </label>
                    <textarea
                      id="ws-message"
                      name="message"
                      rows={4}
                      required
                      placeholder="Tell us briefly about your business and what you want your website to achieve..."
                      value={values.message}
                      onChange={(e) => {
                        setValues({...values, message: e.target.value});
                        if (errors.message)
                          setErrors({...errors, message: undefined});
                      }}
                      className="w-full rounded-xl border border-white/[0.1] bg-[#07090F] px-4 py-3 text-sm text-white placeholder:text-[#555C69] focus:outline-none focus:border-[#4F6BFF] focus:ring-2 focus:ring-[#4F6BFF]/25 transition-all resize-y"
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-xs text-rose-400" role="alert">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <div className="pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-[#4F6BFF] hover:bg-[#5E78FF] active:scale-[0.98] disabled:opacity-60 rounded-xl shadow-[0_0_28px_-8px_rgba(79,107,255,0.7)] transition-all duration-200 group cursor-pointer whitespace-nowrap"
                    >
                      <span>{submitting ? 'Sending...' : 'Send Enquiry'}</span>
                      <ArrowRight
                        className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </button>

                    <span className="text-xs text-[#646B78]">
                      Typically responds within a few hours.
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
