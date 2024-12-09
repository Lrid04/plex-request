import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import { Providers } from "./providers";
import NavBar from "./ui/header";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Plex Request",
  description: "A Place to Request Media For a Plex Server",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-background min-h-svh overscroll-none">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-svh`}
      >
        <Providers>
        <NavBar />
          {children}
          <ToastContainer />  
        </Providers>
      </body>
    </html>
  );
}
