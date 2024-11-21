import { Card } from '@/components/ui/card';

interface NewsData {
    category: string;
    featuredStory: {
        title: string;
        content: string;
        image: string;
    };
    latestNews: Array<{
        title: string;
        content: string;
        image?: string;
    }>;
    subcategories: string[];
}

export default function NewsPage({ data }: { data: NewsData }) {
    return (
        <div className="min-h-screen">
            <div className="bg-white dark:bg-black border-b dark:border-gray-800">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-4xl font-bold text-black dark:text-white">
                        {data.category} News
                    </h1>
                </div>
            </div>

            <main className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <Card className="overflow-hidden bg-zinc-50 dark:bg-zinc-900">
                        <img
                            src={
                                data.featuredStory.image ||
                                '/api/placeholder/1200/600'
                            }
                            alt="Featured Story"
                            className="w-full h-[400px] object-cover"
                        />
                        <div className="p-6">
                            <span className="text-black dark:text-white font-semibold">
                                FEATURED
                            </span>
                            <h2 className="text-3xl font-bold mt-2 text-black dark:text-white">
                                {data.featuredStory.title}
                            </h2>
                            <p className="mt-4 text-zinc-600 dark:text-zinc-400 text-lg">
                                {data.featuredStory.content}
                            </p>
                            <div className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
                                2 hours ago
                            </div>
                        </div>
                    </Card>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.latestNews.map((story, index) => (
                        <Card
                            key={index}
                            className="overflow-hidden bg-zinc-50 dark:bg-zinc-900"
                        >
                            <img
                                src={story.image || `/api/placeholder/400/200`}
                                alt={story.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="font-bold text-xl text-black dark:text-white">
                                    {story.title}
                                </h3>
                                <p className="text-zinc-600 dark:text-zinc-400 mt-2">
                                    {story.content}
                                </p>
                                <div className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
                                    3 hours ago
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">
                        {data.category} Categories
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {data.subcategories.map((category) => (
                            <Card
                                key={category}
                                className="p-4 text-center hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer
                          bg-zinc-50 dark:bg-zinc-900 text-black dark:text-white"
                            >
                                {category}
                            </Card>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
