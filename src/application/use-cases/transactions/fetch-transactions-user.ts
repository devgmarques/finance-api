import { TransactionsRepository } from "@/application/protocols/database"

import { IFetchTransactionsUserUseCase } from "@/domain/use-cases/transactions"

export class FetchTransactionsUserUseCase implements IFetchTransactionsUserUseCase {
  constructor (
    private transactionsRepository: TransactionsRepository
  ) {}

  async execute(input: IFetchTransactionsUserUseCase.Input): IFetchTransactionsUserUseCase.Output {
    const fetchTransactionSummary = await this.transactionsRepository
      .fetch({ userId: input.userId, query: input.query })

    return fetchTransactionSummary
  }
} 