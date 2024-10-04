export interface IDeleteTransactionUseCase {
  execute(input: IDeleteTransactionUseCase.Input): IDeleteTransactionUseCase.Output
}

export namespace IDeleteTransactionUseCase {
  export type Input = {
    transactionId: string
    userId: string
  }

  export type Output = Promise<void>
}