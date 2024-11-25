'use client';

import {
    Search,
    Menu,
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
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    CommandDialog,
    CommandInput,
    CommandList,
    CommandGroup,
    CommandItem,
    CommandEmpty
} from "@/components/ui/command";
import { DialogTitle } from '@/components/ui/dialog';

const Navbar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const loginStatus = localStorage.getItem('isLoggedIn');
        const userRole = localStorage.getItem('userRole');
        setIsLoggedIn(loginStatus === 'true');
        setIsAdmin(userRole === 'admin');
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
        return currentMenuItem?.label !== 'Home' ? currentMenuItem?.label : null;
    };

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userRole');
        setIsLoggedIn(false);
        setIsAdmin(false);
        router.push('/login');
    };

    const SearchCommand = () => (
        <CommandDialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
            <DialogTitle className='sr'>
                <div id="search-title">Search Articles</div>
            </DialogTitle>
            <CommandInput
                placeholder="Search articles..."
                aria-labelledby="search-title"
            />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Categories">
                    {menuItems.map((item) => (
                        <CommandItem
                            key={item.label}
                            onSelect={() => {
                                router.push(item.href);
                                setIsSearchOpen(false);
                            }}
                        >
                            {item.label}
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    );

    const ProfileDropdown = () => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="/avatar-placeholder.jpg" />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">Joy</p>
                        <p className="text-xs text-muted-foreground">joy@gmail.com</p>
                        {isAdmin && (
                            <Badge variant="outline" className="w-fit mt-1">
                                Admin
                            </Badge>
                        )}
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {isAdmin && (
                        <DropdownMenuItem asChild>
                            <Link href="/admin" className="flex items-center">
                                <LayoutDashboard className="w-4 h-4 mr-2" />
                                Admin Panel
                            </Link>
                        </DropdownMenuItem>
                    )}
                    <DropdownMenuItem asChild>
                        <Link href="/profile" className="flex items-center">
                            <User className="w-4 h-4 mr-2" />
                            Profile
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/settings" className="flex items-center">
                            <Settings className="w-4 h-4 mr-2" />
                            Settings
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="text-red-600 dark:text-red-400"
                    onClick={handleLogout}
                >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );

    return (
        <>
            <div className="fixed z-50 top-0 left-0 right-0 h-16 flex items-center justify-center bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <nav className="w-full max-w-7xl flex items-center justify-between px-4">
                    {/* Left: Logo */}
                    <div className="flex items-center gap-3">
                        <Image
                            src="/goat.png"
                            alt="Goat Logo"
                            className="h-10 w-10 lg:h-12 lg:w-12 object-cover"
                            width={500}
                            height={500}
                        />
                        <div className="flex flex-col -space-y-1">
                            <Link href="/">
                                <div className="font-bold tracking-wider uppercase text-xl lg:text-2xl bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-500 dark:from-zinc-100 dark:to-zinc-500 font-['Germania_One'] transform">
                                    GOAT NEWS
                                </div>
                            </Link>
                            {getCurrentPageLabel() && (
                                <p className="text-xs text-muted-foreground uppercase tracking-widest">
                                    {getCurrentPageLabel()}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Center: Navigation Menu */}
                    <div className="hidden lg:flex items-center justify-center flex-1">
                        <div className="flex items-center gap-1">
                            {menuItems.map((item) => {
                                const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
                                return (
                                    <Button
                                        key={item.label}
                                        variant={isActive ? "secondary" : "ghost"}
                                        size="sm"
                                        className="text-sm"
                                        asChild
                                    >
                                        <Link href={item.href}>{item.label}</Link>
                                    </Button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-2 w-[200px] justify-end">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full"
                            onClick={() => setIsSearchOpen(true)}
                            aria-label="Search"
                        >
                            <Search className="h-5 w-5" />
                        </Button>
                        <ModeToggle />

                        {isLoggedIn ? (
                            <ProfileDropdown />
                        ) : (
                            <Button variant="ghost" size="icon" asChild className="rounded-full">
                                <Link href="/login">
                                    <UserCircle2 className="h-5 w-5" />
                                </Link>
                            </Button>
                        )}

                        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="rounded-full lg:hidden"
                                    aria-label="Menu"
                                >
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-80">
                                <SheetHeader>
                                    <SheetTitle>Menu</SheetTitle>
                                </SheetHeader>
                                <div className="flex flex-col gap-4 mt-4">
                                    {menuItems.map((item) => {
                                        const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
                                        return (
                                            <Button
                                                key={item.label}
                                                variant={isActive ? "secondary" : "ghost"}
                                                className="w-full justify-start"
                                                asChild
                                            >
                                                <Link href={item.href} onClick={() => setIsMenuOpen(false)}>
                                                    {item.label}
                                                </Link>
                                            </Button>
                                        );
                                    })}

                                    {isLoggedIn && (
                                        <>
                                            <div className="h-px bg-border" />
                                            {isAdmin && (
                                                <Button
                                                    variant="ghost"
                                                    className="w-full justify-start"
                                                    asChild
                                                >
                                                    <Link href="/admin" onClick={() => setIsMenuOpen(false)}>
                                                        <LayoutDashboard className="w-4 h-4 mr-2" />
                                                        Admin Panel
                                                    </Link>
                                                </Button>
                                            )}
                                            <Button
                                                variant="ghost"
                                                className="w-full justify-start"
                                                asChild
                                            >
                                                <Link href="/profile" onClick={() => setIsMenuOpen(false)}>
                                                    <User className="w-4 h-4 mr-2" />
                                                    Profile
                                                </Link>
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                className="w-full justify-start"
                                                asChild
                                            >
                                                <Link href="/settings" onClick={() => setIsMenuOpen(false)}>
                                                    <Settings className="w-4 h-4 mr-2" />
                                                    Settings
                                                </Link>
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                className="w-full justify-start text-red-600 dark:text-red-400"
                                                onClick={() => {
                                                    handleLogout();
                                                    setIsMenuOpen(false);
                                                }}
                                            >
                                                <LogOut className="w-4 h-4 mr-2" />
                                                Logout
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </nav>
            </div>
            <SearchCommand />
        </>
    );
};

export default Navbar;
