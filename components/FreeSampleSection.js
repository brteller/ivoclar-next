'use client';

/**
 * FreeSampleSection — production version of Concept E: "Split Panel, Stepped"
 * (approved on the July 30 call as the version for tetricline.com,
 * universalcomposite.com, and the Canada domain).
 *
 * Step 1 = product (four compact selectors) + contact info (email AND phone).
 * Step 2 = practice + shipping info for the sample.
 *
 * SUBMISSION: the step-2 form POSTs natively (no fetch/API route) straight to
 * the Pardot form handler for US_ColdStart Tetric Line Campaign_2026:
 *   https://campaign.ivoclar.com/l/794073/2026-07-28/4bk7vl
 * (Eric/Zach's campaign info email, Jul 29 2026.) This works on static
 * deployments too. Fields posted match the agreed mapping: firstname,
 * lastname, email, phone, company (practice name), address, city, state,
 * zip, country, product, privacy, source (hidden).
 *
 * SUCCESS FLOW: the handler's Success Location is "Referring URL", so before
 * submitting we tag the page URL with ?sample=received (history.replaceState)
 * and send the full referrer (referrerPolicy="no-referrer-when-downgrade").
 * Pardot redirects the visitor back here, we detect the param on mount, show
 * the confirmation state, and clean the URL.
 */

import { useState, useEffect, useRef } from 'react';

const PARDOT_SAMPLE_FORM_ACTION =
	process.env.NEXT_PUBLIC_PARDOT_SAMPLE_FORM_ACTION ||
	'https://campaign.ivoclar.com/l/794073/2026-07-28/4bk7vl';

const SUCCESS_PARAM = 'sample';
const SUCCESS_VALUE = 'received';

const SAMPLE_PRODUCTS = [
	{
		id: 'tetric-prime',
		name: 'Tetric Prime',
		image:
			'https://www.ivoclar.com/GLOBAL%20-%20MEDIA/Products/Composite/Tetric%20Line/88855/image-thumb__88855__blog_detail/Tetric-Prime-A3_1920x1220px.76c37b3f.jpg',
	},
	{
		id: 'tetric-evoflow',
		name: 'Tetric EvoFlow',
		image:
			'https://www.ivoclar.com/GLOBAL%20-%20MEDIA/Products/Composite/Tetric%20Line/88849/image-thumb__88849__blog_detail/Tetric-EvoFlow_1920x1220px.a60c890b.jpg',
	},
	{
		id: 'tetric-powerflow',
		name: 'Tetric PowerFlow',
		image:
			'https://www.ivoclar.com/GLOBAL%20-%20MEDIA/Products/Composite/Tetric%20Line/88853/image-thumb__88853__blog_detail/Tetric-PowerFlow_1920x1220px.e7385b30.jpg',
	},
	{
		id: 'tetric-powerfill',
		name: 'Tetric PowerFill',
		image:
			'https://www.ivoclar.com/GLOBAL%20-%20MEDIA/Products/Composite/Tetric%20Line/88851/image-thumb__88851__blog_detail/Tetric-PowerFill-ivA_1920x1220px.04996eab.jpg',
	},
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

const COUNTRY_OPTIONS = ['United States', 'Canada'];

// iv_Function_c values — same codes as the original demo form.
const JOB_TITLE_OPTIONS = [
	{ value: '01', label: 'Dentist' },
	{ value: '07', label: 'Denturist' },
	{ value: '03', label: 'Hygienist' },
	{ value: '11', label: 'Office Manager' },
	{ value: '14', label: 'Student' },
	{ value: '02', label: 'Technician' },
];

const inputClass =
	'w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0a478b]/20 focus:border-[#0a478b] bg-white text-sm';

export default function FreeSampleSection({ categoryName = null }) {
	const [step, setStep] = useState(1);
	const [form, setForm] = useState({
		product: '',
		firstname: '',
		lastname: '',
		email: '',
		phone: '',
		jobtitle: '',
		company: '',
		address: '',
		city: '',
		state: '',
		zip: '',
		country: '',
		privacy: false,
		doubleoptin: false,
		// Hidden attribution field for the new Salesforce sample campaign
		// (agreed name: "source"). Populated per domain at runtime.
		source: '',
	});
	const [submitted, setSubmitted] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const [errorNotice, setErrorNotice] = useState(null);
	const sectionRef = useRef(null);

	useEffect(() => {
		setForm((prev) => ({ ...prev, source: window.location.hostname }));

		// Returning from Pardot: both Success and Error Location are "Referring
		// URL", which we tagged with ?sample=received before submitting. On
		// error, Pardot appends the submitted fields plus errors=true to the
		// query — strip it all from the URL either way.
		const params = new URLSearchParams(window.location.search);
		const returnedSuccess = params.get(SUCCESS_PARAM) === SUCCESS_VALUE;
		const returnedError = params.get('errors') === 'true';
		if (returnedSuccess || returnedError) {
			window.history.replaceState(null, '', window.location.pathname);
			if (returnedError) {
				setErrorNotice(
					'Something went wrong submitting your request — please check your details and try again.',
				);
			} else {
				setSubmitted(true);
			}
			// Bring the confirmation (or the form to retry) into view.
			setTimeout(() => {
				sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
			}, 100);
		}
	}, []);

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
	};

	const handleStepOne = (e) => {
		e.preventDefault();
		setStep(2);
	};

	const selectedProduct = SAMPLE_PRODUCTS.find((p) => p.id === form.product);

	// Native submit straight to the Pardot form handler — do NOT preventDefault.
	// Tag the current URL first so Pardot's "Referring URL" success redirect
	// brings the visitor back with ?sample=received.
	const handleNativeSubmit = () => {
		setSubmitting(true);
		const url = new URL(window.location.href);
		url.searchParams.set(SUCCESS_PARAM, SUCCESS_VALUE);
		window.history.replaceState(null, '', url.toString());
	};

	return (
		/* id="contact": with the demo form removed, every "Try it Today" CTA on
		   the page scrolls to this section — single CTA per Eric's direction. */
		<section id="contact" ref={sectionRef} className="py-20 px-4 md:px-6 bg-gray-50 border-t border-gray-200">
			<div className="max-w-6xl mx-auto">
				<div
					className="bg-white p-8 md:p-12 overflow-hidden"
					style={{
						boxShadow: '0 4px 20px rgba(0, 166, 81, 0.08)',
						borderTop: '3px solid rgba(10, 71, 139, 0.5)',
						borderRight: '3px solid rgba(10, 71, 139, 0.5)',
						borderBottom: '3px solid #00a651',
						borderLeft: '3px solid #00a651',
					}}
				>
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
						{/* Left: value copy */}
						<div>
							<span className="inline-block bg-[#00a651]/10 text-[#00a651] text-xs font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full mb-5">
								Free Sample
							</span>
							<h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0a478b] leading-tight tracking-tight mb-4">
								Try {categoryName ? `Tetric® for ${categoryName}` : 'the Tetric® Line'} free in your practice
							</h2>
							<p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
								Request a free sample and a local Ivoclar representative will reach
								out to coordinate your sample delivery — no commitment, no purchase
								required.
							</p>
							<ol className="space-y-5">
								{[
									{ n: '1', t: 'Choose your sample', d: 'Pick the Tetric composite you want to try.' },
									{ n: '2', t: 'Your rep reaches out', d: 'A local Ivoclar representative will contact you to coordinate.' },
									{ n: '3', t: 'Sample delivered', d: 'Try the material in your practice, questions answered.' },
								].map((s) => (
									<li key={s.n} className="flex gap-4 items-start">
										<span className="flex-shrink-0 w-9 h-9 rounded-full bg-[#0a478b] text-white font-bold flex items-center justify-center text-sm">
											{s.n}
										</span>
										<div>
											<p className="font-semibold text-[#0a478b]">{s.t}</p>
											<p className="text-gray-600 text-sm leading-relaxed">{s.d}</p>
										</div>
									</li>
								))}
							</ol>
						</div>

						{/* Right: compact form card, two steps */}
						<div className="bg-gray-50 rounded-xl border border-gray-200 p-6 md:p-8">
							{submitted ? (
								<div className="text-center py-16">
									<div className="w-16 h-16 rounded-full bg-[#00a651]/10 text-[#00a651] flex items-center justify-center mx-auto mb-5 text-3xl">
										✓
									</div>
									<h3 className="text-xl font-bold text-[#0a478b] mb-2">Sample request received</h3>
									<p className="text-gray-600 text-sm leading-relaxed max-w-xs mx-auto">
										A local Ivoclar representative will reach out to coordinate
										delivery of your {selectedProduct?.name || 'Tetric'} sample.
									</p>
								</div>
							) : (
								<>
									<div className="flex items-center justify-between mb-4">
										<h3 className="text-lg font-bold text-[#0a478b]">Request your free sample</h3>
										<span className="text-xs font-semibold text-gray-400">Step {step} of 2</span>
									</div>

									{errorNotice && (
										<p className="text-sm text-red-600 mb-4" role="alert">{errorNotice}</p>
									)}

									{step === 1 ? (
										<form onSubmit={handleStepOne} className="space-y-4">
											{/* Four small product selectors */}
											<div className="grid grid-cols-2 gap-3">
												{SAMPLE_PRODUCTS.map((p) => {
													const selected = form.product === p.id;
													return (
														<button
															key={p.id}
															type="button"
															onClick={() => setForm((prev) => ({ ...prev, product: p.id }))}
															aria-pressed={selected}
															className={`flex items-center gap-2.5 rounded-lg border-2 bg-white px-2.5 py-2 text-left transition-all ${
																selected
																	? 'border-[#00a651] shadow-[0_0_0_3px_rgba(0,166,81,0.15)]'
																	: 'border-gray-200 hover:border-[#0a478b]/40'
															}`}
														>
															<span className="h-10 w-10 rounded-md bg-gray-50 overflow-hidden flex-shrink-0">
																{/* eslint-disable-next-line @next/next/no-img-element */}
																<img src={p.image} alt="" className="h-full w-full object-cover" />
															</span>
															<span className="min-w-0 flex-1 text-xs font-semibold text-[#0a478b] leading-tight">
																{p.name}
															</span>
															<span
																className={`flex-shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center text-[9px] font-bold ${
																	selected ? 'bg-[#00a651] border-[#00a651] text-white' : 'border-gray-300 text-transparent'
																}`}
																aria-hidden
															>
																✓
															</span>
														</button>
													);
												})}
											</div>

											<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
												<input type="text" name="firstname" placeholder="First name *" required value={form.firstname} onChange={handleChange} className={inputClass} />
												<input type="text" name="lastname" placeholder="Last name *" required value={form.lastname} onChange={handleChange} className={inputClass} />
											</div>
											<input type="email" name="email" placeholder="Email *" required value={form.email} onChange={handleChange} className={inputClass} />
											<input type="tel" name="phone" placeholder="Phone *" required value={form.phone} onChange={handleChange} className={inputClass} />
											<select name="jobtitle" required value={form.jobtitle} onChange={handleChange} className={inputClass}>
												<option value="">Your role *</option>
												{JOB_TITLE_OPTIONS.map((opt) => (
													<option key={opt.value} value={opt.value}>{opt.label}</option>
												))}
											</select>

											<button
												type="submit"
												disabled={!form.product}
												className="w-full bg-[#00a651] hover:bg-[#008c44] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold px-6 py-4 rounded-lg transition-colors text-base"
											>
												{form.product ? 'Continue' : 'Select a product to continue'}
											</button>
											<p className="text-xs text-gray-500 text-center">
												Next: where to send your sample.
											</p>
										</form>
									) : (
										<form
											method="POST"
											action={PARDOT_SAMPLE_FORM_ACTION}
											referrerPolicy="no-referrer-when-downgrade"
											onSubmit={handleNativeSubmit}
											className="space-y-4"
										>
											{/* Step-1 values carried as hidden fields for the native post */}
											<input type="hidden" name="firstname" value={form.firstname} />
											<input type="hidden" name="lastname" value={form.lastname} />
											<input type="hidden" name="email" value={form.email} />
											<input type="hidden" name="phone" value={form.phone} />
											<input type="hidden" name="jobtitle" value={form.jobtitle} />
											{/* Readable product name → Pardot Form Value 1 */}
											<input type="hidden" name="product" value={selectedProduct?.name || form.product} />
											{/* Hidden attribution for the new Salesforce campaign. Sent under
											    BOTH names: "source" (agreed with Zach) and "hidden field"
											    (external name in Eric's mapping → Pardot Form Value 2).
											    Whichever is mapped picks it up; the other is ignored. */}
											<input type="hidden" name="source" value={form.source} />
											<input type="hidden" name="hidden field" value={form.source} />
											{/* Opt In Double is in the Pardot mapping — always post a value */}
											<input type="hidden" name="doubleoptin" value={form.doubleoptin ? 'true' : 'false'} />

											{/* Selected product recap */}
											{selectedProduct && (
												<div className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-3 py-2.5">
													<span className="h-9 w-9 rounded-md bg-gray-50 overflow-hidden flex-shrink-0">
														{/* eslint-disable-next-line @next/next/no-img-element */}
														<img src={selectedProduct.image} alt="" className="h-full w-full object-cover" />
													</span>
													<p className="flex-1 text-xs font-semibold text-[#0a478b]">{selectedProduct.name}</p>
													<button type="button" onClick={() => setStep(1)} className="text-xs font-semibold text-[#0a478b] hover:underline">
														Change
													</button>
												</div>
											)}

											<input type="text" name="company" placeholder="Practice name *" required value={form.company} onChange={handleChange} className={inputClass} />
											<input type="text" name="address" placeholder="Address *" required value={form.address} onChange={handleChange} className={inputClass} />
											<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
												<input type="text" name="city" placeholder="City *" required value={form.city} onChange={handleChange} className={inputClass} />
												<select name="state" required value={form.state} onChange={handleChange} className={inputClass}>
													<option value="">State / Province *</option>
													{STATE_PROVINCE_OPTIONS.map((v) => (
														<option key={v} value={v}>{v}</option>
													))}
												</select>
												<input type="text" name="zip" placeholder="Post code *" required value={form.zip} onChange={handleChange} className={inputClass} />
												<select name="country" required value={form.country} onChange={handleChange} className={inputClass}>
													<option value="">Country *</option>
													{COUNTRY_OPTIONS.map((v) => (
														<option key={v} value={v}>{v}</option>
													))}
												</select>
											</div>

											<label className="flex items-start gap-3 cursor-pointer">
												<input type="checkbox" name="privacy" value="true" checked={form.privacy} onChange={handleChange} required className="mt-1 rounded border-gray-300 text-[#0a478b] focus:ring-[#0a478b]" />
												<span className="text-xs text-gray-600">
													I&apos;ve read and understood the{' '}
													<a href="https://www.ivoclar.com/en_us/legal/general-terms-of-use" target="_blank" rel="noopener noreferrer" className="text-[#0a478b] hover:underline">
														General Terms of Use
													</a>.
												</span>
											</label>
											<label className="flex items-start gap-3 cursor-pointer">
												{/* No name attr — posts via the hidden doubleoptin input above */}
												<input type="checkbox" checked={form.doubleoptin} onChange={(e) => setForm((prev) => ({ ...prev, doubleoptin: e.target.checked }))} className="mt-1 rounded border-gray-300 text-[#0a478b] focus:ring-[#0a478b]" />
												<span className="text-xs text-gray-600">
													I would like to receive newsletters from Ivoclar and agree to the{' '}
													<a href="https://www.ivoclar.com/en_us/legal/marketing-consent" target="_blank" rel="noopener noreferrer" className="text-[#0a478b] hover:underline">
														Marketing Terms of use
													</a>.
												</span>
											</label>

											<div className="flex items-center gap-3">
												<button
													type="button"
													onClick={() => setStep(1)}
													className="px-5 py-4 rounded-lg border border-gray-300 text-gray-600 font-semibold text-sm hover:bg-white transition-colors"
												>
													Back
												</button>
												<button
													type="submit"
													disabled={submitting}
													className="flex-1 bg-[#00a651] hover:bg-[#008c44] disabled:bg-[#00a651]/60 disabled:cursor-not-allowed text-white font-bold px-6 py-4 rounded-lg transition-colors text-base"
												>
													{submitting ? 'Submitting...' : 'Get my free sample'}
												</button>
											</div>
											<p className="text-xs text-gray-500 text-center">
												A local Ivoclar representative will reach out to coordinate delivery.
											</p>
										</form>
									)}
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
