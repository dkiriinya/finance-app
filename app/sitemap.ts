import type { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${process.env.NEXT_PUBLIC_APP_URL}/accounts`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/categories`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 1,
    },
    {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/transactions`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 1,
    },
    {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/settings`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 1,
    },
    {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/payment-successful`,
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 1,
    },
  ]
}