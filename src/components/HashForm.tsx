import { useState } from 'react';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { AlgorithmSelector } from './AlgorithmSelector';
import type { Algorithm } from './AlgorithmSelector';
import type { HashEntry } from '../formatters/utils';

const algorithmModules = import.meta.glob('../algorithms/*.ts', { eager: true }) as Record<string, { name: string; default: Algorithm['fn'] }>;
const algorithms: Algorithm[] = Object.entries(algorithmModules).map(([key, mod]) => ({ key, name: mod.name, fn: mod.default }));

const formatterModules = import.meta.glob('../formatters/*.ts', { eager: true }) as Record<string, { name: string; default: (entries: HashEntry[]) => string }>;
const formattersList = Object.entries(formatterModules).map(([key, mod]) => ({ key, name: mod.name, fn: mod.default }));

interface Props {
  onGenerate: (outputs: Record<string, string>) => void;
}

export function HashForm({ onGenerate }: Props) {
  const [input, setInput] = useState('');
  const [seed, setSeed] = useState(0);
  const [algorithm, setAlgorithm] = useState(algorithms[0]?.key ?? '');
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);

  const toggleFormat = (key: string) => {
    setSelectedFormats(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const handleGenerate = () => {
    const algo = algorithms.find(a => a.key === algorithm);
    if (!algo) return;
    const lines = input
      .split('\n')
      .map(l => l.trim())
      .filter(Boolean);
    const entries: HashEntry[] = lines.map(line => ({
      key: line,
      hash: algo.fn(line, seed),
    }));
    const outputs: Record<string, string> = {};
    for (const fmtKey of selectedFormats) {
      const fmt = formattersList.find(f => f.key === fmtKey);
      if (fmt) outputs[fmt.name] = fmt.fn(entries);
    }
    onGenerate(outputs);
  };

  return (
    <Card className="space-y-4 mb-4">
      <Textarea
        rows={5}
        placeholder="Enter strings, one per line"
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <div className="flex gap-2">
        <Input
          type="number"
          placeholder="Seed"
          value={seed}
          onChange={e => setSeed(Number(e.target.value))}
        />
        <AlgorithmSelector
          algorithms={algorithms}
          value={algorithm}
          onChange={setAlgorithm}
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {formattersList.map(f => (
          <label key={f.key} className="flex items-center gap-1">
            <input
              type="checkbox"
              checked={selectedFormats.includes(f.key)}
              onChange={() => toggleFormat(f.key)}
            />
            {f.name}
          </label>
        ))}
      </div>
      <Button onClick={handleGenerate}>Generate</Button>
    </Card>
  );
}
