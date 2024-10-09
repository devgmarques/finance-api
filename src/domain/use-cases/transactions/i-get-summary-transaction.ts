export interface IGetSummaryTransactionsUserUseCase {
  execute(input: IGetSummaryTransactionsUserUseCase.Input): IGetSummaryTransactionsUserUseCase.Output
}

export namespace IGetSummaryTransactionsUserUseCase {
  export type Input = {
    userId: string
  }

  export type Output = Promise<{
    totalAmount: number
    totalIncome: number
    totalExpense: number
    categoryBreakdown: Record<string, { 
      income: number, expense: number 
    }>
  }>
}