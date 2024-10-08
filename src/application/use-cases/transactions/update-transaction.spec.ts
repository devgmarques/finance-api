import { beforeEach, describe, expect, it, vitest } from "vitest"

import { TransactionsRepository } from "@/application/protocols/database"

import { InMemoryTransactionsRepository } from "@/infra/database/in-memory"

import { IUpdateTransactionUseCase } from "@/domain/use-cases/transactions"
import { UpdateTransactionUseCase } from "./update-transaction"
import { TransactionNotExists } from "@/application/errors/errors"

let transactionsRepository: TransactionsRepository
let sut: IUpdateTransactionUseCase

describe("update transaction use case", () => {
  beforeEach(() => {
    transactionsRepository = new InMemoryTransactionsRepository()
    sut = new UpdateTransactionUseCase(transactionsRepository)

    transactionsRepository.create({
      transactionId: "transactionId_01",
      userId: "userId",
      category: "category",
      title: "title",
      type: "expense",
      value: 0,
      createdAt: new Date()
    })
  })

  it("should be able to update transaction with successful", async () => {
    const transaction = await sut.execute({
      transactionId: "transactionId_01",
      userId: "userId",
      category: "category",
      title: "title_01",
      type: "income",
      value: 0,
    })

    expect(transaction.transactionId).toBe("transactionId_01")
    expect(transaction.userId).toBe("userId")
    expect(transaction.category).toBe("category")
    expect(transaction.title).toBe("title_01")
    expect(transaction.type).toBe("income")
    expect(transaction.value).toBe(0)
    expect(transaction.createdAt).toBeDefined()
  })

  it("should be able to return error if transaction not exists", async () => {
    vitest.spyOn(transactionsRepository, "findById").mockImplementationOnce(async () => null)

    expect(() => sut.execute({
      transactionId: "transactionId_01",
      userId: "userId",
      category: "category",
      title: "title_01",
      type: "income",
      value: 0,
    })).rejects.toBeInstanceOf(TransactionNotExists)
  })

  it("should be able to call update in transaction repository with correct values", async () => {
    const transactionsRepositorySpy = vitest.spyOn(transactionsRepository, "update")

    await sut.execute({
      transactionId: "transactionId_01",
      userId: "userId",
      category: "category",
      title: "title_01",
      type: "income",
      value: 0,
    })

    expect(transactionsRepositorySpy).toHaveBeenCalledWith({
      transactionId: "transactionId_01",
      userId: "userId",
      category: "category",
      title: "title_01",
      type: "income",
      value: 0,
      createdAt: expect.any(Date)
    })
  })
})