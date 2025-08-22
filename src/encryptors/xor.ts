export const name = 'XOR';

export default async function xor(data: Uint8Array, key: string): Promise<Uint8Array> {
  const keyBytes = new TextEncoder().encode(key);
  const out = new Uint8Array(data.length);
  for (let i = 0; i < data.length; i++) {
    out[i] = data[i] ^ keyBytes[i % keyBytes.length];
  }
  return out;
}
