import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { QueryProvider } from "@/providers/query-provider";
import { SheetProvider } from "@/providers/sheet-provider";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "MyWalletRafiki",
    template: `%s | MyWalletRafiki`,
  },
  description: "Created by Don Gitonga",
  twitter: {
    title: "MyWalletRafiki",
    card: "summary_large_image"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <head>
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="MyWalletRafiki" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <html lang="en">
        <body className={inter.className}>
          <QueryProvider>
            <SheetProvider />
              <Toaster />
              {children}
          </QueryProvider>
        </body>
        
      </html>
    </ClerkProvider>
    
  );
}
