'use client';

import React, { useState } from 'react';
import { Navbar, Sidebar, Footer } from '@/components/admin/navigation';

interface AdminLayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<AdminLayoutProps> = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />
            <Navbar sidebarOpen={sidebarOpen} />

            <main
                className={`transition-all duration-300 ${
                    sidebarOpen ? 'ml-64' : 'ml-20'
                } mb-16 p-6`}
            >
                <div className="mx-auto">{children}</div>
            </main>

            <Footer sidebarOpen={sidebarOpen} />
        </div>
    );
};

export default Layout;
