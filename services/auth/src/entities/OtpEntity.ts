import { User } from "./UserEntity";

export class Otp {
  constructor(
    public readonly email: string,
    public readonly otp: string,
    public readonly UserData: User,
    public createdAt?: Date
  ) {}
}
