import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { PostsClient } from "./PostsClient";

export default async function UsersPage() {
    prefetch(trpc.post.getAll.queryOptions());

    return (
        <div className="container mx-auto p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Svi postovi</h1>
                <p className="text-muted-foreground">
                    Prikazani svi postovi iz baze
                </p>
            </div>

            <HydrateClient>
                <ErrorBoundary fallback={"Something went wrong!"}>
                    <Suspense
                        fallback={
                            <div className="flex items-center justify-center py-12">
                                <div className="text-lg text-muted-foreground">
                                    Učitavanje postova...
                                </div>
                            </div>
                        }
                    >
                        <PostsClient />
                    </Suspense>
                </ErrorBoundary>
            </HydrateClient>
        </div>
    );
}
