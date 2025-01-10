import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Brand from "./components/brand";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className="container">
      <Brand />
    </div>
  );
}
