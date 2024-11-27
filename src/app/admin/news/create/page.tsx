"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Image as ImageIcon, Type as TextIcon, Grip, X } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from 'next/image';
import RichTextEditor from '@/components/tiptap/rich-text-editor';
import { getSubCategories } from '@/actions/subcategory';
import { SubCategory } from '@/types';

type Section = {
  id: string;
  order: number;
  isSeparator: boolean;
  title: string;
  content: {
    type: 'text' | 'image';
    data: TextContent | ImageContent;
  };
};

type TextContent = {
  text: string;
};

type ImageContent = {
  imageUrl: string;
  alt: string;
  description: string;
};

type EditorViewProps = {
  title: string;
  setTitle: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  thumbnailUrl: string;
  setThumbnailUrl: (value: string) => void;
  subCategoryId: string;
  setSubCategoryId: (value: string) => void;
  subCategories: SubCategory[];
  isLoadingSubCategories: boolean;
  sections: Section[];
  setSections: (sections: Section[]) => void;
  isDragging: boolean;
  draggedIndex: number | null;
  handleDragStart: (index: number) => void;
  handleDragOver: (e: React.DragEvent, index: number) => void;
  handleDragEnd: () => void;
  addSection: (type: 'text' | 'image') => void;
  updateSection: (index: number, data: Partial<Section>) => void;
  removeSection: (index: number) => void;
};

type PreviewViewProps = {
  title: string;
  description: string;
  thumbnailUrl: string;
  sections: Section[];
};

const EditorView = ({
  title,
  setTitle,
  description,
  setDescription,
  thumbnailUrl,
  setThumbnailUrl,
  subCategoryId,
  setSubCategoryId,
  subCategories,
  isLoadingSubCategories,
  sections,
  setSections,
  isDragging,
  draggedIndex,
  handleDragStart,
  handleDragOver,
  handleDragEnd,
  addSection,
  updateSection,
  removeSection
}: EditorViewProps) => (
  <div className="space-y-8">
    <Card>
      <CardContent className="p-6 space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="title" className="text-zinc-800 dark:text-zinc-200 font-medium">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter news title"
              className="mt-1 text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400"
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-zinc-800 dark:text-zinc-200 font-medium">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter news description"
              className="mt-1 text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400"
            />
          </div>

          <div>
            <Label htmlFor="thumbnail" className="text-zinc-800 dark:text-zinc-200 font-medium">Thumbnail URL</Label>
            <Input
              id="thumbnail"
              value={thumbnailUrl}
              onChange={(e) => setThumbnailUrl(e.target.value)}
              placeholder="Enter thumbnail URL"
              className="mt-1 text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400"
            />
          </div>

          <div>
            <Label htmlFor="subcategory" className="text-zinc-800 dark:text-zinc-200 font-medium">Sub Category</Label>
            <Select value={subCategoryId} onValueChange={setSubCategoryId} disabled={isLoadingSubCategories}>
              <SelectTrigger className="mt-1 text-zinc-800 dark:text-zinc-200">
                <SelectValue placeholder={isLoadingSubCategories ? "Loading..." : "Select a sub category"} />
              </SelectTrigger>
              <SelectContent>
                {subCategories.map((subCategory) => (
                  <SelectItem key={subCategory.id} value={subCategory.id}>
                    {subCategory.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>

    <div className="space-y-4">
      <div className="flex gap-2">
        <Button onClick={() => addSection('text')} variant="outline" className="text-zinc-800 dark:text-zinc-200">
          <TextIcon className="w-4 h-4 mr-2" />
          Add Text
        </Button>
        <Button onClick={() => addSection('image')} variant="outline" className="text-zinc-800 dark:text-zinc-200">
          <ImageIcon className="w-4 h-4 mr-2" />
          Add Image
        </Button>
        <Button onClick={() => setSections([...sections, {
          id: Math.random().toString(36).substr(2, 9),
          order: sections.length,
          isSeparator: true,
          title: '',
          content: { type: 'text', data: { text: '' } }
        }])} variant="outline" className="text-zinc-800 dark:text-zinc-200">
          Add Separator
        </Button>
      </div>

      <div className="space-y-4">
        {sections.map((section, index) => (
          <Card
            key={section.id}
            className={`${isDragging && draggedIndex === index ? 'opacity-50' : ''}`}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Grip className="w-4 h-4 cursor-move text-zinc-600 dark:text-zinc-400" />
                  <span className="text-sm text-zinc-800 dark:text-zinc-200 font-medium">Section {index + 1}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={section.isSeparator}
                    onCheckedChange={(checked) => updateSection(index, { isSeparator: checked })}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSection(index)}
                    className="text-zinc-700 hover:text-red-600 dark:text-zinc-300"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {!section.isSeparator && (
                <div className="space-y-4">
                  <div>
                    <Label className="text-zinc-800 dark:text-zinc-200 font-medium">Section Title</Label>
                    <Input
                      value={section.title}
                      onChange={(e) => updateSection(index, { title: e.target.value })}
                      placeholder="Enter section title"
                      className="mt-1 text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400"
                    />
                  </div>

                  {section.content.type === 'text' && (
                    <div>
                      <Label className="text-zinc-800 dark:text-zinc-200 font-medium">Content</Label>
                      <div className="mt-1">
                        <RichTextEditor
                          content={(section.content.data as TextContent).text}
                          onChange={(newContent) => updateSection(index, {
                            content: {
                              type: 'text',
                              data: { text: newContent }
                            }
                          })}
                          placeholder="Start writing your content..."
                        />
                      </div>
                    </div>
                  )}

                  {section.content.type === 'image' && (
                    <div className="space-y-4">
                      <div>
                        <Label className="text-zinc-800 dark:text-zinc-200 font-medium">Image URL</Label>
                        <Input
                          value={(section.content.data as ImageContent).imageUrl}
                          onChange={(e) => updateSection(index, {
                            content: {
                              type: 'image',
                              data: {
                                ...(section.content.data as ImageContent),
                                imageUrl: e.target.value
                              }
                            }
                          })}
                          placeholder="Image URL"
                          className="mt-1 text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400"
                        />
                      </div>
                      <div>
                        <Label className="text-zinc-800 dark:text-zinc-200 font-medium">Alt Text</Label>
                        <Input
                          value={(section.content.data as ImageContent).alt}
                          onChange={(e) => updateSection(index, {
                            content: {
                              type: 'image',
                              data: {
                                ...(section.content.data as ImageContent),
                                alt: e.target.value
                              }
                            }
                          })}
                          placeholder="Alt text"
                          className="mt-1 text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400"
                        />
                      </div>
                      <div>
                        <Label className="text-zinc-800 dark:text-zinc-200 font-medium">Image Description</Label>
                        <Input
                          value={(section.content.data as ImageContent).description}
                          onChange={(e) => updateSection(index, {
                            content: {
                              type: 'image',
                              data: {
                                ...(section.content.data as ImageContent),
                                description: e.target.value
                              }
                            }
                          })}
                          placeholder="Image description"
                          className="mt-1 text-zinc-800 dark:text-zinc-200 placeholder:text-zinc-400"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {section.isSeparator && (
                <Separator className="my-4" />
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </div>
);

const PreviewView = ({
  title,
  description,
  thumbnailUrl,
  sections
}: PreviewViewProps) => (
    <div className="space-y-8">
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
          <span>Selected Category</span>
          <span>•</span>
          <span>{format(new Date(), 'MMM d, yyyy')}</span>
        </div>
        <h1 className="text-4xl font-bold text-zinc-800 dark:text-zinc-200">{title || 'Untitled Article'}</h1>
        <p className="text-xl text-zinc-700 dark:text-zinc-300">{description}</p>
      </div>
    </div>

    {thumbnailUrl && (
      <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
        <Image
          src={thumbnailUrl}
          alt={title}
          className="object-cover"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    )}

    <div className="space-y-8">
      {sections.map((section) => (
        <div key={section.id}>
          {section.isSeparator ? (
            <Separator className="my-8" />
          ) : (
            <Card className="border-none shadow-none">
              <CardContent className="p-0 space-y-4">
                {section.title && (
                  <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-200">{section.title}</h2>
                )}

                {section.content.type === 'text' && (section.content.data as TextContent).text && (
                  <div className="prose prose-zinc dark:prose-invert max-w-none
                    prose-headings:text-zinc-800 dark:prose-headings:text-zinc-200
                    prose-p:text-zinc-700 dark:prose-p:text-zinc-300
                    prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-zinc-800 dark:prose-strong:text-zinc-200
                    prose-ul:list-disc prose-ul:pl-4 prose-ul:my-2
                    prose-ol:list-decimal prose-ol:pl-4 prose-ol:my-2
                    prose-li:text-zinc-700 dark:prose-li:text-zinc-300 prose-li:my-1
                    prose-blockquote:border-l-4 prose-blockquote:border-zinc-300 dark:prose-blockquote:border-zinc-700
                    prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-zinc-600 dark:prose-blockquote:text-zinc-400
                    prose-img:rounded-lg prose-img:my-4
                    prose-code:text-zinc-800 dark:prose-code:text-zinc-200
                    prose-pre:bg-zinc-100 dark:prose-pre:bg-zinc-800 prose-pre:p-4 prose-pre:rounded-lg
                    prose-hr:border-zinc-200 dark:prose-hr:border-zinc-800">
                    <div
                      dangerouslySetInnerHTML={{ __html: (section.content.data as TextContent).text }}
                    />
                  </div>
                )}

                {section.content.type === 'image' && (section.content.data as ImageContent).imageUrl && (
                  <div className="space-y-3">
                    <div className="relative h-[300px] w-full overflow-hidden rounded-lg">
                      <Image
                        src={(section.content.data as ImageContent).imageUrl}
                        alt={(section.content.data as ImageContent).alt || ''}
                        className="object-cover"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    {(section.content.data as ImageContent).description && (
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 italic text-center">
                        {(section.content.data as ImageContent).description}
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      ))}
    </div>
  </div>
);

const CreateNewsPage = () => {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [thumbnailUrl, setThumbnailUrl] = useState('');
    const [subCategoryId, setSubCategoryId] = useState('');
    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
    const [isLoadingSubCategories, setIsLoadingSubCategories] = useState(true);
    const [sections, setSections] = useState<Section[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
    const [activeTab, setActiveTab] = useState('editor');

    // Fetch subcategories when component mounts
    useEffect(() => {
      const fetchSubCategories = async () => {
        try {
          const data = await getSubCategories();
          setSubCategories(data);
        } catch (error) {
          console.error('Failed to fetch subcategories:', error);
        } finally {
          setIsLoadingSubCategories(false);
        }
      };

      fetchSubCategories();
    }, []);

    const addSection = (type: 'text' | 'image') => {
      const newSection: Section = {
        id: Math.random().toString(36).substr(2, 9),
        order: sections.length,
        isSeparator: false,
        title: '',
        content: {
          type,
          data: type === 'text'
            ? { text: '' }
            : { imageUrl: '', alt: '', description: '' }
        }
      };
      setSections([...sections, newSection]);
    };

    const updateSection = (index: number, data: Partial<Section>) => {
      const newSections = [...sections];
      newSections[index] = { ...newSections[index], ...data };
      setSections(newSections);
    };

    const removeSection = (index: number) => {
      const newSections = sections.filter((_, i) => i !== index);
      setSections(newSections);
    };

    const handleDragStart = (index: number) => {
      setIsDragging(true);
      setDraggedIndex(index);
    };

    const handleDragOver = (e: React.DragEvent, index: number) => {
      e.preventDefault();
      if (draggedIndex === null) return;

      const newSections = [...sections];
      const draggedSection = newSections[draggedIndex];
      newSections.splice(draggedIndex, 1);
      newSections.splice(index, 0, draggedSection);
      setSections(newSections);
      setDraggedIndex(index);
    };

    const handleDragEnd = () => {
      setIsDragging(false);
      setDraggedIndex(null);
    };

    const handleSubmit = async () => {
      // Convert sections to the format expected by the API
      const formattedSections = sections.map((section) => ({
        order: section.order,
        isSeparator: section.isSeparator,
        content: {
          type: section.content.type,
          data: section.content.data
        }
      }));

      const newsData = {
        title,
        description,
        thumbnailUrl,
        subCategoryId,
        sections: formattedSections
      };

      try {
        // Add your API call here
        console.log('Submitting news:', newsData);
        // Redirect to news list or view page after successful creation
        router.push('/news');
      } catch (error) {
        console.error('Failed to create news:', error);
      }
    };

    return (
      <div className="min-h-screen pt-16">
        <div className="max-w-4xl mx-auto p-6">
          <div className="sticky top-0 z-10 pb-6">
            <div className="flex justify-between items-center mb-6">
              <div className="space-y-1">
                <h1 className="text-3xl font-bold text-zinc-800 dark:text-zinc-200">Create News</h1>
                <p className="text-zinc-600 dark:text-zinc-400">Create a new article with rich content sections</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit}>
                  Publish
                </Button>
              </div>
            </div>

            <Tabs defaultValue="editor" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="editor" className="text-zinc-800 dark:text-zinc-200">
                  <EyeOff className="w-4 h-4 mr-2" />
                  Editor
                </TabsTrigger>
                <TabsTrigger value="preview" className="text-zinc-800 dark:text-zinc-200">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </TabsTrigger>
              </TabsList>

              <div className="mt-6">
                <TabsContent value="editor">
                  <EditorView
                    title={title}
                    setTitle={setTitle}
                    description={description}
                    setDescription={setDescription}
                    thumbnailUrl={thumbnailUrl}
                    setThumbnailUrl={setThumbnailUrl}
                    subCategoryId={subCategoryId}
                    setSubCategoryId={setSubCategoryId}
                    subCategories={subCategories}
                    isLoadingSubCategories={isLoadingSubCategories}
                    sections={sections}
                    setSections={setSections}
                    isDragging={isDragging}
                    draggedIndex={draggedIndex}
                    handleDragStart={handleDragStart}
                    handleDragOver={handleDragOver}
                    handleDragEnd={handleDragEnd}
                    addSection={addSection}
                    updateSection={updateSection}
                    removeSection={removeSection}
                  />
                </TabsContent>
                <TabsContent value="preview">
                  <PreviewView
                    title={title}
                    description={description}
                    thumbnailUrl={thumbnailUrl}
                    sections={sections}
                  />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    );
  };

  export default CreateNewsPage;
