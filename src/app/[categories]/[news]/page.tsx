import { Metadata } from 'next';
import { Card } from '@/components/ui/card';
import { notFound } from 'next/navigation';
// import Image from 'next/image';

const VALID_CATEGORIES = [
    'politics',
    'business',
    'tech',
    'sports',
    'entertainment',
    'lifestyle',
] as const;

type CategoryType = (typeof VALID_CATEGORIES)[number];

type NewsDetail = {
    title: string;
    content: string;
    category: string;
    author: string;
    publishDate: string;
    image?: string;
    tags: string[];
    relatedStories: Array<{
        title: string;
        slug: string;
    }>;
};

async function getNewsData(
    category: string,
    slug: string
): Promise<NewsDetail> {
    // Validasi kategori
    if (!VALID_CATEGORIES.includes(category.toLowerCase() as CategoryType)) {
        notFound();
    }

    // Di sini nantinya akan diganti dengan fetching data dari API/database
    return {
        title: `${decodeURIComponent(slug)
            .split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')}`,
        content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
        molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
        numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
        optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
        obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
        nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
        tenetur error, harum nesciunt ipsum debitis quas aliquid.

        Reprehenderit, quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos
        sapiente officiis modi at sunt excepturi expedita sint? Sed quibusdam
        recusandae alias error harum maxime adipisci amet laborum.`,
        category: category.charAt(0).toUpperCase() + category.slice(1),
        author: 'John Doe',
        publishDate: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }),
        image: '/api/placeholder/1200/600',
        tags: [
            'News',
            category.charAt(0).toUpperCase() + category.slice(1),
            'Featured',
        ],
        relatedStories: [
            {
                title: `Related ${category} Story 1`,
                slug: `related-${category}-story-1`,
            },
            {
                title: `Related ${category} Story 2`,
                slug: `related-${category}-story-2`,
            },
            {
                title: `Related ${category} Story 3`,
                slug: `related-${category}-story-3`,
            },
        ],
    };
}

export async function generateMetadata({
    params,
}: {
    params: { categories: string; news: string };
}): Promise<Metadata> {
    const newsData = await getNewsData(params.categories, params.news);

    return {
        title: `${newsData.title} - GOAT NEWS`,
        description: newsData.content.substring(0, 160) + '...',
    };
}

export default async function NewsPage({
    params,
}: {
    params: { categories: string; news: string };
}) {
    const newsData = await getNewsData(params.categories, params.news);

    return (
        <div className="min-h-screen pt-24 pb-8">
            <main className="container mx-auto px-4">
                {/* Header Section */}
                <div className="max-w-4xl mx-auto mb-8">
                    <div className="space-y-4">
                        <div className="flex gap-2">
                            {newsData.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 px-3 py-1 rounded-full text-sm"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white">
                            {newsData.title}
                        </h1>
                        <div className="flex items-center gap-4 text-zinc-600 dark:text-zinc-400">
                            <div className="flex items-center gap-2">
                                <div className="h-10 w-10 rounded-full bg-zinc-200 dark:bg-zinc-700" />
                                <span>{newsData.author}</span>
                            </div>
                            <span>•</span>
                            <time>{newsData.publishDate}</time>
                        </div>
                    </div>
                </div>

                {/* Main Image */}
                <div className="max-w-4xl mx-auto mb-8 aspect-video relative rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                    {/* <Image
                        src={newsData.image}
                        alt={newsData.title}
                        className="object-cover"
                        fill
                        priority
                    /> */}
                </div>

                {/* Content */}
                <div className="max-w-4xl mx-auto">
                    <div className="prose prose-zinc dark:prose-invert max-w-none">
                        {newsData.content
                            .split('\n\n')
                            .map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                    </div>
                </div>

                {/* Related Stories */}
                <div className="max-w-4xl mx-auto mt-16">
                    <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">
                        Related Stories
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {newsData.relatedStories.map((story) => (
                            <Card
                                key={story.slug}
                                className="p-4 hover:shadow-lg transition-all duration-300 cursor-pointer
                                    bg-zinc-50 dark:bg-zinc-900"
                            >
                                <h3 className="font-bold text-black dark:text-white">
                                    {story.title}
                                </h3>
                                <p className="text-zinc-600 dark:text-zinc-400 mt-2 text-sm">
                                    Click to read more
                                </p>
                            </Card>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
