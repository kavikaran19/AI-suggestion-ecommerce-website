"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Page() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [photo, setPhoto] = useState(null);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Fetch categories when the component mounts
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/categories');
        setCategories(response.data); // Adjust according to the structure of your response
      } catch (error) {
        console.error('Failed to fetch categories', error);
      }
    };

    fetchCategories();
  }, []);

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('categoryId', categoryId);
    if (photo) {
      formData.append('photo', photo);
    }

    try {
      const response = await axios.post('http://localhost:8000/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess('Product created successfully!');
      setError('');
      console.log(response.data);
    } catch (error) {
      setError('Failed to create product. Please try again.');
      setSuccess('');
      console.error(error);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Product name"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
          <textarea
            id="description"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Write a description"
          ></textarea>
        </div>

        <div className="mb-6">
          <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">Price</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Product price"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="categoryId" className="block mb-2 text-sm font-medium text-gray-900">Category</label>
          <select
            id="categoryId"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          >
            <option value="" disabled>Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label htmlFor="photo" className="block mb-2 text-sm font-medium text-gray-900">Upload a photo</label>
          <input
            id="photo"
            type="file"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Submit
        </button>

        {error && <div className="mt-4 text-red-500">{error}</div>}
        {success && <div className="mt-4 text-green-500">{success}</div>}
      </form>
    </div>
  );
}
