import { User } from "./UserEntity";

export class Otp {
  constructor(
    public readonly email: string,
    public readonly otp: string,
    public readonly userData: User,
    public createdAt?: Date
  ) {}
}
