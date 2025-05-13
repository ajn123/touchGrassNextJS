'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SocialIcon } from 'react-social-icons';

export default function Navbar() {
  const pathname = usePathname();

  // const handleSignOut = async () => {
  //   try {
  //     await signOut({ 
  //       redirect: true, 
  //       callbackUrl: '/' 
  //     }).then(() => {
  //       setTimeout(() => {
  //         toast.success('Signed out successfully');
  //       }, 2000);
  //     });
  //   } catch (error) {
  //     toast.error('Failed to sign out');
  //     console.error('Sign out error:', error);
  //   }
  // };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex justify-center">
          <div className="flex flex-col md:flex-row justify-start">
            <Link href="/" className="">
              <span className="text-xl font-bold text-black">Touch Grass DC</span>
            </Link>
            <Link
              href="/"
              className={`navbar-link flex justify-start ${
                pathname === '/' 
                  ? 'border-indigo-500 text-gray-900' 
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`navbar-link flex items-center ${
                pathname === '/about'
                  ? 'border-indigo-500 text-gray-900'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`navbar-link flex items-center ${
                pathname === '/contact'
                  ? 'border-indigo-500 text-gray-900'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              Contact
            </Link>

            <div className="flex justify-center px-auto pl-5 pb-1 hover:scale-110 transition-transform hover:text-gray-700">
              <SocialIcon 
                network="instagram" 
                className="mt-2 pr-2" 
                url="https://www.instagram.com/touchgrassdc/"
                style={{ width: 30, height: 30 }}
              />
            </div>
          </div>

          {/* <div className="flex items-center space-x-4">
            {status === 'loading' ? (
              <div>Loading...</div>
            ) : session ? (
              <>
                <span className="text-gray-700">Welcome, {session.user.name}</span>
                <Link 
                  href="/dashboard" 
                  className="text-gray-700 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-transform hover:scale-110"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-gray-900"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div> */}

        </div>
      </div>
    </nav>
  );
} 