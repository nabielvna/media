'use client';

import React from 'react';
import { Github, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface FooterProps {
    sidebarOpen: boolean;
}

const Footer: React.FC<FooterProps> = ({ sidebarOpen }) => {
    const currentYear = new Date().getFullYear();

    return (
        <footer
            className={`
                fixed bottom-0 right-0 z-10
                bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60
                border-t
                transition-all duration-300
                ${sidebarOpen ? 'lg:left-64' : 'lg:left-20'}
            `}
        >
            <div className="container mx-auto px-4 py-3">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <span className="text-sm text-muted-foreground">
                            © {currentYear} Goat News Admin. All rights reserved.
                        </span>
                        <div className="hidden md:flex items-center gap-4">
                            <Separator orientation="vertical" className="h-4" />
                            <Button variant="link" className="text-sm h-auto p-0">
                                Privacy Policy
                            </Button>
                            <Button variant="link" className="text-sm h-auto p-0">
                                Terms of Service
                            </Button>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">v1.0.0</span>
                        <Separator orientation="vertical" className="h-4" />
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" asChild>
                                <a href="#" aria-label="Github">
                                    <Github className="h-5 w-5" />
                                </a>
                            </Button>
                            <Button variant="ghost" size="icon" asChild>
                                <a href="#" aria-label="Twitter">
                                    <Twitter className="h-5 w-5" />
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
