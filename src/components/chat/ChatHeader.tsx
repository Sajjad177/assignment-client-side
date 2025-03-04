import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setSelectedUser } from "@/redux/features/auth/authSlice";

const ChatHeader = () => {
  const dispatch = useDispatch();
  const selectedUser: any = useSelector(
    (state: RootState) => state.auth.selectedUser
  );

  if (!selectedUser) return null;

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        {/* User Info */}
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img
                src={selectedUser.image || "/avatar.png"}
                alt={selectedUser.name}
                className="object-cover rounded-full"
              />
            </div>
          </div>

          {/* Name */}
          <div>
            <h3 className="font-medium">{selectedUser.name}</h3>
            {/* Uncomment when online status logic is available */}
            {/* <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p> */}
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={() => dispatch(setSelectedUser(null) as any)}
          className="p-2 hover:bg-base-300 rounded-full"
        >
          <X />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
