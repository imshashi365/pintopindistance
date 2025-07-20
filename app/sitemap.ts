// app/sitemap.ts
import { MetadataRoute } from 'next';

function ensureHttpsUrl(url: string): string {
  // Ensure the URL uses HTTPS
  let processedUrl = url.replace(/^http:\/\//i, 'https://');
  if (!processedUrl.startsWith('https://')) {
    processedUrl = `https://${processedUrl}`;
  }
  // Remove trailing slash for consistency
  return processedUrl.endsWith('/') ? processedUrl.slice(0, -1) : processedUrl;
}

// Manually define your blog posts if you don't have a database
const blogPosts = [
  {
    slug: 'pin-to-pin-distance-e-waybill',
    updatedAt: '2025-06-22',
  },
  {
    slug: 'how-to-calculate-distance-for-e-way-bill',
    updatedAt: '2025-06-15',
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = ensureHttpsUrl('www.pin-to-pin-distance.xyz');
  const currentDate = new Date();

  // Static routes with their priorities
  const staticRoutes = [
    { url: '', priority: 1.0 },
    { url: '/blog', priority: 0.9 },
    { url: '/about-us', priority: 0.8 },
    { url: '/contact-us', priority: 0.8 },
    { url: '/privacy-policy', priority: 0.5 },
  ].map(route => ({
    url: `${baseUrl}${route.url}`,
    lastModified: currentDate,
    changeFrequency: 'daily' as const,
    priority: route.priority,
  }));

  // Blog post routes
  const blogPostRoutes = blogPosts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogPostRoutes];
}