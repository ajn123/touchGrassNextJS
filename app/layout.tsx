import type { Metadata } from "next";
import "./globals.css";
import Navbar from '@/components/layout/Navbar';

export const metadata: Metadata = {
  title: "Touch Grass DC",
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
          <Navbar />
          <main>{children}</main>
      </body>
    </html>
  );
}
