import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

import { EmailAlreadyExistError } from "@/application/errors/errors"
import { ICreateTransactionUseCase } from "@/domain/use-cases/transactions"

export class CreateTransactionController {
  constructor(private readonly createTransactionUseCase: ICreateTransactionUseCase) {}

  async handle(request: FastifyRequest, response: FastifyReply) {
    try {
      const createUserBody = z.object({
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
      } = createUserBody.parse(request.body)

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