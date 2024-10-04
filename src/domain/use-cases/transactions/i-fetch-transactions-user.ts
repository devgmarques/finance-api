import { Transaction } from "@/domain/entities"

export interface IFetchTransactionsUserUseCase {
  execute(input: IFetchTransactionsUserUseCase.Input): IFetchTransactionsUserUseCase.Output
}

export namespace IFetchTransactionsUserUseCase {
  export type Input = {
    userId: string
    query?: "income" | "expense"  
  }

  export type Output = Promise<Transaction[]>
}