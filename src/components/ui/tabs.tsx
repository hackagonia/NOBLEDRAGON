import { useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface Tab {
  label: string;
  content: ReactNode;
}

export function Tabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div className="flex border-b mb-2">
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            className={cn(
              'px-4 py-2 -mb-px border-b-2',
              active === i ? 'border-blue-500' : 'border-transparent'
            )}
            onClick={() => setActive(i)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>{tabs[active]?.content}</div>
    </div>
  );
}
