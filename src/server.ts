import { env } from "./env";
import fastify from "fastify";
import { knex } from "./database";
import crypto from "node:crypto";
import { transactionsRoutes } from "./env/routes/transactions";

const app = fastify();

app.register(transactionsRoutes, {
    prefix: "transactions"
});

app.listen({
    port: env.PORT
}).then(() => console.log(`Server is Running on ${env.PORT}`));
