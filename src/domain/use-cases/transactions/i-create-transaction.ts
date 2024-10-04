import { Transaction } from "@/domain/entities"

export interface ICreateTransactionUseCase {
  execute(input: ICreateTransactionUseCase.Input): ICreateTransactionUseCase.Output
}

export namespace ICreateTransactionUseCase {
  export type Input = {
    userId: string
    title: string
    value: number
    type: "income" | "expense"  
    category: string 
    createdAt: Date 
  }

  export type Output = Promise<Transaction>
}