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
    slug?: string;
    subcategory: string;
}>;

type NewsData = Readonly<{
    category: string;
    featuredStory: NewsStory;
    latestNews: ReadonlyArray<NewsStory>;
    subcategories: ReadonlyArray<string>;
}>;

type StoryCardProps = Readonly<{
    story: NewsStory;
    className?: string;
    category: string;
}>;

const StoryCard = memo(
    ({ story, className = '', category }: StoryCardProps) => {
        const newsSlug = encodeURIComponent(
            story.title.toLowerCase().replace(/\s+/g, '-')
        );
        const subcategorySlug = encodeURIComponent(
            story.subcategory.toLowerCase().replace(/\s+/g, '-')
        );

        return (
            <Card
                className={`overflow-hidden bg-zinc-50 dark:bg-zinc-900 ${className} hover:shadow-lg transition-all duration-300`}
            >
                <Link href={`/${category}/${subcategorySlug}/${newsSlug}`}>
                    <div className="cursor-pointer">
                        {/* <Image
                                src={story.image ?? '/api/placeholder/400/200'}
                                alt={story.title}
                                className="w-full h-48 object-cover"
                                loading="lazy"
                                fill
                            /> */}
                        <div className="p-4">
                            <div className="text-sm text-blue-600 dark:text-blue-400 mb-2">
                                {story.subcategory}
                            </div>
                            <h3 className="font-bold text-xl text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                {story.title}
                            </h3>
                            <p className="text-zinc-600 dark:text-zinc-400 mt-2">
                                {story.content}
                            </p>
                            <div className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
                                3 hours ago
                            </div>
                        </div>
                    </div>
                </Link>
            </Card>
        );
    }
);

StoryCard.displayName = 'StoryCard';

type Params = Readonly<{
    categories: string;
}>;

async function getData(category: string): Promise<NewsData> {
    const lowerCategory = category.toLowerCase() as CategoryType;

    if (!VALID_CATEGORIES.includes(lowerCategory)) {
        notFound();
    }

    const capitalizedCategory =
        category.charAt(0).toUpperCase() + category.slice(1);
    const subcategories = CATEGORY_SUBCATEGORIES[lowerCategory];

    // Helper function to get random subcategory
    const getRandomSubcategory = () => {
        return subcategories[Math.floor(Math.random() * subcategories.length)];
    };

    return {
        category: capitalizedCategory,
        featuredStory: {
            title: `Featured ${capitalizedCategory} Story`,
            content:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Breaking news and latest updates...',
            image: '/api/placeholder/1200/600',
            subcategory: getRandomSubcategory(),
        },
        latestNews: Array.from({ length: 6 }, (_, i) => ({
            title: `${capitalizedCategory} Story ${i + 1}`,
            content:
                'Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...',
            image: '/api/placeholder/400/200',
            subcategory: getRandomSubcategory(),
        })),
        subcategories,
    };
}

export async function generateMetadata({
    params,
}: Readonly<{ params: Params }>): Promise<Metadata> {
    const isValid = VALID_CATEGORIES.includes(
        params.categories.toLowerCase() as CategoryType
    );

    if (!isValid) {
        return {
            title: 'Not Found - GOAT',
            description: 'The requested page could not be found.',
        };
    }

    const capitalizedCategory =
        params.categories.charAt(0).toUpperCase() + params.categories.slice(1);

    return {
        title: `${capitalizedCategory.toUpperCase()} NEWS - GOAT`,
        description: `Latest ${params.categories} news and updates`,
    };
}

export function generateStaticParams() {
    return VALID_CATEGORIES.map((category) => ({
        categories: category,
    }));
}

export default async function CategoryPage({
    params,
}: Readonly<{ params: Params }>) {
    const data = await getData(params.categories);

    return (
        <div className="min-h-screen pt-24 pb-8">
            <header className="mb-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold text-black dark:text-white mb-6">
                        {data.category} News
                    </h1>

                    {/* Subcategories */}
                    <div className="flex flex-wrap gap-4">
                        {data.subcategories.map((subcategory) => {
                            const slug = encodeURIComponent(
                                subcategory.toLowerCase().replace(/\s+/g, '-')
                            );
                            return (
                                <Link
                                    key={subcategory}
                                    href={`/${params.categories}/${slug}`}
                                    className="flex-1 min-w-[160px]"
                                >
                                    <span
                                        className="block w-full text-center px-6 py-3 bg-zinc-100 dark:bg-zinc-900
                                        hover:bg-zinc-200 dark:hover:bg-zinc-700
                                        rounded-lg text-sm font-medium
                                        text-zinc-900 dark:text-zinc-50
                                        transition-all duration-300
                                        border border-zinc-200 dark:border-zinc-700
                                        hover:shadow-md"
                                    >
                                        {subcategory}
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4">
                {/* Featured Story */}
                <StoryCard
                    story={data.featuredStory}
                    className="mb-8 hover:shadow-xl transition-all duration-300"
                    category={params.categories}
                />

                {/* Latest News Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.latestNews.map((story, index) => (
                        <StoryCard
                            key={index}
                            story={story}
                            category={params.categories}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
}
