import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FolderTree } from 'lucide-react';

interface StatisticCardProps {
    title: string;
    value: string | number;
    description?: string;
}

interface DashboardLayoutProps {
    heading: string;
    action?: React.ReactNode;
    children: React.ReactNode;
}

const cards = [
    {
        title: 'Main Categories',
        value: '3',
        description: 'Active categories',
    },
    {
        title: 'Total Sub Categories',
        value: '14',
        description: 'In 3 categories',
    },
    {
        title: 'New News',
        value: '5',
        description: 'Added this week',
    },
];

const StatisticCard = ({ title, value, description }: StatisticCardProps) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <FolderTree className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
            {description && (
                <p className="text-xs text-muted-foreground">{description}</p>
            )}
        </CardContent>
    </Card>
);

const Layout = ({ heading, action, children }: DashboardLayoutProps) => {
    return (
        <div className="pt-16">
            {/* Header Section */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">{heading}</h1>
                {action}
            </div>

            {/* Stats Section */}
            <div className="grid mb-6 gap-4 md:grid-cols-3">
                {cards.map((card, index) => (
                    <StatisticCard key={index} {...card} />
                ))}
            </div>

            {/* Main Content */}
            {children}
        </div>
    );
};

export default Layout;
