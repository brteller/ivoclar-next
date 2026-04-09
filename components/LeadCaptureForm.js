'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const JOB_TITLE_OPTIONS = [
  { value: '01', label: 'Dentist' },
  { value: '07', label: 'Denturist' },
  { value: '03', label: 'Hygienist' },
  { value: '11', label: 'Office Manager' },
  { value: '14', label: 'Student' },
  { value: '02', label: 'Technician' },
];

const STATE_PROVINCE_OPTIONS = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
  'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
  'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
  'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
  'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Vermont', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming', 'Alberta', 'British Columbia', 'Manitoba',
  'New Brunswick', 'Newfoundland and Labrador', 'Northwest Territories', 'Nova Scotia', 'Nunavut',
  'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan', 'Yukon',
];

const COUNTRY_OPTIONS = ['Canada', 'United States'];

const PRODUCT_OPTIONS = [
  { value: 'Tetric EvoCeram Aligner 762519WW', label: 'Tetric EvoCeram Aligner' },
  { value: 'Tetric Prime', label: 'Tetric Prime' },
  { value: 'Tetric PowerFlow/ Fill', label: 'Tetric PowerFlow/ PowerFill' },
  { value: 'Tetric EvoFlow', label: 'Tetric EvoFlow' },
];

export default function LeadCaptureForm({ pathname = '', pageContext = {} }) {
  const router = useRouter();
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    company: '',
    email: '',
    jobtitle: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    products: [],
    privacy: false,
    doubleoptin: false,
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_term: '',
    utm_id: '',
    utm_content: '',
  });

  const handleFormChange = (e) => {
    const { name, value, type, checked, multiple, options } = e.target;
    if (multiple) {
      const selected = Array.from(options).filter((o) => o.selected).map((o) => o.value);
      setFormData((prev) => ({ ...prev, [name]: selected }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.privacy) {
      alert('Please read and accept the General Terms of Use to continue.');
      return;
    }

    setFormSubmitting(true);
    const payload = {
      ...formData,
      page_path: pathname,
      category: pageContext?.category ?? null,
      country_context: pageContext?.country ?? null,
      state_context: pageContext?.state ?? null,
      city_context: pageContext?.city ?? null,
      // Match the upstream form-style structure for Salesforce testing.
      formbuilder_3318: {
        formId: '3318',
        firstname: formData.firstname,
        lastname: formData.lastname,
        company: formData.company,
        email: formData.email,
        jobtitle: formData.jobtitle,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
        country: formData.country,
        products: formData.products,
        privacy: String(formData.privacy),
        doubleoptin: formData.doubleoptin ? ['true'] : [],
        utm_source: formData.utm_source,
        utm_medium: formData.utm_medium,
        utm_campaign: formData.utm_campaign,
        utm_term: formData.utm_term,
        utm_id: formData.utm_id,
        utm_content: formData.utm_content,
      },
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Contact submission failed');
      router.push('/thank-you');
    } catch (error) {
      console.error('Form submission error:', error);
      alert('There was an error submitting your form. Please try again.');
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 px-4 md:px-6 bg-white border-t border-gray-200">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-[#0a478b] mb-8 tracking-tight">Discover the power in person</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <p className="text-sm text-gray-700">
          Request a in-office demo and see the Tetric line in action
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="First name" required><input type="text" name="firstname" value={formData.firstname} onChange={handleFormChange} required className={inputClass} /></Field>
            <Field label="Last name" required><input type="text" name="lastname" value={formData.lastname} onChange={handleFormChange} required className={inputClass} /></Field>
            <Field label="Company Name" required><input type="text" name="company" value={formData.company} onChange={handleFormChange} required className={inputClass} /></Field>
            <Field label="Email" required><input type="email" name="email" value={formData.email} onChange={handleFormChange} required className={inputClass} /></Field>

            <Field label="Job Title" required>
              <select name="jobtitle" value={formData.jobtitle} onChange={handleFormChange} required className={inputClass}>
                <option value="">Job Title</option>
                {JOB_TITLE_OPTIONS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </Field>

            <Field label="Phone Number"><input type="tel" name="phone" value={formData.phone} onChange={handleFormChange} className={inputClass} /></Field>
            <Field label="Address" required><input type="text" name="address" value={formData.address} onChange={handleFormChange} required className={inputClass} /></Field>
            <Field label="City" required><input type="text" name="city" value={formData.city} onChange={handleFormChange} required className={inputClass} /></Field>

            <Field label="Choose your State/ Province" required>
              <select name="state" value={formData.state} onChange={handleFormChange} required className={inputClass}>
                <option value="">Choose your State/ Province</option>
                {STATE_PROVINCE_OPTIONS.map((value) => <option key={value} value={value}>{value}</option>)}
              </select>
            </Field>

            <Field label="Post code" required><input type="text" name="zip" value={formData.zip} onChange={handleFormChange} required className={inputClass} /></Field>

            <Field label="Country" required>
              <select name="country" value={formData.country} onChange={handleFormChange} required className={inputClass}>
                <option value="">Country</option>
                {COUNTRY_OPTIONS.map((value) => <option key={value} value={value}>{value}</option>)}
              </select>
            </Field>

            <Field label="Choose the product you want to demo">
              <select multiple name="products" value={formData.products} onChange={handleFormChange} className={`${inputClass} min-h-[128px]`}>
                {PRODUCT_OPTIONS.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </Field>
          </div>

          <div className="space-y-4 pt-2">
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" name="privacy" checked={formData.privacy} onChange={handleFormChange} className="mt-1 rounded border-gray-300 text-[#0a478b] focus:ring-[#0a478b]" />
              <span className="text-sm text-gray-700">
                I&apos;ve read and understood the{' '}
                <a href="https://www.ivoclar.com/en_us/legal/general-terms-of-use" target="_blank" rel="noopener noreferrer" className="text-[#0a478b] hover:underline">
                  General Terms of Use
                </a>.
              </span>
            </label>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" name="doubleoptin" checked={formData.doubleoptin} onChange={handleFormChange} className="mt-1 rounded border-gray-300 text-[#0a478b] focus:ring-[#0a478b]" />
              <span className="text-sm text-gray-700">
                I would like to receive newsletters from Ivoclar and agree to the{' '}
                <a href="https://www.ivoclar.com/en_us/legal/marketing-consent" target="_blank" rel="noopener noreferrer" className="text-[#0a478b] hover:underline">
                  Marketing Terms of use
                </a>.
              </span>
            </label>
          </div>

          <div className="flex justify-end pt-4">
            <button type="submit" disabled={formSubmitting} className="bg-[#0a478b] hover:bg-[#083a70] disabled:opacity-70 text-white font-bold px-8 py-4 rounded-lg transition-colors">
              {formSubmitting ? 'Sending…' : 'Try it Today'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

const inputClass =
  'w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0a478b]/20 focus:border-[#0a478b] bg-white';

function Field({ label, required = false, children }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-gray-700 mb-1">
        {label}{required ? ' *' : ''}
      </span>
      {children}
    </label>
  );
}
