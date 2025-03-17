import { Toaster } from "@/components/ui/sonner";
import { Provider as NextAuthProvider } from "@/lib/provider";
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Price Buddy",
    template: "%s | Price Buddy",
  },
  description: "Un comparateur de prix simple et efficace.",
  generator: "Next.js",
  keywords: ["nextjs", "pwa", "next-pwa", "price-comparator"],
  icons: [
    { rel: "apple-touch-icon", url: "/icons/ic_price_buddy_192.png" },
    { rel: "icon", url: "/icons/ic_price_buddy_192.png" },
  ],
};

export const viewport: Viewport = {
  themeColor: "#007bff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full dark" suppressHydrationWarning>
      <body suppressHydrationWarning className="h-full">
        <NextAuthProvider>
          <main className="flex-1 w-full">{children}</main>
          <Toaster />
        </NextAuthProvider>
      </body>
    </html>
  );
}
