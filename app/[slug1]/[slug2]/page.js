import { headers } from 'next/headers';
import { fetchPageData } from '@/lib/api';
import { getRouteMetadataFromParams } from '@/lib/creator';
import PageRenderer from '@/components/PageRenderer';

function getOrigin(headersList) {
  const host = headersList.get('host') || 'localhost:3000';
  const proto = headersList.get('x-forwarded-proto') || 'http';
  return `${proto}://${host}`;
}

export async function generateMetadata({ params }) {
  const p = await params;
  const paramsNorm = { country: p.slug1, category: p.slug2 };
  const headersList = await headers();
  const origin = getOrigin(headersList);
  let data = null;
  try {
    data = await fetchPageData({ category: paramsNorm.category, country: paramsNorm.country });
  } catch (e) {
    console.error(e);
  }
  return getRouteMetadataFromParams(paramsNorm, data, origin);
}

export default async function CountryCategoryPage({ params }) {
  const p = await params;
  const paramsNorm = { country: p.slug1, category: p.slug2 };
  const headersList = await headers();
  const origin = getOrigin(headersList);
  let data = null;
  try {
    data = await fetchPageData({ category: paramsNorm.category, country: paramsNorm.country });
  } catch (e) {
    console.error(e);
  }
  const pathname = `/${p.slug1}/${p.slug2}`;
  return (
    <PageRenderer
      htmlContent={data}
      pathname={pathname}
      origin={origin}
    />
  );
}
