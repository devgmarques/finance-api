import fastify from "fastify"
import fastifyJwt from "@fastify/jwt"

import { env } from "@/infra/env"

import { routesUsers } from "./routes/users"
import { routesTransactions } from "./routes/transactions"

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(routesUsers)
app.register(routesTransactions)

app.listen({ port: env.PORT, host: "0.0.0.0" }, () => {
  console.log(`Server is running on port ${env.PORT}`)
})