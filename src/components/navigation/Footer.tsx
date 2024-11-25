import React from 'react';
import Link from 'next/link';
import { Twitter, Facebook, Instagram, Youtube } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const FOOTER_SECTIONS = [
    {
        title: 'Politics',
        path: '/politics',
        links: [
            { href: '/politics/national', label: 'National' },
            { href: '/politics/international', label: 'International' },
        ],
    },
    {
        title: 'Business',
        path: '/business',
        links: [
            { href: '/business/macro', label: 'Macro' },
            { href: '/business/financial-exchange', label: 'Financial Exchange' },
            { href: '/business/real-sector', label: 'Real Sector' },
        ],
    },
    {
        title: 'Tech',
        path: '/tech',
        links: [
            { href: '/tech/gadgets', label: 'Gadgets' },
            { href: '/tech/electronics', label: 'Electronics' },
            { href: '/tech/telco', label: 'Telco' },
        ],
    },
    {
        title: 'Sports',
        path: '/sports',
        links: [
            { href: '/sports/soccer', label: 'Soccer' },
            { href: '/sports/boxing', label: 'Boxing' },
            { href: '/sports/all-sport', label: 'All Sport' },
        ],
    },
    {
        title: 'Entertainment',
        path: '/entertainment',
        links: [
            { href: '/entertainment/movies', label: 'Movies' },
            { href: '/entertainment/music', label: 'Music' },
            { href: '/entertainment/celebrity', label: 'Celebrity' },
        ],
    },
    {
        title: 'Lifestyle',
        path: '/lifestyle',
        links: [
            { href: '/lifestyle/health', label: 'Health' },
            { href: '/lifestyle/travel', label: 'Travel' },
            { href: '/lifestyle/food', label: 'Food' },
        ],
    },
];

const Footer = () => {
    return (
        <footer className="relative bg-black text-white overflow-hidden">
            {/* Decorative background pattern
            <div className="absolute inset-0 bg-black" />
            <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 20px 20px, rgba(255, 255, 255, 0.2) 2%, transparent 1%)',
                backgroundSize: '50px 50px'
            }} /> */}

            {/* Main footer content */}
            <div className="relative container mx-auto px-4 py-16">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                    {FOOTER_SECTIONS.map(({ title, path, links }) => (
                        <div key={title} className="space-y-4">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Link href={path} className="inline-block">
                                            <Badge variant="outline" className="px-4 py-1 text-lg font-semibold hover:bg-white/10 transition-colors">
                                                {title}
                                            </Badge>
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>View all {title.toLowerCase()} news</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <ul className="space-y-2">
                                {links.map(({ href, label }) => (
                                    <li key={href}>
                                        <Link
                                            href={href}
                                            className="text-sm text-gray-400 hover:text-white hover:underline underline-offset-4 transition-colors"
                                        >
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <Separator className="my-12 bg-white/10" />

                {/* Social links and copyright */}
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <div className="flex items-center space-x-4">
                        <Button size="icon" variant="ghost" className="hover:bg-white/10">
                            <Twitter className="w-5 h-5" />
                        </Button>
                        <Button size="icon" variant="ghost" className="hover:bg-white/10">
                            <Facebook className="w-5 h-5" />
                        </Button>
                        <Button size="icon" variant="ghost" className="hover:bg-white/10">
                            <Instagram className="w-5 h-5" />
                        </Button>
                        <Button size="icon" variant="ghost" className="hover:bg-white/10">
                            <Youtube className="w-5 h-5" />
                        </Button>
                    </div>
                    <div className="flex items-center space-x-8">
                        <Link href="/about" className="text-sm text-gray-400 hover:text-white transition-colors">
                            About Us
                        </Link>
                        <Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
                            Terms of Service
                        </Link>
                    </div>
                    <p className="text-sm text-gray-400">
                        © {new Date().getFullYear()} Goat News. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
