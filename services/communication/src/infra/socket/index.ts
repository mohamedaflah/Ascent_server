import { Socket } from "socket.io";
import { server } from "../../presentation/app";
import { Message } from "../../domain/entities/message.entitie";

const socket = require("socket.io");
const io: Socket = socket(server, {
  cors: {
    origin: process.env.CLIENT_URL as string,
    credentials: true,
  },
});

let onlineUsers: {
  socketId: string;
  id: string;
  role: "user" | "company" | "admin";
}[] = [];
io.on("connection", (socket: Socket) => {
  // user joinging socket event
  socket.on("join-user", ({ id, role }) => {
    const userExist = onlineUsers.some((user) => user.id === id);
    if (!userExist) {
      onlineUsers.push({
        id: id,
        socketId: socket.id,
        role: role,
      });
    }
    console.log(onlineUsers);
  });

  socket.on("send-message", (data: { reciverId: string; data: Message }) => {
    const reciever = onlineUsers.find((value) => value.id === data.reciverId);
    console.log("🚀 ~ socket.on ~ reciever:", reciever);
    console.log("🚀 ~ socket.on ~ data:", data);
    if (reciever) {
      socket.to(reciever.socketId).emit("get-message", data.data);
    }
  });

  // socket?.emit("stopTyping", {
  //   chatId: chatId,
  //   message: "stop typing",
  //   recieverdId: selectedUser?._id,
  //   senderId: user?._id,
  // });

  socket.on(
    "typing",
    (data: {
      chatId: string;
      senderName: string;
      message: string;
      senderId: string;
      recievedId: string;
    }) => {
      const user = onlineUsers.find((value) => value.id == data.recievedId);
      console.log("🚀 ~ io.on ~ user:", user)
      console.log("🚀 ~ io.on ~ user:", data.recievedId)
      console.log(onlineUsers.length);
      
      if (user) {
        socket.to(user.socketId).emit("typing", data);
      }
    }
  );

  socket.on(
    "stopTyping",
    (data: {
      chatId: string;
      message: string;
      recieverdId: string;
      senderId: string;
    }) => {
      const user = onlineUsers.find((value) => value.id == data.recieverdId);
      if(user){
        socket.to(user.socketId).emit("stopTyping",data)
      }
    }
  );

  //   user leaving or diesconnecting event
  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((value) => value.socketId !== socket.id);
  });
  console.log("Socket connected", socket.id);
});
