import { headers } from 'next/headers';
import { fetchPageData } from '@/lib/api';
import PageRenderer from '@/components/PageRenderer';

function getOrigin(headersList) {
  const host = headersList.get('host') || 'localhost:3000';
  const proto = headersList.get('x-forwarded-proto') || 'http';
  return `${proto}://${host}`;
}

export default async function HomePage() {
  const headersList = await headers();
  const origin = getOrigin(headersList);
  let data = null;
  try {
    data = await fetchPageData({});
  } catch (e) {
    console.error(e);
  }
  return (
    <PageRenderer
      htmlContent={data}
      pathname="/"
      origin={origin}
    />
  );
}
