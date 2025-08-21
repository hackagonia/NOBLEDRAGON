import type { HashEntry } from './utils';
import { formatIdentifier, toHex } from './utils';

export const name = 'Rust';

export default function formatRust(entries: HashEntry[]): string {
  return entries
    .map(e => `pub const ${formatIdentifier(e.key)}: u32 = ${toHex(e.hash)};`)
    .join('\n');
}
