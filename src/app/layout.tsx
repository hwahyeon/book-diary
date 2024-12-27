import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Book diary",
  description:
    "A web application to visualize your reading history on a calendar, with detailed book information and easy Excel upload functionality",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} py-20>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
