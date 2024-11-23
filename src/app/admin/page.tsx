import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';

type DashboardData = {
    title: string;
    value: string;
    trend: number;
};

type Activity = {
    id: string;
    user: string;
    activity: string;
    date: string;
    status: 'Diterbitkan' | 'Draft' | 'Selesai';
};

const Page = () => {
    const dashboardData: DashboardData[] = [
        { title: 'Total Artikel', value: '1,234', trend: 12 },
        { title: 'Artikel Aktif', value: '892', trend: 5.8 },
        { title: 'Total Pembaca', value: '45.2K', trend: 15.3 },
        { title: 'Komentar Baru', value: '156', trend: 8.1 },
    ];

    const activities: Activity[] = [
        {
            id: '1',
            user: 'John Doe',
            activity: 'Memposting artikel baru',
            date: '2024-11-24',
            status: 'Diterbitkan',
        },
        {
            id: '2',
            user: 'Jane Smith',
            activity: 'Mengedit artikel',
            date: '2024-11-24',
            status: 'Draft',
        },
        {
            id: '3',
            user: 'Bob Johnson',
            activity: 'Moderasi komentar',
            date: '2024-11-23',
            status: 'Selesai',
        },
    ];

    const getStatusColor = (status: Activity['status']) => {
        switch (status.toLowerCase()) {
            case 'diterbitkan':
                return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
            case 'draft':
                return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200';
            case 'selesai':
                return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200';
            default:
                return 'bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200';
        }
    };

    return (
        <div className="pt-16 space-y-6">
            <h1 className="text-2xl font-bold">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {dashboardData.map((data, index) => (
                    <Card key={index}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                {data.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-baseline space-x-4">
                                <div className="text-2xl font-bold">
                                    {data.value}
                                </div>
                                <span
                                    className={`inline-flex items-center text-sm font-medium ${
                                        data.trend >= 0
                                            ? 'text-green-600 dark:text-green-400'
                                            : 'text-red-600 dark:text-red-400'
                                    }`}
                                >
                                    {data.trend >= 0 ? (
                                        <ArrowUpIcon className="w-4 h-4 mr-1" />
                                    ) : (
                                        <ArrowDownIcon className="w-4 h-4 mr-1" />
                                    )}
                                    {Math.abs(data.trend)}%
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Activities</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="divide-y divide-zinc-200 dark:divide-zinc-700">
                        <div className="grid grid-cols-4 py-3 text-sm font-medium text-muted-foreground">
                            <div>User</div>
                            <div>Activity</div>
                            <div>Date</div>
                            <div>Status</div>
                        </div>
                        {activities.map((activity) => (
                            <div
                                key={activity.id}
                                className="grid grid-cols-4 py-4 text-sm"
                            >
                                <div className="font-medium">
                                    {activity.user}
                                </div>
                                <div className="text-muted-foreground">
                                    {activity.activity}
                                </div>
                                <div className="text-muted-foreground">
                                    {activity.date}
                                </div>
                                <div>
                                    <span
                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                                            activity.status
                                        )}`}
                                    >
                                        {activity.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Page;