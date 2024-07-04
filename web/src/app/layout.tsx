import type { Metadata } from "next";
import "./globals.css";
import { Realtime } from "@/contexts/realtime-context";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Realtime>{children}</Realtime>
      </body>
    </html>
  );
}
