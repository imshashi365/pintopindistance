import { NextResponse } from 'next/server';

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

function generateSitemap() {
  const baseUrl = 'https://www.pin-to-pin-distance.xyz';
  const currentDate = new Date().toISOString().split('T')[0];

  // URLs for static pages
  const staticRoutes = [
    { url: '/', priority: 1.0, changefreq: 'daily' },
    { url: '/about-us', priority: 0.8, changefreq: 'weekly' },
    { url: '/contact-us', priority: 0.8, changefreq: 'weekly' },
    { url: '/privacy-policy', priority: 0.5, changefreq: 'monthly' },
    { url: '/blog', priority: 0.9, changefreq: 'weekly' },
  ];

  // Generate XML sitemap
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${staticRoutes
      .map(
        (route) => `
      <url>
        <loc>${baseUrl}${route.url}</loc>
        <lastmod>${currentDate}</lastmod>
        <changefreq>${route.changefreq}</changefreq>
        <priority>${route.priority}</priority>
      </url>`
      )
      .join('')}
    ${blogPosts
      .map(
        (post) => `
      <url>
        <loc>${baseUrl}/blog/${post.slug}</loc>
        <lastmod>${post.date}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
      </url>`
      )
      .join('')}
  </urlset>`;

  return sitemap;
}

export async function GET() {
  const sitemap = generateSitemap();
  
  return new NextResponse(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'xml-version': '1.0',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate',
    },
  });
}
