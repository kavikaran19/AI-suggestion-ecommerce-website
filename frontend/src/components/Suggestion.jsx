"use client"
import React, { useEffect, useState } from 'react';
import Products from "@/components/Products";

function Suggestion() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [age, setAge] = useState(null); // Initially set to null
  const [gender, setGender] = useState(null); // Initially set to null


  useEffect(() => {
    // Check if token is present in local storage
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);

    if (token) {

          // Retrieve age and gender from local storage
          const storedAge = localStorage.getItem('age');
          const storedGender = localStorage.getItem('gender');
    
          if (storedAge) {
            setAge(parseInt(storedAge, 10)); // Parse age as an integer
          }
          if (storedGender) {
            setGender(storedGender);
          }
      // Fetch products if authenticated with default age and gender
      const fetchProducts = async () => {
        try {
          const response = await fetch('http://127.0.0.1:8000/suggest-products', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              age: storedAge,   // Use age from local storage
              gender: storedGender // Use gender from local storage
            }),
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
          setProducts(data.suggested_products); // Assuming the API returns 'suggested_products'
          console.log("Product data:", data.suggested_products);
        } catch (error) {
          console.error('Failed to fetch suggest products:', error);
          setError("Failed to fetch suggest products.");
        }
      };

      fetchProducts();
    }
  }, [age, gender]); // Dependency on age and gender, refetch on change


  // useEffect(() => {
  //   // Check if token is present in local storage
  //   const token = localStorage.getItem('token');
  //   setIsAuthenticated(!!token);

  //   if (token) {
  //     // Fetch products if authenticated
  //     const fetchProducts = async () => {
  //       try {
  //         const response = await fetch('http://127.0.0.1:8000/suggest-products/');
  //         if (!response.ok) {
  //           throw new Error('Network response was not ok');
  //         }
  //         const data = await response.json();
  //         setProducts(data);
  //         console.log("Product data:", data);
  //       } catch (error) {
  //         console.error('Failed to fetch products:', error);
  //         setError("Failed to fetch products.");
  //       }
  //     };

  //     fetchProducts();
  //   }
  // }, []);

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
