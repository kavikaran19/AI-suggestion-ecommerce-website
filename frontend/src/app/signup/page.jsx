'use client'; // Ensure the component is client-side

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Signup() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        nic: '',
        gender: '',
        dateOfBirth: '',
        email: '',
        password: '',
    });

    const [error, setError] = useState('');
    const router = useRouter();

    const { firstName, lastName, nic, gender, dateOfBirth, email, password } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/auth/register', formData);
            router.push('/signin');
        } catch (error) {
            setError('Registration failed. Please try again.');
            console.error('Error registering user:', error.response?.data);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h2 className="text-2xl font-bold mb-4">Signup</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={onSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <div className="flex mb-4 space-x-4">
                    <div className="flex-1">
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            value={firstName}
                            onChange={onChange}
                            placeholder="First Name"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            value={lastName}
                            onChange={onChange}
                            placeholder="Last Name"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                        />
                    </div>
                </div>
                <div className="flex mb-4 space-x-4">
                    <div className="flex-1">
                        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            id="dateOfBirth"
                            value={dateOfBirth}
                            onChange={onChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div className="flex-1">
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                        <select
                            name="gender"
                            id="gender"
                            value={gender}
                            onChange={onChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="nic" className="block text-sm font-medium text-gray-700">NIC</label>
                    <input
                        type="text"
                        name="nic"
                        id="nic"
                        value={nic}
                        onChange={onChange}
                        placeholder="NIC"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={onChange}
                        placeholder="Email"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={onChange}
                        placeholder="Password"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Signup
                </button>
            </form>
        </div>
    );
}
