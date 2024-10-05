import { UseCaseError } from "../use-case-error"

export class UserNotExistError extends Error implements UseCaseError {
  constructor () {
    super("User not exists")
  }
}