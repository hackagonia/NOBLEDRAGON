export const name = 'DJB2';

export default function djb2(input: string, seed = 0): number {
  let hash = 5381 ^ seed;
  for (let i = 0; i < input.length; i++) {
    hash = Math.imul(hash, 33) ^ (input.charCodeAt(i) & 0xff);
  }
  return hash >>> 0;
}
