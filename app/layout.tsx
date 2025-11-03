import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";

// ✅ Google Font Setup
const geistSans = Ubuntu({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

// ✅ SEO Metadata
export const metadata: Metadata = {
  title: "UIU CGPA Calculator | United International University",
  description:
    "Easily calculate your current trimester GPA and overall CGPA for United International University (UIU). Simple, accurate, and fast CGPA calculator built for UIU students.",
  keywords: [
    "UIU CGPA Calculator",
    "UIU GPA Calculator",
    "United International University",
    "University CGPA Tool",
    "Bangladesh University CGPA",
    "GPA to CGPA Calculator",
    "Student Tools",
    "UIU Portal",
  ],
  authors: [{ name: "Kaium Al Limon", url: "https://github.com/kaiumallimon" }],
  creator: "Kaium Al Limon",
  publisher: "Kaium Al Limon",
  robots: "index, follow",

  openGraph: {
    title: "UIU CGPA Calculator",
    description:
      "A clean and fast GPA & CGPA calculator built for United International University students.",
    url: "https://uiu-cgpa-calculator.vercel.app",
    siteName: "UIU CGPA Calculator",
    locale: "en_US",
    type: "website",
  },

  icons: {
    icon: "/favicon.ico",
  },

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className={`${geistSans.className} antialiased bg-gray-50 text-gray-900`}>
        {children}
      </body>
    </html>
  );
}
