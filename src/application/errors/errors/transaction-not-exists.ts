import { UseCaseError } from "../use-case-error"

export class TransactionNotExists extends Error implements UseCaseError {
  constructor () {
    super("Transaction not exists")
  }
}