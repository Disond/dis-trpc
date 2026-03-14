"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export function UsersClient() {
    const trpc = useTRPC();

    // ✅ Destrukturizuj data iz objekta
    const { data: users } = useSuspenseQuery(trpc.user.getAll.queryOptions());

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {users.map((user) => (
                <div key={user.id} className="p-6 border rounded-lg shadow-sm">
                    <h3 className="font-semibold text-lg">
                        {user.name || "Nema ime"}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{user.email}</p>
                </div>
            ))}
        </div>
    );
}
