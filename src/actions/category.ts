// actions/category.ts
'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import type { Category, SubCategory } from '@/types';
import { Prisma } from '@prisma/client';

const CategorySchema = z.object({
    title: z.string().min(1).max(100),
    path: z.string().min(1).max(100),
    description: z.string().min(1).max(200),
});

const SubCategorySchema = CategorySchema.extend({
    categoryId: z.string().min(1),
});

function handleError(error: unknown): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
            case 'P2002':
                throw new Error('A category with this path already exists');
            case 'P2025':
                throw new Error('Category not found');
            default:
                throw new Error(`Database error: ${error.code}`);
        }
    } else if (error instanceof z.ZodError) {
        throw new Error(`Validation error: ${error.errors[0].message}`);
    } else if (error instanceof Error) {
        throw new Error(error.message);
    } else {
        throw new Error('An unexpected error occurred');
    }
}

export async function getCategories(): Promise<Category[]> {
    try {
        const categories = await prisma.category.findMany({
            include: {
                subCategories: {
                    include: {
                        news: true,
                        category: true,
                    },
                },
            },
        });
        return categories as Category[];
    } catch (error) {
        handleError(error);
    }
}

export async function createCategory(
    data: z.infer<typeof CategorySchema>
): Promise<Category> {
    try {
        const validation = CategorySchema.safeParse(data);
        if (!validation.success) {
            throw new z.ZodError(validation.error.errors);
        }

        const category = await prisma.category.create({
            data: validation.data,
            include: {
                subCategories: {
                    include: {
                        news: true,
                        category: true,
                    },
                },
            },
        });

        revalidatePath('/categories');
        return category as Category;
    } catch (error) {
        handleError(error);
    }
}

export async function createSubCategory(
    data: z.infer<typeof SubCategorySchema>
): Promise<SubCategory> {
    try {
        const validation = SubCategorySchema.safeParse(data);
        if (!validation.success) {
            throw new z.ZodError(validation.error.errors);
        }

        const subCategory = await prisma.subCategory.create({
            data: validation.data,
            include: {
                news: true,
                category: {
                    include: {
                        subCategories: true,
                    },
                },
            },
        });

        revalidatePath('/categories');
        return subCategory as SubCategory;
    } catch (error) {
        handleError(error);
    }
}

export async function updateCategory(
    id: string,
    data: z.infer<typeof CategorySchema>
): Promise<Category> {
    try {
        const validation = CategorySchema.safeParse(data);
        if (!validation.success) {
            throw new z.ZodError(validation.error.errors);
        }

        const category = await prisma.category.update({
            where: { id },
            data: validation.data,
            include: {
                subCategories: {
                    include: {
                        news: true,
                        category: true,
                    },
                },
            },
        });

        revalidatePath('/categories');
        return category as Category;
    } catch (error) {
        handleError(error);
    }
}

export async function updateSubCategory(
    id: string,
    data: z.infer<typeof SubCategorySchema>
): Promise<SubCategory> {
    try {
        const validation = SubCategorySchema.safeParse(data);
        if (!validation.success) {
            throw new z.ZodError(validation.error.errors);
        }

        const subCategory = await prisma.subCategory.update({
            where: { id },
            data: validation.data,
            include: {
                news: true,
                category: {
                    include: {
                        subCategories: true,
                    },
                },
            },
        });

        revalidatePath('/categories');
        return subCategory as SubCategory;
    } catch (error) {
        handleError(error);
    }
}

export async function deleteCategory(id: string): Promise<Category> {
    try {
        const category = await prisma.category.delete({
            where: { id },
            include: {
                subCategories: {
                    include: {
                        news: true,
                        category: true,
                    },
                },
            },
        });

        revalidatePath('/categories');
        return category as Category;
    } catch (error) {
        handleError(error);
    }
}

export async function deleteSubCategory(id: string): Promise<SubCategory> {
    try {
        const subCategory = await prisma.subCategory.delete({
            where: { id },
            include: {
                news: true,
                category: {
                    include: {
                        subCategories: true,
                    },
                },
            },
        });

        revalidatePath('/categories');
        return subCategory as SubCategory;
    } catch (error) {
        handleError(error);
    }
}
