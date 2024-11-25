'use client';

import React from 'react';
import {
    Bell,
    Search,
    LogOut,
    User,
    Settings,
    Newspaper,
    BellOff,
} from 'lucide-react';
import ModeToggle from '@/components/mode-toggle';
import Link from 'next/link';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@/components/ui/hover-card';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import {
    CommandDialog,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandShortcut,
} from '@/components/ui/command';
import { useHotkeys } from 'react-hotkeys-hook';
import { DialogTitle } from '@/components/ui/dialog';

interface NavbarProps {
    sidebarOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ sidebarOpen }) => {
    const [commandOpen, setCommandOpen] = React.useState(false);
    const notifications = [
        { id: 1, title: 'New comment', time: '2m ago', read: false },
        { id: 2, title: 'Server error', time: '5m ago', read: false },
        { id: 3, title: 'Deployment success', time: '1h ago', read: true },
    ];

    // Command palette hotkey
    useHotkeys('ctrl+k,cmd+k', (e) => {
        e.preventDefault();
        setCommandOpen(true);
    });

    return (
        <>
            <header
                className={`bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60
                border-b fixed top-0 right-0 z-20 transition-all duration-300 h-16
                ${sidebarOpen ? 'lg:left-64' : 'lg:left-20'}`}
            >
                <div className="flex items-center justify-between h-16 px-4">
                    <div className="flex items-center flex-1 max-w-md">
                        <div className="relative w-full">
                            <Button
                                variant="outline"
                                className="w-full justify-start text-muted-foreground pl-8"
                                onClick={() => setCommandOpen(true)}
                            >
                                <Search className="absolute left-2.5 h-4 w-4" />
                                <span>Search...</span>
                                <kbd className="pointer-events-none absolute right-2 top-2.5 h-5 select-none rounded border bg-muted px-1.5 text-xs font-mono text-muted-foreground">
                                    ⌘K
                                </kbd>
                            </Button>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <ModeToggle />

                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="relative"
                                >
                                    <Bell className="h-5 w-5" />
                                    {notifications.filter((n) => !n.read)
                                        .length > 0 && (
                                        <Badge
                                            variant="destructive"
                                            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0"
                                        >
                                            {
                                                notifications.filter(
                                                    (n) => !n.read
                                                ).length
                                            }
                                        </Badge>
                                    )}
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-80 sm:w-96">
                                <SheetHeader>
                                    <SheetTitle>Notifications</SheetTitle>
                                </SheetHeader>
                                <div className="mt-4 space-y-2">
                                    {notifications.map((notification) => (
                                        <div
                                            key={notification.id}
                                            className={`flex items-center justify-between p-3 rounded-lg ${
                                                notification.read
                                                    ? 'bg-muted/50'
                                                    : 'bg-muted'
                                            }`}
                                        >
                                            <div className="flex flex-col gap-1">
                                                <div className="text-sm font-medium">
                                                    {notification.title}
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    {notification.time}
                                                </div>
                                            </div>
                                            <Button variant="ghost" size="icon">
                                                {notification.read ? (
                                                    <BellOff className="h-4 w-4" />
                                                ) : (
                                                    <Bell className="h-4 w-4" />
                                                )}
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </SheetContent>
                        </Sheet>

                        <HoverCard>
                            <HoverCardTrigger asChild>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className="relative h-9 w-9 rounded-full"
                                        >
                                            <Avatar className="h-9 w-9">
                                                <AvatarImage
                                                    src="/team/gayu.jpg"
                                                    alt="Profile"
                                                    className="aspect-square object-cover w-full h-full"
                                                />
                                                <AvatarFallback>
                                                    GA
                                                </AvatarFallback>
                                            </Avatar>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        className="w-56"
                                        align="end"
                                    >
                                        <DropdownMenuLabel>
                                            Goat Admin
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem asChild>
                                            <Link
                                                href="/admin/profile"
                                                className="flex items-center"
                                            >
                                                <User className="mr-2 h-4 w-4" />
                                                <span>Profile</span>
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link
                                                href="/admin/settings"
                                                className="flex items-center"
                                            >
                                                <Settings className="mr-2 h-4 w-4" />
                                                <span>Settings</span>
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link
                                                href="/"
                                                className="flex items-center"
                                            >
                                                <Newspaper className="mr-2 h-4 w-4" />
                                                <span>Goat News</span>
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-red-600 dark:text-red-400">
                                            <LogOut className="mr-2 h-4 w-4" />
                                            <span>Logout</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </HoverCardTrigger>
                            <HoverCardContent className="w-80" align="end">
                                <div className="flex justify-between space-x-4">
                                    <Avatar className="h-16 w-16">
                                        <AvatarImage
                                            src="/team/gayu.jpg"
                                            className="aspect-square object-cover"
                                        />
                                        <AvatarFallback>GA</AvatarFallback>
                                    </Avatar>
                                    <div className="space-y-1">
                                        <h4 className="text-sm font-semibold">
                                            Goat Admin
                                        </h4>
                                        <p className="text-sm text-muted-foreground">
                                            Senior Administrator
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Last login: Today at 2:34 PM
                                        </p>
                                    </div>
                                </div>
                            </HoverCardContent>
                        </HoverCard>
                    </div>
                </div>
            </header>

            <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
                <DialogTitle>
                    <CommandInput placeholder="Type a command or search..." />
                </DialogTitle>
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                        <CommandItem>
                            <User className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                            <CommandShortcut>⇧⌘P</CommandShortcut>
                        </CommandItem>
                        <CommandItem>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                            <CommandShortcut>⌘S</CommandShortcut>
                        </CommandItem>
                        <CommandItem>
                            <Bell className="mr-2 h-4 w-4" />
                            <span>Notifications</span>
                            <CommandShortcut>⌘N</CommandShortcut>
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
};

export default Navbar;
