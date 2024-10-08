import { TransactionNotExists } from "@/application/errors/errors"
import { TransactionsRepository } from "@/application/protocols/database"

import { IDeleteTransactionUseCase } from "@/domain/use-cases/transactions"

export class DeleteTransactionUseCase implements IDeleteTransactionUseCase {
  constructor (
    private transactionsRepository: TransactionsRepository
  ) {}

  async execute(input: IDeleteTransactionUseCase.Input): IDeleteTransactionUseCase.Output {
    const transactionExists = await this.transactionsRepository
      .findById({ transactionId: input.transactionId })

    if(!transactionExists) {
      throw new TransactionNotExists()
    }

    await this.transactionsRepository.delete({
      transactionId: input.transactionId
    })
  }
} 
