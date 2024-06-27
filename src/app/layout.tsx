
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "./UserProvider";
import StoreProvider from "./StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Convoke",
  description: "A chat application",
};

export default function RootLayout({
  children,
  components,
}: Readonly<{
  children: React.ReactNode;
  components: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StoreProvider>
        <UserProvider>
        <body className={inter.className}>
          {children}{components}</body>
      </UserProvider>
      </StoreProvider>
    </html>
  );
}
