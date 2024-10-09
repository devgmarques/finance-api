import { GetSummaryTransactionsUserUseCase } from "@/application/use-cases/transactions"
import { GetSummaryTransactionController } from "@/presentation/controllers/transactions"

import { PrismaTransactionsRepository } from "@/infra/database/prisma/repositories"

export function makeGetSummaryTransactionController() {
    const transactionsRepository = new PrismaTransactionsRepository()

    const getSummaryTransactionUseCase = new GetSummaryTransactionsUserUseCase(transactionsRepository)
    return new GetSummaryTransactionController(getSummaryTransactionUseCase)
}