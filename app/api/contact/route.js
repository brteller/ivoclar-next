const CONTACT_WEBHOOK = process.env.CONTACT_WEBHOOK_URL;
const SALESFORCE_WEBHOOK = process.env.SALESFORCE_WEBHOOK_URL;

export async function POST(request) {
  try {
    const body = await request.json();
    const targets = [
      { url: CONTACT_WEBHOOK, name: 'contact_webhook' },
      { url: SALESFORCE_WEBHOOK, name: 'salesforce_webhook' },
    ].filter((target) => Boolean(target.url));

    for (const target of targets) {
      const res = await fetch(target.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        console.error('Contact forward failed:', {
          target: target.name,
          status: res.status,
        });
        return new Response(JSON.stringify({ ok: false, target: target.name }), { status: 502 });
      }
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ ok: false }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
