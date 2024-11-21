export interface ExecutiveProfile {
    name: string;
    role: string;
    bio: string;
    image: string;
    extendedBio: string;
    achievements: string[];
    contact: {
        email: string;
        instagram: string;
        twitter: string;
        github: string;
    };
}

export interface ExecutiveProfiles {
    [key: string]: ExecutiveProfile;
}
