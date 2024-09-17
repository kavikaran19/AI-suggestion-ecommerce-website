"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Page() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Fetch categories and products on component mount
  useEffect(() => {
    axios.get('http://localhost:8000/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });

    // Fetch all products by default
    fetchProducts();
  }, []);

  // Fetch products based on the selected category
  const fetchProducts = (categoryId = '') => {
    axios.get(`http://localhost:8000/products${categoryId ? `?category=${categoryId}` : ''}`)
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  };

  // Handle delete action
  const handleDeleteProduct = (productId) => {
    axios.delete(`http://localhost:8000/products/${productId}`)
      .then(() => {
        fetchProducts(selectedCategory); // Refresh product list
      })
      .catch(error => {
        console.error('Error deleting product:', error);
      });
  };

  const handleDeleteCategory = (categoryId) => {
    axios.delete(`http://localhost:8000/categories/${categoryId}`)
      .then(() => {
        setCategories(categories.filter(category => category._id !== categoryId)); // Remove category from state
        if (selectedCategory === categoryId) {
          setSelectedCategory('');
          fetchProducts(); // Fetch all products if selected category is deleted
        }
      })
      .catch(error => {
        console.error('Error deleting category:', error);
      });
  };

  return (
    // <div className="p-4 container mx-auto">
       <div className="p-4 max-w-4xl mx-auto">
      <div className="mb-4">
        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Select Category</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => {
            const categoryId = e.target.value;
            setSelectedCategory(categoryId);
            fetchProducts(categoryId);
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <table className=" divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.length > 0 ? (
            products.map(product => (
              <tr key={product._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${product.price}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.categoryName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">No products available</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* <div className="mt-4">
        <h3 className="text-lg font-semibold">Manage Categories</h3>
        <ul className="list-disc pl-5">
          {categories.map(category => (
            <li key={category._id} className="flex justify-between items-center">
              <span>{category.name}</span>
              <button
                onClick={() => handleDeleteCategory(category._id)}
                className="text-red-600 hover:text-red-900"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
}
