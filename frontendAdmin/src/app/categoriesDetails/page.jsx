"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CategoryTable() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios.get('http://localhost:8000/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        setError('Failed to fetch categories. Please try again.');
        console.error(error);
      });
  };

  const handleDelete = (categoryId) => {
    axios.delete(`http://localhost:8000/categories/${categoryId}`)
      .then(() => {
        setSuccess('Category deleted successfully!');
        setError('');
        fetchCategories(); // Refresh the category list
      })
      .catch(error => {
        setError('Failed to delete category. Please try again.');
        setSuccess('');
        console.error(error);
      });
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      
      {error && <div className="mb-4 text-red-500">{error}</div>}
      {success && <div className="mb-4 text-green-500">{success}</div>}
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.length > 0 ? (
              categories.map(category => (
                <tr key={category._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{category.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleDelete(category._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">No categories available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
