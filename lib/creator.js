export const CREATOR = {
  name: 'Tetric',
  shortName: 'Tetric',
  title: 'Tetric | Ivoclar Dental Composites & Restorative Materials',
  description: 'Tetric by Ivoclar — premium dental composite resins and restorative materials for durable, aesthetic restorations. Trusted by dental professionals worldwide.',
  siteName: 'Tetric by Ivoclar',
  /** Online shop / marketplace URL — set to your Ivoclar webshop or use NEXT_PUBLIC_SHOP_URL */
  shopUrl: process.env.NEXT_PUBLIC_SHOP_URL || '#',
};

function humanizeSlug(value = '') {
  return String(value)
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());
}

export function getSEOMetadataFromParams(params, data, origin) {
  const isHome = !params?.category && !params?.country;
  if (isHome) {
    return {
      title: CREATOR.title,
      description: CREATOR.description,
      canonical: origin || '',
      categoryName: CREATOR.name,
      locationStr: '',
      keywords: ['tetric', 'ivoclar', 'dental composites', 'restorative materials'],
    };
  }
  const category = data?.category?.name || humanizeSlug(params?.category) || 'Tetric';
  const parts = [];
  if (params?.country) parts.push(humanizeSlug(params.country));
  if (params?.state) parts.push(humanizeSlug(params.state));
  if (params?.city) parts.push(humanizeSlug(params.city));
  const locationStr = parts.join(', ');
  const title = locationStr
    ? `${category} provider in ${locationStr} | ${CREATOR.siteName}`
    : `${category} | ${CREATOR.siteName}`;
  const description = locationStr
    ? `${category.toLowerCase()} provider in ${locationStr}. ${CREATOR.description}`
    : `${category.toLowerCase()}. ${CREATOR.description}`;
  const pathname = [params?.country, params?.state, params?.city, params?.category].filter(Boolean).join('/');
  return {
    title,
    description,
    canonical: origin ? `${origin}/${pathname}` : `/${pathname}`,
    categoryName: category,
    locationStr,
    keywords: [
      category,
      `${category} dental composite`,
      `ivoclar ${category}`.toLowerCase(),
      locationStr ? `${category} in ${locationStr}` : category,
      'dental composites',
      'restorative materials',
      'tetric',
      'ivoclar',
    ],
  };
}

export function getRouteMetadataFromParams(params, data, origin) {
  const seo = getSEOMetadataFromParams(params, data, origin);
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    category: seo.categoryName,
    alternates: seo.canonical ? { canonical: seo.canonical } : undefined,
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.canonical,
      type: 'website',
      siteName: CREATOR.siteName,
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
  };
}
