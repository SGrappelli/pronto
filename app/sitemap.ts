import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://trypronto.app/',
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: 'https://trypronto.app/for',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://trypronto.app/for/salons',
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://trypronto.app/pricing',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://trypronto.app/register',
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://trypronto.app/login',
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]
}
