"use client";
import React, { useState } from 'react';
import axios from 'axios';

export default function Page() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    // No photo data is included

    try {
      const response = await axios.post('http://localhost:8000/categories', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess('Category created successfully!');
      setError('');
      console.log(response.data);
    } catch (error) {
      setError('Failed to create category. Please try again.');
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
            placeholder="Category name"
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
