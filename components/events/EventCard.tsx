'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function EventCard({ event }) {
  const { data: session } = useSession();
  const router = useRouter();

  const handleRegister = async () => {
    if (!session) {
      router.push('/login');
      return;
    }

    // Add your event registration logic here
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Event card content */}
      <button
        onClick={handleRegister}
        className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
      >
        {session ? 'Register Now' : 'Sign in to Register'}
      </button>
    </div>
  );
} 