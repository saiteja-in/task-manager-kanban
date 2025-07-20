import "@/app/globals.css";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

import { Archivo } from "next/font/google";
import { Libre_Franklin } from "next/font/google";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { Header } from "./_header/header";

const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
});
const libre_franklin = Libre_Franklin({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-libre_franklin",
});

export const metadata: Metadata = {
  title: "TaskTrackr - Smart Project Management & Kanban Board",
  description: "Modern task management application featuring an interactive Kanban board with drag-and-drop functionality, real-time updates, and team collaboration tools",
  
  // Multiple icons for different platforms and sizes
  icons: [
    { rel: "icon", type: "image/png", sizes: "16x16", url: "/icons/favicon-16x16.png" },
    { rel: "icon", type: "image/png", sizes: "32x32", url: "/icons/favicon-32x32.png" },
    { rel: "icon", type: "image/png", sizes: "48x48", url: "/favicon.ico" },
    { rel: "apple-touch-icon", sizes: "180x180", url: "/icons/apple-touch-icon.png" },
  ],
  
  // Theme colors for browsers and PWA
  themeColor: "#2563eb",
  
  // Keywords for SEO
  keywords: [
    "task management",
    "kanban board",
    "project management",
    "drag and drop",
    "team collaboration",
    "productivity tool",
    "agile",
    "scrum board",
    "workflow management",
    "task organization"
  ],
  
  // Open Graph metadata for social sharing
  openGraph: {
    title: "TaskTrackr - Smart Project Management & Kanban Board",
    description: "Streamline your workflow with our intuitive Kanban board featuring drag-and-drop task management",
    type: "website",
    locale: "en_US",
    url: "https://tasktrackr.pro",
    siteName: "TaskTrackr",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "TaskTrackr Dashboard Preview"
      }
    ]
  },
  
  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    title: "TaskTrackr - Smart Project Management",
    description: "Manage tasks efficiently with our interactive Kanban board",
    images: ["/images/twitter-card.png"]
  },
  
  // Viewport settings
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false
  },
  
  // Application information
  applicationName: "TaskTrackr",
  generator: "Next.js",
  authors: [{ name: "Your Name", url: "https://saiteja.blog" }],
  creator: "Sai Teja",
  publisher: "Sai Teja",
  formatDetection: {
    telephone: false,
    email: false,
    address: false
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background antialiased",
          archivo.variable + " " + libre_franklin.variable,
        )}
      >
        <Providers>
          <NextTopLoader />
          <Header />
          <div className="">{children}</div>
        </Providers>
        <Toaster />
        <SonnerToaster />
      </body>
    </html>
  );
}
