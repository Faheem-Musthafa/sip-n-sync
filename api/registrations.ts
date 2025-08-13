export const config = { runtime: 'edge' };

type ReqBody = {
  name: string;
  email: string;
  phone?: string;
  eventId: string;
  eventTitle?: string;
  message?: string;
  timestamp?: string;
};

function getEnv(name: string): string {
  const v = (globalThis as any).process?.env?.[name] || (globalThis as any)[name] || '';
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ ok: false, error: 'Method Not Allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = (await request.json()) as ReqBody;
    if (!body || !body.name || !body.email || !body.eventId) {
      return new Response(JSON.stringify({ ok: false, error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Call a Sheets-writing backend (recommended) or a webhook you control.
    // For Edge runtime portability, proxy to a webhook set in env: SHEETS_WEBHOOK_URL
    // You can point this to a Next/Vercel Node function or Cloud Function that uses googleapis.
    const webhook = getEnv('SHEETS_WEBHOOK_URL');
    const resp = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (!resp.ok) {
      const msg = await resp.text();
      return new Response(JSON.stringify({ ok: false, error: msg || 'Upstream failed' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ ok: false, error: err?.message || 'Internal Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
