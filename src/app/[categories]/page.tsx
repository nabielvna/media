import { Metadata } from 'next';
import { Card } from '@/components/ui/card';
import { notFound } from 'next/navigation';
import { memo } from 'react';
import Link from 'next/link';
// import Image from 'next/image';

const VALID_CATEGORIES = [
    'politics',
    'business',
    'tech',
    'sports',
    'entertainment',
    'lifestyle',
] as const;

// Definisi subcategories untuk setiap kategori sesuai dengan gambar
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
        const slug = encodeURIComponent(
            story.title.toLowerCase().replace(/\s+/g, '-')
        );

        return (
            <Card
                className={`overflow-hidden bg-zinc-50 dark:bg-zinc-900 ${className} hover:shadow-lg transition-all duration-300`}
            >
                <Link href={`/${category}/${slug}`}>
                    <div className="cursor-pointer">
                        {/* <Image
                        src={story.image ?? '/api/placeholder/400/200'}
                        alt={story.title}
                        className="w-full h-48 object-cover"
                        loading="lazy"
                        fill
                    /> */}
                        <div className="p-4">
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

    return {
        category: capitalizedCategory,
        featuredStory: {
            title: `Featured ${capitalizedCategory} Story`,
            content:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Breaking news and latest updates...',
            image: '/api/placeholder/1200/600',
        },
        latestNews: Array.from({ length: 6 }, (_, i) => ({
            title: `${capitalizedCategory} Story ${i + 1}`,
            content:
                'Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...',
            image: '/api/placeholder/400/200',
        })),
        subcategories: CATEGORY_SUBCATEGORIES[lowerCategory],
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
            <header className="bg-white dark:bg-black">
                <div className="container mx-auto">
                    <h1 className="text-4xl font-bold text-black dark:text-white">
                        {data.category} News
                    </h1>
                </div>
            </header>

            <main className="container mx-auto py-8">
                <StoryCard
                    story={data.featuredStory}
                    className="mb-8"
                    category={params.categories}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.latestNews.map((story, index) => (
                        <StoryCard
                            key={index}
                            story={story}
                            category={params.categories}
                        />
                    ))}
                </div>

                <section className="mt-12">
                    <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">
                        {data.category} Categories
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {data.subcategories.map((subcategory) => {
                            const slug = encodeURIComponent(
                                subcategory.toLowerCase().replace(/\s+/g, '-')
                            );
                            return (
                                <Link
                                    key={subcategory}
                                    href={`/${params.categories}/${slug}`}
                                >
                                    <Card
                                        className="p-4 text-center hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer
                                        bg-zinc-50 dark:bg-zinc-900 text-black dark:text-white transition-all duration-300"
                                    >
                                        {subcategory}
                                    </Card>
                                </Link>
                            );
                        })}
                    </div>
                </section>
            </main>
        </div>
    );
}
