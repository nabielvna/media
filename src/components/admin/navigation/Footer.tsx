'use client';

import React from 'react';
import { Github, Twitter } from 'lucide-react';

interface FooterProps {
    sidebarOpen: boolean;
}

const Footer: React.FC<FooterProps> = ({ sidebarOpen }) => {
    const currentYear = new Date().getFullYear();

    return (
        <footer
            className={`
                fixed bottom-0 right-0 z-10
                bg-white dark:bg-zinc-900
                border-t border-zinc-200 dark:border-zinc-800
                transition-all duration-300
                ${sidebarOpen ? 'left-64' : 'left-20'}
            `}
        >
            <div className="container mx-auto px-6 py-4">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-zinc-600 dark:text-zinc-400">
                            © {currentYear} Goat News Admin. All rights
                            reserved.
                        </span>
                        <span className="hidden md:inline text-zinc-400 dark:text-zinc-600">
                            |
                        </span>
                        <div className="hidden md:flex space-x-4">
                            <a
                                href="#"
                                className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                            >
                                Privacy Policy
                            </a>
                            <a
                                href="#"
                                className="text-sm text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                            >
                                Terms of Service
                            </a>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4 mt-4 md:mt-0">
                        <div className="text-sm text-zinc-600 dark:text-zinc-400">
                            Version 1.0.0
                        </div>
                        <span className="text-zinc-400 dark:text-zinc-600">
                            |
                        </span>
                        <div className="flex items-center space-x-3">
                            <a
                                href="#"
                                className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
                                aria-label="Github"
                            >
                                <Github size={20} />
                            </a>
                            <a
                                href="#"
                                className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
                                aria-label="Twitter"
                            >
                                <Twitter size={20} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
