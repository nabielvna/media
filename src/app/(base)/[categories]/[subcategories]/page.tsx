import { Metadata } from 'next';
import { Card } from '@/components/ui/card';
import { notFound } from 'next/navigation';
import { memo } from 'react';
import Link from 'next/link';

const VALID_CATEGORIES = [
    'politics',
    'business',
    'tech',
    'sports',
    'entertainment',
    'lifestyle',
] as const;

const CATEGORY_SUBCATEGORIES: Record<CategoryType, ReadonlyArray<string>> = {
    politics: ['National', 'International'],
    business: ['Macro', 'Financial Exchange', 'Real Sector'],
    tech: ['Gadgets', 'Electronics', 'Telco'],
    sports: ['Soccer', 'Boxing', 'All Sport'],
    entertainment: ['Movies', 'Music', 'Celebrity'],
    lifestyle: ['Health', 'Travel', 'Food'],
};

type CategoryType = (typeof VALID_CATEGORIES)[number];

type NewsStory = Readonly<{
    title: string;
    content: string;
    image?: string;
    publishDate: string;
}>;

type SubcategoryData = Readonly<{
    category: string;
    subcategory: string;
    stories: ReadonlyArray<NewsStory>;
}>;

type StoryCardProps = Readonly<{
    story: NewsStory;
    category: string;
    subcategory: string;
}>;

const StoryCard = memo(({ story, category, subcategory }: StoryCardProps) => {
    const newsSlug = encodeURIComponent(
        story.title.toLowerCase().replace(/\s+/g, '-')
    );

    return (
        <Card className="overflow-hidden bg-zinc-50 dark:bg-zinc-900 hover:shadow-lg transition-all duration-300">
            <Link href={`/${category}/${subcategory}/${newsSlug}`}>
                <div className="cursor-pointer">
                    <div className="aspect-video relative bg-zinc-200 dark:bg-zinc-800">
                        {/* Image placeholder - same as category page */}
                    </div>
                    <div className="p-4">
                        <h3 className="font-bold text-xl text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                            {story.title}
                        </h3>
                        <p className="text-zinc-600 dark:text-zinc-400 mt-2">
                            {story.content}
                        </p>
                        <div className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
                            {story.publishDate}
                        </div>
                    </div>
                </div>
            </Link>
        </Card>
    );
});

StoryCard.displayName = 'StoryCard';

type Params = Readonly<{
    categories: string;
    subcategories: string;
}>;

async function getData(
    category: string,
    subcategory: string
): Promise<SubcategoryData> {
    const lowerCategory = category.toLowerCase() as CategoryType;

    if (!VALID_CATEGORIES.includes(lowerCategory)) {
        notFound();
    }

    const subcategories = CATEGORY_SUBCATEGORIES[lowerCategory];
    const decodedSubcategory = decodeURIComponent(subcategory);
    const normalizedSubcategory = decodedSubcategory
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    if (!subcategories.includes(normalizedSubcategory)) {
        notFound();
    }

    // Simulate fetching stories for this subcategory
    const stories = Array.from({ length: 9 }, (_, i) => ({
        title: `${normalizedSubcategory} Story ${i + 1}`,
        content:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Breaking news and latest updates...',
        image: '/api/placeholder/400/200',
        publishDate: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }),
    }));

    return {
        category: category.charAt(0).toUpperCase() + category.slice(1),
        subcategory: normalizedSubcategory,
        stories,
    };
}

export async function generateMetadata({
    params,
}: Readonly<{ params: Params }>): Promise<Metadata> {
    try {
        const data = await getData(params.categories, params.subcategories);

        return {
            title: `${data.subcategory} News - ${data.category} - GOAT`,
            description: `Latest ${data.subcategory} news in ${data.category}`,
        };
    } catch {
        return {
            title: 'Not Found - GOAT',
            description: 'The requested page could not be found.',
        };
    }
}

export default async function SubcategoryPage({
    params,
}: Readonly<{ params: Params }>) {
    const data = await getData(params.categories, params.subcategories);

    return (
        <div className="min-h-screen pt-24 pb-8">
            <header className="mb-8">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                        <Link
                            href={`/${params.categories}`}
                            className="hover:text-blue-600 dark:hover:text-blue-400"
                        >
                            {data.category}
                        </Link>
                        <span>/</span>
                        <span className="text-black dark:text-white">
                            {data.subcategory}
                        </span>
                    </div>
                    <h1 className="text-4xl font-bold text-black dark:text-white">
                        {data.subcategory} News
                    </h1>
                </div>
            </header>

            <main className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.stories.map((story, index) => (
                        <StoryCard
                            key={index}
                            story={story}
                            category={params.categories}
                            subcategory={params.subcategories}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}
