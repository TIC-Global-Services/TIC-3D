import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/Wrapper/LenisScroll";
import Navbar from "@/components/Navigation/Navbar";
import Footer from "@/components/Navigation/Footer";

// Load Inter font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "The Internet Company",
  description: "A Web Branding House",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <LenisProvider>
          <Navbar />
          {children}
          <Footer />
          </LenisProvider>
      </body>
    </html>
  );
}
