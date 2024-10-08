import { beforeEach, describe, expect, it, vitest } from "vitest"

import { TransactionsRepository } from "@/application/protocols/database"

import { InMemoryTransactionsRepository } from "@/infra/database/in-memory"

import { ICreateTransactionUseCase } from "@/domain/use-cases/transactions"
import { CreateTransactionUseCase } from "./create-transaction"

let transactionsRepository: TransactionsRepository
let sut: ICreateTransactionUseCase

describe("create transaction use case", () => {
  beforeEach(() => {
    transactionsRepository = new InMemoryTransactionsRepository()
    sut = new CreateTransactionUseCase(transactionsRepository)
  })

  it("should be able to create transaction with successful", async () => {
    const transaction = await sut.execute({
      userId: "userId",
      category: "category",
      title: "title",
      type: "expense",
      value: 0,
      createdAt: new Date(),
    })

    expect(transaction.transactionId).toBe("transactionId_01")
    expect(transaction.userId).toBe("userId")
    expect(transaction.category).toBe("category")
    expect(transaction.title).toBe("title")
    expect(transaction.type).toBe("expense")
    expect(transaction.value).toBe(0)
    expect(transaction.createdAt).toBeDefined()
  })

  it("should be able to call create in transaction repository with correct values", async () => {
    const transactionsRepositorySpy = vitest.spyOn(transactionsRepository, "create")

    await sut.execute({
      userId: "userId",
      category: "category",
      title: "title",
      type: "expense",
      value: 0,
      createdAt: new Date(),
    })

    expect(transactionsRepositorySpy).toHaveBeenCalledWith({
      userId: "userId",
      category: "category",
      title: "title",
      type: "expense",
      value: 0,
      createdAt: expect.any(Date),
    })
  })
})