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

  // URLs for static pages
  const staticRoutes = [
    '/',
    '/about-us',
    '/contact-us',
    '/privacy-policy',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  // URLs for dynamic blog posts
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [...staticRoutes, ...blogRoutes];
}
