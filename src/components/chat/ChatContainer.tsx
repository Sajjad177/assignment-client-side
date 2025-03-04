import { useGetMessagesQuery } from "@/redux/features/chat/chatManagement";
import ChatHeader from "./ChatHeader";
import MessageSkeleton from "./MessageSkeleton";
import MessageInput from "./MessageInput";
import { useEffect, useRef } from "react";
import { useAppSelector } from "@/redux/hook";
import {
  chatSelectedUser,
  selectCurrentUser,
} from "@/redux/features/auth/authSlice";
import { toast } from "sonner";

const ChatContainer = () => {
  const selectedUser = useAppSelector(chatSelectedUser);
  const currentUser = useAppSelector(selectCurrentUser);

  const { data, isLoading } = useGetMessagesQuery(
    { id: selectedUser?._id },
    {
      pollingInterval: 4000, // polling interval to check for new messages
    }
  );

  const messages = data?.data || [];
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  // Ref to track the previous message count to prevent duplicate toasts
  const previousMessagesCountRef = useRef<number>(messages.length);

  useEffect(() => {
    // Scroll to the bottom when new messages are fetched
    if (messageEndRef.current && messages.length > 0) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    // Check if new messages were fetched and the sender is not the current user
    if (messages.length > previousMessagesCountRef.current) {
      // Only show toast if the sender is not the current user (receiver)
      const newMessages = messages.slice(previousMessagesCountRef.current);
      if (
        newMessages.some((message: any) => message.senderId !== currentUser?.userId)
      ) {
        toast.success("New messages have arrived!");
      }
    }

    // Update the ref with the current messages length
    previousMessagesCountRef.current = messages.length;
  }, [messages, currentUser?.userId]);

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto dark:bg-gray-900">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages?.map((message: any) => (
          <div
            key={message._id}
            className={`flex items-end gap-2 max-w-xs md:max-w-md lg:max-w-lg p-2 rounded-lg transition-all duration-300 ${
              message.senderId === currentUser?.userId
                ? "ml-auto bg-[#7952f5]/90 text-white chat-end"
                : "mr-auto bg-gray-100 text-black chat-start"
            }`}
            ref={messageEndRef}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === currentUser?.userId
                      ? selectedUser?.image
                      : "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                  }
                  alt="profile pic"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="text-xs opacity-50">
                {new Date(message.createdAt).toLocaleString()}
              </div>

              <div className="chat-bubble p-3 rounded-lg shadow-sm">
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="sm:max-w-[200px] rounded-md mb-2"
                  />
                )}
                {message.text && <p>{message.text}</p>}
              </div>
            </div>
          </div>
        ))}

        <div ref={messageEndRef} />
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
