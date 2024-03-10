import { z } from "zod";

export const createTransactionsBodySchema = z.object({
    title: z.string(),
    amount: z.string(),
    type: z.enum(["credit", "debit", "pix"])
})

