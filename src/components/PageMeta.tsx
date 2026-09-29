import { useEffect } from 'react';

interface PageMetaProps {
  title: string;
  description: string;
}

export function PageMeta({ title, description }: PageMetaProps) {
  useEffect(() => {
    document.title = `${title} | One Source 360 LLC`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.setAttribute('content', description);
    }
  }, [title, description]);

  return null;
}
