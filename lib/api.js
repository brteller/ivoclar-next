const API_URL = 'https://api.coldstartserver.com/api/build-page-speed';

export async function fetchPageData({
  category = '',
  country = '',
  state = '',
  city = '',
  language = '',
  pageType = '',
  competitor = ''
}) {
  // Preferred env var name for Vercel/production.
  // Local `.env` in this repo historically used `REACT_APP_API_KEY_SECRET`,
  // so we accept that as a fallback to prevent environment mismatch.
  const API_KEY_SECRET =
    process.env.API_KEY_SECRET || process.env.REACT_APP_API_KEY_SECRET;

  if (!API_KEY_SECRET) {
    console.error(
      'Missing API secret env var. Set `API_KEY_SECRET` (preferred) ' +
      'or `REACT_APP_API_KEY_SECRET`.'
    );
  }
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        api_key_secret: API_KEY_SECRET,
        category,
        country,
        state,
        city,
        language,
        page_type: pageType,
        competitor
      })
    });

    // Prefer JSON responses, but fall back to text for better error logging.
    const contentType = response.headers.get('content-type') || '';
    const data = contentType.includes('application/json')
      ? await response.json()
      : await response.text();

    if (!response.ok) {
      console.error('API request failed:', {
        status: response.status,
        apiUrl: API_URL,
        responseBody: typeof data === 'string' ? data.slice(0, 1000) : data,
      });
      throw new Error(`API request failed with status ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('Error fetching page data:', error);
    throw error;
  }
}
