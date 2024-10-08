import { CreateTransactionUseCase } from "@/application/use-cases/transactions"
import { CreateTransactionController } from "@/presentation/controllers/transactions"

import { PrismaTransactionsRepository } from "@/infra/database/prisma/repositories"

export function makeCreateTransactionController() {
    const transactionsRepository = new PrismaTransactionsRepository()

    const createTransactionUseCase = new CreateTransactionUseCase(transactionsRepository)
    return new CreateTransactionController(createTransactionUseCase)
}