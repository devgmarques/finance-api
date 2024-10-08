import { UpdateTransactionUseCase } from "@/application/use-cases/transactions"
import { UpdateTransactionController } from "@/presentation/controllers/transactions"

import { PrismaTransactionsRepository } from "@/infra/database/prisma/repositories"

export function makeUpdateTransactionController() {
    const transactionsRepository = new PrismaTransactionsRepository()

    const updateTransactionUseCase = new UpdateTransactionUseCase(transactionsRepository)
    return new UpdateTransactionController(updateTransactionUseCase)
}