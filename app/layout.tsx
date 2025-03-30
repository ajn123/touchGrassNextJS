import type { Metadata } from "next";
import "./globals.css";
import { Providers } from './providers';
import Navbar from '@/components/layout/Navbar';


export const metadata: Metadata = {
  title: "Events DC",
  description: "Discover events in the District of Columbia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
