import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
                <Button asChild variant="outline">
                    <Link href="/dashboard">Idi na Dashboard sa tabovima</Link>
                </Button>
            </main>
        </div>
    );
}
