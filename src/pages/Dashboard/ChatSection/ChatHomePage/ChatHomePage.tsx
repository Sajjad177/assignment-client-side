import ChatContainer from "@/components/chat/ChatContainer";
import ChatSidebar from "@/components/chat/ChatSidebar";
import NoChatSelected from "@/components/chat/NoChatSelected";
import { chatSelectedUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hook";

const ChatHomePage = () => {
  const selectedUser = useAppSelector(chatSelectedUser);

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center">
        <div className="bg-base-100 rounded-lg shadow-cl w-full h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <ChatSidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHomePage;
