import { Transaction } from "@/domain/entities"

export interface IUpdateTransactionUseCase {
  execute(input: IUpdateTransactionUseCase.Input): IUpdateTransactionUseCase.Output
}

export namespace IUpdateTransactionUseCase {
  export type Input = {
    transactionId: string
    userId: string
    title: string
    value: number
    type: "income" | "expense"  
    category: string 
  }

  export type Output = Promise<Transaction>
}