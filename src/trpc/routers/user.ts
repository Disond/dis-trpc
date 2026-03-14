import prisma from "@/lib/db";
import { baseProcedure, createTRPCRouter } from "../init";

export const userRouter = createTRPCRouter({
    getAll: baseProcedure.query(async () => {
        return prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
            },
        });
    }),
});
