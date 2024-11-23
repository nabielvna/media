'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Contoh kredensial (dalam praktik nyata ini harus di server)
    const DEMO_CREDENTIALS = {
        email: 'joy@gmail.com',
        password: 'joy1234',
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Simulasi delay network request
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Di login page
            if (
                email === DEMO_CREDENTIALS.email &&
                password === DEMO_CREDENTIALS.password
            ) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userRole', 'admin');
                router.push('/');
            } else {
                setError('Invalid email or password');
            }
        } catch (err: unknown) {
            setError(`An error occurred while signing in ${err}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="max-w-md w-full space-y-8 bg-white dark:bg-black p-8 rounded-xl shadow-lg">
                {/* Header */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Welcome back
                    </h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Please sign in to your account
                    </p>
                    {/* Demo credentials info */}
                    <div className="mt-3 p-3 bg-gray-50 dark:bg-zinc-800/50 rounded-lg">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Demo account:
                            <br />
                            Email: joy@gmail.com
                            <br />
                            Password: joy1234
                        </p>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200 p-3 rounded-md text-sm">
                        {error}
                    </div>
                )}

                {/* Login Form */}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
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
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white dark:bg-zinc-900 dark:text-white"
                                    placeholder="Enter your password"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Remember me and Forgot password */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded dark:bg-zinc-900 dark:border-gray-700"
                            />
                            <label
                                htmlFor="remember-me"
                                className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                            >
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <Link
                                href="/forgot-password"
                                className="font-medium text-gray-600 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300"
                            >
                                Forgot your password?
                            </Link>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white transition-colors
                ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <ArrowRight
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                />
                            </span>
                            {loading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </div>

                    {/* Register Link */}
                    <div className="text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Do not have an account?{' '}
                            <Link
                                href="/register"
                                className="font-medium text-black dark:text-white hover:underline"
                            >
                                Sign up now
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
