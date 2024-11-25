'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    PlusCircle,
    Search,
    Filter,
    MoreVertical,
    Eye,
    Pencil,
    Trash2,
} from 'lucide-react';
import Image from 'next/image';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface NewsItem {
    id: string;
    title: string;
    path: string;
    thumbnailUrl: string;
    description: string;
    subCategory: {
        title: string;
    };
    createdAt: string;
    user: {
        name: string;
    };
}

const NewsPage = () => {
    const news: NewsItem[] = [
        {
            id: '1',
            title: 'Breaking News: Important Event',
            path: 'breaking-news-important-event',
            thumbnailUrl: '/api/placeholder/200/120',
            description:
                'This is a description of the breaking news article...',
            subCategory: { title: 'Politik' },
            createdAt: '2024-11-24T10:00:00Z',
            user: { name: 'John Doe' },
        },
        {
            id: '2',
            title: 'Technology Update 2024',
            path: 'technology-update-2024',
            thumbnailUrl: '/api/placeholder/200/120',
            description: 'Latest updates in technology for 2024...',
            subCategory: { title: 'Teknologi' },
            createdAt: '2024-11-24T09:30:00Z',
            user: { name: 'Jane Smith' },
        },
    ];

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                    Manajemen Berita
                </h1>
                <Button className="flex items-center gap-2">
                    <PlusCircle size={20} />
                    Tambah Berita
                </Button>
            </div>

            {/* Filters Section */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400 dark:text-zinc-500" />
                    <Input
                        placeholder="Cari berita..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-4">
                    <Select
                        value={selectedCategory}
                        onValueChange={setSelectedCategory}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Kategori" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Semua Kategori</SelectItem>
                            <SelectItem value="politik">Politik</SelectItem>
                            <SelectItem value="teknologi">Teknologi</SelectItem>
                            <SelectItem value="olahraga">Olahraga</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button
                        variant="outline"
                        className="flex items-center gap-2"
                    >
                        <Filter size={20} />
                        Filter
                    </Button>
                </div>
            </div>

            {/* Table Section */}
            <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
                <Table>
                    <TableHeader>
                        <TableRow className="border-zinc-200 dark:border-zinc-800">
                            <TableHead>Thumbnail</TableHead>
                            <TableHead>Judul</TableHead>
                            <TableHead>Kategori</TableHead>
                            <TableHead>Penulis</TableHead>
                            <TableHead>Tanggal</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {news.map((item) => (
                            <TableRow
                                key={item.id}
                                className="border-zinc-200 dark:border-zinc-800"
                            >
                                <TableCell>
                                    <Image
                                        src={item.thumbnailUrl}
                                        alt={item.title}
                                        width={100}
                                        height={60}
                                        className="rounded"
                                    />
                                </TableCell>
                                <TableCell>
                                    <div className="space-y-1">
                                        <p className="font-medium text-zinc-900 dark:text-zinc-50">
                                            {item.title}
                                        </p>
                                        <p className="text-sm text-zinc-500 dark:text-zinc-400 truncate max-w-[300px]">
                                            {item.description}
                                        </p>
                                    </div>
                                </TableCell>
                                <TableCell className="text-zinc-900 dark:text-zinc-50">
                                    {item.subCategory.title}
                                </TableCell>
                                <TableCell className="text-zinc-900 dark:text-zinc-50">
                                    {item.user.name}
                                </TableCell>
                                <TableCell className="text-zinc-900 dark:text-zinc-50">
                                    {new Date(
                                        item.createdAt
                                    ).toLocaleDateString('id-ID', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                    })}
                                </TableCell>
                                <TableCell>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                                        Published
                                    </span>
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                className="h-8 w-8 p-0 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                            >
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem className="flex items-center gap-2">
                                                <Eye size={16} />
                                                Lihat
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="flex items-center gap-2">
                                                <Pencil size={16} />
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="flex items-center gap-2 text-red-600 dark:text-red-400">
                                                <Trash2 size={16} />
                                                Hapus
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default NewsPage;
