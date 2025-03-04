import { useGetAllUsersQuery } from "@/redux/features/user/userManagement";
import { Users } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSelectedUser } from "@/redux/features/auth/authSlice";
import SidebarSkeleton from "./SidebarSkeleton";

const ChatSidebar = () => {
  const dispatch = useDispatch();

  const { data: AllUsers, isLoading } = useGetAllUsersQuery(undefined);
  const userList = AllUsers?.data || [];

  if (isLoading) {
    return <SidebarSkeleton />;
  }

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      {/* Header Section */}
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input type="checkbox" className="checkbox checkbox-sm" />
            <span className="text-sm">Show online only</span>
          </label>
        </div>
      </div>

      {/* User List */}
      <div className="overflow-y-auto w-full py-3">
        {userList.map((user: any) => (
          <button
            key={user._id}
            onClick={() => dispatch(setSelectedUser(user) as any)}
            className={`w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
              `}
          >
            {/* User Avatar */}
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.image || "/avatar.png"}
                alt={user.name}
                className="size-12 object-cover rounded-full"
              />
            </div>

            {/* User Info */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.name}</div>
            </div>
          </button>
        ))}

        {userList.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No users found</div>
        )}
      </div>
    </aside>
  );
};

export default ChatSidebar;
