export interface HashEntry {
  key: string;
  hash: number;
}

export function formatIdentifier(name: string) {
  return name.replace(/[^a-zA-Z0-9]+/g, '_').toUpperCase();
}

export function toHex(num: number) {
  return '0x' + (num >>> 0).toString(16).padStart(8, '0');
}
