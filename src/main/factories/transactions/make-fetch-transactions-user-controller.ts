import { FetchTransactionsUserUseCase } from "@/application/use-cases/transactions"
import { FetchTransactionsUserController } from "@/presentation/controllers/transactions"

import { PrismaTransactionsRepository } from "@/infra/database/prisma/repositories"

export function makeFetchTransactionsUserController() {
    const transactionsRepository = new PrismaTransactionsRepository()

    const fetchTransactionsUserUseCase = new FetchTransactionsUserUseCase(transactionsRepository)
    return new FetchTransactionsUserController(fetchTransactionsUserUseCase)
}