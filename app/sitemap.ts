import { MetadataRoute } from 'next';

// This is the same data as in your blog page. 
// In a real app, you would fetch this from a CMS or database.
const blogPosts = [
  {
    slug: 'pin-to-pin-distance-e-waybill',
    date: '2025-06-22',
  },
  {
    slug: 'how-to-calculate-distance-for-e-way-bill',
    date: '2025-06-15',
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.pin-to-pin-distance.xyz';
  const currentDate = new Date().toISOString().split('T')[0];

  // URLs for static pages
  const staticRoutes = [
    { url: '/', priority: 1.0, changefreq: 'daily' },
    { url: '/about-us', priority: 0.8, changefreq: 'weekly' },
    { url: '/contact-us', priority: 0.8, changefreq: 'weekly' },
    { url: '/privacy-policy', priority: 0.5, changefreq: 'monthly' },
    { url: '/blog', priority: 0.9, changefreq: 'weekly' },
  ].map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified: currentDate,
    changeFrequency: route.changefreq as 'daily' | 'weekly' | 'monthly' | 'yearly',
    priority: route.priority,
  }));

  // URLs for dynamic blog posts
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...blogRoutes,
  ];
}
