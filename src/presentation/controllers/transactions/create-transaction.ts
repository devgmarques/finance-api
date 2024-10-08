import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

import { ICreateTransactionUseCase } from "@/domain/use-cases/transactions"

export class CreateTransactionController {
  constructor(private readonly createTransactionUseCase: ICreateTransactionUseCase) {}

  async handle(request: FastifyRequest, response: FastifyReply) {
    try {
      const createTransactionBody = z.object({
        userId: z.string(),
        title: z.string(),
        value: z.coerce.number(),
        type: z.enum(["income", "expense"]),  
        category: z.string(),
        createdAt: z.date()
      })

      const {
        userId,
        title,
        value,
        type,
        category,
        createdAt,
      } = createTransactionBody.parse(request.body)

      const result = await this.createTransactionUseCase.execute({
        userId,
        title,
        value,
        type,  
        category, 
        createdAt 
      })

      response.status(201).send(result)
    } catch (error: any) {
      return response.status(500).send()
    }
  }
}