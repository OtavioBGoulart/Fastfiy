import { env } from "./env";
import fastify from "fastify";
import { knex } from "./database";
import crypto from "node:crypto"

const app = fastify();

app.get("/hello", async (req, res) => {

    const transaction = knex("transaction").select("*").returning("*")
    return transaction
});

app.listen({
    port: env.PORT
}).then(() => console.log("Server is Running"))