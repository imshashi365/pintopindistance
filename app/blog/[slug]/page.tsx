import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';

// This would come from a CMS or markdown files in a real app
const blogPosts = [
  {
    slug: 'how-to-calculate-distance-for-e-way-bill',
    title: 'How to Calculate Distance for e-Way Bill in India',
    excerpt: 'Learn the correct way to calculate distance for e-Way Bill generation and ensure GST compliance.',
    content: `
      <p>Accurate distance calculation is crucial for generating e-Way Bills in India. The GST law requires businesses to generate an e-Way Bill for the movement of goods worth more than ₹50,000. The distance between the source and destination plays a vital role in determining the validity of the e-Way Bill.</p>
      
      <h2>Why is Distance Calculation Important for e-Way Bill?</h2>
      <p>The validity period of an e-Way Bill is determined based on the distance between the source and destination. According to GST rules:</p>
      <ul>
        <li>Less than 100 km: 1 day</li>
        <li>100 km or more but less than 300 km: 2 days</li>
        <li>300 km or more but less than 500 km: 3 days</li>
        <li>And so on...</li>
      </ul>
      
      <h2>How to Calculate Distance for e-Way Bill</h2>
      <p>Follow these steps to calculate the distance between two locations for e-Way Bill:</p>
      <ol>
        <li>Identify the source and destination pincodes</li>
        <li>Use a reliable pin to pin distance calculator</li>
        <li>Enter the pincodes to get the accurate road distance</li>
        <li>Use this distance to determine your e-Way Bill validity period</li>
      </ol>
      
      <h2>Common Mistakes to Avoid</h2>
      <p>Many businesses make these common mistakes when calculating distance for e-Way Bill:</p>
      <ul>
        <li>Using straight-line (as the crow flies) distance instead of road distance</li>
        <li>Not considering traffic conditions and routes</li>
        <li>Using outdated or incorrect pincode data</li>
      </ul>
      
      <p>By using our accurate pin to pin distance calculator, you can ensure GST compliance and avoid penalties.</p>
    `,
    date: '2025-06-15',
    readTime: '4 min read',
    category: 'GST & Compliance',
    author: {
      name: 'GST Expert',
      role: 'Tax Consultant'
    },
    relatedPosts: [
      {
        title: 'Understanding GST Rules for Interstate Transport',
        slug: 'gst-rules-for-interstate-transport'
      },
      {
        title: 'Top 5 e-Way Bill Generation Mistakes to Avoid',
        slug: 'e-way-bill-mistakes-avoid'
      }
    ]
  },
  // Add other posts here...
];

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: `${post.title} | Pin to Pin Distance Blog`,
    description: post.excerpt,
    alternates: {
      canonical: `https://pin-to-pin-distance.xyz/blog/${params.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author.name],
      url: `https://pin-to-pin-distance.xyz/blog/${params.slug}`,
    },
  };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <article className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
              {post.category}
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
            <div className="flex items-center text-sm text-gray-500">
              <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span className="mx-2">•</span>
              <span>{post.readTime}</span>
              <span className="mx-2">•</span>
              <span>By {post.author.name}</span>
            </div>
          </div>
          
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xl font-bold">
                  {post.author.name.charAt(0)}
                </span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
                <p className="text-sm text-gray-500">{post.author.role}</p>
              </div>
            </div>
          </div>
          
          {post.relatedPosts && post.relatedPosts.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Related Articles</h2>
              <div className="grid gap-4">
                {post.relatedPosts.map((related) => (
                  <Link 
                    key={related.slug} 
                    href={`/blog/${related.slug}`}
                    className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <h3 className="font-medium text-gray-900">{related.title}</h3>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
      
      <div className="mt-8 text-center">
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
