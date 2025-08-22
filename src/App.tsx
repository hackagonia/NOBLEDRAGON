import { useState } from 'react';
import { HashForm } from './components/HashForm';
import { HashOutput } from './components/HashOutput';

import { FileEncryptor } from './components/FileEncryptor';
import { Button } from './components/ui/button';

export default function App() {
  const [outputs, setOutputs] = useState<Record<string, string>>({});
  const [active, setActive] = useState<'hash' | 'encrypt'>('hash');


  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
  };

  return (

    <div className="flex min-h-screen">
      <aside className="w-48 border-r p-2 space-y-2 bg-muted">
        <div className="font-bold px-2">Tools</div>
        <nav className="flex flex-col gap-1">
          <button
            className={`text-left px-2 py-1 rounded ${active === 'hash' ? 'bg-primary text-primary-foreground' : ''}`}
            onClick={() => setActive('hash')}
          >
            HashGen
          </button>
          <button
            className={`text-left px-2 py-1 rounded ${active === 'encrypt' ? 'bg-primary text-primary-foreground' : ''}`}
            onClick={() => setActive('encrypt')}
          >
            Encryptor
          </button>
        </nav>
      </aside>
      <main className="flex-1 p-4 space-y-4">
        <div className="flex justify-end">
          <Button onClick={toggleTheme}>Toggle Theme</Button>
        </div>
        {active === 'hash' && (
          <>
            <HashForm onGenerate={setOutputs} />
            <HashOutput outputs={outputs} />
          </>
        )}
        {active === 'encrypt' && <FileEncryptor />}
      </main>
    </div>
  );
}
