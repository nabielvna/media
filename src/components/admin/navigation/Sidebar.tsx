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
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}

interface NavSection {
    title: string;
    items: {
        icon: React.ElementType;
        label: string;
        href: string;
    }[];
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
    const pathname = usePathname();

    const navSections: NavSection[] = [
        {
            title: "Overview",
            items: [
                { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
            ]
        },
        {
            title: "Content Management",
            items: [
                { icon: FileText, label: 'Berita', href: '/admin/news' },
                { icon: Layers, label: 'Kategori', href: '/admin/categories' },
                { icon: FolderTree, label: 'Sub Kategori', href: '/admin/subcategories' },
            ]
        },
        {
            title: "User Engagement",
            items: [
                { icon: Users, label: 'Pengguna', href: '/admin/users' },
                { icon: MessageSquare, label: 'Komentar', href: '/admin/comments' },
                { icon: ThumbsUp, label: 'Likes', href: '/admin/likes' },
                { icon: Bookmark, label: 'Bookmarks', href: '/admin/bookmarks' },
                { icon: BarChart, label: 'Interaksi', href: '/admin/interactions' },
            ]
        },
        {
            title: "System",
            items: [
                { icon: Settings, label: 'Pengaturan', href: '/admin/settings' },
            ]
        }
    ];

    const isActiveLink = (href: string) => {
        if (href === '/admin') {
            return pathname === '/admin';
        }
        return pathname?.startsWith(href);
    };

    return (
        <div
            className={cn(
                "fixed top-0 left-0 z-30 h-full border-r bg-background transition-all duration-300 mx-auto",
                sidebarOpen ? "w-64" : "w-18"
            )}
        >
            <div className="flex h-16 items-center justify-between px-4 border-b">
                <h1
                    className={cn(
                        "font-semibold text-xl tracking-tight",
                        !sidebarOpen && "hidden"
                    )}
                >
                    Admin Panel
                </h1>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                    <Menu className="h-6 w-6" />
                </Button>
            </div>

            <ScrollArea className="h-[calc(100vh-4rem)] px-4">
                <nav className="space-y-2 py-4">
                    {navSections.map((section, idx) => (
                        <div key={section.title} className="space-y-2">
                            {idx > 0 && <Separator className="my-4" />}
                            {sidebarOpen && (
                                <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight text-muted-foreground">
                                    {section.title}
                                </h2>
                            )}
                            <div className="space-y-1">
                                {section.items.map((item, itemIdx) => (
                                    <Link
                                        key={itemIdx}
                                        href={item.href}
                                        className={cn(
                                            "flex items-center gap-3 rounded-md px-2 py-2 text-sm font-medium transition-colors",
                                            isActiveLink(item.href)
                                                ? "bg-primary/10 text-primary hover:bg-primary/20"
                                                : "hover:bg-accent hover:text-accent-foreground",
                                            !sidebarOpen && ""
                                        )}
                                    >
                                        <item.icon className="h-5 w-5" />
                                        {sidebarOpen && <span>{item.label}</span>}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </nav>
            </ScrollArea>
        </div>
    );
};

export default Sidebar;
