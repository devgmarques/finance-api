import { DeleteTransactionUseCase } from "@/application/use-cases/transactions"
import { DeleteTransactionController } from "@/presentation/controllers/transactions"

import { PrismaTransactionsRepository } from "@/infra/database/prisma/repositories"

export function makeDeleteTransactionController() {
    const transactionsRepository = new PrismaTransactionsRepository()

    const deleteTransactionUseCase = new DeleteTransactionUseCase(transactionsRepository)
    return new DeleteTransactionController(deleteTransactionUseCase)
}