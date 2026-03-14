"use client";

import { useState } from "react";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

// Type-safe tipovi (bez any[])
type User = {
    id: number;
    name: string | null;
    email: string;
};

type Post = {
    id: number;
    title: string;
    content: string | null;
    authorId: number;
};

export function DashboardTabs() {
    const [activeTab, setActiveTab] = useState<"users" | "posts">("users");
    const trpc = useTRPC();

    const { data: users } = useSuspenseQuery(trpc.user.getAll.queryOptions());
    const { data: posts } = useSuspenseQuery(trpc.post.getAll.queryOptions());

    return (
        <div className="space-y-6">
            {/* Tabs */}
            <div className="border-b border-border">
                <nav className="-mb-px flex space-x-8">
                    <button
                        onClick={() => setActiveTab("users")}
                        className={`py-3 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                            activeTab === "users"
                                ? "border-indigo-500 text-indigo-600"
                                : "border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300"
                        }`}
                    >
                        👥 Korisnici
                        <span className="bg-muted px-2 py-0.5 rounded-full text-xs font-medium">
                            {(users as User[]).length}
                        </span>
                    </button>
                    <button
                        onClick={() => setActiveTab("posts")}
                        className={`py-3 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                            activeTab === "posts"
                                ? "border-indigo-500 text-indigo-600"
                                : "border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300"
                        }`}
                    >
                        📝 Postovi
                        <span className="bg-muted px-2 py-0.5 rounded-full text-xs font-medium">
                            {(posts as Post[]).length}
                        </span>
                    </button>
                </nav>
            </div>

            {/* Content */}
            {activeTab === "users" && <UsersGrid users={users as User[]} />}
            {activeTab === "posts" && <PostsGrid posts={posts as Post[]} />}
        </div>
    );
}

function UsersGrid({ users }: { users: User[] }) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {users.map((user) => (
                <div
                    key={user.id}
                    className="p-6 border rounded-xl hover:shadow-md transition-all"
                >
                    <h3 className="font-semibold text-lg">
                        {user.name ?? "Nema ime"}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                        {user.email}
                    </p>
                </div>
            ))}
        </div>
    );
}

function PostsGrid({ posts }: { posts: Post[] }) {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
                <div
                    key={post.id}
                    className="p-6 border rounded-xl hover:shadow-md transition-all"
                >
                    <h3 className="font-semibold text-lg line-clamp-2">
                        {post.title}
                    </h3>
                    {post.content && (
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                            {post.content}
                        </p>
                    )}
                    <div className="mt-4 text-xs text-muted-foreground">
                        Autor ID: {post.authorId}
                    </div>
                </div>
            ))}
        </div>
    );
}
