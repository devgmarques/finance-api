import { TransactionsRepository } from "@/application/protocols/database"
import { Transaction } from "@/domain/entities"

export class InMemoryTransactionsRepository implements TransactionsRepository {
  private database: Transaction[] = []
  
  async create(input: TransactionsRepository.Create.Input): TransactionsRepository.Create.Output {
    const transaction: Transaction = {
      transactionId: input.transactionId ?? "transactionId_01",
      userId: input.userId,
      title: input.title,
      category: input.category,
      type: input.type,
      value: input.value,
      createdAt: input.createdAt,
      updatedAt: new Date()
    }

    this.database.push(transaction)

    return transaction
  }

  async update(input: TransactionsRepository.Update.Input): TransactionsRepository.Update.Output {
    const transactionIndex = this.database
      .findIndex(item => item.transactionId === input.transactionId)

    const transaction = this.database[transactionIndex]

    const updatedTransaction: Transaction  = {
      transactionId: transaction.transactionId,
      userId: transaction.userId,
      title: input.title,
      type: input.type,
      category: input.category,
      value: input.value,
      createdAt: input.createdAt,
      updatedAt: transaction.updatedAt,
    }

    this.database[transactionIndex] = updatedTransaction
    return updatedTransaction
  }

  async delete(input: TransactionsRepository.Delete.Input): TransactionsRepository.Delete.Output {
    const transactions = this.database.
      filter(item => item.transactionId !== input.transactionId)

    this.database = transactions
  }

  async fetch(input: TransactionsRepository.Fetch.Input): TransactionsRepository.Fetch.Output {
    let transactions = this.database.filter(item => item.userId === input.userId)
  
    const totalIncome = this.database
      .filter(item => item.userId === input.userId && item.type === 'income')
      .reduce((acc, item) => acc + item.value, 0)
  
    const totalExpense = this.database
      .filter(item => item.userId === input.userId && item.type === 'expense')
      .reduce((acc, item) => acc + item.value, 0)
  
    let totalAmount = totalIncome - totalExpense
  
    if (input.query) {
      transactions = transactions.filter(item => item.type === input.query)
  
      totalAmount = transactions.reduce((acc, item) => acc + item.value, 0)
    }
  
    return {
      transactions,
      meta: {
        totalAmount,
        totalIncome,
        totalExpense
      }
    }
  }

  async findById(input: TransactionsRepository.FindById.Input): TransactionsRepository.FindById.Output {
    const transaction = this.database
      .find(item => item.transactionId === input.transactionId)

    if(!transaction) {
      return null
    }

    return transaction
  }
}