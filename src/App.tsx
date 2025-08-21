import { useState } from 'react';
import { HashForm } from './components/HashForm';
import { HashOutput } from './components/HashOutput';
import { Button } from './components/ui/button';

export default function App() {
  const [outputs, setOutputs] = useState<Record<string, string>>({});

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen p-4 space-y-4">
      <div className="flex justify-end">
        <Button onClick={toggleTheme}>Toggle Theme</Button>
      </div>
      <HashForm onGenerate={setOutputs} />
      <HashOutput outputs={outputs} />
    </div>
  );
}
