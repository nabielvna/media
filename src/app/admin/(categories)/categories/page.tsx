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
    DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    PlusCircle,
    Search,
    ChevronRight,
    MoreVertical,
    Pencil,
    Trash2,
    Plus,
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import type { Category } from '@/types';

const categories: Category[] = [
    {
        id: 'clq1234567890',
        path: 'politics',
        title: 'Politics',
        description: 'News about domestic and international politics',
        updatedAt: '2024-11-24T10:00:00Z',
        createdAt: '2024-11-24T10:00:00Z',
        subCategories: [
            {
                id: 'clq1234567891',
                path: 'national-politics',
                title: 'National Politics',
                description: 'Domestic political news',
                updatedAt: '2024-11-24T10:00:00Z',
                createdAt: '2024-11-24T10:00:00Z',
                categoryId: 'clq1234567890',
                category: {
                    id: 'clq1234567890',
                    path: 'politics',
                    title: 'Politics',
                    description:
                        'News about domestic and international politics',
                    updatedAt: '2024-11-24T10:00:00Z',
                    createdAt: '2024-11-24T10:00:00Z',
                    subCategories: [], // Avoid circular reference
                },
                news: [], // Empty array for news
            },
            {
                id: 'clq1234567892',
                path: 'international-politics',
                title: 'International Politics',
                description: 'International political news',
                updatedAt: '2024-11-24T10:00:00Z',
                createdAt: '2024-11-24T10:00:00Z',
                categoryId: 'clq1234567890',
                category: {
                    id: 'clq1234567890',
                    path: 'politics',
                    title: 'Politics',
                    description:
                        'News about domestic and international politics',
                    updatedAt: '2024-11-24T10:00:00Z',
                    createdAt: '2024-11-24T10:00:00Z',
                    subCategories: [], // Avoid circular reference
                },
                news: [], // Empty array for news
            },
        ],
    },
    {
        id: 'clq1234567893',
        path: 'technology',
        title: 'Technology',
        description: 'News about technological developments',
        updatedAt: '2024-11-24T09:30:00Z',
        createdAt: '2024-11-24T09:30:00Z',
        subCategories: [
            {
                id: 'clq1234567894',
                path: 'gadget',
                title: 'Gadgets',
                description: 'News about gadgets and technological devices',
                updatedAt: '2024-11-24T09:30:00Z',
                createdAt: '2024-11-24T09:30:00Z',
                categoryId: 'clq1234567893',
                category: {
                    id: 'clq1234567893',
                    path: 'technology',
                    title: 'Technology',
                    description: 'News about technological developments',
                    updatedAt: '2024-11-24T09:30:00Z',
                    createdAt: '2024-11-24T09:30:00Z',
                    subCategories: [], // Avoid circular reference
                },
                news: [], // Empty array for news
            },
        ],
    },
];

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

const CategoryDialog = ({ isSubCategory = false }) => (
    <DialogContent className="sm:max-w-[425px] border-border bg-background">
        <DialogHeader>
            <DialogTitle className="text-foreground">
                Add New {isSubCategory ? 'Sub' : ''} Category
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
                Create a new {isSubCategory ? 'sub' : ''} category to{' '}
                {isSubCategory
                    ? 'the selected category'
                    : 'group news articles'}
                .
            </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            <FormField
                label="Name"
                id={`${isSubCategory ? 'sub-' : ''}title`}
                maxLength={100}
            />
            <FormField
                label="Path"
                id={`${isSubCategory ? 'sub-' : ''}path`}
                maxLength={100}
            />
            <FormField
                label="Description"
                id={`${isSubCategory ? 'sub-' : ''}description`}
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

const ActionsMenu = ({
    isSubCategory = false,
}: {
    isSubCategory?: boolean;
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
        <DropdownMenuContent
            align="end"
            className="border-border bg-background"
        >
            {!isSubCategory && (
                <Dialog>
                    <DialogTrigger asChild>
                        <DropdownMenuItem
                            className="flex items-center gap-2 hover:bg-muted"
                            onSelect={(e) => e.preventDefault()}
                        >
                            <Plus className="h-4 w-4" />
                            Add Sub Category
                        </DropdownMenuItem>
                    </DialogTrigger>
                    <CategoryDialog isSubCategory />
                </Dialog>
            )}
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

const TableContent = ({ columns }: { columns: string[] }) => {
    const [openCategories, setOpenCategories] = React.useState<string[]>([]);

    const toggleCategory = (categoryId: string) => {
        setOpenCategories((prev) =>
            prev.includes(categoryId)
                ? prev.filter((id) => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    const formatDate = (date: string | Date): string => {
        const dateObject = date instanceof Date ? date : new Date(date);

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
        <Table>
            <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="w-12"></TableHead>
                    {columns.map((column) => (
                        <TableHead
                            key={column}
                            className={`text-muted-foreground ${
                                column === 'Actions'
                                    ? 'text-right'
                                    : 'text-left'
                            }`}
                        >
                            {column}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {categories.flatMap((category) => [
                    <TableRow
                        key={category.id}
                        className="border-border hover:bg-muted"
                    >
                        <TableCell className="w-12 p-0">
                            <Button
                                variant="ghost"
                                className="h-full w-full p-4"
                                onClick={() => toggleCategory(category.id)}
                            >
                                <ChevronRight
                                    className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                                        openCategories.includes(category.id)
                                            ? 'rotate-90'
                                            : ''
                                    }`}
                                />
                            </Button>
                        </TableCell>
                        <TableCell className="font-medium text-foreground">
                            {category.title}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                            {category.path}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                            {category.description}
                        </TableCell>
                        <TableCell className="text-muted-foreground whitespace-nowrap">
                            {formatDate(category.createdAt)}
                        </TableCell>
                        <TableCell className="text-right">
                            <ActionsMenu />
                        </TableCell>
                    </TableRow>,
                    ...category.subCategories.map((subCategory) => (
                        <TableRow
                            key={subCategory.id}
                            className={`border-border bg-muted/50 hover:bg-muted ${
                                openCategories.includes(category.id)
                                    ? ''
                                    : 'hidden'
                            }`}
                        >
                            <TableCell className="w-12"></TableCell>
                            <TableCell className="pl-12 text-muted-foreground">
                                {subCategory.title}
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
                                <ActionsMenu isSubCategory />
                            </TableCell>
                        </TableRow>
                    )),
                ])}
            </TableBody>
        </Table>
    );
};

const Page = () => {
    const columns = [
        'Category Name',
        'Path',
        'Description',
        'Created Date',
        'Actions',
    ];

    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-foreground">
                    Category Management
                </h1>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button
                            className="inline-flex items-center gap-2"
                            variant="secondary"
                        >
                            <PlusCircle className="h-5 w-5" />
                            Add Category
                        </Button>
                    </DialogTrigger>
                    <CategoryDialog />
                </Dialog>
            </div>

            <div className="mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search categories..."
                        className="pl-10 bg-muted border-input text-foreground placeholder:text-muted-foreground"
                    />
                </div>
            </div>

            <div className="rounded-lg border border-border bg-card shadow-lg overflow-hidden">
                <TableContent columns={columns} />
            </div>
        </div>
    );
};

export default Page;
