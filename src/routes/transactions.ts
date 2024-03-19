import { FastifyInstance } from "fastify";
import { knex } from "../database";
import { createTransactionIdSchema, createTransactionsBodySchema } from "../models";
import { randomUUID } from "crypto";
import { checkSessionIdExist } from "../middleware/check-sessiond-exist";


export async function transactionsRoutes(app: FastifyInstance) {
    app.get("/", { preHandler: [checkSessionIdExist]} ,async (req, res) => {
        const { sessionId } = req.cookies

        const transactions = await knex("transaction").where("session_id", sessionId).select();

        return { transactions };
    });

    app.get("/:id",{ preHandler: [checkSessionIdExist]}, async (req, res) => {
        const { sessionId } = req.cookies

        const { id } = createTransactionIdSchema.parse(req.params);

        const transactions = await knex("transaction").where("id",id).andWhere("session_id", sessionId).first()

        return { transactions };


    })

    app.get("/summary", { preHandler: [checkSessionIdExist]}, async (req, res) => {
        const { sessionId } = req.cookies

        const summary = await knex("transaction").where("session_id", sessionId).sum("amount", { as: "amount" }).first();

        return { summary };
    })


    app.post("/", async (req, res) => {
        console.log("oi")

        const { title, amount, type } = createTransactionsBodySchema.parse(req.body);

        let sessionId = req.cookies.sessionId;

        if (!sessionId) {
            sessionId = randomUUID();
            
            res.cookie("sessionId", sessionId, {
                path: "/",
                maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
            })
        }
        
        await knex("transaction").insert({
            id: randomUUID(),
            title,
            amount: type === "credit" ? amount : amount * -1,
            session_id: sessionId
        })


        return res.status(201).send()
    });
}