import Provider from "@/lib/provider";
import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Price Buddy",
  description: "Un comparateur de prix simple et efficace.",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "pwa", "next-pwa", "price-comparator"],
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#007bff" }],
  viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
  icons: [
    { rel: "apple-touch-icon", url: "/icons/ic_price_buddy_192.png" },
    { rel: "icon", url: "/icons/ic_price_buddy_192.png" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Provider>
          <main className="flex-1">{children}</main>
        </Provider>
      </body>
    </html>
  );
}
