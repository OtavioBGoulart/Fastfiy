import { FastifyInstance } from "fastify";
import { knex } from "../../database";
import { createTransactionsBodySchema } from "../../models";
import { randomUUID } from "crypto";


export async function transactionsRoutes(app: FastifyInstance) {
    app.post("/", async (req, res) => {

        const { title, amount, type } = createTransactionsBodySchema.parse(req.body);
        
        const transaction = knex("transaction").insert({
            id: randomUUID(),
            title,
            amount: type === "credit" ? amount : amount * -1
        })


        return res.status(201).send()
    });
}