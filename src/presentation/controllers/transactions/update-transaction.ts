import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

import { IUpdateTransactionUseCase } from "@/domain/use-cases/transactions"
import { TransactionNotExists } from "@/application/errors/errors"

export class UpdateTransactionController {
  constructor(private readonly updateTransactionUseCase: IUpdateTransactionUseCase) {}

  async handle(request: FastifyRequest, response: FastifyReply) {
    try {
      const updateTransactionBody = z.object({
        userId: z.string(),
        title: z.string(),
        value: z.coerce.number(),
        type: z.enum(["income", "expense"]),  
        category: z.string(),
        createdAt: z.date()
      })

      const updateTransactionParams = z.object({
        transactionId: z.string()
      })

      const {
        userId,
        title,
        value,
        type,
        category,
      } = updateTransactionBody.parse(request.body)

      const {
        transactionId
      } = updateTransactionParams.parse(request.params)

      const result = await this.updateTransactionUseCase.execute({
        transactionId,
        userId,
        title,
        value,
        type,  
        category, 
      })

      response.status(201).send(result)
    } catch (error: any) {
      if (error instanceof TransactionNotExists) {
        return response.status(404).send({ message: error.message })
      } 

      return response.status(500).send()
    }
  }
}