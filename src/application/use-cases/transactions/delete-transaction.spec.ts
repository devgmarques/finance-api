import { beforeEach, describe, expect, it, vitest } from "vitest"

import { TransactionsRepository } from "@/application/protocols/database"

import { InMemoryTransactionsRepository } from "@/infra/database/in-memory"

import { IDeleteTransactionUseCase } from "@/domain/use-cases/transactions"
import { TransactionNotExists } from "@/application/errors/errors"
import { DeleteTransactionUseCase } from "./delete-transaction"

let transactionsRepository: TransactionsRepository
let sut: IDeleteTransactionUseCase

describe("delete transaction use case", () => {
  beforeEach(() => {
    transactionsRepository = new InMemoryTransactionsRepository()
    sut = new DeleteTransactionUseCase(transactionsRepository)

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

  it("should be able to delete transaction with successful", async () => {
    const transaction = await sut.execute({
      transactionId: "transactionId_01",
    })

    expect(transaction).toBeUndefined()
  })

  it("should be able to return error if transaction not exists", async () => {
    vitest.spyOn(transactionsRepository, "findById").mockImplementationOnce(async () => null)

    expect(() => sut.execute({
      transactionId: "transactionId_01",
    })).rejects.toBeInstanceOf(TransactionNotExists)
  })

  it("should be able to call transaction repository with correct values", async () => {
    const transactionsRepositorySpy = vitest.spyOn(transactionsRepository, "delete")

    await sut.execute({
      transactionId: "transactionId_01",
    })

    expect(transactionsRepositorySpy).toHaveBeenCalledWith({
      transactionId: "transactionId_01",
    })
  })
})