import Link from 'next/link';
import { notFound } from 'next/navigation';

// Mock categories and posts - in a real app, this would come from a CMS or markdown files
const categories = [
  {
    slug: 'gst-compliance',
    name: 'GST & Compliance',
    description: 'Latest updates and guides on GST rules, e-Way Bill, and tax compliance in India.'
  },
  {
    slug: 'logistics',
    name: 'Logistics',
    description: 'Insights and tips for efficient logistics and supply chain management.'
  },
  // Add more categories as needed
];

const blogPosts = [
  {
    slug: 'how-to-calculate-distance-for-e-way-bill',
    title: 'How to Calculate Distance for e-Way Bill in India',
    excerpt: 'Learn the correct way to calculate distance for e-Way Bill generation and ensure GST compliance.',
    date: '2025-06-15',
    readTime: '4 min read',
    category: 'GST & Compliance',
    categorySlug: 'gst-compliance'
  },
  {
    slug: 'importance-of-accurate-pincode-distance',
    title: 'Why Accurate Pincode Distance Matters for Your Business',
    excerpt: 'Discover how precise pincode distance calculations can save your business time and money.',
    date: '2025-06-10',
    readTime: '5 min read',
    category: 'Logistics',
    categorySlug: 'logistics'
  },
  {
    slug: 'gst-rules-for-interstate-transport',
    title: 'Understanding GST Rules for Interstate Transport in India',
    excerpt: 'A comprehensive guide to GST rules and regulations for interstate transportation.',
    date: '2025-06-05',
    readTime: '6 min read',
    category: 'GST & Compliance',
    categorySlug: 'gst-compliance'
  }
];

export async function generateStaticParams() {
  return categories.map((category) => ({
    category: category.slug,
  }));
}

export function generateMetadata({
  params,
}: {
  params: { category: string }
}) {
  const category = categories.find((c) => c.slug === params.category);
  
  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: `${category.name} - Pin to Pin Distance Blog`,
    description: category.description,
  };
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = categories.find((c) => c.slug === params.category);
  
  if (!category) {
    notFound();
  }

  const posts = blogPosts.filter((post) => post.categorySlug === params.category);

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{category.name}</h1>
        <p className="text-xl text-gray-600">{category.description}</p>
      </div>
      
      <div className="grid gap-8">
        {posts.length > 0 ? (
          posts.map((post) => (
            <article key={post.slug} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-600">{post.category}</span>
                  <span className="text-sm text-gray-500">{post.date}</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm inline-flex items-center"
                  >
                    Read more
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No posts found in this category.</p>
            <Link href="/blog" className="mt-4 inline-block text-blue-600 hover:underline">
              Back to all posts
            </Link>
          </div>
        )}
      </div>
      
      <div className="mt-12 pt-8 border-t border-gray-200">
        <Link 
          href="/blog" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Blog
        </Link>
      </div>
    </div>
  );
}
