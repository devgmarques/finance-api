import { FastifyInstance } from "fastify"

import { 
  makeAuthenticateUserController,
  makeCreateUserController
} from '@/main/factories/users'

export async function routesUsers(app: FastifyInstance) {
  app.post("/user", (req, res) => 
    makeCreateUserController().handle(req, res))
  app.post("/session", (req, res) => 
    makeAuthenticateUserController().handle(req, res))
}