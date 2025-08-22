export const name = 'ChaCha20';

function rotate(v: number, c: number) {
  return (v << c) | (v >>> (32 - c));
}

function quarterRound(state: Uint32Array, a: number, b: number, c: number, d: number) {
  state[a] += state[b]; state[d] = rotate(state[d] ^ state[a], 16);
  state[c] += state[d]; state[b] = rotate(state[b] ^ state[c], 12);
  state[a] += state[b]; state[d] = rotate(state[d] ^ state[a], 8);
  state[c] += state[d]; state[b] = rotate(state[b] ^ state[c], 7);
}

function chachaBlock(keyWords: Uint32Array, counter: number, nonce: Uint32Array) {
  const state = new Uint32Array(16);
  state.set([0x61707865, 0x3320646e, 0x79622d32, 0x6b206574]);
  state.set(keyWords, 4);
  state[12] = counter;
  state.set(nonce, 13);
  const working = new Uint32Array(state);
  for (let i = 0; i < 10; i++) {
    quarterRound(working, 0, 4, 8, 12);
    quarterRound(working, 1, 5, 9, 13);
    quarterRound(working, 2, 6, 10, 14);
    quarterRound(working, 3, 7, 11, 15);
    quarterRound(working, 0, 5, 10, 15);
    quarterRound(working, 1, 6, 11, 12);
    quarterRound(working, 2, 7, 8, 13);
    quarterRound(working, 3, 4, 9, 14);
  }
  for (let i = 0; i < 16; i++) working[i] = (working[i] + state[i]) >>> 0;
  return new Uint8Array(working.buffer);
}

export default async function chacha(data: Uint8Array, key: string): Promise<Uint8Array> {
  const keyHash = new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(key)));
  const keyWords = new Uint32Array(keyHash.buffer);
  const nonce = new Uint32Array(3); // all zeros
  let counter = 0;
  const out = new Uint8Array(data.length);
  for (let pos = 0; pos < data.length; pos += 64) {
    const keystream = chachaBlock(keyWords, counter++, nonce);
    const chunk = data.subarray(pos, pos + 64);
    for (let i = 0; i < chunk.length; i++) {
      out[pos + i] = chunk[i] ^ keystream[i];
    }
  }
  return out;
}
