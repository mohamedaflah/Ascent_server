import { User } from "./UserEntity";

export class Otp {
  constructor(
    public readonly email: string,
    public readonly link:string,
    public createdAt?: Date
  ) {}
}
