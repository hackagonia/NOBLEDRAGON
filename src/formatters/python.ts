import type { HashEntry } from './utils';
import { formatIdentifier, toHex } from './utils';

export const name = 'Python';

export default function formatPython(entries: HashEntry[]): string {
  return entries
    .map(e => `HASH_${formatIdentifier(e.key)} = ${toHex(e.hash)}`)
    .join('\n');
}
