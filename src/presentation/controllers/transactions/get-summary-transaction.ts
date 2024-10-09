import { FastifyReply, FastifyRequest } from "fastify"

import { IGetSummaryTransactionsUserUseCase } from "@/domain/use-cases/transactions"

export class GetSummaryTransactionController {
  constructor(private readonly getSummaryTransactionUseCase: IGetSummaryTransactionsUserUseCase) {}

  async handle(request: FastifyRequest, response: FastifyReply) {
    try {
      const result = await this.getSummaryTransactionUseCase.execute({
        userId: request.user.sub,
      })

      return response.status(200).send(result)
    } catch (error: any) {
      throw error
    }
  }
}