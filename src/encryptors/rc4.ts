export const name = 'RC4';

export default async function rc4(data: Uint8Array, key: string): Promise<Uint8Array> {
  const keyBytes = new TextEncoder().encode(key);
  const S = new Uint8Array(256);
  for (let i = 0; i < 256; i++) S[i] = i;
  let j = 0;
  for (let i = 0; i < 256; i++) {
    j = (j + S[i] + keyBytes[i % keyBytes.length]) & 0xff;
    [S[i], S[j]] = [S[j], S[i]];
  }
  let i = 0;
  j = 0;
  const out = new Uint8Array(data.length);
  for (let k = 0; k < data.length; k++) {
    i = (i + 1) & 0xff;
    j = (j + S[i]) & 0xff;
    [S[i], S[j]] = [S[j], S[i]];
    const K = S[(S[i] + S[j]) & 0xff];
    out[k] = data[k] ^ K;
  }
  return out;
}
