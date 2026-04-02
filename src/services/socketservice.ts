import { io, Socket } from "socket.io-client";
import { setsocketNotification } from "../Redux/Reducers/notification.reducers";
import { setConnectionStatus } from "../Redux/Reducers/connection.reducer";
import { store } from "../Redux/store";

let socket: Socket | null = null;

const initializeSocket = (token: string) => {
  if (socket) return;

  console.log(token, "token");

  socket = io(import.meta.env.VITE_BASE_URL, {
    auth: { token },
    transports: ["websocket"],
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 1000,
  });

  socket.on("connect", () => {
    console.log("Connected to Socket.io server with ID:", socket?.id);
  });

  socket.on("connection_request", (data) => {
    store.dispatch(setsocketNotification(data));
    console.log("New connection request received:", data);
  });

  socket.on("connection_Status",(data)=>{
    store.dispatch(setConnectionStatus(data));

    console.log(data);

    
  })

  

  socket.on("disconnect", () => {
    console.log("Disconnected from Socket.io server");
  });

  socket.on("connect_error", (error) => {
    console.error("Connection error:", error);
  });

};

const connectSocket = () => {
  const token = store.getState().userReducer.accessToken;
  if (!token) {
    console.log("Token not found. Please log in to establish a connection.");
    return;
  }

  initializeSocket(token);
};

const reconnectSocketWithNewToken = () => {
  const accessToken = store.getState().userReducer.accessToken;
  if (accessToken) {
    console.log("Reconnecting socket with new token:", accessToken);
    if (socket) {
      socket.disconnect();
    }

    initializeSocket(accessToken);
  } else {
    console.log("Token not found. Please log in to establish a connection.");
  }
};

const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log("Socket disconnected");
  }
};

export { connectSocket, disconnectSocket, reconnectSocketWithNewToken };
