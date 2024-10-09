import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

import { ICreateTransactionUseCase } from "@/domain/use-cases/transactions"

export class CreateTransactionController {
  constructor(private readonly createTransactionUseCase: ICreateTransactionUseCase) {}

  async handle(request: FastifyRequest, response: FastifyReply) {
    try {
      const createTransactionBody = z.object({
        title: z.string(),
        value: z.coerce.number(),
        type: z.enum(["income", "expense"]),  
        category: z.string(),
        createdAt: z.string().datetime()
      })

      const {
        title,
        value,
        type,
        category,
        createdAt,
      } = createTransactionBody.parse(request.body)

      const result = await this.createTransactionUseCase.execute({
        userId: request.user.sub,
        title,
        value,
        type,  
        category, 
        createdAt: new Date(createdAt) 
      })

      return response.status(201).send(result)
    } catch (error: any) {
      throw error
    }
  }
}