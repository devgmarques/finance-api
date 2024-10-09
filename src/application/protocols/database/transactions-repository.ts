import { Transaction } from "@/domain/entities"

export type TransactionsRepository = {
  create(input: TransactionsRepository.Create.Input): TransactionsRepository.Create.Output
  findById(input: TransactionsRepository.FindById.Input): TransactionsRepository.FindById.Output
  update(input: TransactionsRepository.Update.Input): TransactionsRepository.Update.Output
  delete(input: TransactionsRepository.Delete.Input): TransactionsRepository.Delete.Output
  fetch(input: TransactionsRepository.Fetch.Input): TransactionsRepository.Fetch.Output
}

export namespace TransactionsRepository {
  export namespace Create {
    export type Input = {
      transactionId?: string
      userId: string
      title: string
      value: number
      type: "income" | "expense"  
      category: string 
      createdAt: Date 
    }

    export type Output = Promise<Transaction>
  }

  export namespace Update {
    export type Input = {
      transactionId: string
      userId: string
      title: string
      value: number
      type: "income" | "expense"  
      category: string 
      createdAt: Date 
    }

    export type Output = Promise<Transaction>
  }

  export namespace Delete {
    export type Input = {
      transactionId: string
    }

    export type Output = Promise<void>
  }

  export namespace FindById {
    export type Input = {
      transactionId: string
    }

    export type Output = Promise<Transaction | null>
  }

  export namespace Fetch {
    export type Input = {
      userId: string
      query?: "income" | "expense"  
    }

    export type Output = Promise<{
      meta: {
        totalAmount: number
        totalIncome: number
        totalExpense: number
      }
      transactions: Transaction[]
    }>
  }
}