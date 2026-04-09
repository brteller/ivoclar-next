'use client';

import React, { useState, useEffect } from 'react';
import { CREATOR } from '@/lib/creator';
import DentistTestimonials from '@/components/DentistTestimonials';
import EstheticsCard from '@/components/EstheticsCard';
import QualityCard from '@/components/QualityCard';
import EfficiencyCard from '@/components/EfficiencyCard';
import SuperheroTestimonialCards from '@/components/SuperheroTestimonialCards';
import LeadCaptureForm from '@/components/LeadCaptureForm';

/** Default top hero background (first section). */
const HERO_TOP_IMAGE = '/images/top-hero.png';
/** Default-hero mobile override: use Dr. Tiffani Dunn with gradient treatment */
const HERO_TOP_IMAGE_DEFAULT_MOBILE = '/images/superhero/tiffany.jpg';
/** Posterior-restoration categories: Dr. Anthony Mennito — same asset as superhero testimonial card */
const HERO_TOP_IMAGE_POSTERIOR_RESTORATION = '/images/superhero/mennito.jpg';
/** Light-cure categories: Dr. Luana Oliveira-Hass */
const HERO_TOP_IMAGE_LIGHT_CURE = '/images/superhero/luana.jpg';

/**
 * Full-viewport overlay: hold solid black through the copy side, then feather across the 50% seam
 * well into the photo (stops were too tight before → looked like a hard line).
 */
const HERO_POSTERIOR_SEAM_GRADIENT =
	'linear-gradient(90deg, rgb(0 0 0) 0%, rgb(0 0 0) 40%, rgb(0 0 0 / 0.94) 46%, rgb(0 0 0 / 0.72) 50%, rgb(0 0 0 / 0.38) 56%, rgb(0 0 0 / 0.12) 66%, transparent 78%)';
// Tetric product lines — image, learnMoreUrl; optional vimeoId (legacy) or vimeoSections (up to 2 with title/subtitle); optional secondaryPhoto block
const TETRIC_PRODUCTS = [
	{
		id: 'tetric-prime',
		name: 'Tetric Prime',
		tagline: 'Tetric Prime for excellent handling',
		description: 'The material\'s pronounced chameleon effect and excellent handling properties make it particularly suitable for rebuilding lost tooth structure in the highly visible anterior region. In most cases, you will need to apply only one shade-matched material to achieve a lifelike esthetic result.',
		featuresSubhead: 'Esthetics – Quality – Efficiency',
		features: [
			'Natural shade blend due to the pronounced chameleon effect',
			'Universally applicable enamel shades for small defects and direct veneers',
			'Dentin shades showing low translucency for restoring large defects and fulfilling high esthetic expectations',
			'Excellent handling properties: easy to contour as a result of low stickiness, good spreadability and creamy consistency',
			'Efficient polishability for a lustrous surface',
			'Easy to distinguish on X-rays due to high radiopacity'
		],
		faqQuestion: 'How does natural shade blend work?',
		faqAnswer: 'As a result of the special monomer and filler blend of our universal composites, the materials are capable of adapting their light-optical properties to those of the surrounding tooth structure.',
		specs: [
			{ label: 'Type', value: 'Universal composite' },
			{ label: 'Region', value: 'Anterior & posterior' },
			{ label: 'Shades', value: 'A2, A2 Dentin, A3' }
		],
		image: 'https://www.ivoclar.com/GLOBAL%20-%20MEDIA/Products/Composite/Tetric%20Line/88855/image-thumb__88855__blog_detail/Tetric-Prime-A3_1920x1220px.76c37b3f.jpg',
		learnMoreUrl: '#',
		// Optional: up to 2 Vimeo sections, each with title, subtitle, vimeoId. If omitted, legacy vimeoId is used for one section.
		vimeoSections: [
			{ title: 'Tetric Prime in practice', subtitle: 'Watch handling and application', vimeoId: '658559091' }
		],
		// Optional: second product-style block (title, subtitle, image) below the vimeo section(s).
		// secondaryPhoto: { title: 'Optional second block', subtitle: 'Subtitle here', image: 'https://...' }
	},
	{
		id: 'tetric-evoflow',
		name: 'Tetric EvoFlow',
		tagline: 'Tetric EvoFlow for flowable restorations',
		description: 'Tetric EvoFlow is characterized by its pronounced chameleon effect and excellent handling properties. Tetric EvoFlow can be applied precisely and is therefore suitable for creating minimally invasive anterior restorations and for use as a liner.',
		featuresSubhead: 'Esthetics – Quality – Efficiency',
		features: [
			'Natural shade blend due to the pronounced chameleon effect',
			'Universally applicable enamel shades for small defects and cervical restorations',
			'Dentin shades featuring low translucency for concealing stains and for fulfilling demanding esthetic expectations',
			'Precise application due to thixotropic consistency',
			'Can be used as a liner in combination with Tetric Prime',
			'Easy to distinguish on X-rays due to high radiopacity',
			'Efficient and easy polishing'
		],
		faqQuestion: 'Tetric EvoFlow has a thixotropic consistency',
		faqAnswer: 'It is flowable under pressure, yet it remains stable when handled. It therefore enables you to work with high precision. This characteristic allows the product to adapt closely to narrow and thinly tapering areas. The product remains in place where it has been applied.',
		specs: [
			{ label: 'Type', value: 'Flowable composite' },
			{ label: 'Region', value: 'Anterior & posterior' },
			{ label: 'Shades', value: 'A3 and more' }
		],
		image: 'https://www.ivoclar.com/GLOBAL%20-%20MEDIA/Products/Composite/Tetric%20Line/88849/image-thumb__88849__blog_detail/Tetric-EvoFlow_1920x1220px.a60c890b.jpg',
		learnMoreUrl: '#',
		vimeoId: '657826821'
	},
	{
		id: 'tetric-powerflow',
		name: 'Tetric PowerFlow',
		tagline: 'Tetric PowerFlow for bulk fill flow',
		description: 'The material is characterized by low shrinkage, optimum flexural strength and reliable depth of cure. This makes the clinical performance of Tetric PowerFlow just as impressive as that of conventional composites. As a result of its great adaptation to cavity walls, the product is suitable for the efficient treatment of deep cavities. We recommend using Tetric PowerFlow in combination with Tetric PowerFill. It can also be used in conjunction with Tetric Prime.',
		featuresSubhead: 'Esthetics – Quality – Efficiency',
		features: [
			'True-to-nature esthetics for posterior restorations due to Ivocerin and Aessencio Technology',
			'Reliable curing of increments of up to 4 mm in thickness',
			'Low susceptibility to process-related air entrapment',
			'Great adaptation to cavity walls and fast volume replacement because of outstanding flow properties',
			'Short light exposure times from 3 seconds',
			'Effective combination with Tetric PowerFill and Tetric Prime',
			'Patented light initiator Ivocerin[4, 5] and Aessencio Technology'
		],
		faqQuestion: 'Patented light initiator Ivocerin[4, 5] and Aessencio Technology',
		faqAnswer: 'Ivocerin ensures a reliable depth of cure of composite layers of up to 4 mm. The Aessencio Technology is responsible for gradually increasing the opacity of the initially translucent 4-mm composites during the light polymerization process. Ultimately, the materials attain the translucency levels of enamel and dentin and therefore assume a true-to-nature esthetic appearance.',
		specs: [
			{ label: 'Increment', value: '≤ 4 mm' },
			{ label: 'Region', value: 'Posterior (Class I & II)' },
			{ label: 'Technology', value: '3s PowerCure' }
		],
		image: 'https://www.ivoclar.com/GLOBAL%20-%20MEDIA/Products/Composite/Tetric%20Line/88853/image-thumb__88853__blog_detail/Tetric-PowerFlow_1920x1220px.e7385b30.jpg',
		learnMoreUrl: '#',
		vimeoId: '657820352'
	},
	{
		id: 'tetric-powerfill',
		name: 'Tetric PowerFill',
		tagline: 'Tetric PowerFill for bulk fill packable',
		description: 'Tetric PowerFill is characterized by reliable depth of cure, low shrinkage and optimum flexural strength[2]. In short: The clinical performance of Tetric PowerFill is just as impressive and the results are just as esthetic[6] as those achieved with conventional composites. The low stickiness of Tetric PowerFill facilitates the creation of anatomical structures.',
		featuresSubhead: 'Esthetics – Quality – Efficiency',
		features: [
			'True-to-nature esthetics for posterior restorations due to Ivocerin[4, 5] and Aessencio Technology',
			'Excellent margin quality in combination with Adhese Universal',
			'Reliable depth of cure of increments of up to 4 mm in thickness',
			'Low susceptibility to process-related air entrapments[7]',
			'Easy creation of anatomical structures because of low stickiness',
			'Short light exposure times from 3 seconds',
			'Can be combined with Tetric PowerFlow',
			'Patented light initiator Ivocerin[4, 5] and Aessencio Technology'
		],
		faqQuestion: 'Patented light initiator Ivocerin[4, 5] and Aessencio Technology',
		faqAnswer: 'Ivocerin ensures a reliable depth of cure of composite layers of up to 4 mm. The Aessencio Technology is responsible for gradually increasing the opacity of the initially translucent 4-mm composites during the light polymerization process. Ultimately, the materials attain the translucency levels of enamel and dentin and therefore assume a true-to-nature esthetic appearance.',
		specs: [
			{ label: 'Increment', value: '≤ 4 mm' },
			{ label: 'Region', value: 'Posterior (Class I & II)' },
			{ label: 'Technology', value: '3s PowerCure' }
		],
		image: 'https://www.ivoclar.com/GLOBAL%20-%20MEDIA/Products/Composite/Tetric%20Line/88851/image-thumb__88851__blog_detail/Tetric-PowerFill-ivA_1920x1220px.04996eab.jpg',
		learnMoreUrl: '#',
		vimeoId: '657820352'
	},
	{
		id: 'powerfill-powerflow-efficiency',
		name: 'Tetric PowerFill and Tetric PowerFlow for maximized efficiency',
		tagline: 'Maximized efficiency with PowerFill and PowerFlow',
		description: 'Tetric PowerFill and Tetric PowerFlow will increase the efficiency of your workflow – whilst maintaining your customary high quality and esthetic standards. Your patients will be pleased, because shorter treatment times mean less stress and discomfort for them.',
		contentSections: [
			{
				heading: 'Streamlined treatment protocol',
				body: 'Since you can apply Tetric PowerFill and Tetric PowerFlow in increments of up to 4 mm, you will need to use fewer layers compared with conventional filling techniques. Fewer increments means having to switch less between the composite, the modelling instrument and the light-curing device – whilst achieving the same high-quality treatment results as with conventional layering techniques.'
			},
			{
				heading: 'Light exposure times from 3 seconds',
				body: 'Modern curing lights such as Bluephase® PowerCure deliver up to 3,000 mW/cm2. Consequently, the required polymerization time can be reduced to 3 seconds. Tetric PowerFill and Tetric PowerFlow in layers of up to 4-mm thickness can be cured in only 3 seconds.'
			},
			{
				heading: 'Save up to 51% on treatment time with 3s PowerCure products',
				body: 'Reduce your treatment time in the posterior region by up to 51%[6] and gain valuable time for yourself and your patients.'
			}
		],
		specs: [
			{ label: 'Products', value: 'Tetric PowerFill + Tetric PowerFlow' },
			{ label: 'Technology', value: '3s PowerCure' },
			{ label: 'Benefit', value: 'Time savings up to 51% (4 mm)' }
		],
		image: 'https://www.ivoclar.com/GLOBAL%20-%20MEDIA/Products/Composite/Tetric%20Line/88837/image-thumb__88837__blog_detail/direct-restoratives_header_1920x1220px.d960d3fa.jpg',
		learnMoreUrl: '#',
		vimeoId: null
	},
	{
		id: 'light-exposure-times',
		name: 'Light exposure times',
		tagline: 'Recommended light curing parameters',
		description: 'Use the table below to select the right light intensity and exposure time for each Tetric Line product. Higher intensities allow shorter exposure times; Tetric PowerFill and Tetric PowerFlow can be cured in only 3 seconds with the Bluephase® PowerCure.',
		exposureTable: {
			headers: ['Products', 'Light intensity (mW/cm²)', 'Exposure time', 'Example Curing Light'],
			rows: [
				['All composites of the Tetric Line', '500-900', '20 s', '—'],
				['All composites of the Tetric Line', '1,000-1,300', '10 s', 'e. g. Bluephase G4'],
				['All composites of the Tetric Line', '1,800-2,200', '5 s', 'e. g. Bluephase PowerCure'],
				['Tetric PowerFill and PowerFlow', '2,700-3,300', '3 s [14]', 'e. g. Bluephase PowerCure']
			],
			footnote: '[14] Only suitable for Class I & II restorations in posterior teeth light-cured from the occlusal aspect.'
		},
		specs: [
			{ label: 'Technology', value: '3s PowerCure (posterior)' },
			{ label: 'Benefit', value: 'Short exposure, efficient curing' }
		],
		image: 'https://www.ivoclar.com/GLOBAL%20-%20MEDIA/Products/Composite/Tetric%20Line/88869/image-thumb__88869__blog_detail/Tetric_Light-exposure_1920x1220px.55c180b8.jpg',
		learnMoreUrl: '#',
		vimeoId: null
	}
];

// Optional: show only certain products per category slug. Key = category slug (from URL or normalized category name). Value = array of product ids. If not set or slug not found, all products are shown.
const TETRIC_PRODUCTS_BY_CATEGORY = {
	'posterior-restoration-composite': ['tetric-powerflow', 'tetric-powerfill'],
	'bulk-fill-composite': [
		'tetric-powerflow',
		'tetric-powerfill',
		'powerfill-powerflow-efficiency',
		'light-exposure-times',
	],
	'bulk-fill': [
		'tetric-powerflow',
		'tetric-powerfill',
		'powerfill-powerflow-efficiency',
		'light-exposure-times',
	],
};

/** Order preserved when filtering TETRIC_PRODUCTS — same slug rules as categorySlugIndicatesAnteriorRestoration */
const ANTERIOR_RESTORATION_PRODUCT_IDS = ['tetric-prime', 'tetric-evoflow', 'light-exposure-times'];

/** Product images for “Discover the power and buy now” — matches Tetric line section assets (excludes maximized-efficiency combo tile) */
const BUY_SECTION_PRODUCT_IDS = [
	'tetric-prime',
	'tetric-powerflow',
	'tetric-powerfill',
	'light-exposure-times',
];

const DEFAULT_TESTIMONIAL_IDS = ['tiffani', 'manuela', 'luana'];
const POSTERIOR_RESTORATION_TESTIMONIAL_IDS = ['manuela', 'tiffani', 'luana'];
const TESTIMONIAL_IDS_BY_CATEGORY = {
	// Example:
	// 'posterior-restoration-composite': ['ragazzini'],
	'light-cure-composite': ['luana', 'manuela', 'tiffani'],
	'flowable-composite': ['manuela', 'tiffani', 'luana'],
	'universal-composite': ['manuela', 'tiffani', 'luana'],
	'chamaleon-composite': ['manuela', 'tiffani', 'luana'],
};

/** Category slug must contain this substring (API `category.slug`, URL segment, or normalized category key). */
const ANTERIOR_RESTORATION_SLUG_SNIPPET = 'anterior-restoration';

function categorySlugIndicatesAnteriorRestoration(htmlContent, pageContext, categorySlugKey) {
	const apiSlug = (htmlContent?.category?.slug ?? '').toString().toLowerCase();
	const pathSlug =
		pageContext?.type !== 'home' && pageContext.parts?.length
			? String(pageContext.parts[pageContext.parts.length - 1]).toLowerCase()
			: '';
	const normalizedKey = (categorySlugKey ?? '').toString().toLowerCase();
	return (
		apiSlug.includes(ANTERIOR_RESTORATION_SLUG_SNIPPET) ||
		pathSlug.includes(ANTERIOR_RESTORATION_SLUG_SNIPPET) ||
		normalizedKey.includes(ANTERIOR_RESTORATION_SLUG_SNIPPET)
	);
}

const POSTERIOR_RESTORATION_SLUG_SNIPPET = 'posterior-restoration';
const LIGHT_CURE_SLUG_SNIPPET = 'light-cure';
const FLOWABLE_COMPOSITE_SLUG = 'flowable-composite';
const LUANA_TOP_HERO_SLUGS = new Set(['flowable-composite']);
const ANTHONY_TOP_HERO_SLUGS = new Set([
	'low-shrinkage-resin',
	'low-shrinkage-composite',
	'bulk-fill-composite',
	'bulk-fill',
	'universal-shade-composite',
	'universal-composite',
	'chamaleon-composite',
]);

function categorySlugIndicatesPosteriorRestoration(htmlContent, pageContext, categorySlugKey) {
	const apiSlug = (htmlContent?.category?.slug ?? '').toString().toLowerCase();
	const pathSlug =
		pageContext?.type !== 'home' && pageContext.parts?.length
			? String(pageContext.parts[pageContext.parts.length - 1]).toLowerCase()
			: '';
	const normalizedKey = (categorySlugKey ?? '').toString().toLowerCase();
	return (
		apiSlug.includes(POSTERIOR_RESTORATION_SLUG_SNIPPET) ||
		pathSlug.includes(POSTERIOR_RESTORATION_SLUG_SNIPPET) ||
		normalizedKey.includes(POSTERIOR_RESTORATION_SLUG_SNIPPET)
	);
}

function categorySlugIndicatesLightCure(htmlContent, pageContext, categorySlugKey) {
	const apiSlug = (htmlContent?.category?.slug ?? '').toString().toLowerCase();
	const pathSlug =
		pageContext?.type !== 'home' && pageContext.parts?.length
			? String(pageContext.parts[pageContext.parts.length - 1]).toLowerCase()
			: '';
	const normalizedKey = (categorySlugKey ?? '').toString().toLowerCase();
	return (
		apiSlug.includes(LIGHT_CURE_SLUG_SNIPPET) ||
		pathSlug.includes(LIGHT_CURE_SLUG_SNIPPET) ||
		normalizedKey.includes(LIGHT_CURE_SLUG_SNIPPET) ||
		LUANA_TOP_HERO_SLUGS.has(apiSlug) ||
		LUANA_TOP_HERO_SLUGS.has(pathSlug) ||
		LUANA_TOP_HERO_SLUGS.has(normalizedKey)
	);
}

function categorySlugIsFlowableComposite(htmlContent, pageContext, categorySlugKey) {
	const apiSlug = (htmlContent?.category?.slug ?? '').toString().toLowerCase();
	const pathSlug =
		pageContext?.type !== 'home' && pageContext.parts?.length
			? String(pageContext.parts[pageContext.parts.length - 1]).toLowerCase()
			: '';
	const normalizedKey = (categorySlugKey ?? '').toString().toLowerCase();
	return (
		apiSlug === FLOWABLE_COMPOSITE_SLUG ||
		pathSlug === FLOWABLE_COMPOSITE_SLUG ||
		normalizedKey === FLOWABLE_COMPOSITE_SLUG
	);
}

function categorySlugIndicatesAnthonyTopHero(htmlContent, pageContext, categorySlugKey) {
	const apiSlug = (htmlContent?.category?.slug ?? '').toString().toLowerCase();
	const pathSlug =
		pageContext?.type !== 'home' && pageContext.parts?.length
			? String(pageContext.parts[pageContext.parts.length - 1]).toLowerCase()
			: '';
	const normalizedKey = (categorySlugKey ?? '').toString().toLowerCase();
	return (
		categorySlugIndicatesPosteriorRestoration(htmlContent, pageContext, categorySlugKey) ||
		ANTHONY_TOP_HERO_SLUGS.has(apiSlug) ||
		ANTHONY_TOP_HERO_SLUGS.has(pathSlug) ||
		ANTHONY_TOP_HERO_SLUGS.has(normalizedKey)
	);
}

function getSuperheroTestimonialIds(htmlContent, pageContext, categorySlugKey) {
	if (categorySlugIndicatesAnteriorRestoration(htmlContent, pageContext, categorySlugKey)) {
		return ['luana'];
	}
	if (categorySlugIndicatesPosteriorRestoration(htmlContent, pageContext, categorySlugKey)) {
		return POSTERIOR_RESTORATION_TESTIMONIAL_IDS;
	}
	return TESTIMONIAL_IDS_BY_CATEGORY[categorySlugKey] || DEFAULT_TESTIMONIAL_IDS;
}

const SHOW_DENTIST_TESTIMONIALS = false;

const PageRenderer = ({ htmlContent, pathname = '', origin = '' }) => {
	const [isHeaderVisible, setIsHeaderVisible] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);
	const [selectedProductIndex, setSelectedProductIndex] = useState(0);
	const [isShopModalOpen, setIsShopModalOpen] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			setIsHeaderVisible(currentScrollY < lastScrollY || currentScrollY < 100);
			setLastScrollY(currentScrollY);
		};

		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [lastScrollY]);

	// Central page context - single source of truth
	const getPageContext = () => {
		if (!htmlContent) return { type: 'home' };

		const parts = (pathname || (typeof window !== 'undefined' ? window.location.pathname : '')).split('/').filter(Boolean);

		if (parts.length === 4 && htmlContent.city?.city) {
			return {
				type: 'city-category',
				country: parts[0],
				state: parts[1],
				city: parts[2],
				category: htmlContent.category?.name,
				location: htmlContent.city,
				parts
			};
		}
		if (parts.length === 3 && htmlContent.state?.state) {
			return {
				type: 'state-category',
				country: parts[0],
				state: parts[1],
				category: htmlContent.category?.name,
				location: htmlContent.state,
				parts
			};
		}
		if (parts.length === 2) {
			return {
				type: 'country-category',
				country: parts[0],
				category: htmlContent.category?.name,
				parts
			};
		}
		if (parts.length === 1 && htmlContent.category?.name) {
			return {
				type: 'category',
				category: htmlContent.category?.name,
				parts
			};
		}

		return { type: 'home' };
	};

	const pageContext = getPageContext();
	const isHomePage = pageContext.type === 'home';
	const isSubPage = !isHomePage;

	// Category slug for product filtering: URL segment for category pages, or normalized category name for location pages
	const categorySlug = pageContext.type === 'category' && pageContext.parts?.length
		? pageContext.parts[0]
		: (pageContext.category || '').toLowerCase().replace(/\s+/g, '-');
	const isAnteriorRestorationCategory = categorySlugIndicatesAnteriorRestoration(
		htmlContent,
		pageContext,
		categorySlug
	);
	const isPosteriorRestorationCategory = categorySlugIndicatesPosteriorRestoration(
		htmlContent,
		pageContext,
		categorySlug
	);
	const isAnthonyTopHeroCategory = categorySlugIndicatesAnthonyTopHero(
		htmlContent,
		pageContext,
		categorySlug
	);
	const isLightCureCategory = categorySlugIndicatesLightCure(
		htmlContent,
		pageContext,
		categorySlug
	);
	const isFlowableCompositeCategory = categorySlugIsFlowableComposite(
		htmlContent,
		pageContext,
		categorySlug
	);
	const flowableEfficiencyBullets = isFlowableCompositeCategory
		? ['All the different consistency and shade variants of the Tetric Line can be effectively combined']
		: undefined;
	const showEfficiencyPillar = !isAnteriorRestorationCategory;
	const productIdsForCategory = categorySlug && TETRIC_PRODUCTS_BY_CATEGORY[categorySlug];
	const visibleProducts = isAnteriorRestorationCategory
		? TETRIC_PRODUCTS.filter((p) => ANTERIOR_RESTORATION_PRODUCT_IDS.includes(p.id))
		: Array.isArray(productIdsForCategory)
			? TETRIC_PRODUCTS.filter((p) => productIdsForCategory.includes(p.id))
			: TETRIC_PRODUCTS;
	const buySectionThumbnailIds = isAnteriorRestorationCategory
		? ANTERIOR_RESTORATION_PRODUCT_IDS
		: BUY_SECTION_PRODUCT_IDS;
	const safeProductIndex = Math.min(Math.max(0, selectedProductIndex), Math.max(0, visibleProducts.length - 1));
	const currentProduct = visibleProducts[safeProductIndex];
	const SHOP_DESTINATIONS = [
		{
			id: 'tetric-powerfill',
			label: 'Tetric PowerFill',
			url: 'https://order.ivoclarusa.com/shop/composites/tetric-powerfill/',
		},
		{
			id: 'tetric-powerflow',
			label: 'Tetric PowerFlow',
			url: 'https://order.ivoclarusa.com/shop/composites/tetric-powerflow/',
		},
	];
	const productImageById = Object.fromEntries(TETRIC_PRODUCTS.map((p) => [p.id, p.image]));
	const shopDestinationById = Object.fromEntries(SHOP_DESTINATIONS.map((x) => [x.id, x]));
	const pageShopOptions = Array.from(new Set(visibleProducts.map((p) => p.id)))
		.map((id) => shopDestinationById[id])
		.filter(Boolean);
	const resolvedShopOptions = pageShopOptions.length === 1 ? pageShopOptions : SHOP_DESTINATIONS;
	const shouldUseShopModal = resolvedShopOptions.length > 1;
	const primaryShopUrl = resolvedShopOptions[0]?.url || CREATOR.shopUrl;
	const handleShopClick = (e) => {
		if (!shouldUseShopModal) return;
		e.preventDefault();
		setIsShopModalOpen(true);
	};

	useEffect(() => {
		const maxIndex = Math.max(0, visibleProducts.length - 1);
		if (selectedProductIndex > maxIndex) {
			setSelectedProductIndex(maxIndex);
		}
	}, [visibleProducts.length, selectedProductIndex]);

	// Helper to get formatted location string
	const getLocationString = (ctx) => {
		switch (ctx.type) {
			case 'city-category':
				const cityState = ctx.location?.state?.state || htmlContent.state?.state;
				const cityCountry = ctx.location?.state?.country?.country || ctx.country.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
				return {
					locationStr: `${ctx.location.city}, ${cityState}, ${cityCountry}`,
					shortLocation: `${ctx.location.city}, ${cityState}`,
					city: ctx.location.city,
					state: cityState,
					country: cityCountry
				};
			case 'state-category':
				const stateCountry = ctx.location?.country?.country || ctx.country.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
				return {
					locationStr: `${ctx.location.state}, ${stateCountry}`,
					shortLocation: ctx.location.state,
					state: ctx.location.state,
					country: stateCountry
				};
			case 'country-category':
				const country = ctx.country.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
				return {
					locationStr: country,
					shortLocation: country,
					country
				};
			default:
				return { locationStr: '', shortLocation: '' };
		}
	};

	const getNavigationItems = () => {
		if (!htmlContent) return [];

		// Normalize pages_* to arrays (main page returns them as arrays)
		const toArray = (x) => (Array.isArray(x) ? x : x ? [x] : []);
		const pagesState = toArray(htmlContent.pages_state);
		const pagesCity = toArray(htmlContent.pages_city);
		const pagesCountry = toArray(htmlContent.pages_country);

		// Main page: categories come back as an array — use it for pills (SEO: category name links out)
		if (Array.isArray(htmlContent.categories) && htmlContent.categories.length > 0) {
			return htmlContent.categories.map((item) => ({
				name: item.name ?? item.category?.name ?? '',
				slug: item.slug ?? item.url ?? (item.name ? `/${String(item.name).toLowerCase().replace(/\s+/g, '-')}` : '#')
			})).filter((item) => item.name);
		}

		// Check if htmlContent is an array (category page) or use normalized pages_* arrays
		const dataArray = Array.isArray(htmlContent) ? htmlContent : (pagesCity.length ? pagesCity : pagesState.length ? pagesState : pagesCountry);
		
		// Helper: "{category} products in {location}" for state/city/country pills
		const categoryLocationLabel = (categoryName, locationName) =>
			categoryName && locationName ? `${categoryName} products in ${locationName}` : locationName || categoryName || '';

		// If pages_state is available, show states
		if (pagesState.length > 0) {
			const seenStates = new Set();
			return pagesState
				.filter(page => {
					if (!page.state?.state || seenStates.has(page.state.state)) {
						return false;
					}
					seenStates.add(page.state.state);
					return true;
				})
				.map(page => ({
					name: categoryLocationLabel(page.category?.name ?? htmlContent.category?.name, page.state.state),
					slug: page.url
				}));
		}

		// If pages_city is available, show cities
		if (pagesCity.length > 0) {
			const seenCities = new Set();
			return pagesCity
				.filter(page => {
					if (!page.city?.city || seenCities.has(page.city.city)) {
						return false;
					}
					seenCities.add(page.city.city);
					return true;
				})
				.map(page => ({
					name: categoryLocationLabel(page.category?.name ?? htmlContent.category?.name, page.city.city),
					slug: page.url
				}));
		}
		
		// If pages_country is available (for category pages), show countries
		if (pagesCountry.length > 0) {
			const seenCountries = new Set();
			return pagesCountry
				.filter(page => {
					if (!page.country?.country || seenCountries.has(page.country.country)) {
						return false;
					}
					seenCountries.add(page.country.country);
					return true;
				})
				.map(page => ({
					name: categoryLocationLabel(page.category?.name ?? htmlContent.category?.name, page.country.country),
					slug: page.url
				}));
		}
		
		// If we're viewing a city page or state page, extract the path parts
		const currentPath = pathname || (typeof window !== 'undefined' ? window.location.pathname : '');
		const pathParts = currentPath.split('/').filter(Boolean);
		
		// If we're on a state page (united-states/california) — show cities: "{category} products in {city}"
		if (pathParts.length === 2 && pathParts[0] === 'united-states') {
			const currentState = pathParts[1];
			const categoryName = htmlContent.category?.name ?? dataArray[0]?.category?.name;
			const seenCities = new Set();
			return dataArray
				.filter(item => {
					const itemPathParts = item.url?.split('/').filter(Boolean);
					return itemPathParts?.[0] === 'united-states' && 
						   itemPathParts?.[1] === currentState &&
						   itemPathParts.length === 3 &&
						   !seenCities.has(itemPathParts[2]);
				})
				.map(item => {
					const cityName = item.url.split('/').pop();
					return {
						name: categoryLocationLabel(categoryName, cityName),
						slug: item.url
					};
				});
		}
		
		// If we're on the country page (united-states) — show states: "{category} products in {state}"
		if (pathParts.length === 1 && pathParts[0] === 'united-states') {
			const categoryName = htmlContent.category?.name ?? dataArray[0]?.category?.name;
			const seenStates = new Set();
			return dataArray
				.filter(item => {
					const itemPathParts = item.url?.split('/').filter(Boolean);
					return itemPathParts?.[0] === 'united-states' &&
						   itemPathParts.length >= 2 &&
						   !seenStates.has(itemPathParts[1]);
				})
				.map(item => {
					const stateName = item.url.split('/')[1];
					return {
						name: categoryLocationLabel(categoryName, stateName),
						slug: `/united-states/${stateName}`
					};
				});
		}
		
		// Default: show categories
		const seenCategories = new Set();
		return dataArray
			.filter(item => {
				if (!item.category?.name || seenCategories.has(item.category.name)) {
					return false;
				}
				seenCategories.add(item.category.name);
				return true;
			})
			.map(item => ({
				name: item.category.name,
				slug: item.url
			}));
	};

	// Unified SEO content generation
	const getSEOContent = () => {
		if (isHomePage) return {
			title: CREATOR.title,
			description: CREATOR.description,
			canonical: `${origin || (typeof window !== 'undefined' ? window.location.origin : '')}${pathname || (typeof window !== 'undefined' ? window.location.pathname : '')}`
		};

		const { locationStr } = getLocationString(pageContext);
		const category = pageContext.category || 'Tetric';

		const title = locationStr 
			? `${category} in ${locationStr} | ${CREATOR.name}`
			: `${category} | ${CREATOR.name}`;

		const description = locationStr
			? `${category.toLowerCase()} in ${locationStr}. ${CREATOR.description}`
			: `${category.toLowerCase()}. ${CREATOR.description}`;

		return {
			title,
			description,
			canonical: `${origin || (typeof window !== 'undefined' ? window.location.origin : '')}${pathname || (typeof window !== 'undefined' ? window.location.pathname : '')}`
		};
	};

	// Simplified hero title using pageContext
	const getDynamicHeroTitle = () => {
		if (isHomePage) return {
			line1: CREATOR.name,
			line2: 'Dental Composites by Ivoclar'
		};

		const { locationStr, shortLocation } = getLocationString(pageContext);
		const category = pageContext.category;

		if (locationStr) {
			return {
				line1: `${category}`,
				line2: `in ${shortLocation}`
			};
		}
		return {
			line1: category,
			line2: 'Dental Composites by Ivoclar'
		};
	};

	// Simplified description using pageContext
	const getDynamicDescription = () => {
		if (isHomePage) {
			return CREATOR.description;
		}

		const { locationStr } = getLocationString(pageContext);
		const category = pageContext.category;

		if (!category) {
			return CREATOR.description;
		}

		if (locationStr) {
			return `${category} in ${locationStr}. ${CREATOR.description}`;
		}

		return `${category}. ${CREATOR.description}`;
	};

	// Conversion content from API with fallbacks for hero, benefits, video, CTA
	const getConversionContent = () => {
		const { locationStr, shortLocation } = getLocationString(pageContext);
		const category = pageContext.category || CREATOR.name;
		const c = htmlContent?.content || htmlContent;
		const defaultBenefits = [
			'Easy handling for efficient restorations',
			'Excellent shade matching and aesthetics',
			'Low shrinkage for reliable results',
			'Trusted by dental professionals worldwide'
		];
		const benefitsRaw = c?.features || c?.benefits;
		const benefitsList = Array.isArray(benefitsRaw) && benefitsRaw.length > 0
			? benefitsRaw
			: defaultBenefits;
		const heroHeadline = c?.hero_headline || (locationStr ? `${category} in ${shortLocation}` : category);
		const heroDescription = c?.hero_subheadline || c?.hero_description || (locationStr ? `${category} in ${locationStr}. ${CREATOR.description}` : CREATOR.description);
		const heroImageUrl = c?.hero_image_url || (Array.isArray(c?.product_images) && c.product_images[0]) || null;
		const benefitsHeadline = c?.benefits_headline || 'Why Tetric';
		const videoUrl = c?.video_url || null;
		const infographicUrl = c?.infographic_url || c?.secondary_image_url || null;
		const ctaText = c?.cta_text || 'Try it Today';
		const testimonialQuote = c?.testimonial_quote || 'When a patient needs me to save the day, I reach for the Tetric line of composites. Tetric and Class I/II posterior bulk restorations are made for each other.';
		const testimonialAuthor = c?.testimonial_author || 'Dr. David Rice';
		const testimonialTitle = c?.testimonial_title || 'IgniteDDS';
		const testimonialImageCaption = c?.testimonial_image_caption || 'Class I/II Posterior with Tetric';
		const testimonialImageUrl = c?.testimonial_image_url || null;
		return {
			heroHeadline,
			heroDescription,
			heroImageUrl,
			benefitsHeadline,
			benefitsList,
			videoUrl,
			infographicUrl,
			ctaText,
			testimonialQuote,
			testimonialAuthor,
			testimonialTitle,
			testimonialImageCaption,
			testimonialImageUrl
		};
	};

	const seoContent = getSEOContent();
	const heroTitle = getDynamicHeroTitle();
	const heroDescription = getDynamicDescription();

	// Generate JSON-LD structured data for dynamic pages using pageContext
	const getStructuredData = () => {
		if (isHomePage) {
			return {
				"@context": "https://schema.org",
				"@type": "Organization",
				"name": CREATOR.siteName,
				"description": CREATOR.description,
				"url": origin || (typeof window !== 'undefined' ? window.location.origin : '')
			};
		}
		
		const data = {
			"@context": "https://schema.org",
			"@type": "Service",
			"name": seoContent.title,
			"description": seoContent.description,
			"provider": {
				"@type": "Organization",
				"name": CREATOR.name,
				"url": origin || (typeof window !== 'undefined' ? window.location.origin : '')
			},
			"areaServed": {}
		};

		// Add location data based on page type
		if (pageContext.type === 'city-category' && pageContext.location) {
			const { city, state } = getLocationString(pageContext);
			data.areaServed = {
				"@type": "City",
				"name": city,
				"containedIn": {
					"@type": "State",
					"name": state
				}
			};
		} else if (pageContext.type === 'state-category' && pageContext.location) {
			const { state } = getLocationString(pageContext);
			data.areaServed = {
				"@type": "State",
				"name": state
			};
		} else if (pageContext.type === 'country-category') {
			const { country } = getLocationString(pageContext);
			data.areaServed = {
				"@type": "Country",
				"name": country
			};
		}

		return data;
	};

	// Check if we should hide the Industry Verticals section
	const shouldShowVerticals = () => {
		if (isHomePage) return true;
		
		const categoryName = (pageContext.category || '').toLowerCase();
		const hideCategories = ['onlyfans', 'model', 'influencer', 'agency', 'dating', 'adult'];
		
		// Check if category name contains any of the hide keywords
		return !hideCategories.some(keyword => categoryName.includes(keyword));
	};

	return (
        <div>
            {/* Structured Data - metadata is set by Next.js generateMetadata */}
            {getStructuredData() && (
                <script type="application/ld+json">
                    {JSON.stringify(getStructuredData())}
                </script>
            )}

            {/* Ivoclar-style Header */}
            <header
                className={`bg-white border-b border-gray-200 sticky top-0 z-50 transition-transform duration-300 ${
                    isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 lg:h-18 gap-4">
                        {/* Logo */}
                        <a href="/" className="flex-shrink-0 inline-flex items-center" aria-label="Ivoclar home">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/ivoclar-logo.svg"
                                alt="Ivoclar"
                                className="h-8 w-auto md:h-9"
                            />
                        </a>

                        {/* Right: Search, Language, primary CTA */}
                        <div className="flex items-center gap-5 flex-shrink-0 ml-auto">
                            
                            <a
                                href={primaryShopUrl}
                                onClick={handleShopClick}
                                target={!shouldUseShopModal ? '_blank' : undefined}
                                rel={!shouldUseShopModal ? 'noopener noreferrer' : undefined}
                                className="text-[#0a478b] text-sm font-medium hover:underline underline-offset-2 decoration-[#0a478b] hover:decoration-[#083a70] transition-colors"
                            >
                                Shop
                            </a>
                            <button
                                type="button"
                                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                className="bg-[#0a478b] hover:bg-[#083a70] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                            >
                                Try it Today
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            

            {/* Hero: full-bleed image with overlaid text and CTA */}
            {(() => {
				const conv = getConversionContent();
				const heroBgUrl = isAnthonyTopHeroCategory
					? HERO_TOP_IMAGE_POSTERIOR_RESTORATION
					: isLightCureCategory
					? HERO_TOP_IMAGE_LIGHT_CURE
					: HERO_TOP_IMAGE;
				const isPosteriorHero = isAnthonyTopHeroCategory || isLightCureCategory;
				const heroBgUrlMobile = isPosteriorHero ? heroBgUrl : HERO_TOP_IMAGE_DEFAULT_MOBILE;
				const headlineParts = (conv.heroHeadline || 'Unleash your inner Superhero').split(/(\s+)/);
				const lastWord = headlineParts[headlineParts.length - 1];
				const beforeLast = headlineParts.slice(0, -1).join('');
				const subline = conv.heroDescription || 'with Tetric® Direct Composites.';
				const heroBgStyle = {
					backgroundImage: `url(${heroBgUrl})`,
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center top',
				};
				const heroBgStyleMobile = {
					backgroundImage: `url(${heroBgUrlMobile})`,
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center top',
				};
				return (
					<section
						className={
							isPosteriorHero
								? 'relative flex min-h-[90vh] items-start bg-black pt-16 pb-20 md:items-center md:pt-0 md:pb-0'
								: 'relative flex min-h-[90vh] items-start bg-gray-900 pt-16 pb-20 md:items-center md:pt-0 md:pb-0'
						}
					>
						{isPosteriorHero ? (
							<>
								{/* md+: left 50% solid black, right 50% image (cover in half viewport → less vertical crop) */}
								<div className="absolute inset-0 z-0 hidden md:flex" aria-hidden>
									<div className="h-full w-1/2 shrink-0 bg-black" />
									<div className="relative h-full w-1/2 min-w-0 overflow-hidden bg-black">
										<div className="absolute inset-0 bg-cover bg-top bg-no-repeat" style={heroBgStyle} />
										{/* Local feather on the photo’s left edge (reinforces blend at 50% column split) */}
										<div
											className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-44 bg-gradient-to-r from-black from-15% via-black/65 via-55% to-transparent lg:w-56"
											aria-hidden
										/>
									</div>
								</div>
								<div
									className="pointer-events-none absolute inset-0 z-[5] hidden md:block"
									style={{ background: HERO_POSTERIOR_SEAM_GRADIENT }}
									aria-hidden
								/>
								<div
									className="pointer-events-none absolute inset-0 z-[6] hidden md:block bg-gradient-to-r from-transparent via-transparent to-black/25"
									aria-hidden
								/>
								{/* Mobile: full-bleed + top/left weighting (flyer crop); desktop uses split above */}
								<div className="absolute inset-0 z-0 bg-cover bg-top bg-no-repeat md:hidden" style={heroBgStyleMobile} aria-hidden />
								<div
									className="pointer-events-none absolute inset-0 z-[1] md:hidden"
									style={{
										background:
											'linear-gradient(180deg, rgb(0 0 0 / 0.92) 0%, rgb(0 0 0 / 0.45) 42%, rgb(0 0 0 / 0.15) 62%, transparent 82%)',
									}}
									aria-hidden
								/>
							</>
						) : (
							<>
								<div className="absolute inset-0 z-0 hidden md:block bg-cover bg-top bg-no-repeat" style={heroBgStyle} aria-hidden />
								<div className="absolute inset-0 z-[2] hidden md:block bg-black/50" aria-hidden />
								<div className="absolute inset-0 z-0 bg-cover bg-top bg-no-repeat md:hidden" style={heroBgStyleMobile} aria-hidden />
								<div
									className="pointer-events-none absolute inset-0 z-[1] md:hidden"
									style={{
										background:
											'linear-gradient(180deg, rgb(0 0 0 / 0.92) 0%, rgb(0 0 0 / 0.45) 42%, rgb(0 0 0 / 0.15) 62%, transparent 82%)',
									}}
									aria-hidden
								/>
							</>
						)}
						<div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 py-10 md:py-20">
							<div className="max-w-[22rem] sm:max-w-xl">
								{/* Gradient border with transparent fill; inner area shows hero through bg-black/50 */}
								<div
									className="relative rounded-tr-lg"
									style={{
										border: '1px solid #00a651',
									}}
								>
									<div className="rounded-tr-[calc(0.5rem-2px)] p-5 sm:p-8">
										<h2 className="text-[2rem] sm:text-4xl lg:text-7xl text-white font-light leading-tight">
											Unleash <br></br>your inner
											<div className="font-bold text-5xl sm:text-6xl lg:text-8xl text-white">Superhero</div>
										</h2>
										<h1 className="text-white text-base sm:text-lg md:text-5xl mt-2 sm:mt-3 font-light leading-snug md:leading-tight">
											{htmlContent?.category?.name ? (
												<>
													With Tetric {htmlContent.category.name}.
												</>
											) : (
												<>
													With Tetric<br></br> Direct Composites.
												</>
											)}
										</h1>

										<div className="flex flex-wrap mb-2 sm:mb-8 mt-7 sm:mt-12 overflow-hidden items-center gap-4 sm:gap-6">
											<button
												type="button"
												onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
												className="inline-block px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-white text-black font-bold text-base sm:text-lg transition-all shadow-lg hover:opacity-95"
												
											>
												{conv.ctaText}
											</button>
											<a
												href={primaryShopUrl}
												onClick={handleShopClick}
												target={!shouldUseShopModal ? '_blank' : undefined}
												rel={!shouldUseShopModal ? 'noopener noreferrer' : undefined}
												className="text-white font-medium hover:underline underline-offset-4 decoration-2 hover:opacity-90 transition-opacity"
											>
												Shop now
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
				);
			})()}

            {/* Intro copy: two-column (heading + body) + full-width blue paragraph on white */}
            <section className="py-20 px-4 md:px-6 bg-white">
				<div className="max-w-6xl mx-auto">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start mb-12">
						<h2 className="text-2xl md:text-3xl lg:text-[2rem] font-bold text-[#0a478b] leading-snug tracking-tight">
							Modern composites in tried-and-tested quality
						</h2>
						<p className="text-gray-600 text-base md:text-lg leading-relaxed">
							The Tetric Line is comprised of four coordinated composites for direct restorative treatment. It combines tried-and-tested quality with modern technology.
						</p>
					</div>
					<p className="text-[#0a478b] text-base md:text-lg leading-relaxed">
					To date, more than 730 million restorations have been placed with Tetric throughout the world. You can rely on our tried-and-tested restorative materials that stand out for their exceptional esthetics, proven quality, and high level of efficiency.
					</p>
				</div>
			</section>

            {/* Three pillars: Esthetics, Quality, Efficiency — hide Efficiency for anterior-restoration categories */}
            <section className="py-20 px-4 md:px-6 bg-gray-50">
				<div className="max-w-6xl mx-auto">
					<div
						className={`grid grid-cols-1 gap-10 lg:gap-12 ${
							showEfficiencyPillar ? 'md:grid-cols-3' : 'md:grid-cols-2'
						}`}
					>
						<EstheticsCard />
						<QualityCard />
						{showEfficiencyPillar && <EfficiencyCard bullets={flowableEfficiencyBullets} />}
					</div>
				</div>
			</section>

            {/* Conversion: Key benefits */}
            {(() => {
				const conv = getConversionContent();
				return (
					<section className="py-20 px-4 md:px-6 bg-white">
						<div className="max-w-6xl mx-auto">
							<h2 className="text-2xl md:text-3xl font-bold text-[#0a478b] mb-10 tracking-tight">{conv.benefitsHeadline}</h2>
							<ul className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
								{conv.benefitsList.map((item, i) => (
									<li key={i} className="flex items-start gap-3 text-gray-600 leading-relaxed">
										<span className="text-[#00a651] font-bold flex-shrink-0 mt-0.5">✓</span>
										<span>{item}</span>
									</li>
								))}
							</ul>
						</div>
					</section>
				);
			})()}

            {/* Testimonial section: three doctor superhero cards, hero colors, grid */}
            {(() => {
				const conv = getConversionContent();
				const testimonialIds = getSuperheroTestimonialIds(htmlContent, pageContext, categorySlug);
				return (
					<section className="py-20 px-4 md:px-6 bg-gray-950 relative overflow-hidden" aria-label="Doctor testimonials">
						<div className="absolute inset-0 bg-blue-900/80" aria-hidden />
						<div className="relative max-w-7xl mx-auto">
							<h2 className="text-2xl md:text-3xl lg:text-4xl text-white font-normal text-center mb-4">
							<span className="font-bold">Superheroes for their patients</span>
								
							</h2>
							<p className="text-white/90 text-lg md:text-xl text-center mb-12 max-w-2xl mx-auto">
							The Tetric Line enabled them to be superheroes--delivering quality and high esthetic outcomes every day.
							</p>
							<SuperheroTestimonialCards testimonialIds={testimonialIds} />ƒ
							{/* CTA row — match hero: white primary button, underlined Shop now */}
							<div className="flex flex-wrap items-center justify-center gap-6 mt-12">
								<button
									type="button"
									onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
									className="inline-block px-8 py-4 rounded-full bg-white text-black font-bold text-lg transition-all shadow-lg hover:opacity-95"
								>
									{conv.ctaText}
								</button>
								<a
									href={primaryShopUrl}
									onClick={handleShopClick}
									target={!shouldUseShopModal ? '_blank' : undefined}
									rel={!shouldUseShopModal ? 'noopener noreferrer' : undefined}
									className="text-white font-medium underline underline-offset-4 decoration-2 hover:opacity-90 transition-opacity"
								>
									Shop now
								</a>
							</div>
							<p className="text-white/70 text-sm text-center mt-4">Making People Smile</p>
						</div>
					</section>
				);
			})()}

            {/* Solution for all cavities — Tetric Line by cavity class */}
            <section className="py-20 px-4 md:px-6 bg-white">
				<div className="max-w-6xl mx-auto">
					<div className="grid grid-cols-1 lg:grid-cols-[1fr,1.2fr] gap-12 lg:gap-16 items-center">
						<div>
							<h2 className="text-2xl md:text-3xl font-bold text-[#0a478b] leading-tight tracking-tight mb-4">
							The solution for all cavities
							</h2>
							<p className="text-[#0a478b]/90 text-base md:text-lg leading-relaxed">
							Four composite materials are all you need for an efficient restorative workflow in all cavity classes
							</p>
						</div>
						<div className="flex justify-center lg:justify-end">
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								src="/images/tetric-cavity-solution.png"
								alt="Tetric Line — Class I & II, Class III & IV, Class V restorative solutions"
								className="w-full max-w-xl lg:max-w-2xl object-contain"
							/>
						</div>
					</div>
				</div>
			</section>

            {/* Product lines — tabs, copy, image, specs, primary CTA link */}
            <section className="py-20 px-4 md:px-6 bg-gray-50">
				<div className="max-w-6xl mx-auto">
					<h2 className="text-2xl md:text-3xl font-bold text-[#0a478b] mb-3 tracking-tight">
						{pageContext?.category ? `Tetric Line for ${pageContext.category}` : 'Tetric Line'}
					</h2>
					<p className="text-sm text-gray-600 mb-2 max-w-3xl">
						Select a product below to view details and specifications — tap or click to switch.
					</p>
					
					<div className="mb-10 w-full">
						<nav
							className="flex flex-wrap gap-3 sm:gap-4 justify-start"
							role="tablist"
							aria-labelledby="tetric-product-picker-label"
							aria-label="Tetric product line"
						>
							{visibleProducts.map((product, i) => {
								const selected = safeProductIndex === i;
								return (
									<button
										key={product.id}
										id={`tetric-product-tab-${product.id}`}
										type="button"
										role="tab"
										aria-selected={selected}
										tabIndex={0}
										onClick={() => setSelectedProductIndex(i)}
										className={`
											min-h-[3rem] min-w-[10.5rem] max-w-full sm:min-w-[11.5rem]
											rounded-full px-5 py-3.5 text-sm sm:text-base text-center leading-snug
											transition-all duration-150
											border-2
											focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0a478b] focus-visible:ring-offset-2
											${selected
												? 'bg-[#0a478b] text-white border-[#062d56] shadow-[0_2px_0_0_#052847,0_6px_16px_rgba(10,71,139,0.35)] hover:bg-[#083a70]'
												: 'bg-gradient-to-b from-white to-gray-100 text-gray-900 border-gray-300 shadow-[0_2px_0_0_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.06)] hover:border-[#0a478b]/55 hover:text-[#0a478b] hover:shadow-[0_2px_0_0_rgba(10,71,139,0.15),0_6px_16px_rgba(10,71,139,0.12)] hover:-translate-y-px active:translate-y-0 active:shadow-[0_1px_0_0_rgba(0,0,0,0.1)]'
											}
										`}
									>
										{product.name}
									</button>
								);
							})}
						</nav>
					</div>
					{/* Selected product content — product left (larger), title + subtitle right; then description full-width below */}
					{currentProduct ? (() => {
						const p = currentProduct;
						return (
							<div
								role="tabpanel"
								id={`tetric-product-panel-${p.id}`}
								aria-labelledby={`tetric-product-tab-${p.id}`}
								className="relative rounded-none bg-white p-8 md:p-10 overflow-hidden"
								style={{
									boxShadow: '0 4px 20px rgba(0, 166, 81, 0.08)',
									borderTop: '3px solid rgba(10, 71, 139, 0.5)',
									borderRight: '3px solid rgba(10, 71, 139, 0.5)',
									borderBottom: '3px solid #00a651',
									borderLeft: '3px solid #00a651'
								}}
							>
								{/* Row: text left, product photo right (larger) */}
								<div className="grid grid-cols-1 lg:grid-cols-[1fr,1.25fr] gap-8 lg:gap-12 items-center mb-8">
									{/* Left: title + subtitle */}
									<div className="order-1 flex flex-col justify-center">
										<h3 className="text-2xl md:text-3xl font-bold text-[#0a478b] mb-3">{p.name}</h3>
										{p.tagline && (
											<div className="border border-[#0a478b]/40 rounded-none px-4 py-3 bg-[#0a478b]/5">
												<p className="text-[#0a478b] text-base md:text-lg font-medium">{p.tagline}</p>
											</div>
										)}
									</div>
									{/* Right: product image — larger on page */}
									<div className="order-2 w-full min-h-[260px] lg:min-h-[320px] bg-gray-50 rounded-none flex items-center justify-center overflow-hidden">
										{/* eslint-disable-next-line @next/next/no-img-element */}
										<img
											src={p.image}
											alt={p.name}
											className="w-full h-full object-contain"
											onError={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling?.classList.remove('hidden'); }}
										/>
										<div className="hidden text-center text-gray-400 text-sm p-4">
											<span className="block font-medium text-gray-500 mb-1">Product image</span>
											<span>Add asset at <code className="text-xs bg-gray-200 px-1 rounded-none">{p.image}</code></span>
										</div>
									</div>
								</div>
								{/* Description full-width below */}
								<p className="text-[#0a478b]/90 text-base leading-relaxed mb-6">{p.description}</p>
								{p.contentSections && p.contentSections.length > 0 && (
											<div className="space-y-5 mb-6">
												{p.contentSections.map((sec, i) => (
													<div key={i}>
														<p className="font-semibold text-[#0a478b] text-sm mb-1">{sec.heading}</p>
														<p className="text-gray-700 text-sm leading-relaxed">{sec.body}</p>
													</div>
												))}
											</div>
										)}
										{p.exposureTable && p.exposureTable.headers && p.exposureTable.rows && (
											<div className="mb-6 overflow-x-auto">
												<table className="w-full min-w-[520px] border border-gray-200 rounded-none overflow-hidden text-sm">
													<thead>
														<tr className="bg-[#0a478b] text-white">
															{p.exposureTable.headers.map((h, i) => (
																<th key={i} className="text-left font-semibold px-4 py-3">{h}</th>
															))}
														</tr>
													</thead>
													<tbody>
														{p.exposureTable.rows.map((row, ri) => (
															<tr key={ri} className={ri % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
																{row.map((cell, ci) => (
																	<td key={ci} className="px-4 py-3 border-t border-gray-200 text-gray-800">{cell}</td>
																))}
															</tr>
														))}
													</tbody>
												</table>
												{p.exposureTable.footnote && (
													<p className="text-gray-500 text-xs mt-2 italic">{p.exposureTable.footnote}</p>
												)}
											</div>
										)}
										{p.featuresSubhead && (
											<p className="text-[#0a478b] font-semibold text-sm mb-3">{p.featuresSubhead}</p>
										)}
										{p.features && p.features.length > 0 && (
											<ul className="space-y-2 mb-6">
												{p.features.map((f, i) => (
													<li key={i} className="flex gap-2 text-gray-700 text-sm leading-relaxed">
														<span className="text-[#00a651] shrink-0">•</span>
														<span>{f}</span>
													</li>
												))}
											</ul>
										)}
										{p.faqQuestion && p.faqAnswer && (
											<div className="mb-6">
												<p className="font-semibold text-[#0a478b] text-sm mb-1">{p.faqQuestion}</p>
												<p className="text-gray-700 text-sm leading-relaxed">{p.faqAnswer}</p>
											</div>
										)}
										{p.specs && p.specs.length > 0 && (
											<dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mb-6">
												{p.specs.map((spec, i) => (
													<React.Fragment key={i}>
														<dt className="text-sm font-medium text-gray-500">{spec.label}</dt>
														<dd className="text-sm text-gray-800">{spec.value}</dd>
													</React.Fragment>
												))}
											</dl>
										)}
										<a
											href={p.learnMoreUrl}
											className="inline-flex items-center gap-2 bg-[#0a478b] hover:bg-[#083a70] text-white font-semibold px-5 py-3 rounded-none text-sm transition-colors"
										>
											Try it Today
											<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
										</a>
								{/* Vimeo sections — up to 2, each with optional title/subtitle above video. Hidden when no vimeoId is set. */}
								{(() => {
									const raw = (p.vimeoSections && p.vimeoSections.length > 0)
										? p.vimeoSections.slice(0, 2).map(s => ({ title: s.title, subtitle: s.subtitle, vimeoId: s.vimeoId }))
										: (p.vimeoId ? [{ title: p.name, subtitle: p.tagline || null, vimeoId: p.vimeoId }] : []);
									const sections = raw.filter(s => s.vimeoId);
									if (sections.length === 0) return null;
									return (
										<div className="mt-10 pt-8 border-t border-gray-200 w-full space-y-10">
											{sections.map((sec, i) => (
												<div key={i} className="space-y-3">
													{sec.title && <h4 className="text-xl font-bold text-[#0a478b]">{sec.title}</h4>}
													{sec.subtitle && (
														<div className="border border-[#0a478b]/40 rounded-none px-4 py-2 bg-[#0a478b]/5 w-fit">
															<p className="text-[#0a478b] text-sm font-medium">{sec.subtitle}</p>
														</div>
													)}
													<div className="aspect-video w-full rounded-none overflow-hidden bg-black">
														<iframe
															title={sec.title || `${p.name} video ${i + 1}`}
															src={`https://player.vimeo.com/video/${sec.vimeoId}`}
															className="w-full h-full"
															allow="autoplay; fullscreen; picture-in-picture"
															allowFullScreen
														/>
													</div>
												</div>
											))}
										</div>
									);
								})()}
								{/* Optional secondary product photo block — same layout as top (text left, photo right) */}
								{p.secondaryPhoto && (
									<div className="mt-10 pt-8 border-t border-gray-200 w-full">
										<div className="grid grid-cols-1 lg:grid-cols-[1fr,1.25fr] gap-8 lg:gap-12 items-center">
											<div className="flex flex-col justify-center">
												<h4 className="text-2xl md:text-3xl font-bold text-[#0a478b] mb-3">{p.secondaryPhoto.title}</h4>
												{p.secondaryPhoto.subtitle && (
													<div className="border border-[#0a478b]/40 rounded-none px-4 py-3 bg-[#0a478b]/5">
														<p className="text-[#0a478b] text-base md:text-lg font-medium">{p.secondaryPhoto.subtitle}</p>
													</div>
												)}
											</div>
											<div className="w-full min-h-[260px] lg:min-h-[320px] bg-gray-50 rounded-none flex items-center justify-center overflow-hidden">
												{/* eslint-disable-next-line @next/next/no-img-element */}
												<img
													src={p.secondaryPhoto.image}
													alt={p.secondaryPhoto.title}
													className="w-full h-full object-contain"
												/>
											</div>
										</div>
									</div>
								)}
							</div>
						);
					})() : null}
				</div>
			</section>

            {/* Dentist testimonials are extracted to a reusable component and disabled for now. */}
            {SHOW_DENTIST_TESTIMONIALS ? <DentistTestimonials /> : null}

            {/* Conversion: Optional video or infographic */}
            {(() => {
				const conv = getConversionContent();
				if (conv.videoUrl) {
					return (
						<section className="py-16 px-4 bg-white">
							<div className="max-w-4xl mx-auto">
								<h2 className="text-2xl font-bold text-[#0a478b] mb-6">See the difference</h2>
								<div className="aspect-video rounded-xl overflow-hidden bg-black">
									<iframe
										title="Product video"
										src={conv.videoUrl}
										className="w-full h-full"
										allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
										allowFullScreen
									/>
								</div>
							</div>
						</section>
					);
				}
				if (conv.infographicUrl) {
					return (
						<section className="py-16 px-4 bg-gray-50">
							<div className="max-w-4xl mx-auto">
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img src={conv.infographicUrl} alt="" className="w-full rounded-xl shadow-lg" />
							</div>
						</section>
					);
				}
				return null;
			})()}

            {/* Conversion: Book a practice demo */}
            <LeadCaptureForm pathname={pathname} pageContext={pageContext} />

            {/* Online Shop / Marketplace — primary: contact, secondary: shop now */}
            <section className="py-16 px-4 md:px-6 bg-gray-50 border-t border-gray-200">
				<div className="max-w-5xl mx-auto">
					<div className="grid grid-cols-1 md:grid-cols-[1fr,1.2fr] gap-12 md:gap-16 items-center">
						{/* Left: product visuals — uses same assets as product line section */}
						<div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5 w-full max-w-[17rem] sm:max-w-xs mx-auto md:mx-0 md:justify-self-start">
							{buySectionThumbnailIds.map((productId) => {
								const p = TETRIC_PRODUCTS.find((x) => x.id === productId);
								if (!p?.image) return null;
								return (
									<div
										key={productId}
										className="aspect-square w-full min-w-0 rounded-xl bg-white border border-gray-200 flex items-center justify-center overflow-hidden"
										title={p.name}
									>
										{/* eslint-disable-next-line @next/next/no-img-element */}
										<img
											src={p.image}
											alt={p.name}
											className="w-full h-full object-contain p-1"
											onError={(e) => {
												e.target.style.display = 'none';
												e.target.nextElementSibling?.classList.remove('hidden');
											}}
										/>
										<span className="hidden text-[#0a478b] text-[10px] font-medium text-center px-1 leading-tight">{p.name}</span>
									</div>
								);
							})}
						</div>
						{/* Right: heading + single CTA (shop only) */}
						<div>
							<h2 className="text-2xl md:text-3xl font-bold text-[#0a478b] leading-tight tracking-tight mb-4">
							Discover the power and buy now
							</h2>
							<a
								href={primaryShopUrl}
								onClick={handleShopClick}
								target={!shouldUseShopModal ? '_blank' : undefined}
								rel={!shouldUseShopModal ? 'noopener noreferrer' : undefined}
								className="inline-flex items-center gap-2 bg-[#0a478b] hover:bg-[#083a70] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
							>
								Click here to go to the online shop
								<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
							</a>
						</div>
					</div>
				</div>
			</section>

            {/* Pills: last section before footer — SEO: category name as link text and href = category page URL */}
            {getNavigationItems().length > 0 && (
			<section className="py-16 px-4 md:px-6 bg-gray-50 border-t border-gray-200">
				<div className="max-w-6xl mx-auto text-center">
					<div className="flex flex-wrap justify-center gap-2">
						{getNavigationItems().map((item, index) => (
							<a
								key={index}
								href={item.slug}
								className="inline-block px-4 py-2 rounded-full bg-white border border-gray-200 text-gray-700 hover:border-[#0a478b] hover:text-[#0a478b] text-sm transition-colors"
							>
								{item.name}
							</a>
						))}
					</div>
				</div>
			</section>
            )}

			{/* Footnotes */}
			<section className="py-10 px-4 md:px-6 bg-white border-t border-gray-200">
				<div className="max-w-6xl mx-auto">
					<div className="text-xs md:text-sm text-gray-600 leading-relaxed space-y-1">
						<p>* Cavity classes I-V according to G. V. Black</p>
						<p>[1] Based on worldwide sales figures for the Tetric product line</p>
						<p>[2] According to ISO 4049</p>
						<p>[3] Only suitable for Class I &amp; II restorations in posterior teeth light-cured from the occlusal aspect</p>
						<p>[4] Ganster B et al., Macromolecular Rapid Commun. 2008, 29, p. 57-62.</p>
						<p>[5] Ganster B et al., Macromolecules 2008, 41, p. 2394-2400.</p>
						<p>[6] In the posterior region</p>
						<p>[7] Hirata R, Operative Dentistry 2018, 43-2, p. 144-150, additional data on file.</p>
					</div>
				</div>
			</section>

			{isShopModalOpen && (
				<div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
					<div
						className="absolute inset-0 bg-black/60"
						onClick={() => setIsShopModalOpen(false)}
						aria-hidden
					/>
					<div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
						<h3 className="text-xl font-bold text-[#0a478b] mb-2">Choose product to buy</h3>
						<p className="text-sm text-gray-600 mb-5">
							Select the product shop page you want to open.
						</p>
						<div className="space-y-3">
							{resolvedShopOptions.map((opt) => (
								<a
									key={opt.id}
									href={opt.url}
									target="_blank"
									rel="noopener noreferrer"
									className="w-full inline-flex items-center justify-between rounded-full border border-[#0a478b]/35 px-4 py-3.5 text-[#0a478b] font-semibold hover:bg-[#0a478b]/5 transition-colors"
								>
									<span className="inline-flex items-center gap-3 min-w-0">
										<span className="h-14 w-14 rounded-full bg-white border-2 border-[#0a478b]/25 shadow-sm flex items-center justify-center overflow-hidden shrink-0">
											{/* eslint-disable-next-line @next/next/no-img-element */}
											<img
												src={productImageById[opt.id]}
												alt=""
												className="h-full w-full object-contain p-1.5"
											/>
										</span>
										<span className="truncate">{opt.label}</span>
									</span>
									<span aria-hidden>-&gt;</span>
								</a>
							))}
						</div>
						<button
							type="button"
							onClick={() => setIsShopModalOpen(false)}
							className="mt-5 w-full rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-4 py-2 transition-colors"
						>
							Close
						</button>
					</div>
				</div>
			)}

			{/* Ivoclar-style Footer */}
			<footer className="bg-[#0a478b] text-white">
				<div className="max-w-6xl mx-auto px-6 py-10">
					<div className="flex flex-col lg:flex-row lg:justify-between gap-10 lg:gap-16">
						{/* Link columns */}
						<div className="flex flex-col sm:flex-row gap-8 sm:gap-16">
							<ul className="space-y-3 text-sm">
								<li><a href="https://www.ivoclarusa.com/repfinder/" target="_blank" rel="noopener noreferrer" className="hover:underline">Sales Rep Finder</a></li>
								<li><a href="https://mydevice.ivoclar.com/?lang=en" target="_blank" rel="noopener noreferrer" className="hover:underline">Device Registration</a></li>
								<li><a href="https://www.ivoclar.com/en_us/tools/software-updates" target="_blank" rel="noopener noreferrer" className="hover:underline">Software Updates</a></li>
								<li><a href="https://www.ivoclar.com/en_us/links/download-center" target="_blank" rel="noopener noreferrer" className="hover:underline">Download Center</a></li>
								<li><a href="https://www.ivoclar.com/en_us/local/government-contracts" target="_blank" rel="noopener noreferrer" className="hover:underline">Government Contracts</a></li>
								<li><a href="https://www.ivoclar.com/en_us/local/order-delivery-and-return-policy" target="_blank" rel="noopener noreferrer" className="hover:underline">Delivery and Returns Policy</a></li>
								<li><a href="https://www.ivoclar.com/en_us/local/partnership-agreements" target="_blank" rel="noopener noreferrer" className="hover:underline">Partner Agreements</a></li>
								<li><a href="https://www.ivoclar.com/en_us/faq" target="_blank" rel="noopener noreferrer" className="hover:underline">FAQ</a></li>
							</ul>
							<ul className="space-y-3 text-sm">
								<li><a href="https://www.ivoclar.com/en_us/legal/suppliers" target="_blank" rel="noopener noreferrer" className="hover:underline">Suppliers</a></li>
								<li><a href="https://www.ivoclar.com/en_us/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:underline">Privacy</a></li>
								<li><a href="https://www.ivoclar.com/en_us/shared/imprint" target="_blank" rel="noopener noreferrer" className="hover:underline">Imprint</a></li>
								<li><a href="https://www.ivoclar.com/en_us/shared/cookies-declaration" target="_blank" rel="noopener noreferrer" className="hover:underline">Cookies</a></li>
								<li><a href="https://www.ivoclar.com/en_US/shop/agent" target="_blank" rel="noopener noreferrer" className="hover:underline">Agent Login</a></li>
								<li><a href="https://www.ivoclar.com/en_us/shared/sitemap" target="_blank" rel="noopener noreferrer" className="hover:underline">Sitemap</a></li>
								<li><a href="https://www.ivoclar.com/en_us/legal/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="hover:underline">Terms &amp; Conditions</a></li>
								<li><a href="https://www.ivoclar.com/en_us/contact-us" target="_blank" rel="noopener noreferrer" className="hover:underline">Contact Us</a></li>
							</ul>
						</div>
						{/* Security + Social */}
						<div className="flex flex-col items-start lg:items-end gap-6 flex-shrink-0">
							<div className="flex flex-col items-start lg:items-end">
								<p className="text-white/90 text-xs mb-2">This site is secure</p>
								<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[#0a478b] text-xs font-semibold">
									<svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
										<path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
									</svg>
									<span>digicert SECURED</span>
								</div>
							</div>
							<div className="flex flex-col items-start lg:items-end">
								<p className="text-white/90 text-sm font-medium mb-3">Follow us on our social media</p>
								<div className="flex gap-4">
									<a href="https://www.facebook.com/Ivoclar.NA" target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-80 transition-opacity" aria-label="Facebook">
										<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
									</a>
									<a href="https://www.youtube.com/c/Ivoclar-global" target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-80 transition-opacity" aria-label="YouTube">
										<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
									</a>
									<a href="https://www.instagram.com/ivoclar.na" target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-80 transition-opacity" aria-label="Instagram">
										<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
									</a>
									<a href="https://www.linkedin.com/company/ivoclar-na" target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-80 transition-opacity" aria-label="LinkedIn">
										<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* Bottom bar */}
				<div className="border-t border-white/20">
					<div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm">
						<span>© 2026 Ivoclar Vivadent</span>
						<button
							type="button"
							onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
							className="flex items-center gap-1 text-white hover:opacity-90 transition-opacity"
						>
							Go to top
							<span className="text-lg leading-none" aria-hidden>^</span>
						</button>
					</div>
				</div>
			</footer>
            
        </div>
    );
};

export default PageRenderer;