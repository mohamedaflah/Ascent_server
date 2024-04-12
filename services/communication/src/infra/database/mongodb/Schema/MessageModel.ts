import mongoose from "mongoose";

const MessageModel = new mongoose.Schema(
  {
    _id:String,
    senderId: {
      type: mongoose.Types.ObjectId,
    },
    content: {
      type: {
        type: String,
        enum: ["audio", "video", "text", "image", "doc"],
      },
      content: String,
      subcontent: {
        type: {
          type: String,
          enum: ["audio", "video", "text", "image", "doc"],
        },
        content: String,
      },
      isReply: Boolean,
      repliedMessage: mongoose.Types.ObjectId,
    },
    status: {
      type: String,
      enum: ["read", "unread"],
    },
    senderName: String,
    senderProfile: String,
    chatId: mongoose.Types.ObjectId,
    deleteStatus: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model(
  process.env.MESSAGES_MODEL as string,
  MessageModel
);
