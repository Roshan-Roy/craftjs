import type { Metadata } from "next"
import "./globals.css"
import NextUiProvider from "./NextUiProvider"

export const metadata: Metadata = {
  title: "Page editor",
  description: "Created with craft js",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body className="font-sans">
          <NextUiProvider>
            {children}
          </NextUiProvider>
        </body>
      </html>
  );
}
