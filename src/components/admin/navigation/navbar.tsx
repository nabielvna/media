'use client';

import React, { useState } from 'react';
import { Bell, Search, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import ModeToggle from '@/components/mode-toggle';
import Link from 'next/link';

interface NavbarProps {
    sidebarOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ sidebarOpen }) => {
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    return (
        <header
            className={`bg-white dark:bg-zinc-900 shadow-sm dark:shadow-zinc-800/30 fixed top-0 right-0 z-20 transition-all duration-300 h-16 ${
                sidebarOpen ? 'left-64' : 'left-20'
            }`}
        >
            <div className="flex items-center justify-between p-2">
                <div className="flex items-center w-96 max-w-md">
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="Cari..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg border dark:border-zinc-700
                            dark:bg-zinc-800 dark:text-white focus:outline-none focus:border-blue-500
                            dark:focus:border-blue-400 dark:placeholder-zinc-400"
                        />
                        <Search
                            className="absolute left-3 top-2.5 text-gray-400 dark:text-zinc-400"
                            size={20}
                        />
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <ModeToggle />

                    <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 relative">
                        <Bell
                            size={20}
                            className="text-gray-700 dark:text-zinc-200"
                        />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>

                    <div className="relative">
                        <button
                            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100
                            dark:hover:bg-zinc-800 dark:text-white"
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                        >
                            <Image
                                src="/team/gayu.jpg"
                                alt="Profile"
                                className="w-8 h-8 rounded-full object-cover"
                                width={32}
                                height={32}
                            />
                            <span className="font-medium">Goat Admin</span>
                            <ChevronDown size={16} />
                        </button>

                        {showProfileMenu && (
                            <div
                                className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-900
                            rounded-lg shadow-lg border dark:border-zinc-700 py-1"
                            >
                                <Link
                                    href="/admin/profile"
                                    className="block w-full px-4 py-2 text-left hover:bg-gray-50
                                    dark:hover:bg-zinc-800 dark:text-white"
                                >
                                    Profile
                                </Link>
                                <Link
                                    href="/admin/settings"
                                    className="block w-full px-4 py-2 text-left hover:bg-gray-50
                                    dark:hover:bg-zinc-800 dark:text-white"
                                >
                                    Settings
                                </Link>
                                <Link
                                    href="/"
                                    className="block w-full px-4 py-2 text-left hover:bg-gray-50
                                    dark:hover:bg-zinc-800 dark:text-white"
                                >
                                    Goat News
                                </Link>
                                <hr className="my-1 dark:border-zinc-700" />
                                <button
                                    className="w-full px-4 py-2 text-left hover:bg-gray-50
                                    dark:hover:bg-zinc-800 text-red-600 dark:text-red-400"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
