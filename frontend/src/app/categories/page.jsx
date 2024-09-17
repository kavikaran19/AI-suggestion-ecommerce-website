"use client"
import Image from "next/image";
import Categories from "@/components/Categories";
import Products from "@/components/Products";
import { useEffect, useState } from "react";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8000/categories');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCategories(data);
        console.log("Category data:", data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        setError("Failed to fetch categories.");
      }
    };

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

    fetchCategories();
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col container mx-auto">
        <h3 className='text-black text-lg font-bold mt-[30px] bg-gray-100 rounded-md py-2 px-2'>Products</h3>
      <Categories categories={categories} error={error} />
      <div className="flex container mx-auto border p-4 rounded-lg">
        <Products products={products} error={error} />
      </div>
    </div>
  );
}
