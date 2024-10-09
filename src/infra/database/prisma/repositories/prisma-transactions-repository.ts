import { TransactionsRepository } from "@/application/protocols/database"
import { prisma } from ".."

export class PrismaTransactionsRepository implements TransactionsRepository {
  async create(input: TransactionsRepository.Create.Input): TransactionsRepository.Create.Output {
    const transaction = await prisma.transaction.create({
      data: {
        userId: input.userId,
        title: input.title,
        type: input.type,
        category: input.category,
        value: input.value,
        createdAt: input.createdAt,
      }
    })

    return transaction
  }

  async update(input: TransactionsRepository.Update.Input): TransactionsRepository.Update.Output {
    const transaction = await prisma.transaction.update({
      where: {
        transactionId: input.transactionId
      },
      data: {
        userId: input.userId,
        title: input.title,
        type: input.type,
        category: input.category,
        value: input.value,
        createdAt: input.createdAt,
      }
    })

    return transaction
  }

  async delete(input: TransactionsRepository.Delete.Input): TransactionsRepository.Delete.Output {
    await prisma.transaction.delete({
      where: {
        transactionId: input.transactionId
      }
    })    
  }

  async fetch(input: TransactionsRepository.Fetch.Input): TransactionsRepository.Fetch.Output {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId: input.userId,
        type: input.query ? input.query : undefined
      }
    })
  
    return transactions
  }

  async findById(input: TransactionsRepository.FindById.Input): TransactionsRepository.FindById.Output {
    const transaction = await prisma.transaction.findFirst({
      where: {
        transactionId: input.transactionId
      }
    })

    return transaction
  }

  async getSummary(input: TransactionsRepository.GetSummary.Input): TransactionsRepository.GetSummary.Output {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId: input.userId
      }
    })

    const totalAmount = transactions.reduce((acc, item) => acc + item.value, 0)
    const totalIncome = transactions
      .filter(item => item.type === "income")
      .reduce((acc, item) => acc + item.value, 0)
    const totalExpense = transactions
      .filter(item => item.type === "expense")
      .reduce((acc, item) => acc + item.value, 0)

    const categoryBreakdown: Record<string, { income: number, expense: number }> = {}

    transactions.forEach(transaction => {
      const { category, type, value } = transaction

      if (!categoryBreakdown[category]) {
        categoryBreakdown[category] = { income: 0, expense: 0 }
      }

      if (type === "income") {
        categoryBreakdown[category].income += value
      } else {
        categoryBreakdown[category].expense += value
      }
    })

    return {
      totalAmount,
      totalIncome,
      totalExpense,
      categoryBreakdown
    }
  }
}