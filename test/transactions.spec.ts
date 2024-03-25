import { test, beforeAll, afterAll, describe, expect } from "vitest";
import supertest from "supertest"; "supertest";
import { app } from "../src/app";

describe("Transactions Routes", () => {

    beforeAll( async () => {
        await app.ready()
    }); 
    
    
    afterAll( async () => {
        await app.close()
    });
    
    test("User can create a new transaction", async() => {
        await supertest(app.server).post("/transactions").send({
                title: "New transaction",
                amount: 5000,
                type: "credit"
            }).expect(201)
    })

    test("should be able to list all transactions", async () => {
        const createTransactionResponse =  await supertest(app.server).post("/transactions").send({
            title: "New transaction",
            amount: 5000,
            type: "credit"
        })

        const cookies = createTransactionResponse.get("Set-Cookie")

        const listTransactionsResponse = await supertest(app.server)
        .get("/transactions")
        .set("Cookie", cookies)
        .expect(200)

        expect(listTransactionsResponse.body.transactions).toEqual([
            expect.objectContaining({
                title: "New transaction",
                amount: 5000
            })
        ])

    })
})
