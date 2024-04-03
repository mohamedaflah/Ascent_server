import mongoose from "mongoose";

const ChatModel = new mongoose.Schema(
  {
    members: [mongoose.Types.ObjectId],
    type: {
      type: String,
      enum: ["single", "group"],
    },
  },
  { timestamps: true }
);

export default mongoose.model(process.env.CHAT_MODEL_NAME as string, ChatModel);
