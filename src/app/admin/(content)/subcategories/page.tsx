'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    PlusCircle,
    Search,
    Filter,
    MoreVertical,
    Pencil,
    Trash2,
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Interfaces
interface Category {
    id: string;
    title: string;
}

interface SubCategory {
    id: string;
    path: string;
    title: string;
    description: string;
    createdAt: string;
    category: {
        id: string;
        title: string;
    };
}

const FormField = ({
    label,
    id,
    maxLength,
    isTextarea = false,
}: {
    label: string;
    id: string;
    maxLength: number;
    isTextarea?: boolean;
}) => (
    <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor={id} className="text-right text-muted-foreground">
            {label}
        </Label>
        {isTextarea ? (
            <Textarea
                id={id}
                maxLength={maxLength}
                className="col-span-3 bg-muted border-input text-foreground placeholder:text-muted-foreground"
                placeholder={`Enter ${label.toLowerCase()}`}
            />
        ) : (
            <Input
                id={id}
                maxLength={maxLength}
                className="col-span-3 bg-muted border-input text-foreground placeholder:text-muted-foreground"
                placeholder={`Enter ${label.toLowerCase()}`}
            />
        )}
    </div>
);

const SubCategoryDialog = () => (
    <DialogContent className="sm:max-w-[425px] border-border bg-background">
        <DialogHeader>
            <DialogTitle className="text-foreground">
                Add New Sub Category
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
                Create a new subcategory for the selected category.
            </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label
                    htmlFor="category"
                    className="text-right text-muted-foreground"
                >
                    Category
                </Label>
                <Select>
                    <SelectTrigger className="col-span-3 bg-muted border-input text-foreground">
                        <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border">
                        <SelectItem value="1">Politics</SelectItem>
                        <SelectItem value="2">Technology</SelectItem>
                        <SelectItem value="3">Sports</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <FormField label="Name" id="title" maxLength={100} />
            <FormField label="Path" id="path" maxLength={100} />
            <FormField
                label="Description"
                id="description"
                maxLength={200}
                isTextarea
            />
        </div>
        <DialogFooter>
            <Button type="submit" variant="secondary">
                Save
            </Button>
        </DialogFooter>
    </DialogContent>
);

const ActionsMenu = () => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button
                variant="ghost"
                className="h-8 w-8 p-0 text-muted-foreground hover:bg-muted hover:text-foreground"
            >
                <MoreVertical className="h-4 w-4" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
            align="end"
            className="border-border bg-background"
        >
            <DropdownMenuItem className="flex items-center gap-2 hover:bg-muted">
                <Pencil className="h-4 w-4" />
                Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 text-destructive hover:bg-muted hover:text-destructive">
                <Trash2 className="h-4 w-4" />
                Delete
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
);

const SubCategoriesPage = () => {
    // Sample data
    const categories: Category[] = [
        { id: '1', title: 'Politics' },
        { id: '2', title: 'Technology' },
        { id: '3', title: 'Sports' },
    ];

    const subCategories: SubCategory[] = [
        {
            id: '1',
            path: 'national-politics',
            title: 'National Politics',
            description: 'News about domestic politics',
            createdAt: '2024-11-24T10:00:00Z',
            category: { id: '1', title: 'Politics' },
        },
        {
            id: '2',
            path: 'international-politics',
            title: 'International Politics',
            description: 'News about international politics',
            createdAt: '2024-11-24T10:00:00Z',
            category: { id: '1', title: 'Politics' },
        },
        {
            id: '3',
            path: 'gadget',
            title: 'Gadgets',
            description: 'News about gadgets and tech devices',
            createdAt: '2024-11-24T09:30:00Z',
            category: { id: '2', title: 'Technology' },
        },
    ];

    const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
    const [selectedCategory, setSelectedCategory] =
        React.useState<string>('all');

    const formatDate = (date: string): string => {
        const dateObject = new Date(date);
        const dateFormat = new Intl.DateTimeFormat('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }).format(dateObject);

        const timeFormat = new Intl.DateTimeFormat('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        }).format(dateObject);

        return `${dateFormat} - ${timeFormat}`;
    };

    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-foreground">
                    Sub Category Management
                </h1>
                <Dialog
                    open={isAddDialogOpen}
                    onOpenChange={setIsAddDialogOpen}
                >
                    <Button
                        onClick={() => setIsAddDialogOpen(true)}
                        className="inline-flex items-center gap-2"
                        variant="secondary"
                    >
                        <PlusCircle className="h-5 w-5" />
                        Add Sub Category
                    </Button>
                    <SubCategoryDialog />
                </Dialog>
            </div>

            <div className="mb-6 flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search sub categories..."
                        className="pl-10 bg-muted border-input text-foreground placeholder:text-muted-foreground"
                    />
                </div>
                <div className="flex gap-4">
                    <Select
                        value={selectedCategory}
                        onValueChange={setSelectedCategory}
                    >
                        <SelectTrigger className="w-[180px] bg-muted border-input text-foreground">
                            <SelectValue placeholder="Filter by Category" />
                        </SelectTrigger>
                        <SelectContent className="bg-background border-border">
                            <SelectItem value="all">All Categories</SelectItem>
                            {categories.map((category) => (
                                <SelectItem
                                    key={category.id}
                                    value={category.id}
                                >
                                    {category.title}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button
                        variant="outline"
                        className="inline-flex items-center gap-2 border-input text-muted-foreground hover:text-foreground"
                    >
                        <Filter className="h-4 w-4" />
                        Filter
                    </Button>
                </div>
            </div>

            <div className="rounded-lg border border-border bg-card shadow-lg overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="border-border hover:bg-transparent">
                            <TableHead className="text-muted-foreground">
                                Sub Category Name
                            </TableHead>
                            <TableHead className="text-muted-foreground">
                                Category
                            </TableHead>
                            <TableHead className="text-muted-foreground">
                                Path
                            </TableHead>
                            <TableHead className="text-muted-foreground">
                                Description
                            </TableHead>
                            <TableHead className="text-muted-foreground">
                                Created Date
                            </TableHead>
                            <TableHead className="text-muted-foreground text-right">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {subCategories
                            .filter(
                                (sub) =>
                                    selectedCategory === 'all' ||
                                    sub.category.id === selectedCategory
                            )
                            .map((subCategory) => (
                                <TableRow
                                    key={subCategory.id}
                                    className="border-border hover:bg-muted"
                                >
                                    <TableCell className="font-medium text-foreground">
                                        {subCategory.title}
                                    </TableCell>
                                    <TableCell>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-foreground">
                                            {subCategory.category.title}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {subCategory.path}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {subCategory.description}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground whitespace-nowrap">
                                        {formatDate(subCategory.createdAt)}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <ActionsMenu />
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default SubCategoriesPage;
