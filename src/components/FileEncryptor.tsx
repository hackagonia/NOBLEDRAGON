import { useState } from 'react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Select } from './ui/select';
import { Button } from './ui/button';

interface Encryptor {
  key: string;
  name: string;
  fn: (data: Uint8Array, key: string) => Promise<Uint8Array>;
}

const encryptorModules = import.meta.glob('../encryptors/*.ts', { eager: true }) as Record<string, { name: string; default: Encryptor['fn'] }>;
const encryptors: Encryptor[] = Object.entries(encryptorModules).map(([key, mod]) => ({ key, name: mod.name, fn: mod.default }));

export function FileEncryptor() {
  const [file, setFile] = useState<File | null>(null);
  const [key, setKey] = useState('');
  const [algorithm, setAlgorithm] = useState(encryptors[0]?.key ?? '');
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const handleEncrypt = async () => {
    if (!file) return;
    const enc = encryptors.find(e => e.key === algorithm);
    if (!enc) return;
    const data = new Uint8Array(await file.arrayBuffer());
    const result = await enc.fn(data, key);
    const blob = new Blob([result]);
    const url = URL.createObjectURL(blob);
    setDownloadUrl(url);
  };

  return (
    <Card className="space-y-4">
      <Input type="file" onChange={e => setFile(e.target.files?.[0] ?? null)} />
      <Input placeholder="Key" value={key} onChange={e => setKey(e.target.value)} />
      <Select value={algorithm} onChange={e => setAlgorithm(e.target.value)}>
        {encryptors.map(e => (
          <option key={e.key} value={e.key}>
            {e.name}
          </option>
        ))}
      </Select>
      <Button onClick={handleEncrypt}>Encrypt</Button>
      {downloadUrl && (
        <a href={downloadUrl} download={(file?.name || 'file') + '.enc'} className="text-blue-600">
          Download Encrypted
        </a>
      )}
    </Card>
  );
}
