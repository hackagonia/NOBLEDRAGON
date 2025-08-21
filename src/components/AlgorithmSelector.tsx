import { Select } from './ui/select';

export interface Algorithm {
  key: string;
  name: string;
  fn: (input: string, seed: number) => number;
}

interface Props {
  algorithms: Algorithm[];
  value: string;
  onChange: (value: string) => void;
}

export function AlgorithmSelector({ algorithms, value, onChange }: Props) {
  return (
    <Select value={value} onChange={e => onChange(e.target.value)}>
      {algorithms.map(a => (
        <option key={a.key} value={a.key}>
          {a.name}
        </option>
      ))}
    </Select>
  );
}
