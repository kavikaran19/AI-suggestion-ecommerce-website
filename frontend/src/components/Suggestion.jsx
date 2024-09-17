"use client"
import React, { useEffect, useState } from 'react';
import Products from "@/components/Products";

function Suggestion() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if token is present in local storage
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);

    if (token) {
      // Fetch products if authenticated
      const fetchProducts = async () => {
        try {
          const response = await fetch('http://localhost:8000/products');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setProducts(data);
          console.log("Product data:", data);
        } catch (error) {
          console.error('Failed to fetch products:', error);
          setError("Failed to fetch products.");
        }
      };

      fetchProducts();
    }
  }, []);

  if (!isAuthenticated) {
    return null; // Return null if not authenticated (i.e., hide the component)
  }
   // Get the first 4 products
   const limitedProducts = products.slice(0, 4);


  return (
    <div className='container mx-auto flex flex-col gap-[20px] py-[40px] border-b'>
      <h3 className='text-black text-lg font-bold mt-[30px] bg-gray-100 rounded-md py-2 px-2'>Suggestion for you</h3>
      <Products products={limitedProducts} error={error} />
    </div>
  );
}

export default Suggestion;
