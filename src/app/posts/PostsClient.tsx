"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export function PostsClient() {
    const trpc = useTRPC();

    // ✅ Destrukturizuj data iz objekta
    const { data: posts } = useSuspenseQuery(trpc.post.getAll.queryOptions());

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
                <div key={post.id} className="p-6 border rounded-lg shadow-sm">
                    <h3 className="font-semibold text-lg">
                        {post.title || "Title"}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{post.content}</p>
                </div>
            ))}
        </div>
    );
}
