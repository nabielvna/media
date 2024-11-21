import React from 'react';
// import Image from 'next/image';

export default function Page() {
    return (
        <main className="container mx-auto pt-24 pb-8 min-h-screen">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2">
                    <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg overflow-hidden">
                        {/* <Image
                src="https://placehold.co/600x400"
                fill
                alt="Featured"
                className="w-full h-[400px] object-cover"
              /> */}
                        <div className="p-6">
                            <span className="text-black dark:text-white font-semibold">
                                BREAKING NEWS
                            </span>
                            <h2 className="text-2xl font-bold mt-2 text-black dark:text-white">
                                Featured Story Headline
                            </h2>
                            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="space-y-6">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="bg-zinc-50 dark:bg-zinc-900 rounded-lg overflow-hidden"
                        >
                            {/* <Image
                  src="https://placehold.co/600x400"
                  fill
                  alt={`Top Story ${i}`}
                  className="w-full h-48 object-cover"
                /> */}
                            <div className="p-4">
                                <h3 className="font-bold text-black dark:text-white">
                                    Top Story {i}
                                </h3>
                                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                                    Quick summary of the story...
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {['Politics', 'Business', 'Technology', 'Sports'].map(
                    (category) => (
                        <div
                            key={category}
                            className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-4"
                        >
                            <h2 className="text-xl font-bold mb-4 text-black dark:text-white">
                                {category}
                            </h2>
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex space-x-3">
                                        {/* <Image
                      src="https://placehold.co/600x400"
                      fill
                      alt={`${category} ${i}`}
                      className="w-20 h-20 object-cover rounded"
                    /> */}
                                        <div>
                                            <h3 className="font-medium text-sm text-black dark:text-white">
                                                {category} Story {i}
                                            </h3>
                                            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                                                2 hours ago
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                )}
            </div>
        </main>
    );
}
