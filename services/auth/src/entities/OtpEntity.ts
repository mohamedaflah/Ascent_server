import { User } from "./UserEntity";

export class Otp {
  constructor(
    public readonly email: string,
    public readonly link: string,
    public readonly otp: string,
    public createdAt?: Date
  ) {}
}
