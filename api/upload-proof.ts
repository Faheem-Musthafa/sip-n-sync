export const config = { runtime: 'edge' };

// This endpoint accepts a base64-encoded image and uploads to Google Drive via a webhook you control
// For Edge compatibility, we proxy to DRIVE_WEBHOOK_URL which should handle Google auth and file upload

type Body = {
  filename: string;
  contentType: string;
  dataBase64: string; // data without data: prefix
};

function getEnv(name: string): string {
  const g = globalThis as unknown as { process?: { env?: Record<string, string> } } & Record<string, string>;
  const v = g?.process?.env?.[name] ?? g?.[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ ok: false, error: 'Method Not Allowed' }), { status: 405 });
  }
  try {
    const body = (await request.json()) as Body;
    if (!body?.filename || !body?.contentType || !body?.dataBase64) {
      return new Response(JSON.stringify({ ok: false, error: 'Missing fields' }), { status: 400 });
    }

    const webhook = getEnv('DRIVE_WEBHOOK_URL');
    const upstream = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!upstream.ok) {
      const text = await upstream.text();
      return new Response(JSON.stringify({ ok: false, error: text || 'Upload failed' }), { status: 502 });
    }
    const json = await upstream.json().catch(() => ({}));
    return new Response(JSON.stringify({ ok: true, url: json.url }), { status: 200 });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Internal Error';
    return new Response(JSON.stringify({ ok: false, error: msg }), { status: 500 });
  }
}
