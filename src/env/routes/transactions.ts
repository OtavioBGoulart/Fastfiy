import { FastifyInstance } from "fastify";
import { knex } from "../../database";
import { createTransactionIdSchema, createTransactionsBodySchema } from "../../models";
import { randomUUID } from "crypto";


export async function transactionsRoutes(app: FastifyInstance) {
    app.get("/", async (req, res) => {

        const transactions = await knex("transaction").select(); 

        return { transactions };
    });

    app.get("/:id", async (req, res) => {

        const { id } = createTransactionIdSchema.parse(req.params);

        const transactions = await knex("transaction").where("id",id).first()

        return { transactions };


    })


    app.post("/", async (req, res) => {
        console.log("oi")

        const { title, amount, type } = createTransactionsBodySchema.parse(req.body);
        
        await knex("transaction").insert({
            id: randomUUID(),
            title,
            amount: type === "credit" ? amount : amount * -1,
        })


        return res.status(201).send()
    });
}