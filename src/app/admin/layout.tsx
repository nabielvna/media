'use client';

import React, { useState } from 'react';
import { Navbar, Sidebar, Footer } from '@/components/admin/navigation';

interface AdminLayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<AdminLayoutProps> = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="min-h-screen bg-background">
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />
            <Navbar sidebarOpen={sidebarOpen} />

            <main
                className={`transition-all duration-300 ${
                    sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'
                } mb-16 p-6`}
            >
                <div className="mx-auto max-w-7xl">{children}</div>
            </main>

            <Footer sidebarOpen={sidebarOpen} />
        </div>
    );
};

export default Layout;
