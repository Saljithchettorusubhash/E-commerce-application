import React from 'react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false); // State for mobile menu toggle

  return (
    <>
      {/* Main Navigation */}
      <nav className="navbar-container bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
        <div className="wrapper flex justify-between items-center py-4 px-6 max-w-7xl mx-auto">
          
          {/* Left Menu for Large Screens */}
          <div className="hidden lg:flex space-x-6">
            <ul className="flex space-x-6">
              <li className="hover:underline text-gray-600">Women</li>
              <li className="hover:underline text-gray-600">Men</li>
              <li className="hover:underline text-gray-600">Accessories</li>
              <li className="hover:underline text-gray-600">Shoes</li>
              <li className="hover:underline text-gray-600">Irish Clobber Stories</li>
            </ul>
          </div>

          {/* Center Logo */}
          <div className="menu-center">
            <a href="/" className="text-xl font-bold tracking-wide text-black">Irish Clobber</a>
          </div>

          {/* Right Menu */}
          <div className="menu-right flex items-center space-x-4">
            {/* Search Icon */}
            <a href="/search" className="text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </a>

            {/* Account Icon */}
            <a href="/account" className="text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </a>

            {/* Cart Icon */}
            <a href="/cart" className="text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"></path>
              </svg>
            </a>
          </div>

          {/* Hamburger Menu for Mobile */}
          <div className="lg:hidden flex items-center">
            <button className="focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden bg-white p-4 border-t border-gray-200">
            <ul className="space-y-4 text-gray-600">
              <li className="hover:underline">Women</li>
              <li className="hover:underline">Men</li>
              <li className="hover:underline">Accessories</li>
              <li className="hover:underline">Shoes</li>
              <li className="hover:underline">Irish Clobber Stories</li>
            </ul>
          </div>
        )}
      </nav>

      {/* Secondary Navigation (Submenu) */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-2">
          <nav className="hidden md:flex space-x-6 justify-center">
            <a className="hover:text-gray-900 text-gray-600">New Arrivals</a>
            <a className="hover:text-gray-900 text-gray-600">Best Sellers</a>
            <a className="hover:text-gray-900 text-gray-600">Clothing</a>
            <a className="hover:text-gray-900 text-gray-600">Pants</a>
            <a className="hover:text-gray-900 text-gray-600">Jeans</a>
            <a className="hover:text-gray-900 text-gray-600">Tees</a>
            <a className="hover:text-gray-900 text-gray-600">Sweaters</a>
            <a className="hover:text-gray-900 text-gray-600">Shoes & Bags</a>
            <a className="hover:text-gray-900 text-gray-600">Sale</a>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
