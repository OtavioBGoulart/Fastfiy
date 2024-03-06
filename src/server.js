"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fastify_1 = require("fastify");
var app = (0, fastify_1.default)();
app.get("/hello", function () {
    return "Hello World";
});
app.listen({
    port: 3333
}).then(function () { return console.log("Server is Running"); });
