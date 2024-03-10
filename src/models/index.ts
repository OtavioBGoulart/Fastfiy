import { z } from "zod";

export const createTransactionsBodySchema = z.object({
    title: z.string(),
    amount: z.number(),
    type: z.enum(["credit", "debit"]),
})

