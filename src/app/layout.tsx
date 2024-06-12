import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getAuthenticatedAppForUser } from "@/lib/firebase/serverApp";
import { UserProvider } from "./UserProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Convoke",
  description: "A chat application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={inter.className}>
        {children}</body>
      </UserProvider>
      
    </html>
  );
}
