import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google"
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Providers } from "./providers";
import NavBar from "./ui/header";

const plexSans = IBM_Plex_Sans({
  weight: ["500"],
  subsets: ["latin"]
})
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
        className={`${plexSans.className} text-lg antialiased min-h-svh`}
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
