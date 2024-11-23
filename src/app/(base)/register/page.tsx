'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, User, CheckCircle2 } from 'lucide-react';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle registration logic here
        console.log('Register attempt with:', formData);
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full space-y-8 p-8 rounded-xl shadow-lg">
                {/* Header */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Create an account
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Join GOAT NEWS today
                    </p>
                </div>

                {/* Register Form */}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        {/* Full Name Input */}
                        <div>
                            <label
                                htmlFor="fullName"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Full Name
                            </label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    required
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white dark:bg-zinc-900 dark:text-white"
                                    placeholder="Enter your full name"
                                />
                            </div>
                        </div>

                        {/* Email Input */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Email address
                            </label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white dark:bg-zinc-900 dark:text-white"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Password
                            </label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white dark:bg-zinc-900 dark:text-white"
                                    placeholder="Create a password"
                                />
                            </div>
                        </div>

                        {/* Confirm Password Input */}
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Confirm Password
                            </label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    required
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white dark:bg-zinc-900 dark:text-white"
                                    placeholder="Confirm your password"
                                />
                            </div>
                        </div>

                        {/* Terms and Conditions */}
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                    id="agreeToTerms"
                                    name="agreeToTerms"
                                    type="checkbox"
                                    required
                                    checked={formData.agreeToTerms}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded dark:bg-zinc-900 dark:border-gray-700"
                                />
                            </div>
                            <div className="ml-3">
                                <label
                                    htmlFor="agreeToTerms"
                                    className="text-sm text-gray-700 dark:text-gray-300"
                                >
                                    I agree to the{' '}
                                    <Link
                                        href="/terms"
                                        className="font-medium text-black dark:text-white hover:underline"
                                    >
                                        Terms of Service
                                    </Link>{' '}
                                    and{' '}
                                    <Link
                                        href="/privacy"
                                        className="font-medium text-black dark:text-white hover:underline"
                                    >
                                        Privacy Policy
                                    </Link>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white transition-colors"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <CheckCircle2
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                />
                            </span>
                            Create Account
                        </button>
                    </div>

                    {/* Login Link */}
                    <div className="text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Already have an account?{' '}
                            <Link
                                href="/login"
                                className="font-medium text-black dark:text-white hover:underline"
                            >
                                Sign in instead
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
