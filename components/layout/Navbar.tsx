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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-black px-4">Touch Grass DC</span>
            </Link>
            <Link
              href="/"
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                pathname === '/' 
                  ? 'border-indigo-500 text-gray-900' 
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ml-8 ${
                pathname === '/about'
                  ? 'border-indigo-500 text-gray-900'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`navbar-link ${
                pathname === '/contact'
                ? 'navbar-link-active'
                : 'navbar-link'
              }`}
            >
              Contact
            </Link>

            <Link href="https://www.instagram.com/touchgrassdc/" className="navbar-link">
              <SocialIcon network="instagram" style={{ width: 30, height: 30 }} />
            </Link>

            
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