import { z } from "zod";

export const createTransactionsBodySchema = z.object({
    title: z.string(),
    amount: z.number(),
    type: z.enum(["credit", "debit"]),
})

export const createTransactionIdSchema = z.object({
    id: z.string().uuid()
})

