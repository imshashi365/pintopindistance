import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Pin to Pin Distance Calculator',
  description: 'Latest articles about e-Way Bill, GST compliance, and logistics in India',
};

// Mock blog posts data - in a real app, this would come from a CMS or markdown files
const blogPosts = [
  {
    slug: 'pin-to-pin-distance-e-waybill',
    title: 'How to Calculate Pincode Distance for e-Way Bill',
    excerpt: 'Learn two trusted ways to calculate pincode distance for e-Way Bill filing – a fast free calculator and the official GST portal.',
    date: '2025-06-22',
    readTime: '5 min read',
    category: 'GST & Compliance',
    featured: true
  },
  {
    slug: 'how-to-calculate-distance-for-e-way-bill',
    title: 'How to Calculate Distance for e-Way Bill in India',
    excerpt: 'Learn the correct way to calculate distance for e-Way Bill generation and ensure GST compliance.',
    date: '2025-06-15',
    readTime: '4 min read',
    category: 'GST & Compliance'
  }
];

export default function BlogPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
        <p className="text-xl text-gray-600">Latest updates, guides, and insights about e-Way Bill, GST, and logistics</p>
      </div>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
        {blogPosts.map((post) => (
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
        ))}
      </div>
      
      {/* <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from(new Set(blogPosts.map(post => post.category))).map(category => {
            const postCount = blogPosts.filter(p => p.category === category).length;
            return (
              <Link
                key={category}
                href={`/blog/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                className="group p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all"
              >
                <h3 className="font-medium text-gray-900 group-hover:text-blue-600">{category}</h3>
                <p className="text-sm text-gray-500 mt-1">{postCount} {postCount === 1 ? 'article' : 'articles'}</p>
              </Link>
            );
          })}
        </div>
      </div> */}
      
      <div className="mt-12 bg-blue-50 p-6 rounded-xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Help with e-Way Bill?</h2>
        <p className="text-gray-700 mb-4">
          Our free pincode distance calculator helps you generate accurate e-Way Bills quickly and easily.
        </p>
        <Link 
          href="/" 
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Now
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
