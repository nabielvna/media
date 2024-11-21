'use client';

import { Search, Menu, X } from 'lucide-react';
import ModeToggle from '@/components/mode-toggle';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const Navbar = () => {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuItems = [
        { label: 'Home', href: '/' },
        { label: 'Politics', href: '/politics' },
        { label: 'Business', href: '/business' },
        { label: 'Tech', href: '/tech' },
        { label: 'Sports', href: '/sports' },
        { label: 'Entertainment', href: '/entertainment' },
        { label: 'Lifestyle', href: '/lifestyle' },
    ];

    const getCurrentPageLabel = () => {
        // Split pathname to get the category
        const pathSegments = pathname.split('/').filter(Boolean);
        const category = pathSegments[0]; // Get first segment after split

        // Find matching menu item based on category
        const currentMenuItem = menuItems.find(
            (item) => item.href === `/${category}`
        );

        return currentMenuItem?.label !== 'Home'
            ? currentMenuItem?.label
            : null;
    };

    // Updated to use the same logic as getCurrentPageLabel
    const currentPage = menuItems.find((item) => {
        const category = pathname.split('/').filter(Boolean)[0];
        return item.href === `/${category}`;
    });

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <div className="fixed z-50 top-0 left-0 right-0 h-16 flex items-center justify-center bg-white dark:bg-black text-black dark:text-white transition-colors border-b border-zinc-200 dark:border-zinc-800">
                <nav className="w-full max-w-7xl flex items-center justify-between px-4">
                    {/* Logo with Image and Dynamic Subtitle */}
                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-3">
                            <Image
                                src="/goat.png"
                                alt="Goat Logo"
                                className="h-12 w-12 object-cover"
                                width={500}
                                height={500}
                            />
                            <div className="flex flex-col -space-y-2">
                                <Link href="/">
                                    <div className="font-bold tracking-wider uppercase text-2xl bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-500 dark:from-zinc-100 dark:to-zinc-500 font-['Germania_One'] transform">
                                        GOAT NEWS
                                    </div>
                                </Link>
                                {getCurrentPageLabel() && (
                                    <Link href={currentPage?.href || '/'}>
                                        <div className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 uppercase tracking-widest">
                                            {getCurrentPageLabel()}
                                        </div>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-6">
                        {menuItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors text-sm font-medium"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* Search and Theme Toggle */}
                    <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full">
                            <Search className="h-5 w-5" />
                        </button>
                        <ModeToggle />
                        {/* Hamburger Menu Button */}
                        <button
                            className="p-2 md:hidden hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full"
                            onClick={toggleMenu}
                        >
                            {isMenuOpen ? (
                                <X className="h-5 w-5" />
                            ) : (
                                <Menu className="h-5 w-5" />
                            )}
                        </button>
                    </div>
                </nav>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="fixed inset-0 top-16 z-40 bg-white dark:bg-black md:hidden">
                    <div className="flex flex-col p-4 space-y-4">
                        {menuItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="text-lg font-medium hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
