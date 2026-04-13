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
  const paramsNorm = { category: p.slug1 };
  const headersList = await headers();
  const origin = getOrigin(headersList);
  let data = null;
  try {
    data = await fetchPageData({ category: paramsNorm.category });
  } catch (e) {
    console.error(e);
  }
  return getRouteMetadataFromParams(paramsNorm, data, origin);
}

export default async function CategoryPage({ params }) {
  const p = await params;
  const paramsNorm = { category: p.slug1 };
  const headersList = await headers();
  const origin = getOrigin(headersList);
  let data = null;
  try {
    data = await fetchPageData({ category: paramsNorm.category });
  } catch (e) {
    console.error(e);
  }
  const pathname = `/${p.slug1}`;
  return (
    <PageRenderer
      htmlContent={data}
      pathname={pathname}
      origin={origin}
    />
  );
}
