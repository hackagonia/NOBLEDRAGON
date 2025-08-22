export const name = 'CityHash32';

const c1 = 0xcc9e2d51;
const c2 = 0x1b873593;

function rot(x: number, r: number) {
  return (x << r) | (x >>> (32 - r));
}

function fetch32(str: string, pos: number) {
  return (
    (str.charCodeAt(pos) & 0xff) |
    ((str.charCodeAt(pos + 1) & 0xff) << 8) |
    ((str.charCodeAt(pos + 2) & 0xff) << 16) |
    ((str.charCodeAt(pos + 3) & 0xff) << 24)
  ) >>> 0;
}

function bswap32(x: number) {
  return (
    ((x & 0xff) << 24) |
    ((x & 0xff00) << 8) |
    ((x >>> 8) & 0xff00) |
    ((x >>> 24) & 0xff)
  ) >>> 0;
}

function fmix(h: number) {
  h ^= h >>> 16;
  h = Math.imul(h, 0x85ebca6b);
  h ^= h >>> 13;
  h = Math.imul(h, 0xc2b2ae35);
  h ^= h >>> 16;
  return h >>> 0;
}

function mur(a: number, h: number) {
  a = Math.imul(a, c1);
  a = rot(a, 17);
  a = Math.imul(a, c2);
  h ^= a;
  h = rot(h, 19);
  return (Math.imul(h, 5) + 0xe6546b64) >>> 0;
}

function hash32Len0to4(s: string, len: number) {
  let b = 0;
  let c = 9;
  for (let i = 0; i < len; i++) {
    const v = s.charCodeAt(i) & 0xff;
    b = Math.imul(b, c1) + v;
    c ^= b;
  }
  return fmix(mur(b, mur(len, c)));
}

function hash32Len5to12(s: string, len: number) {
  let a = len;
  let b = a * 5;
  let c = 9;
  const d = b;
  a += fetch32(s, 0);
  b += fetch32(s, len - 4);
  c += fetch32(s, (len >> 1) & 4);
  return fmix(mur(c, mur(b, mur(a, d))));
}

function hash32Len13to24(s: string, len: number) {
  const a = fetch32(s, (len >> 1) - 4);
  const b = fetch32(s, 4);
  const c = fetch32(s, len - 8);
  const d = fetch32(s, len >> 1);
  const e = fetch32(s, 0);
  const f = fetch32(s, len - 4);
  const h = len;
  return fmix(mur(f, mur(e, mur(d, mur(c, mur(b, mur(a, h)))))));
}

function cityHash32Internal(s: string) {
  const len = s.length;
  if (len <= 24) {
    return (len <= 12 ? (len <= 4 ? hash32Len0to4(s, len) : hash32Len5to12(s, len)) : hash32Len13to24(s, len)) >>> 0;
  }

  let h = len >>> 0;
  let g = Math.imul(c1, h) >>> 0;
  let f = g;

  const a0 = Math.imul(rot(fetch32(s, len - 4) * c1, 17), c2);
  const a1 = Math.imul(rot(fetch32(s, len - 8) * c1, 17), c2);
  const a2 = Math.imul(rot(fetch32(s, len - 16) * c1, 17), c2);
  const a3 = Math.imul(rot(fetch32(s, len - 12) * c1, 17), c2);
  const a4 = Math.imul(rot(fetch32(s, len - 20) * c1, 17), c2);

  h ^= a0;
  h = rot(h, 19);
  h = (Math.imul(h, 5) + 0xe6546b64) >>> 0;
  h ^= a2;
  h = rot(h, 19);
  h = (Math.imul(h, 5) + 0xe6546b64) >>> 0;
  g ^= a1;
  g = rot(g, 19);
  g = (Math.imul(g, 5) + 0xe6546b64) >>> 0;
  g ^= a3;
  g = rot(g, 19);
  g = (Math.imul(g, 5) + 0xe6546b64) >>> 0;
  f += a4;
  f = rot(f, 19);
  f = (Math.imul(f, 5) + 0xe6546b64) >>> 0;

  let iters = Math.floor((len - 1) / 20);
  let offset = 0;
  while (iters-- > 0) {
    const a0 = Math.imul(rot(fetch32(s, offset) * c1, 17), c2);
    const a1 = fetch32(s, offset + 4);
    const a2 = Math.imul(rot(fetch32(s, offset + 8) * c1, 17), c2);
    const a3 = Math.imul(rot(fetch32(s, offset + 12) * c1, 17), c2);
    const a4 = fetch32(s, offset + 16);
    h ^= a0;
    h = rot(h, 18);
    h = (Math.imul(h, 5) + 0xe6546b64) >>> 0;
    f += a1;
    f = rot(f, 19);
    f = Math.imul(f, c1) >>> 0;
    g += a2;
    g = rot(g, 18);
    g = (Math.imul(g, 5) + 0xe6546b64) >>> 0;
    h ^= (a3 + a1) >>> 0;
    h = rot(h, 19);
    h = (Math.imul(h, 5) + 0xe6546b64) >>> 0;
    g ^= a4;
    g = bswap32(g);
    g = Math.imul(g, 5) >>> 0;
    h += Math.imul(a4, 5) >>> 0;
    h = bswap32(h);
    f += a0;
    [f, h, g] = [g, f, h];
    offset += 20;
  }

  g = Math.imul(rot(g, 11), c1) >>> 0;
  g = Math.imul(rot(g, 17), c1) >>> 0;
  f = Math.imul(rot(f, 11), c1) >>> 0;
  f = Math.imul(rot(f, 17), c1) >>> 0;
  h = rot(h + g, 19);
  h = (Math.imul(h, 5) + 0xe6546b64) >>> 0;
  h = Math.imul(rot(h, 17), c1) >>> 0;
  h = rot(h + f, 19);
  h = (Math.imul(h, 5) + 0xe6546b64) >>> 0;
  h = Math.imul(rot(h, 17), c1) >>> 0;
  return h >>> 0;
}

export default function cityHash32(str: string, seed = 0): number {
  return (cityHash32Internal(str) ^ seed) >>> 0;
}
