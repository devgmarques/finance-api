import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

import { ICreateUserUseCase } from "@/domain/use-cases/users"
import { EmailAlreadyExistError } from "@/application/errors/errors"

export class CreateUserController {
  constructor(private readonly createUserUseCase: ICreateUserUseCase) {}

  async handle(request: FastifyRequest, response: FastifyReply) {
    try {
      const createUserBody = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string(),
      })

      const {
        email,
        name,
        password
      } = createUserBody.parse(request.body)

      const result = await this.createUserUseCase.execute({
        email,
        name,
        password
      })

      const token = await response.jwtSign({ sub: result.userId })

      return response.status(201).send(token)
    } catch (error: any) {
      if (error instanceof EmailAlreadyExistError) {
        return response.status(400).send({ message: error.message })
      }

      return response.status(500).send()
    }
  }
}