// app/users/page.tsx
import { prefetch, trpc } from "@/trpc/server";
import { Suspense } from "react";
import { UsersClient } from "./UsersClient";

export default async function UsersPage() {
    prefetch(trpc.user.getAll.queryOptions());
    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-8">Svi korisnici</h1>
            <Suspense fallback={<div>Učitavanje...</div>}>
                <UsersClient />
            </Suspense>
        </div>
    );
}
