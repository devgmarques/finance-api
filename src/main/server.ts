import fastify from "fastify"
import fastifyJwt from "@fastify/jwt"

import { env } from "@/infra/env"

import { routesUsers } from "./routes/users"
import { routesTransactions } from "./routes/transactions"
import { ZodError } from "zod"

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(routesUsers)
app.register(routesTransactions)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})

app.listen({ port: env.PORT, host: "0.0.0.0" }, () => {
  console.log(`Server is running on port ${env.PORT}`)
})