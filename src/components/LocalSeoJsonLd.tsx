import { useEffect } from 'react';
import { siteConfig } from '@/config/site';

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  name: siteConfig.businessName,
  description: siteConfig.aboutParagraph,
  telephone: '+1-863-456-8958',
  areaServed: siteConfig.serviceAreas.map((name) => ({
    '@type': 'City',
    name: name.replace('Surrounding Central Florida areas', 'Central Florida'),
  })),
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '18:00',
    },
  ],
  slogan: siteConfig.slogan,
};

export function LocalSeoJsonLd() {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    script.id = 'local-business-jsonld';
    document.head.appendChild(script);
    return () => {
      script.remove();
    };
  }, []);

  return null;
}
