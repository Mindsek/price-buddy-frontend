import Provider from "@/lib/provider";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Price Buddy",
  description: "Un comparateur de prix simple et efficace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body suppressHydrationWarning>
        <Provider>
          <main className="flex-1">{children}</main>
        </Provider>
      </body>
    </html>
  );
}
