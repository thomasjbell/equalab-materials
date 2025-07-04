import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EquaLab Materials",
  description: "Comprehensive materials database and comparison tool",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="favicon.svg" type="image/svg+xml" />
      </head>
      <body className={`dark:bg-gray-900 ${inter.className}`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}