import { beforeEach, describe, expect, it, vitest } from "vitest"

import { TransactionsRepository } from "@/application/protocols/database"

import { InMemoryTransactionsRepository } from "@/infra/database/in-memory"

import { IFetchTransactionsUserUseCase } from "@/domain/use-cases/transactions"
import { FetchTransactionsUserUseCase } from "./fetch-transactions-user"

let transactionsRepository: TransactionsRepository
let sut: IFetchTransactionsUserUseCase

describe("fetch transactions user use case", () => {
  beforeEach(() => {
    transactionsRepository = new InMemoryTransactionsRepository()
    sut = new FetchTransactionsUserUseCase(transactionsRepository)

    transactionsRepository.create({
      transactionId: "transactionId_01",
      userId: "userId",
      category: "category",
      title: "title",
      type: "expense",
      value: 100,
      createdAt: new Date()
    })
  })

  it("should be able to fetch transactions with successful", async () => {
    const transactions = await sut.execute({
      userId: "userId"
    })

    expect(transactions.transactions).toHaveLength(1)
    expect(transactions.meta.totalAmount).toBe(-100)
    expect(transactions.meta.totalExpense).toBe(100)
    expect(transactions.meta.totalIncome).toBe(0)
  })

  it("should be able to filter per query a transactions income", async () => {
    const transactions = await sut.execute({
      userId: "userId",
      query: "income"
    })

    expect(transactions.transactions).toHaveLength(0)
  })
})