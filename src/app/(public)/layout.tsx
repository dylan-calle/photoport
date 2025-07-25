import type { Metadata } from "next";
import NavBar from "./(home)/navbar";
import Footer from "./(home)/footer";
// import { Geist, Geist_Mono, Poppins, Inter } from "next/font/google";
// import "./../globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });
// const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-inter",
//   display: "swap",
// });

// const poppins = Poppins({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"],
//   variable: "--font-poppins",
//   display: "swap",
// });

export const metadata: Metadata = {
  title: "PhotoPort",
  description: "Momentos capturados en el universo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
}
