'use client';

import {
    Search,
    Menu,
    X,
    UserCircle2,
    User,
    LogOut,
    Settings,
    LayoutDashboard,
} from 'lucide-react';
import ModeToggle from '@/components/mode-toggle';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

const Navbar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Check login status and role
        const loginStatus = localStorage.getItem('isLoggedIn');
        const userRole = localStorage.getItem('userRole');
        setIsLoggedIn(loginStatus === 'true');
        setIsAdmin(userRole === 'admin');

        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

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
        const pathSegments = pathname.split('/').filter(Boolean);
        const category = pathSegments[0];
        const currentMenuItem = menuItems.find(
            (item) => item.href === `/${category}`
        );
        return currentMenuItem?.label !== 'Home'
            ? currentMenuItem?.label
            : null;
    };

    const currentPage = menuItems.find((item) => {
        const category = pathname.split('/').filter(Boolean)[0];
        return item.href === `/${category}`;
    });

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        if (isDropdownOpen) setIsDropdownOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userRole');
        setIsLoggedIn(false);
        setIsAdmin(false);
        setIsDropdownOpen(false);
        router.push('/login');
    };

    const ProfileDropdown = () => (
        <div ref={dropdownRef} className="relative">
            <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
            >
                <UserCircle2 className="h-5 w-5" />
            </button>

            {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-black border border-gray-200 dark:border-zinc-800 rounded-md shadow-lg py-1 z-50">
                    {/* User Info */}
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-zinc-800">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                            Joy
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            joy@gmail.com
                        </p>
                        {isAdmin && (
                            <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 rounded">
                                Admin
                            </span>
                        )}
                    </div>

                    {/* Admin Panel - Only visible for admin users */}
                    {isAdmin && (
                        <>
                            <Link
                                href="/admin"
                                className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                                onClick={() => setIsDropdownOpen(false)}
                            >
                                <LayoutDashboard className="h-4 w-4 mr-3" />
                                Admin Panel
                            </Link>
                            <div className="border-t border-gray-200 dark:border-zinc-800 my-1"></div>
                        </>
                    )}

                    {/* Regular menu items */}
                    <Link
                        href="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                    >
                        <User className="h-4 w-4 mr-3" />
                        Profile
                    </Link>

                    <Link
                        href="/settings"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                    >
                        <Settings className="h-4 w-4 mr-3" />
                        Settings
                    </Link>

                    <div className="border-t border-gray-200 dark:border-zinc-800 my-1"></div>

                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                        <LogOut className="h-4 w-4 mr-3" />
                        Logout
                    </button>
                </div>
            )}
        </div>
    );

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
                        {menuItems.map((item) => {
                            const isActive =
                                item.href === '/'
                                    ? pathname === '/'
                                    : pathname.startsWith(item.href);

                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className={`
                                        hover:text-gray-600 dark:hover:text-gray-300
                                        transition-colors text-sm font-medium
                                        relative after:absolute after:left-0 after:bottom-[-4px]
                                        after:h-[2px] after:bg-black dark:after:bg-white
                                        after:transition-all after:duration-300
                                        ${
                                            isActive
                                                ? 'after:w-full text-black dark:text-white'
                                                : 'after:w-0 text-gray-600 dark:text-gray-300'
                                        }
                                        hover:after:w-full
                                    `}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-2">
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full">
                            <Search className="h-5 w-5" />
                        </button>
                        <ModeToggle />

                        {/* Conditional rendering for Auth/Profile */}
                        {isLoggedIn ? (
                            <ProfileDropdown />
                        ) : (
                            <Link
                                href="/login"
                                className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
                            >
                                <UserCircle2 className="h-5 w-5" />
                            </Link>
                        )}

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
                        {menuItems.map((item) => {
                            const isActive =
                                item.href === '/'
                                    ? pathname === '/'
                                    : pathname.startsWith(item.href);

                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className={`
                                        text-lg font-medium
                                        hover:text-gray-600 dark:hover:text-gray-300
                                        transition-colors p-2
                                        ${
                                            isActive
                                                ? 'text-black dark:text-white font-semibold border-b-2 border-black dark:border-white'
                                                : 'text-gray-600 dark:text-gray-300'
                                        }
                                    `}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}

                        {/* Profile items in mobile menu */}
                        {isLoggedIn && (
                            <>
                                <div className="border-t border-gray-200 dark:border-zinc-800 pt-4">
                                    {/* Admin Panel in mobile menu */}
                                    {isAdmin && (
                                        <Link
                                            href="/admin"
                                            className="flex items-center p-2 text-lg font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <LayoutDashboard className="h-5 w-5 mr-3" />
                                            Admin Panel
                                        </Link>
                                    )}
                                    <Link
                                        href="/profile"
                                        className="flex items-center p-2 text-lg font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <User className="h-5 w-5 mr-3" />
                                        Profile
                                    </Link>
                                    <Link
                                        href="/settings"
                                        className="flex items-center p-2 text-lg font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <Settings className="h-5 w-5 mr-3" />
                                        Settings
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center w-full p-2 text-lg font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                                    >
                                        <LogOut className="h-5 w-5 mr-3" />
                                        Logout
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
