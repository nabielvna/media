import Image from 'next/image';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-black py-20">
            <div className="max-w-7xl mx-auto px-4">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 text-black dark:text-white">
                        About GOAT NEWS
                    </h1>
                    {/* <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
                        Delivering the most impactful news stories with
                        unmatched precision and authority.
                    </p> */}
                </div>

                {/* Mission Section */}
                <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                    <div className="relative h-[600px]">
                        <Image
                            src="/goat.png"
                            alt="Newsroom"
                            fill
                            className="object-cover rounded-lg"
                        />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold mb-6 text-black dark:text-white">
                            Our Mission
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                            At GOAT NEWS, we strive to be the most trusted
                            source of news and information. Our commitment to
                            journalistic excellence drives us to deliver
                            accurate, unbiased, and timely news coverage across
                            all platforms.
                        </p>
                        <p className="text-zinc-600 dark:text-zinc-400">
                            Founded in 2024, we have quickly established
                            ourselves as a leading voice in digital journalism,
                            combining traditional reporting values with
                            cutting-edge technology.
                        </p>
                    </div>
                </div>

                {/* Values Section */}
                {/* <div className="grid md:grid-cols-3 gap-8 mb-20">
                    {[
                        {
                            title: 'Accuracy',
                            description:
                                'Every story is thoroughly fact-checked and verified before publication.',
                        },
                        {
                            title: 'Independence',
                            description:
                                'We maintain editorial independence and report without fear or favor.',
                        },
                        {
                            title: 'Innovation',
                            description:
                                'Embracing new technologies to deliver news in the most effective way.',
                        },
                    ].map((value) => (
                        <div
                            key={value.title}
                            className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-lg"
                        >
                            <h3 className="text-xl font-bold mb-4 text-black dark:text-white">
                                {value.title}
                            </h3>
                            <p className="text-zinc-600 dark:text-zinc-400">
                                {value.description}
                            </p>
                        </div>
                    ))}
                </div> */}

                {/* Team Section */}
                {/* <div className="text-center">
                    <h2 className="text-3xl font-bold mb-12 text-black dark:text-white">
                        Our Team
                    </h2>
                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            {
                                name: 'Gayu Baruwa',
                                role: 'Editor in Chief',
                                image: '/team/gayu.jpg',
                            },
                            {
                                name: 'Vidiawan Nabiel Arrasyid',
                                role: 'Managing Editor',
                                image: '/team/gayu.jpg',
                            },
                            {
                                name: 'Stevanza Gian Maheswara',
                                role: 'Editor-in-Chief',
                                image: '/team/gayu.jpg',
                            },
                            {
                                name: 'M. Fadhil Abhista Daniswara',
                                role: 'Editor-in-Chief',
                                image: '/team/gayu.jpg',
                            },
                        ].map((member) => (
                            <div key={member.name} className="text-center">
                                <div className="relative h-48 w-48 mx-auto mb-4">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover rounded-full"
                                    />
                                </div>
                                <h3 className="font-bold text-lg text-black dark:text-white">
                                    {member.name}
                                </h3>
                                <p className="text-zinc-600 dark:text-zinc-400">
                                    {member.role}
                                </p>
                            </div>
                        ))}
                    </div>
                </div> */}
            </div>
        </div>
    );
}
