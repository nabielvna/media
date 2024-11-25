'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Type,
    Image as ImageIcon,
    GripVertical,
    X,
    Minus,
    ArrowLeft
} from 'lucide-react';
import { createNews } from '@/actions/news';
import { getSubCategories } from '@/actions/subcategory';
import type { SubCategory } from '@/types';
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from '@hello-pangea/dnd';
import { useRouter } from 'next/navigation';
import RichTextEditor from '@/components/tiptap/rich-text-editor';

// Types
type SectionContent = {
    type: 'text' | 'image';
    data: {
        text?: string;
        imageUrl?: string;
        alt?: string;
        description?: string;
    };
};

type FormSection = {
    order: number;
    isSeparator: boolean;
    content: SectionContent;
};

type NewsFormData = {
    title: string;
    description: string;
    thumbnailUrl: string;
    subCategoryId: string;
    sections: FormSection[];
};

// Form Field Component
const FormField = ({
    label,
    id,
    maxLength,
    value,
    onChange,
    isTextarea = false,
    error,
}: {
    label: string;
    id: string;
    maxLength: number;
    value: string;
    onChange: (value: string) => void;
    isTextarea?: boolean;
    error?: string;
}) => (
    <div className="grid gap-2">
        <Label htmlFor={id} className="text-muted-foreground">
            {label}
        </Label>
        <div>
            {isTextarea ? (
                <Textarea
                    id={id}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    maxLength={maxLength}
                    className="bg-muted border-input"
                    placeholder={`Enter ${label.toLowerCase()}`}
                />
            ) : (
                <Input
                    id={id}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    maxLength={maxLength}
                    className="bg-muted border-input"
                    placeholder={`Enter ${label.toLowerCase()}`}
                />
            )}
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    </div>
);

// Section Components
const TextSection = ({
    value,
    onChange,
}: {
    value: string;
    onChange: (value: string) => void;
}) => (
    <RichTextEditor
        value={value}
        onChange={onChange}
    />
);

const ImageSection = ({
    data,
    onChange,
}: {
    data: { imageUrl: string; alt: string; description: string };
    onChange: (data: { imageUrl: string; alt: string; description: string }) => void;
}) => (
    <div className="space-y-4">
        <FormField
            label="Image URL"
            id="imageUrl"
            maxLength={1000}
            value={data.imageUrl}
            onChange={(value) => onChange({ ...data, imageUrl: value })}
        />
        <FormField
            label="Alt Text"
            id="alt"
            maxLength={50}
            value={data.alt}
            onChange={(value) => onChange({ ...data, alt: value })}
        />
        <FormField
            label="Description"
            id="description"
            maxLength={150}
            value={data.description}
            onChange={(value) => onChange({ ...data, description: value })}
            isTextarea
        />
    </div>
);

// Section Item Component
const SectionItem = ({
    section,
    index,
    onUpdate,
    onDelete,
}: {
    section: FormSection;
    index: number;
    onUpdate: (section: FormSection) => void;
    onDelete: () => void;
}) => (
    <Draggable draggableId={`section-${index}`} index={index}>
        {(provided) => (
            <Card
                ref={provided.innerRef}
                {...provided.draggableProps}
                className="mb-4"
            >
                <CardContent className="pt-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div {...provided.dragHandleProps}>
                            <GripVertical className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <Label>Separator</Label>
                                    <Switch
                                        checked={section.isSeparator}
                                        onCheckedChange={(checked) =>
                                            onUpdate({
                                                ...section,
                                                isSeparator: checked,
                                            })
                                        }
                                    />
                                </div>
                                {!section.isSeparator && (
                                    <Select
                                        value={section.content.type}
                                        onValueChange={(value: 'text' | 'image') =>
                                            onUpdate({
                                                ...section,
                                                content: {
                                                    type: value,
                                                    data: value === 'text'
                                                        ? { text: '' }
                                                        : { imageUrl: '', alt: '', description: '' }
                                                }
                                            })
                                        }
                                    >
                                        <SelectTrigger className="w-[120px]">
                                            <SelectValue placeholder="Type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="text">Text</SelectItem>
                                            <SelectItem value="image">Image</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={onDelete}
                                    className="ml-auto"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                    {!section.isSeparator && (
                        <div className="mt-4">
                            {section.content.type === 'text' ? (
                                <TextSection
                                    value={section.content.data.text || ''}
                                    onChange={(text) =>
                                        onUpdate({
                                            ...section,
                                            content: {
                                                ...section.content,
                                                data: { text }
                                            }
                                        })
                                    }
                                />
                            ) : (
                                <ImageSection
                                    data={{
                                        imageUrl: section.content.data.imageUrl || '',
                                        alt: section.content.data.alt || '',
                                        description: section.content.data.description || ''
                                    }}
                                    onChange={(data) =>
                                        onUpdate({
                                            ...section,
                                            content: {
                                                ...section.content,
                                                data
                                            }
                                        })
                                    }
                                />
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        )}
    </Draggable>
);

const CreateNewsPage = () => {
    const router = useRouter();
    const { toast } = useToast();
    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [formData, setFormData] = useState<NewsFormData>({
        title: '',
        description: '',
        thumbnailUrl: '',
        subCategoryId: '',
        sections: []
    });

    // TODO: Replace with actual user ID from auth
    const userId = "123"; // This should come from your auth context/session

    useEffect(() => {
        const fetchSubCategories = async () => {
            try {
                const data = await getSubCategories();
                setSubCategories(data);
                if (data.length > 0) {
                    setFormData(prev => ({ ...prev, subCategoryId: data[0].id }));
                }
            } catch (error) {
                if (error instanceof Error) {
                    toast({
                        title: 'Error fetching categories',
                        description: error.message,
                        variant: 'destructive',
                    });
                }
            }
        };

        fetchSubCategories();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        try {
            const transformedSections = formData.sections.map(section => {
                // For separator sections, return a text section with empty content
                if (section.isSeparator) {
                    return {
                        order: section.order,
                        isSeparator: true,
                        content: {
                            type: 'text' as const,
                            data: { text: '' }
                        }
                    };
                }

                // For text sections, ensure text property exists
                if (section.content.type === 'text') {
                    return {
                        order: section.order,
                        isSeparator: false,
                        content: {
                            type: 'text' as const,
                            data: {
                                text: section.content.data.text || ''
                            }
                        }
                    };
                }

                // For image sections, ensure all required properties exist
                return {
                    order: section.order,
                    isSeparator: false,
                    content: {
                        type: 'image' as const,
                        data: {
                            imageUrl: section.content.data.imageUrl || '',
                            alt: section.content.data.alt || '',
                            description: section.content.data.description || ''
                        }
                    }
                };
            });

            const newsData = {
                title: formData.title,
                description: formData.description,
                thumbnailUrl: formData.thumbnailUrl || undefined, // Make it optional
                subCategoryId: formData.subCategoryId,
                userId,
                sections: transformedSections
            };

            await createNews(newsData);
            toast({ title: 'News created successfully' });
            router.push('/news');
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

    const addSection = (type: 'text' | 'image' | 'separator') => {
        const newSection: FormSection = {
            order: formData.sections.length,
            isSeparator: type === 'separator',
            content: type === 'text'
                ? { type: 'text', data: { text: '' } }
                : { type: 'image', data: { imageUrl: '', alt: '', description: '' } }
        };

        setFormData(prev => ({
            ...prev,
            sections: [...prev.sections, newSection]
        }));
    };

    const updateSection = (index: number, updatedSection: FormSection) => {
        const newSections = [...formData.sections];
        newSections[index] = updatedSection;
        setFormData(prev => ({ ...prev, sections: newSections }));
    };

    const deleteSection = (index: number) => {
        setFormData(prev => ({
            ...prev,
            sections: prev.sections.filter((_, i) => i !== index)
                .map((section, i) => ({ ...section, order: i }))
        }));
    };

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const sections = Array.from(formData.sections);
        const [removed] = sections.splice(result.source.index, 1);
        sections.splice(result.destination.index, 0, removed);

        setFormData(prev => ({
            ...prev,
            sections: sections.map((section, index) => ({
                ...section,
                order: index
            }))
        }));
    };

    return (
        <div className="container mx-auto pt-16 max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => router.push('/admin/news')}
                    className="gap-2"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </Button>
                <h1 className="text-2xl font-bold">Create News</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <Card>
                    <CardContent className="pt-6">
                        <div className="grid gap-6">
                            <FormField
                                label="Title"
                                id="title"
                                maxLength={200}
                                value={formData.title}
                                onChange={(value) =>
                                    setFormData(prev => ({ ...prev, title: value }))
                                }
                                error={errors.title}
                            />
                            <FormField
                                label="Description"
                                id="description"
                                maxLength={200}
                                value={formData.description}
                                onChange={(value) =>
                                    setFormData(prev => ({
                                        ...prev,
                                        description: value,
                                    }))
                                }
                                error={errors.description}
                                isTextarea
                            />
                            <FormField
                                label="Thumbnail URL"
                                id="thumbnailUrl"
                                maxLength={1000}
                                value={formData.thumbnailUrl}
                                onChange={(value) =>
                                    setFormData(prev => ({
                                        ...prev,
                                        thumbnailUrl: value,
                                    }))
                                }
                                error={errors.thumbnailUrl}
                            />
                            <div className="grid gap-2">
                                <Label className="text-muted-foreground">
                                    Category
                                </Label>
                                <Select
                                    value={formData.subCategoryId}
                                    onValueChange={(value) =>
                                        setFormData(prev => ({
                                            ...prev,
                                            subCategoryId: value,
                                        }))
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
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
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-medium">Content Sections</h3>
                                <div className="flex gap-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => addSection('text')}
                                    >
                                        <Type className="h-4 w-4 mr-2" />
                                        Add Text
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => addSection('image')}
                                    >
                                        <ImageIcon className="h-4 w-4 mr-2" />
                                        Add Image
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => addSection('separator')}
                                    >
                                        <Minus className="h-4 w-4 mr-2" />
                                        Add Separator
                                    </Button>
                                </div>
                            </div>

                            <DragDropContext onDragEnd={handleDragEnd}>
                                <Droppable droppableId="sections">
                                    {(provided) => (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            className="space-y-4"
                                        >
                                            {formData.sections.map((section, index) => (
                                                <SectionItem
                                                    key={`section-${index}`}
                                                    section={section}
                                                    index={index}
                                                    onUpdate={(updatedSection) =>
                                                        updateSection(index, updatedSection)
                                                    }
                                                    onDelete={() => deleteSection(index)}
                                                />
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.push('/news')}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" variant="default">
                        Create News
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default CreateNewsPage;
