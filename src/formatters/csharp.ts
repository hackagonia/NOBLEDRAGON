import type { HashEntry } from './utils';
import { formatIdentifier, toHex } from './utils';

export const name = 'C#';

export default function formatCSharp(entries: HashEntry[]): string {
  return entries
    .map(e => `public const uint HASH_${formatIdentifier(e.key)} = ${toHex(e.hash)};`)
    .join('\n');
}
