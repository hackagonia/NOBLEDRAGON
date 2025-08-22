import type { HashEntry } from './utils';
import { formatIdentifier, toHex } from './utils';

export const name = 'Java';

export default function formatJava(entries: HashEntry[]): string {
  return entries
    .map(e => `public static final int HASH_${formatIdentifier(e.key)} = ${toHex(e.hash)};`)
    .join('\n');
}
