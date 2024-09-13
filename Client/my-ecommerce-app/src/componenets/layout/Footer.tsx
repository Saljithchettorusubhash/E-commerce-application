import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer bg-black py-6">
      <div className="container mx-auto px-4 text-white">
        {/* Top Section */}
        <div className="grid lg:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="text-lg font-semibold mb-4">
              <p>2-year product warranty<br />30-day returns</p>
            </div>
            <div className="mb-6">
              <p className="font-bold mb-2">Newsletter</p>
              <p className="mb-5">Be the first to hear about the latest news, product launches, and events from Clobber.</p>
              <button className="px-6 py-2 bg-white text-black rounded-full hover:bg-gray-300">
                Sign up
              </button>
            </div>
          </div>

          {/* Footer Links */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 font-medium">
            {/* Services Column */}
            <div>
              <h4 className="font-bold mb-4">Service</h4>
              <ul>
                <li className="mb-2">
                  <a href="/help" className="hover:underline text-white">Help Center</a>
                </li>
                <li className="mb-2">
                  <a href="/contact" className="hover:underline text-white">Contact</a>
                </li>
                <li className="mb-2">
                  <a href="/shipping" className="hover:underline text-white">Shipping</a>
                </li>
                <li className="mb-2">
                  <a href="/returns" className="hover:underline text-white">Returns</a>
                </li>
                <li className="mb-2">
                  <a href="/warranty" className="hover:underline text-white">Warranty</a>
                </li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul>
                <li className="mb-2">
                  <a href="/about" className="hover:underline text-white">About</a>
                </li>
                <li className="mb-2">
                  <a href="/careers" className="hover:underline text-white">Careers</a>
                </li>
                <li className="mb-2">
                  <a href="/partners" className="hover:underline text-white">Retail Partners</a>
                </li>
                <li className="mb-2">
                  <a href="/press" className="hover:underline text-white">Press</a>
                </li>
              </ul>
            </div>

            {/* Social Column */}
            <div>
              <h4 className="font-bold mb-4">Social</h4>
              <ul>
                <li className="mb-2">
                  <a href="https://instagram.com" className="hover:underline text-white">Instagram</a>
                </li>
                <li className="mb-2">
                  <a href="https://facebook.com" className="hover:underline text-white">Facebook</a>
                </li>
                <li className="mb-2">
                  <a href="https://twitter.com" className="hover:underline text-white">Twitter</a>
                </li>
                <li className="mb-2">
                  <a href="https://linkedin.com" className="hover:underline text-white">LinkedIn</a>
                </li>
              </ul>
            </div>

            {/* Shipping To Section */}
            <div>
              <h4 className="font-bold mb-4">Shipping To</h4>
              <form className="relative">
                <label htmlFor="country-selector" className="flex items-center underline underline-offset-2 cursor-pointer text-white">
                  <span className="w-5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" strokeWidth="0.8" d="M10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12ZM4 10h12"></path>
                      <path stroke="currentColor" strokeWidth="0.8" d="M10 4a9.18 9.18 0 0 1 2.4 6 9.18 9.18 0 0 1-2.4 6 9.18 9.18 0 0 1-2.4-6c.05-2.22.9-4.36 2.4-6v0Z"></path>
                    </svg>
                  </span>
                  Rest of the World
                </label>
                <select id="country-selector" className="absolute inset-0 opacity-0 focus:opacity-100">
                  <option>Rest of the World</option>
                  <option>United States</option>
                  <option>Canada</option>
                </select>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center border-t border-gray-600 pt-4 text-xs text-gray-500">
          <p>&copy; Clobber 2024. All rights reserved</p>
          <ul className="flex space-x-4 mt-4 lg:mt-0">
            <li>
              <a href="/terms" className="hover:underline text-white">Terms & Conditions</a>
            </li>
            <li>
              <a href="/privacy" className="hover:underline text-white">Privacy Policy</a>
            </li>
            <li>
              <a href="/cookie-policy" className="hover:underline text-white">Cookie Policy</a>
            </li>
          </ul>
        </div>

        {/* CLOBBER Heading */}
        <div className="flex justify-center mt-8">
          <h1 className="text-white font-light uppercase leading-none tracking-tight"
              style={{
                fontSize: 'clamp(5rem, 22vw, 35rem)', // Adjust font-size for larger screens
                lineHeight: '1.2', // Tighten the line-height
                height: '100%',
                marginBottom: '0',
              }}>
            CLOBBER
          </h1>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
