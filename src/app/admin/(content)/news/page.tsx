'use client';

import React, { useEffect, useState } from 'react';
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
import { Card } from '@/components/ui/card';
import {
    PlusCircle,
    Search,
    MoreVertical,
    Eye,
    Pencil,
    Trash2,
    Calendar,
    User
} from 'lucide-react';
import Image from 'next/image';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import type { News, SubCategory } from '@/types';
import { getNews, deleteNews } from '@/actions/news';
import { getSubCategories } from '@/actions/subcategory';
import { useRouter } from 'next/navigation';

// Actions Menu Component
const ActionsMenu = ({
    news,
    onEdit,
    onDelete,
    onView,
}: {
    news: News;
    onEdit: (news: News) => void;
    onDelete: (id: string) => Promise<void>;
    onView: (news: News) => void;
}) => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button
                variant="ghost"
                className="h-8 w-8 p-0 text-muted-foreground hover:bg-muted hover:text-foreground"
            >
                <MoreVertical className="h-4 w-4" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="border-border bg-background">
            <DropdownMenuItem
                className="flex items-center gap-2 hover:bg-muted"
                onSelect={() => onView(news)}
            >
                <Eye className="h-4 w-4" />
                View
            </DropdownMenuItem>
            <DropdownMenuItem
                className="flex items-center gap-2 hover:bg-muted"
                onSelect={() => onEdit(news)}
            >
                <Pencil className="h-4 w-4" />
                Edit
            </DropdownMenuItem>
            <DropdownMenuItem
                className="flex items-center gap-2 text-destructive hover:bg-muted hover:text-destructive"
                onSelect={() => onDelete(news.id)}
            >
                <Trash2 className="h-4 w-4" />
                Delete
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
);

// Mobile News Card Component
const NewsCard = ({
    item,
    formatDate,
    onEdit,
    onDelete,
    onView
}: {
    item: News;
    formatDate: (date: string | Date) => string;
    onEdit: (news: News) => void;
    onDelete: (id: string) => Promise<void>;
    onView: (news: News) => void;
}) => (
    <Card className="p-4 space-y-4">
        <div className="flex gap-4">
            <Image
                src={item.thumbnailUrl || '/api/placeholder/200/120'}
                alt={item.title}
                width={80}
                height={80}
                className="rounded object-cover"
            />
            <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground truncate">{item.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                    {item.description}
                </p>
            </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-foreground">
                {item.subCategory.title}
            </span>
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {item.user.name}
                </span>
                <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(item.createdAt)}
                </span>
            </div>
            <ActionsMenu
                news={item}
                onEdit={onEdit}
                onDelete={onDelete}
                onView={onView}
            />
        </div>
    </Card>
);

const NewsPage = () => {
    const router = useRouter();
    const { toast } = useToast();
    const [news, setNews] = useState<News[]>([]);
    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    // Fetch data
    const fetchData = async () => {
        try {
            const [newsData, subCategoriesData] = await Promise.all([
                getNews(selectedCategory === 'all' ? undefined : selectedCategory),
                getSubCategories(),
            ]);
            setNews(newsData);
            setSubCategories(subCategoriesData);
        } catch (error) {
            if (error instanceof Error) {
                toast({
                    title: 'Error fetching data',
                    description: error.message,
                    variant: 'destructive',
                });
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedCategory]);

    // Handlers
    const handleEdit = (newsItem: News) => {
        router.push(`/admin/news/edit/${newsItem.id}`);
    };

    const handleView = (newsItem: News) => {
        router.push(`/news/${newsItem.path}`);
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteNews(id);
            setNews(prev => prev.filter(item => item.id !== id));
            toast({ title: 'News deleted successfully' });
        } catch (error) {
            if (error instanceof Error) {
                toast({
                    title: 'Error',
                    description: error.message,
                    variant: 'destructive',
                });
            }
        }
    };

    // Filter news based on search term
    const filteredNews = news.filter(
        (item) =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Format date helper
    const formatDate = (date: string | Date): string => {
        const dateObject = date instanceof Date ? date : new Date(date);
        return new Intl.DateTimeFormat('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        }).format(dateObject);
    };

    return (
        <div className="space-y-4 md:space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-xl md:text-2xl font-bold text-foreground">
                    News Management
                </h1>
                <Button
                    onClick={() => router.push('/admin/news/create')}
                    className="w-full sm:w-auto inline-flex items-center gap-2"
                    variant="secondary"
                >
                    <PlusCircle className="h-4 w-4" />
                    Add News
                </Button>
            </div>

            <div className="flex flex-col gap-4">
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search news..."
                        className="pl-10 bg-muted border-input text-foreground"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                >
                    <SelectTrigger className="w-full bg-muted border-input text-foreground">
                        <SelectValue placeholder="Filter by Category" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border">
                        <SelectItem value="all">All Categories</SelectItem>
                        {subCategories.map((category) => (
                            <SelectItem
                                key={category.id}
                                value={category.id}
                            >
                                {category.title}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Mobile View */}
            <div className="block md:hidden space-y-4">
                {filteredNews.map((item) => (
                    <NewsCard
                        key={item.id}
                        item={item}
                        formatDate={formatDate}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onView={handleView}
                    />
                ))}
                {filteredNews.length === 0 && (
                    <Card className="p-6 text-center text-muted-foreground">
                        No news found.
                    </Card>
                )}
            </div>

            {/* Desktop View */}
            <div className="hidden md:block rounded-lg border border-border bg-card shadow-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="border-border hover:bg-transparent">
                            <TableHead className="w-[100px]">Thumbnail</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Author</TableHead>
                            <TableHead>Created Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredNews.map((item) => (
                            <TableRow
                                key={item.id}
                                className="border-border hover:bg-muted"
                            >
                                <TableCell>
                                    <Image
                                        src={item.thumbnailUrl || '/api/placeholder/200/120'}
                                        alt={item.title}
                                        width={100}
                                        height={60}
                                        className="rounded object-cover"
                                    />
                                </TableCell>
                                <TableCell>
                                    <div className="space-y-1">
                                        <p className="font-medium text-foreground">
                                            {item.title}
                                        </p>
                                        <p className="text-sm text-muted-foreground truncate max-w-[300px]">
                                            {item.description}
                                        </p>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-foreground">
                                        {item.subCategory.title}
                                    </span>
                                </TableCell>
                                <TableCell className="text-muted-foreground">
                                    {item.user.name}
                                </TableCell>
                                <TableCell className="text-muted-foreground whitespace-nowrap">
                                    {formatDate(item.createdAt)}
                                </TableCell>
                                <TableCell className="text-right">
                                    <ActionsMenu
                                        news={item}
                                        onEdit={handleEdit}
                                        onDelete={handleDelete}
                                        onView={handleView}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                        {filteredNews.length === 0 && (
                            <TableRow>
                                <TableCell
                                    colSpan={6}
                                    className="h-24 text-center text-muted-foreground"
                                >
                                    No news found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default NewsPage;
