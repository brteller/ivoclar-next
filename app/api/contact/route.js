const CONTACT_WEBHOOK = process.env.CONTACT_WEBHOOK_URL;

export async function POST(request) {
  try {
    const body = await request.json();
    if (CONTACT_WEBHOOK) {
      const res = await fetch(CONTACT_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        return new Response(JSON.stringify({ ok: false }), { status: 502 });
      }
    }
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ ok: false }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
