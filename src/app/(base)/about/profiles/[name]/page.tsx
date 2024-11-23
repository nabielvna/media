import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Mail, Instagram, Twitter, Github } from 'lucide-react';
import { ExecutiveProfiles } from './type';

// This would typically be in a separate data file or fetched from an API
const executiveProfiles: ExecutiveProfiles = {
    'gayu-baruwa': {
        name: 'Gayu Baruwa',
        role: 'Chief Executive Officer',
        bio: 'Former Wall Street Journal editor with 20+ years in journalism',
        image: '/team/gayu.jpg',
        extendedBio: `Gayu Baruwa brings over two decades of journalism excellence to GOAT NEWS. With a distinguished career at the Wall Street Journal, she has led groundbreaking coverage of major global events and transformed digital news delivery. Her vision for journalism combines traditional editorial values with cutting-edge digital innovation.`,
        achievements: [
            'Pulitzer Prize Finalist (2018)',
            'Digital Transformation Leader of the Year (2020)',
            'Named among Top 50 Media Executives by Industry Weekly',
            'Led WSJ s expansion into 12 new markets',
        ],
        contact: {
            email: 'gayubaruwa27@gmail.com',
            instagram: 'gayubrw',
            twitter: '@gayubrw',
            github: 'gayubrw',
        },
    },
    'vidiawan-nabiel-arrasyid': {
        name: 'Vidiawan Nabiel Arrasyid',
        role: 'Chief Technology Officer',
        bio: 'PhD in Computer Science, leading our digital transformation',
        image: '/team/gayu.jpg',
        extendedBio: `Dr. Vidiawan Nabiel Arrasyid leads GOAT NEWS's technological innovation and digital transformation initiatives. With a PhD in Computer Science and extensive experience in AI and machine learning, he has revolutionized how we deliver news in the digital age.`,
        achievements: [
            'Pioneered AI-driven news personalization',
            'Led development of award-winning mobile app',
            'Published 15+ research papers on ML in media',
            'Holds 5 patents in news recommendation systems',
        ],
        contact: {
            email: 'nabielvna@gmail.com',
            instagram: 'nabielvna_',
            twitter: '@nblvna_',
            github: 'nabielvna',
        },
    },
    // Add other executives' data...
};

interface PageProps {
    params: {
        name: string;
    };
}

export default function ExecutiveProfile({ params }: PageProps): JSX.Element {
    const slug = params.name;
    const profile = executiveProfiles[slug];

    if (!profile) {
        return (
            <div className="min-h-screen bg-white dark:bg-black pt-24 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-black dark:text-white mb-4">
                        Profile not found
                    </h1>
                    <Link
                        href="/about/profiles"
                        className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-2"
                    >
                        <ArrowLeft size={20} />
                        Back
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-black pt-24 pb-20">
            <div className="max-w-4xl mx-auto px-4">
                {/* Back Button */}
                <Link
                    href="/about/profiles"
                    className="inline-flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 mb-8 transition-colors"
                >
                    <ArrowLeft size={20} />
                    Back
                </Link>

                {/* Profile Header */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
                    <div className="relative h-48 w-48 shrink-0">
                        <Image
                            src={profile.image}
                            alt={profile.name}
                            fill
                            className="object-cover rounded-full"
                        />
                    </div>
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl font-bold text-black dark:text-white mb-2">
                            {profile.name}
                        </h1>
                        <div className="text-xl text-zinc-600 dark:text-zinc-400 mb-4">
                            {profile.role}
                        </div>
                        <div className="flex gap-4 justify-center md:justify-start">
                            <a
                                href={`mailto:${profile.contact.email}`}
                                className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                                title="Email"
                            >
                                <Mail
                                    size={20}
                                    className="text-zinc-600 dark:text-zinc-400"
                                />
                            </a>
                            <a
                                href={`https://instagram.com/${profile.contact.instagram}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                                title="Instagram"
                            >
                                <Instagram
                                    size={20}
                                    className="text-zinc-600 dark:text-zinc-400"
                                />
                            </a>
                            <a
                                href={`https://twitter.com/${profile.contact.twitter}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                                title="Twitter"
                            >
                                <Twitter
                                    size={20}
                                    className="text-zinc-600 dark:text-zinc-400"
                                />
                            </a>
                            <a
                                href={`https://github.com/${profile.contact.github}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                                title="Github"
                            >
                                <Github
                                    size={20}
                                    className="text-zinc-600 dark:text-zinc-400"
                                />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Biography */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
                        Biography
                    </h2>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {profile.extendedBio}
                    </p>
                </div>

                {/* Contact Information */}
                <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
                        Contact Information
                    </h2>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
                            <Mail size={20} />
                            <a
                                href={`mailto:${profile.contact.email}`}
                                className="hover:text-blue-600 dark:hover:text-blue-400"
                            >
                                {profile.contact.email}
                            </a>
                        </div>
                        <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
                            <Instagram size={20} />
                            <a
                                href={`https://instagram.com/${profile.contact.instagram}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-600 dark:hover:text-blue-400"
                            >
                                {profile.contact.instagram}
                            </a>
                        </div>
                        <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
                            <Twitter size={20} />
                            <a
                                href={`https://twitter.com/${profile.contact.twitter}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-600 dark:hover:text-blue-400"
                            >
                                {profile.contact.twitter}
                            </a>
                        </div>
                        <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
                            <Github size={20} />
                            <a
                                href={`https://github.com/${profile.contact.github}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-600 dark:hover:text-blue-400"
                            >
                                {profile.contact.github}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
