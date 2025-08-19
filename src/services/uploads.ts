export async function uploadPaymentProof(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
  const body = {
    filename: file.name,
    contentType: file.type || 'image/png',
    dataBase64: base64,
  };
  const resp = await fetch('/api/upload-proof', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!resp.ok) throw new Error('Upload failed');
  const json = (await resp.json()) as { ok: boolean; url?: string; error?: string };
  if (!json.ok || !json.url) throw new Error(json.error || 'Upload failed');
  return json.url;
}
