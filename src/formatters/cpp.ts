import type { HashEntry } from './utils';
import { formatIdentifier, toHex } from './utils';

export const name = 'C++';

export default function formatCpp(entries: HashEntry[]): string {
  return entries
    .map(e => `constexpr uint32_t HASH_${formatIdentifier(e.key)} = ${toHex(e.hash)};`)
    .join('\n');
}
