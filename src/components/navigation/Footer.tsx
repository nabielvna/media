import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">About Us</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-600 hover:text-gray-900">About NEWS</Link></li>
              <li><Link href="/team" className="text-gray-600 hover:text-gray-900">Our Team</Link></li>
              <li><Link href="/careers" className="text-gray-600 hover:text-gray-900">Careers</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link href="/news/politics" className="text-gray-600 hover:text-gray-900">Politics</Link></li>
              <li><Link href="/news/business" className="text-gray-600 hover:text-gray-900">Business</Link></li>
              <li><Link href="/news/technology" className="text-gray-600 hover:text-gray-900">Technology</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              <li><Link href="/contact" className="text-gray-600 hover:text-gray-900">Contact Us</Link></li>
              <li><Link href="/advertise" className="text-gray-600 hover:text-gray-900">Advertise</Link></li>
              <li><a href="mailto:info@news.com" className="text-gray-600 hover:text-gray-900">info@news.com</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Follow Us</h3>
            <ul className="space-y-2">
              <li><a href="https://twitter.com" className="text-gray-600 hover:text-gray-900">Twitter</a></li>
              <li><a href="https://facebook.com" className="text-gray-600 hover:text-gray-900">Facebook</a></li>
              <li><a href="https://instagram.com" className="text-gray-600 hover:text-gray-900">Instagram</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} NEWS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
