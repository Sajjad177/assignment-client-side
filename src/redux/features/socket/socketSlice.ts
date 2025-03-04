import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { io } from "socket.io-client";
import { AppDispatch } from "../../store";
import { toast } from "sonner";

const apiUrl =
  process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";

const initialState: any = {
  socket: null,
  isConnected: false,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    // Action to connect to the socket
    connectSocket: (state, action: PayloadAction<{ token: string }>) => {
      if (!state.socket) {
        state.socket = io(apiUrl, {
          auth: { token: action.payload.token },
        });

        state.socket.on("connect", () => {
          console.log("Connected to WebSocket");
          state.isConnected = true;
        });

        state.socket.on("connect_error", (err: any) => {
          console.error("Socket connection error:", err);
          state.isConnected = false;
        });
      }
    },

    // Action to disconnect from the socket
    disconnectSocket: (state) => {
      if (state.socket) {
        state.socket.disconnect();
        state.socket = null;
      }
      state.isConnected = false;
    },
  },
});

export const { connectSocket, disconnectSocket } = socketSlice.actions;
export default socketSlice.reducer;

// Thunk to listen for notifications and show toast
export const listenForNotifications =
  () => (dispatch: AppDispatch, getState: any) => {
    const { socket } = getState().socket;

    if (socket) {
      socket.on("notification", (data: { message: string }) => {
        toast.info(data.message);
      });
    }
  };
