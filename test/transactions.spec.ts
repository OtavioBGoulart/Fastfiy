import { test, beforeAll, afterAll, describe } from "vitest";
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
        const response =  await supertest(app.server).post("/transactions").send({
                title: "New transaction",
                amount: 5000,
                type: "credit"
            }).expect(201)
    })
})