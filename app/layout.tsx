import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./header";
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
