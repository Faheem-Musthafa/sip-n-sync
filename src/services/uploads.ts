export async function uploadPaymentProof(file: File): Promise<string> {
  // Basic checks
  const allowed = ['image/png', 'image/jpeg', 'image/webp'];
  if (file.type && !allowed.includes(file.type)) {
    throw new Error('Only PNG, JPEG, or WEBP images are allowed');
  }
  const maxBytes = 5 * 1024 * 1024; // 5MB
  if (file.size > maxBytes) {
    throw new Error('Image too large (max 5MB)');
  }

  // Use FileReader to get a base64 string safely
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file); // e.g., data:image/png;base64,AAAA...
  });
  const [, base64Part] = dataUrl.split('base64,');
  if (!base64Part) throw new Error('Invalid image data');

  const contentType = file.type || (dataUrl.match(/^data:(.*?);base64,/)?.[1] ?? 'image/png');
  const body = {
    filename: file.name || 'upload.png',
    contentType,
    dataBase64: base64Part,
  };

  // Primary: use internal API (works on Vercel/Edge)
  try {
    const resp = await fetch('/api/upload-proof', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (resp.ok) {
      const json = (await resp.json().catch(() => null)) as { ok?: boolean; url?: string; error?: string } | null;
      if (!json?.ok || !json.url) throw new Error(json?.error || 'Upload failed (bad response)');
      return json.url;
    }
    // If 404, likely not available in local vite dev
    if (resp.status === 404) throw new Error('API route not found');
    const text = await resp.text().catch(() => '');
    throw new Error(text || 'Upload failed (server error)');
  } catch (primaryErr) {
    // Fallback: direct webhook (requires CORS allowed on your endpoint)
  const meta = import.meta as unknown as { env?: Record<string, string | undefined> };
  const fallbackUrl = meta?.env?.VITE_DRIVE_WEBHOOK_URL as string | undefined;
    if (!fallbackUrl) throw primaryErr instanceof Error ? primaryErr : new Error('Upload failed');
    const resp2 = await fetch(fallbackUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      mode: 'cors',
    });
    if (!resp2.ok) {
      const t2 = await resp2.text().catch(() => '');
      const msg = t2 || 'Upload failed (fallback server error)';
      throw new Error(msg);
    }
    const json2 = (await resp2.json().catch(() => null)) as { url?: string; error?: string } | null;
    if (!json2?.url) throw new Error(json2?.error || 'Upload failed (fallback bad response)');
    return json2.url;
  }
}
