import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useCurrentToken } from "@/redux/features/auth/authSlice";
import {
  connectSocket,
  disconnectSocket,
  listenForNotifications,
} from "@/redux/features/socket/socketSlice";
import { useSelector } from "react-redux";

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const socket = useSelector((state: any) => state.socket.socket);
  const token = useAppSelector(useCurrentToken);

  useEffect(() => {
    // Connect to the socket when the component is mounted
    dispatch(connectSocket({ token } as any));
  }, [dispatch]);

  useEffect(() => {
    if (socket) {
      // Start listening for notifications once the socket is connected
      dispatch(listenForNotifications());
    } else {
      dispatch(disconnectSocket());
    }
  }, [dispatch, socket]);

  return <>{children}</>;
};

export default SocketProvider;
