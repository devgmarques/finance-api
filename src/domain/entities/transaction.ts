export type Transaction = {
  transactionId: string
  userId: string
  title: string
  value: number
  type: "income" | "expense"  
  category: string 
  createdAt: Date 
  updatedAt: Date
}