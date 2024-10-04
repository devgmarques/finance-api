export type Transaction = {
  transactionId: string
  title: string
  value: number
  type: "income" | "expense"  
  category: string 
  createdAt: Date 
  updatedAt: Date
}