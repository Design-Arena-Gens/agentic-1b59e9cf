import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Multibagger Stock Analyzer - AI-Driven Indian Stock Analysis",
  description: "Sophisticated AI-driven platform for identifying potential multibagger Indian companies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased font-sans bg-gray-50">
        {children}
      </body>
    </html>
  );
}
