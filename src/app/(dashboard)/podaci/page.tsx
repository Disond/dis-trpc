// app/(dashboard)/page.tsx ← ZAMIJENI SADRŽAJ OVOG FAJLA
import { HydrateClient, prefetch, trpc } from "@/trpc/server";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { DashboardTabs } from "@/components/DashboardTabs";

export default async function DashboardPage() {
    prefetch(trpc.user.getAll.queryOptions());
    prefetch(trpc.post.getAll.queryOptions());

    return (
        <div className="container mx-auto p-8 max-w-7xl">
            <div className="mb-12">
                <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground mt-2">
                    Korisnici i postovi
                </p>
            </div>

            <HydrateClient>
                <ErrorBoundary
                    fallback={
                        <div className="p-12 border-2 rounded-2xl bg-red-50 border-red-200">
                            <h2 className="text-2xl font-bold text-red-800 mb-4">
                                Greška
                            </h2>
                            <p className="text-red-700">Pritisni F5.</p>
                        </div>
                    }
                >
                    <Suspense
                        fallback={
                            <div className="flex items-center justify-center py-20">
                                <div className="text-xl text-muted-foreground animate-pulse">
                                    Učitavanje...
                                </div>
                            </div>
                        }
                    >
                        <DashboardTabs />
                    </Suspense>
                </ErrorBoundary>
            </HydrateClient>
        </div>
    );
}
