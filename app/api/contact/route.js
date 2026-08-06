const CONTACT_WEBHOOK = process.env.CONTACT_WEBHOOK_URL;
const SALESFORCE_WEBHOOK = process.env.SALESFORCE_WEBHOOK_URL;
const PARDOT_FORM_ACTION =
  process.env.PARDOT_FORM_ACTION || 'https://campaign.ivoclar.com/l/794073/2025-04-07/489ns7';
// NEW form handler for US_ColdStart Tetric Line Campaign_2026 (Eric/Zach's
// campaign info email, Jul 29 2026). Sample requests go here — completion
// actions add the prospect to the NA_ColdStart Tetric Line Leads CRM campaign.
const PARDOT_SAMPLE_FORM_ACTION =
  process.env.PARDOT_SAMPLE_FORM_ACTION ||
  'https://campaign.ivoclar.com/l/794073/2026-07-28/4bk7vl';
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
const RECAPTCHA_MIN_SCORE = parseFloat(process.env.RECAPTCHA_MIN_SCORE || '0.5');
const RECAPTCHA_EXPECTED_ACTION = process.env.RECAPTCHA_EXPECTED_ACTION || 'lead_capture';

async function verifyRecaptcha(token, remoteIp) {
  if (!RECAPTCHA_SECRET_KEY) {
    console.error('RECAPTCHA_SECRET_KEY is not configured');
    return { success: false, error: 'captcha-not-configured' };
  }
  if (!token || typeof token !== 'string') {
    return { success: false, error: 'missing-token' };
  }

  const params = new URLSearchParams({
    secret: RECAPTCHA_SECRET_KEY,
    response: token,
  });
  if (remoteIp) params.append('remoteip', remoteIp);

  try {
    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });
    const data = await res.json();

    if (!data.success) {
      return {
        success: false,
        error: 'verification-failed',
        codes: data['error-codes'] || [],
      };
    }

    // For reCAPTCHA v3 the response includes a score (0.0 - 1.0) and an action.
    if (typeof data.score === 'number' && data.score < RECAPTCHA_MIN_SCORE) {
      return { success: false, error: 'low-score', score: data.score };
    }

    if (
      RECAPTCHA_EXPECTED_ACTION &&
      data.action &&
      data.action !== RECAPTCHA_EXPECTED_ACTION
    ) {
      return { success: false, error: 'action-mismatch', action: data.action };
    }

    return { success: true, score: data.score, action: data.action };
  } catch (err) {
    console.error('reCAPTCHA verification error:', err);
    return { success: false, error: 'verification-error' };
  }
}

function buildFormEncodedBody(formData) {
  const body = new URLSearchParams();
  Object.entries(formData).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item !== undefined && item !== null) body.append(key, String(item));
      });
    } else if (typeof value === 'boolean') {
      // Match the original Pardot form, which sent checkbox values as the string "true"
      if (value) body.append(key, 'true');
    } else {
      body.append(key, String(value));
    }
  });
  return body;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { recaptchaToken, form_type: formType, ...formData } = body || {};

    // Sample requests post to the new 2026 sample campaign; everything else
    // (legacy demo/contact) keeps the original form handler.
    const pardotAction =
      formType === 'sample_request' ? PARDOT_SAMPLE_FORM_ACTION : PARDOT_FORM_ACTION;

    const remoteIp =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      undefined;

    const verification = await verifyRecaptcha(recaptchaToken, remoteIp);
    if (!verification.success) {
      console.warn('reCAPTCHA verification rejected:', verification);
      return new Response(
        JSON.stringify({ ok: false, error: 'captcha-failed', detail: verification.error }),
        { status: 400, headers: { 'Content-Type': 'application/json' } },
      );
    }

    // Forward to Pardot (which syncs to Salesforce) as form-urlencoded.
    if (pardotAction) {
      try {
        const pardotBody = buildFormEncodedBody(formData);
        const pardotRes = await fetch(pardotAction, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: pardotBody.toString(),
          // Pardot form handlers typically respond with a 302 redirect to a thank-you page.
          // We don't want to follow it; we just want to know it accepted the submission.
          redirect: 'manual',
        });
        // Accept 2xx and 3xx as success. 0 status can occur with manual redirects in some runtimes.
        if (pardotRes.status !== 0 && pardotRes.status >= 400) {
          console.error('Pardot submission failed:', { status: pardotRes.status });
          return new Response(
            JSON.stringify({ ok: false, target: 'pardot' }),
            { status: 502, headers: { 'Content-Type': 'application/json' } },
          );
        }
      } catch (err) {
        console.error('Pardot submission threw:', err);
        return new Response(
          JSON.stringify({ ok: false, target: 'pardot' }),
          { status: 502, headers: { 'Content-Type': 'application/json' } },
        );
      }
    }

    // Optional additional webhooks (JSON). Preserved from the original behavior.
    const targets = [
      { url: CONTACT_WEBHOOK, name: 'contact_webhook' },
      { url: SALESFORCE_WEBHOOK, name: 'salesforce_webhook' },
    ].filter((target) => Boolean(target.url));

    for (const target of targets) {
      const res = await fetch(target.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        console.error('Contact forward failed:', { target: target.name, status: res.status });
        return new Response(
          JSON.stringify({ ok: false, target: target.name }),
          { status: 502, headers: { 'Content-Type': 'application/json' } },
        );
      }
    }

    return new Response(
      JSON.stringify({ ok: true, score: verification.score }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  } catch (e) {
    console.error(e);
    return new Response(
      JSON.stringify({ ok: false }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
}
