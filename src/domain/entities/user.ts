import { Transaction } from "./transaction"

export type User = {
  userId: string
  name: string
  email: string
  password: string
  transactions: Transaction[]
  createdAt: Date
}