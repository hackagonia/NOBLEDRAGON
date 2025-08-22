export const name = 'AES';

export default async function aes(data: Uint8Array, key: string): Promise<Uint8Array> {
  const enc = new TextEncoder();
  const keyData = await crypto.subtle.digest('SHA-256', enc.encode(key));
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt']
  );
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = new Uint8Array(
    await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, cryptoKey, data)
  );
  const out = new Uint8Array(iv.length + encrypted.length);
  out.set(iv, 0);
  out.set(encrypted, iv.length);
  return out;
}
