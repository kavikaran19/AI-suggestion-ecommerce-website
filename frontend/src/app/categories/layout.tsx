"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import   Suggestion  from "@/components/Suggestion";



const inter = Inter({ subsets: ["latin"] });



export default function CatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body className={inter.className}>
      {/* <Categories /> */}
      <div className="flex flex-col">
      <Suggestion/>
        {children}
        
      </div>

      </body>
    </html>
  );
}
