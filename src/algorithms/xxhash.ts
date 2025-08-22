export const name = 'xxHash32';

function rotl(x: number, r: number) {
  return (x << r) | (x >>> (32 - r));
}

function read32(str: string, pos: number) {
  return (
    (str.charCodeAt(pos) & 0xff) |
    ((str.charCodeAt(pos + 1) & 0xff) << 8) |
    ((str.charCodeAt(pos + 2) & 0xff) << 16) |
    ((str.charCodeAt(pos + 3) & 0xff) << 24)
  ) >>> 0;
}

export default function xxhash32(input: string, seed = 0): number {
  const PRIME1 = 0x9e3779b1;
  const PRIME2 = 0x85ebca77;
  const PRIME3 = 0xc2b2ae3d;
  const PRIME4 = 0x27d4eb2f;
  const PRIME5 = 0x165667b1;

  let p = 0;
  const len = input.length;
  let h32: number;

  if (len >= 16) {
    let v1 = (seed + PRIME1 + PRIME2) >>> 0;
    let v2 = (seed + PRIME2) >>> 0;
    let v3 = seed >>> 0;
    let v4 = (seed - PRIME1) >>> 0;
    const limit = len - 16;
    while (p <= limit) {
      v1 = Math.imul(rotl(v1 + Math.imul(read32(input, p), PRIME2), 13), PRIME1);
      p += 4;
      v2 = Math.imul(rotl(v2 + Math.imul(read32(input, p), PRIME2), 13), PRIME1);
      p += 4;
      v3 = Math.imul(rotl(v3 + Math.imul(read32(input, p), PRIME2), 13), PRIME1);
      p += 4;
      v4 = Math.imul(rotl(v4 + Math.imul(read32(input, p), PRIME2), 13), PRIME1);
      p += 4;
    }
    h32 = (rotl(v1, 1) + rotl(v2, 7) + rotl(v3, 12) + rotl(v4, 18)) >>> 0;
  } else {
    h32 = (seed + PRIME5) >>> 0;
  }

  h32 = (h32 + len) >>> 0;

  while (p + 4 <= len) {
    let k1 = Math.imul(read32(input, p), PRIME3);
    k1 = rotl(k1, 17);
    k1 = Math.imul(k1, PRIME4);
    h32 = Math.imul(rotl(h32 ^ k1, 17), PRIME1) + PRIME4 >>> 0;
    p += 4;
  }

  while (p < len) {
    h32 = Math.imul(rotl(h32 ^ Math.imul(input.charCodeAt(p++) & 0xff, PRIME5), 11), PRIME1);
  }

  h32 ^= h32 >>> 15;
  h32 = Math.imul(h32, PRIME2);
  h32 ^= h32 >>> 13;
  h32 = Math.imul(h32, PRIME3);
  h32 ^= h32 >>> 16;

  return h32 >>> 0;
}
