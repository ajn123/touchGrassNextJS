import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// Extend the built-in types
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      accessToken: string;
    }
  }

  interface User {
    id: string;
    email: string;
    name: string;
    accessToken: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string;
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          // Log the credentials being sent (remove in production)
          console.log('Auth attempt for:', credentials?.email);

          const formData = new URLSearchParams();
          formData.append('username', credentials?.email || ''); // FastAPI expects 'username'
          formData.append('password', credentials?.password || '');

          const response = await fetch(`${process.env.API_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Accept': 'application/json',
            },
            body: formData,
          });

          const data = await response.json();
          console.log('Auth response:', {
            status: response.status,
            data: data
          });

          if (!response.ok) {
            console.error('Auth failed:', data);
            throw new Error(data.detail || 'Authentication failed');
          }

          // Return the user object in the expected format
          return {
            id: data.user.email,
            email: data.user.email,
            name: data.user.name,
            accessToken: data.access_token
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
    error: '/auth/error', // Add error page
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.accessToken = token.accessToken;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    }
  },
  debug: true, // Enable debug messages
});

export { handler as GET, handler as POST }; 