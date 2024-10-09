import { FastifyInstance } from "fastify"

import { 
  makeCreateTransactionController,
  makeDeleteTransactionController,
  makeFetchTransactionsUserController,
  makeUpdateTransactionController,
  makeGetSummaryTransactionController
} from "@/main/factories/transactions"

import { verifyJwt } from "@/main/middlewares"

export async function routesTransactions(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwt)

  app.post("/transaction", (req, res) => 
    makeCreateTransactionController().handle(req, res))
  app.put("/transactions/:transactionId", (req, res) => 
    makeUpdateTransactionController().handle(req, res))

  app.get("/transactions", (req, res) => 
    makeFetchTransactionsUserController().handle(req, res))
  app.get("/transactions/summary", (req, res) => 
    makeGetSummaryTransactionController().handle(req, res))


  app.delete("/transactions/:transactionId", (req, res) => 
    makeDeleteTransactionController().handle(req, res))
}