import Link from 'next/link';
import { cn } from '@/lib/utils';

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
            {
                href: '/business/financial-exchange',
                label: 'Financial Exchange',
            },
            { href: '/business/real-sector', label: 'Real Sector' },
        ],
    },
    {
        title: 'Tech',
        path: '/tech',
        links: [
            { href: '/tech/gadget', label: 'Gadgets' },
            { href: '/tech/electronic', label: 'Electronics' },
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

const ADDITIONAL_SECTIONS = [
    {
        title: 'About GOAT NEWS',
        path: '/about',
        links: [{ href: '/about/profiles', label: 'GOAT NEWS Profiles' }],
    },
];

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-black text-zinc-900 dark:text-white py-12 px-4 border-t-2 border-zinc-200 dark:border-zinc-800">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
                    {FOOTER_SECTIONS.map(({ title, path, links }, index) => (
                        <div
                            key={title}
                            className="col-span-1 flex flex-col items-center text-center"
                        >
                            <Link
                                href={path}
                                className="inline-block font-bold text-lg mb-4 text-zinc-900 dark:text-white hover:text-zinc-600 dark:hover:text-gray-200 border-b border-transparent hover:border-current pb-1"
                            >
                                {title}
                            </Link>
                            <ul
                                className={cn(
                                    'space-y-4 w-full px-6',
                                    index !== 0 &&
                                        'border-l border-zinc-200 dark:border-zinc-800'
                                )}
                            >
                                {links.map(({ href, label }) => (
                                    <li
                                        key={href}
                                        className="border-b border-zinc-200 dark:border-zinc-800 pb-2 last:border-0"
                                    >
                                        <Link
                                            href={href}
                                            className="text-zinc-600 dark:text-gray-400 hover:text-zinc-900 dark:hover:text-white text-sm block py-1"
                                        >
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800 grid grid-cols-1 gap-8">
                    {ADDITIONAL_SECTIONS.map(({ title, path, links }) => (
                        <div key={title} className="text-center">
                            <Link
                                href={path}
                                className="inline-block font-bold text-lg mb-4 text-zinc-900 dark:text-white hover:text-zinc-600 dark:hover:text-gray-200 border-b border-transparent hover:border-current pb-1"
                            >
                                {title}
                            </Link>
                            <ul className="grid grid-cols-2 md:grid-cols-6 gap-4 border-l border-r border-zinc-200 dark:border-zinc-800 px-4">
                                {links.map(({ href, label }) => (
                                    <li
                                        key={label}
                                        className="border-b border-zinc-200 dark:border-zinc-800 pb-2"
                                    >
                                        <Link
                                            href={href}
                                            className="text-zinc-600 dark:text-gray-400 hover:text-zinc-900 dark:hover:text-white text-sm block py-1"
                                        >
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800">
                    <p className="text-zinc-600 dark:text-gray-400 text-sm text-center">
                        © {new Date().getFullYear()} Goat News. All Rights
                        Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
