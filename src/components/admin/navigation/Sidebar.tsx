'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Menu,
    LayoutDashboard,
    FileText,
    Users,
    Settings,
    Layers,
    FolderTree,
    MessageSquare,
    ThumbsUp,
    Bookmark,
    BarChart,
} from 'lucide-react';

interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
    const pathname = usePathname();

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
        { icon: FileText, label: 'Berita', href: '/admin/news' },
        { icon: Layers, label: 'Kategori', href: '/admin/categories' },
        {
            icon: FolderTree,
            label: 'Sub Kategori',
            href: '/admin/subcategories',
        },
        { icon: Users, label: 'Pengguna', href: '/admin/users' },
        { icon: MessageSquare, label: 'Komentar', href: '/admin/comments' },
        { icon: ThumbsUp, label: 'Likes', href: '/admin/likes' },
        { icon: Bookmark, label: 'Bookmarks', href: '/admin/bookmarks' },
        { icon: BarChart, label: 'Interaksi', href: '/admin/interactions' },
        { icon: Settings, label: 'Pengaturan', href: '/admin/settings' },
    ];

    const isActiveLink = (href: string) => {
        if (href === '/admin') {
            return pathname === '/admin';
        }
        return pathname?.startsWith(href);
    };

    return (
        <div
            className={`fixed top-0 left-0 h-full bg-white dark:bg-zinc-900 shadow-lg
            dark:shadow-zinc-800/30 transition-all duration-300 ${
                sidebarOpen ? 'w-64' : 'w-20'
            }`}
        >
            <div className="flex items-center justify-between p-4">
                <h1
                    className={`font-bold text-xl dark:text-white ${
                        !sidebarOpen && 'hidden'
                    }`}
                >
                    Admin Panel
                </h1>
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800
                    dark:text-zinc-200"
                >
                    <Menu size={20} />
                </button>
            </div>

            <nav className="p-4">
                <ul className="space-y-2">
                    {navItems.map((item, index) => (
                        <li key={index}>
                            <Link
                                href={item.href}
                                className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-colors
                                    ${
                                        isActiveLink(item.href)
                                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                                            : 'hover:bg-gray-100 dark:hover:bg-zinc-800 dark:text-zinc-200'
                                    }`}
                            >
                                <item.icon size={20} />
                                {sidebarOpen && <span>{item.label}</span>}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
