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
  const API_KEY_SECRET = process.env.API_KEY_SECRET;
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
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching page data:', error);
    throw error;
  }
}
