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
        ...(input.query ? { type: input.query } : {})
      }
    })
  
    const totalIncome = await prisma.transaction.aggregate({
      where: { userId: input.userId, type: "income" },
      _sum: { value: true }
    })
  
    const totalExpense = await prisma.transaction.aggregate({
      where: { userId: input.userId, type: "expense" },
      _sum: { value: true }
    })
  
    const totalAmount = (totalIncome._sum.value || 0) - (totalExpense._sum.value || 0)
  
    return {
      meta: {
        totalAmount,
        totalIncome: totalIncome._sum.value || 0,
        totalExpense: totalExpense._sum.value || 0
      },
      transactions
    }
  }

  async findById(input: TransactionsRepository.FindById.Input): TransactionsRepository.FindById.Output {
    const transaction = await prisma.transaction.findFirst({
      where: {
        transactionId: input.transactionId
      }
    })

    return transaction
  }
}