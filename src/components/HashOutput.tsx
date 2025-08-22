import { Card } from './ui/card';
import { Button } from './ui/button';
import { Tabs } from './ui/tabs';

interface Props {
  outputs: Record<string, string>;
}

export function HashOutput({ outputs }: Props) {
  const entries = Object.entries(outputs);
  if (entries.length === 0) return null;
  const tabs = entries.map(([lang, content]) => ({
    label: lang,
    content: (
      <Card key={lang} className="relative">
        <Button
          className="absolute right-2 top-2"
          onClick={() => navigator.clipboard.writeText(content)}
        >
          Copy
        </Button>
        <pre className="overflow-auto"><code>{content}</code></pre>
      </Card>
    ),
  }));
  return <Tabs tabs={tabs} />;
}
