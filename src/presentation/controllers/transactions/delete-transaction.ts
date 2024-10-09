import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

import { IDeleteTransactionUseCase } from "@/domain/use-cases/transactions"
import { TransactionNotExists } from "@/application/errors/errors"

export class DeleteTransactionController {
  constructor(private readonly deleteTransactionUseCase: IDeleteTransactionUseCase) {}

  async handle(request: FastifyRequest, response: FastifyReply) {
    try {
      const deleteTransactionParams = z.object({
        transactionId: z.string().uuid(),
      })

      const {
        transactionId
      } = deleteTransactionParams.parse(request.params)

      await this.deleteTransactionUseCase.execute({
        transactionId
      })

      return response.status(200).send()
    } catch (error: any) {
      if(error instanceof TransactionNotExists) {
        return response.status(400).send({ message: error.message })
      }

      return response.status(500).send()
    }
  }
}