import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

import { IFetchTransactionsUserUseCase } from "@/domain/use-cases/transactions"

export class FetchTransactionsUserController {
  constructor(private readonly fetchTransactionsUserUseCase: IFetchTransactionsUserUseCase) {}

  async handle(request: FastifyRequest, response: FastifyReply) {
    try {
      const fetchTransactionsUserBody = z.object({
        userId: z.string(),
      })
      
      const fetchTransactionsUserQuery = z.object({
        query: z.enum(["income", "expense"]).nullish()
      }) 

      const {
        userId,
      } = fetchTransactionsUserBody.parse(request.params)

      const {
        query
      } = fetchTransactionsUserQuery.parse(request.query)

      const result = await this.fetchTransactionsUserUseCase.execute({
        userId,
        query: query ?? undefined
      })

      response.status(200).send(result)
    } catch (error: any) {
      return response.status(500).send()
    }
  }
}