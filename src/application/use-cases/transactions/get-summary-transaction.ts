import { TransactionsRepository } from "@/application/protocols/database"

import { IGetSummaryTransactionsUserUseCase } from "@/domain/use-cases/transactions"

export class GetSummaryTransactionsUserUseCase implements IGetSummaryTransactionsUserUseCase {
  constructor (
    private transactionsRepository: TransactionsRepository
  ) {}

  async execute(input: IGetSummaryTransactionsUserUseCase.Input): IGetSummaryTransactionsUserUseCase.Output {
    const transactionSummary = await this.transactionsRepository
      .getSummary({ userId: input.userId })

    return transactionSummary
  }
} 