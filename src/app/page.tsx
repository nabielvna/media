import React from 'react';
// import { Bell, Search, User } from 'lucide-react';
import Image from 'next/image';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      {/* <nav className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-red-600">NEWS</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search news..."
                  className="w-64 pl-10 pr-4 py-2 border rounded-lg"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <Bell className="h-6 w-6 text-gray-600" />
              <User className="h-6 w-6 text-gray-600" />
            </div>
          </div>
        </div>
      </nav> */}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Featured News */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg overflow-hidden">
              {/* <Image
                src="https://placehold.co/600x400"
                fill
                alt="Featured"
                className="w-full h-[400px] object-cover"
              /> */}
              <div className="p-6">
                <span className="text-red-600 font-semibold">BREAKING NEWS</span>
                <h2 className="text-2xl font-bold mt-2">Featured Story Headline</h2>
                <p className="mt-2 text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden">
                {/* <Image
                  src="https://placehold.co/600x400"
                  fill
                  alt={`Top Story ${i}`}
                  className="w-full h-48 object-cover"
                /> */}
                <div className="p-4">
                  <h3 className="font-bold">Top Story {i}</h3>
                  <p className="text-sm text-gray-600 mt-1">Quick summary of the story...</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* News Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {['Politics', 'Business', 'Technology', 'Sports'].map((category) => (
            <div key={category} className="bg-white rounded-lg p-4">
              <h2 className="text-xl font-bold mb-4">{category}</h2>
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
                      <h3 className="font-medium text-sm">{category} Story {i}</h3>
                      <p className="text-xs text-gray-600 mt-1">2 hours ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
