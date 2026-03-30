export const CREATOR = {
  name: 'Tetric',
  shortName: 'Tetric',
  title: 'Tetric | Ivoclar Dental Composites & Restorative Materials',
  description: 'Tetric by Ivoclar — premium dental composite resins and restorative materials for durable, aesthetic restorations. Trusted by dental professionals worldwide.',
  siteName: 'Tetric by Ivoclar',
  /** Online shop / marketplace URL — set to your Ivoclar webshop or use NEXT_PUBLIC_SHOP_URL */
  shopUrl: process.env.NEXT_PUBLIC_SHOP_URL || '#',
};

export function getSEOMetadataFromParams(params, data, origin) {
  const isHome = !params?.category && !params?.country;
  if (isHome) {
    return {
      title: CREATOR.title,
      description: CREATOR.description,
      canonical: origin || '',
    };
  }
  const category = data?.category?.name || params?.category || 'Tetric';
  const parts = [];
  if (params?.country) parts.push(params.country.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()));
  if (params?.state) parts.push(params.state.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()));
  if (params?.city) parts.push(params.city.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()));
  const locationStr = parts.join(', ');
  const title = locationStr
    ? `${category} in ${locationStr} | ${CREATOR.name}`
    : `${category} | ${CREATOR.name}`;
  const description = locationStr
    ? `${category.toLowerCase()} in ${locationStr}. ${CREATOR.description}`
    : `${category.toLowerCase()}. ${CREATOR.description}`;
  const pathname = [params?.country, params?.state, params?.city, params?.category].filter(Boolean).join('/');
  return {
    title,
    description,
    canonical: origin ? `${origin}/${pathname}` : `/${pathname}`,
  };
}
