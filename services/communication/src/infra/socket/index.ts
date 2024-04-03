import { Socket } from "socket.io";
import { server } from "../../presentation/app";

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

  socket.on("send-message", (data: { content: string; recievedId: string }) => {
    console.log("🚀 ~ socket.on ~ data:", data)
    const reciever = onlineUsers.find((value) => value.id === data.recievedId);
    console.log("🚀 ~ socket.on ~ reciever:", reciever)
    if (reciever) {
      socket.to(reciever.socketId).emit("get-message",data.content);
    }
  });

  //   user leaving or diesconnecting event
  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((value) => value.socketId !== socket.id);
  });
  console.log("Socket connected", socket.id);
});
