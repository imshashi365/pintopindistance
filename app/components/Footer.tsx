import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">📚 Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          
          {/* Legal & Trust */}
          <div>
            <h3 className="text-white font-semibold mb-4">✅ Legal + Trust</h3>
            <ul className="space-y-2">
              <li><Link href="/disclaimer" className="hover:text-white transition-colors">📜 Disclaimer</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">🛡️ Data usage & privacy notice</Link></li>
            </ul>
          </div>
          
          {/* Copyright */}
          <div className="md:col-span-3 border-t border-gray-800 pt-8 mt-8 md:mt-0 md:pt-0 md:border-t-0">
            <div className="text-center md:text-right">
              <p className="text-sm">
                © {currentYear} <Link href="/" className="text-white hover:underline">pin-to-pin-distance.in</Link>
              </p>
              <p className="text-xs text-gray-500 mt-2">
                All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
