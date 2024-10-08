import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

import { IAuthenticateUserUseCase } from "@/domain/use-cases/users"
import { InvalidCredentialError, UserNotExistError } from "@/application/errors/errors"

export class AuthenticateUserController {
  constructor(private readonly authenticateUserUseCase: IAuthenticateUserUseCase) {}

  async handle(request: FastifyRequest, response: FastifyReply) {
    try {
      const authenticateUserBody = z.object({
        email: z.string().email(),
        password: z.string(),
      })

      const {
        email,
        password
      } = authenticateUserBody.parse(request.body)

      const result = await this.authenticateUserUseCase.execute({
        email,
        password
      })

      const token = await response.jwtSign({ sub: result.userId })

      response.status(200).send(token)
    } catch (error: any) {
      if (error instanceof UserNotExistError) {
        return response.status(404).send({ message: error.message })
      }

      if (error instanceof InvalidCredentialError) {
        return response.status(400).send({ message: error.message })
      }

      return response.status(500).send()
    }
  }
}