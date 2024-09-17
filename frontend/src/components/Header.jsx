"use client"
import Image from "next/image";
import { useEffect, useState } from "react";


export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check local storage for token
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

 
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleSignOut = () => {
    localStorage.removeItem('token'); // Remove token from local storage
    setIsAuthenticated(false); // Update authentication state
    setDropdownVisible(false); // Hide dropdown menu
    window.location.reload(); // Reload the page
  };
  return (
    <>
    <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="categories" className="flex items-center space-x-3 rtl:space-x-reverse">
            {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" /> */}
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Online Shop</span>
        </a>
        <button data-collapse-toggle="navbar-solid-bg" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-solid-bg" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
        <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
              {isAuthenticated ? (
                 <li className="relative">
                 <div onClick={() => setDropdownVisible(!dropdownVisible)}>
                   <Image width={40} height={40} src="https://via.placeholder.com/40" alt="User Avatar" className="rounded-full cursor-pointer" />
                 </div>
                 {dropdownVisible && (
                   <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
                     <button
                       onClick={handleSignOut}
                       className="block w-full px-4 py-2 text-sm text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                     >
                       Sign Out
                     </button>
                   </div>
                 )}
               </li>
              ) : (
                <>
                  <li>
                    <a href="signin" className="block py-2 px-3 md:p-0 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:dark:text-blue-500 dark:bg-blue-600 md:dark:bg-transparent" aria-current="page">Login</a>
                  </li>
                  <li>
                    <a href="signup" className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Sign Up</a>
                  </li>
                </>
              )}
            </ul>
        </div>
      </div>
    
    </nav>
    
    </>
  );
}
