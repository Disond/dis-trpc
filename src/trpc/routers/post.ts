import { baseProcedure, createTRPCRouter } from "../init";
import prisma from "@/lib/db";

export const postRouter = createTRPCRouter({
    getAll: baseProcedure.query(async () => {
        return prisma.post.findMany({
            select: {
                id: true,
                title: true,
                content: true,
            },
        });
    }),
});
