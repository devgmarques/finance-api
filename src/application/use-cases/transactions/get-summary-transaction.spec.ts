import { beforeEach, describe, expect, it, vitest } from "vitest"

import { TransactionsRepository } from "@/application/protocols/database"

import { InMemoryTransactionsRepository } from "@/infra/database/in-memory"

import { IGetSummaryTransactionsUserUseCase } from "@/domain/use-cases/transactions"
import { GetSummaryTransactionsUserUseCase } from "./get-summary-transaction"

let transactionsRepository: TransactionsRepository
let sut: IGetSummaryTransactionsUserUseCase

describe("get summary transaction use case", () => {
  beforeEach(() => {
    transactionsRepository = new InMemoryTransactionsRepository()
    sut = new GetSummaryTransactionsUserUseCase(transactionsRepository)

    transactionsRepository.create({
      transactionId: "transactionId_01",
      userId: "userId",
      category: "category",
      title: "title",
      type: "expense",
      value: 100,
      createdAt: new Date()
    })

    transactionsRepository.create({
      transactionId: "transactionId_01",
      userId: "userId",
      category: "category",
      title: "title",
      type: "income",
      value: 100,
      createdAt: new Date()
    })
  })

  it("should be able to get summary transaction with successful", async () => {
    const transaction = await sut.execute({
      userId: "userId"
    })

    expect(transaction.totalAmount).toBe(0)
    expect(transaction.totalExpense).toBe(100)
    expect(transaction.totalIncome).toBe(100)
    expect(transaction.categoryBreakdown.category.expense).toBe(100)
    expect(transaction.categoryBreakdown.category.income).toBe(100)
  })

  it("should be able to call getSummary with correct values", async () => {
    const transactionsRepositorySpy = vitest.spyOn(transactionsRepository, "getSummary")

    await sut.execute({
      userId: "userId",
    })

    expect(transactionsRepositorySpy).toHaveBeenCalledWith({
      userId: "userId",
    })
  })
})