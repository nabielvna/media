export interface AdminUser {
    id: string;
    name: string;
    email: string;
    role: string;
}

export interface Activity {
    id: string;
    user: string;
    activity: string;
    date: string;
    status: string;
}

export interface DashboardStats {
    title: string;
    value: string | number;
    trend: number;
}

export type Account = {
    id: string;
    userId: string;
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token?: string | null;
    access_token?: string | null;
    expires_at?: number | null;
    token_type?: string | null;
    scope?: string | null;
    id_token?: string | null;
    session_state?: string | null;
    user: User;
};

export type Session = {
    id: string;
    sessionToken: string;
    userId: string;
    expires: Date;
    user: User;
};

export type User = {
    id: string;
    name?: string | null;
    email?: string | null;
    emailVerified?: Date | null;
    image?: string | null;
    password?: string | null;
    accounts: Account[];
    sessions: Session[];
    news: News[];
    userInteractions: UserInteraction[];
};

export type VerificationToken = {
    identifier: string;
    token: string;
    expires: Date;
};

export type News = {
    id: string;
    path: string;
    title: string;
    thumbnailUrl?: string | null;
    description: string;
    updatedAt: string | Date;
    createdAt: string | Date;
    subCategoryId: string;
    userId: string;
    user: User;
    subCategory: SubCategory;
    sections: Section[];
    newsInteractions: NewsInteraction[];
};

export type Section = {
    id: string;
    order: number;
    isSeparator: boolean;
    updatedAt: string | Date;
    createdAt: string | Date;
    newsId: string;
    news: News;
    sectionImages: SectionImage[];
    sectionTexts: SectionText[];
};

export type SectionImage = {
    id: string;
    imageUrl: string;
    alt: string;
    description: string;
    updatedAt: string | Date;
    createdAt: string | Date;
    sectionId: string;
    section: Section;
};

export type SectionText = {
    id: string;
    text: string;
    updatedAt: string | Date;
    createdAt: string | Date;
    sectionId: string;
    section: Section;
};

export type Category = {
    id: string;
    path: string;
    title: string;
    description: string;
    updatedAt: string | Date;
    createdAt: string | Date;
    subCategories: SubCategory[];
};

export type SubCategory = {
    id: string;
    path: string;
    title: string;
    description: string;
    updatedAt: string | Date;
    createdAt: string | Date;
    categoryId: string;
    category: Category;
    news: News[];
};

export type UserInteraction = {
    id: string;
    contributionScore: number;
    updatedAt: string | Date;
    createdAt: string | Date;
    userId: string;
    user: User;
    likes: Like[];
    bookmarks: Bookmark[];
    comments: Comment[];
};

export type NewsInteraction = {
    id: string;
    popularityScore: number;
    updatedAt: string | Date;
    createdAt: string | Date;
    newsId: string;
    news: News;
    likes: Like[];
    bookmarks: Bookmark[];
    comments: Comment[];
};

export type Like = {
    id: string;
    updatedAt: string | Date;
    createdAt: string | Date;
    newsInteractionId: string;
    userInteractionId: string;
    newsInteraction: NewsInteraction;
    userInteraction: UserInteraction;
};

export type Bookmark = {
    id: string;
    updatedAt: string | Date;
    createdAt: string | Date;
    newsInteractionId: string;
    userInteractionId: string;
    newsInteraction: NewsInteraction;
    userInteraction: UserInteraction;
};

export type Comment = {
    id: string;
    text: string;
    updatedAt: string | Date;
    createdAt: string | Date;
    newsInteractionId: string;
    userInteractionId: string;
    newsInteraction: NewsInteraction;
    userInteraction: UserInteraction;
};
