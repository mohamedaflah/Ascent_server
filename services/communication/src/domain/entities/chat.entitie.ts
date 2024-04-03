import mongoose from "mongoose";

export class Chat {
  constructor(
    public readonly _id?: string,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
    public readonly members?: mongoose.Types.ObjectId[],
    public readonly chatType?: "single" | "group"
  ) {}
}
