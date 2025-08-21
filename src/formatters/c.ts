import type { HashEntry } from './utils';
import { formatIdentifier, toHex } from './utils';

export const name = 'C';

export default function formatC(entries: HashEntry[]): string {
  return entries
    .map(e => `#define HASH_${formatIdentifier(e.key)} ${toHex(e.hash)}`)
    .join('\n');
}
