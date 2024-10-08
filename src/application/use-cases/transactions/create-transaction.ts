import { TransactionsRepository } from "@/application/protocols/database"

import { ICreateTransactionUseCase } from "@/domain/use-cases/transactions"

export class CreateTransactionUseCase implements ICreateTransactionUseCase {
  constructor (
    private transactionsRepository: TransactionsRepository
  ) {}

  async execute(input: ICreateTransactionUseCase.Input): ICreateTransactionUseCase.Output {
    const transaction = await this.transactionsRepository.create({ 
      userId: input.userId,
      title: input.title,
      category: input.category,
      value: input.value,
      type: input.type,
      createdAt: input.createdAt,
    })

    return transaction
  }
} 
