import mongoose from "mongoose";

export class Message {
  constructor(
    public readonly senderId: mongoose.Types.ObjectId,
    public readonly content: {
      type: "audio" | "video" | "text" | "image" | "doc";
      content: string;
      subcontent: {
        type: "audio" | "video" | "text" | "image" | "doc";
        content: string;
      };
      isReply?: boolean;
      repliedMessage?: mongoose.Types.ObjectId;
    },
    public readonly status: "read" | "unread",
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
    public readonly _id?: Date,
    public readonly senderName?: String,
    public readonly senderProfile?: String,
    public readonly ChatId?: mongoose.Types.ObjectId,
    public  reciverId?: string
  ) {}
}
