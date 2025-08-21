import type { HashEntry } from './utils';
import { toHex } from './utils';

export const name = 'Go';

function toPascal(name: string) {
  return name
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map(w => w[0].toUpperCase() + w.slice(1).toLowerCase())
    .join('');
}

export default function formatGo(entries: HashEntry[]): string {
  return entries
    .map(e => `const ${toPascal(e.key)} uint32 = ${toHex(e.hash)}`)
    .join('\n');
}
