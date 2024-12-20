import type { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/payment-successful','/settings'],
    },
    sitemap: `${process.env.NEXT_PUBLIC_APP_URL}/sitemap.xml`,
  }
}