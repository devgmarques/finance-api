import { TransactionNotExists } from "@/application/errors/errors"
import { TransactionsRepository } from "@/application/protocols/database"

import { IUpdateTransactionUseCase } from "@/domain/use-cases/transactions"

export class UpdateTransactionUseCase implements IUpdateTransactionUseCase {
  constructor (
    private transactionsRepository: TransactionsRepository
  ) {}

  async execute(input: IUpdateTransactionUseCase.Input): IUpdateTransactionUseCase.Output {
    const transactionExists = await this.transactionsRepository
      .findById({ transactionId: input.transactionId })

    if(!transactionExists) {
      throw new TransactionNotExists()
    }

    const transactionAssign = Object.assign(transactionExists, input)

    const transaction = await this.transactionsRepository.update({
      transactionId: transactionAssign.transactionId,
      userId: transactionAssign.userId,
      category: transactionAssign.category,
      title: transactionAssign.title,
      type: transactionAssign.type,
      value: transactionAssign.value,
      createdAt: transactionAssign.createdAt,
    })

    return transaction
  }
} 
