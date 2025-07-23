'use client';
import Link from 'next/link';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NotFound() {

    const route = useRouter()
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
            <div className="max-w-lg w-full text-center">
                {/* 404 Animation */}
                <div className="mb-8">
                    <div className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
                        404
                    </div>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
                </div>

                {/* Error Message */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        Page Not Found
                    </h1>
                    <p className="text-gray-600 text-lg mb-2">
                        Oops! The page you&apos;re looking for doesn&apos;t exist.
                    </p>
                    <p className="text-gray-500">
                        It might have been moved, deleted, or you entered the wrong URL.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors w-full sm:w-auto"
                    >
                        <Home className="w-4 h-4" />
                        Go Home
                    </Link>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                            onClick={() => route.back()}
                            className="inline-flex items-center justify-center gap-2 border border-gray-300 hover:border-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Go Back
                        </button>

                        <Link
                            href="/search"
                            className="inline-flex items-center justify-center gap-2 border border-gray-300 hover:border-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
                        >
                            <Search className="w-4 h-4" />
                            Search
                        </Link>
                    </div>
                </div>


            </div>
        </div>
    );
}

