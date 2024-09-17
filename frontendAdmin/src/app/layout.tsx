"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import  Topbar  from "@/components/Topbar";
import  Sidebar  from "@/components/Sidebar";
import { useState } from "react";


const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
  // State to manage the sidebar open/close state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <html lang="en">
      <body className={inter.className}>
     
         {/* Pass toggleSidebar function to Topbar */}
      <Topbar toggleSidebar={toggleSidebar} />
      
      {/* Pass isOpen state to Sidebar */}
      <Sidebar isOpen={isSidebarOpen} />
    
      <div className="mt-[70px]">   {children}</div>
     
        
      </body>
    </html>
  );
}
