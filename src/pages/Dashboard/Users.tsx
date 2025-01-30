import {
  useBlockUserMutation,
  useGetAllUsersQuery,
} from "@/redux/features/user/userManagement";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Users = () => {
  const { data: AllUsers, isLoading } = useGetAllUsersQuery(undefined);
  const [blockUser] = useBlockUserMutation();
  const userList = AllUsers?.data || [];

  const handleBlockUser = async (id: string) => {
    const toastId = toast.loading("Blocking User...");
    try {
      const res = await blockUser(id).unwrap();
      console.log("response -> ", res);
      if (res.error) {
        toast.error(res.error, { id: toastId });
      } else {
        toast.success(res.message, { id: toastId });
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to block user", { id: toastId });
    }
  };

  if (isLoading) {
    return <div className="text-center text-lg font-semibold">Loading...</div>;
  }

  return (
    <div className="p-6 md:p-8 w-full overflow-x-auto">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Users
      </h1>
      <div className="overflow-x-auto">
        <Table className="w-full bg-white dark:bg-gray-900 shadow-lg rounded-lg">
          <TableHeader>
            <TableRow className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
              <TableHead className="px-4 py-3">Name</TableHead>
              <TableHead className="px-4 py-3">Email</TableHead>
              <TableHead className="px-4 py-3">Created Time</TableHead>
              <TableHead className="px-4 py-3 text-center">Block</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userList.length > 0 ? (
              userList.map((user: any) => (
                <TableRow
                  key={user._id}
                  className="border-b hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <TableCell className="px-4 py-3">{user.name}</TableCell>
                  <TableCell className="px-4 py-3">{user.email}</TableCell>
                  <TableCell className="px-4 py-3">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-center">
                    <div className="flex justify-center gap-2">
                      {/* <Button
                        variant="outline"
                        style={{ color: "green" }}
                        size="sm"
                        className="p-2"
                      >
                        Unblock
                      </Button> */}
                      <Button
                        variant="outline"
                        size="sm"
                        className="p-2"
                        style={{
                          color: "red",
                          cursor: user.isBlocked ? "not-allowed" : "pointer", 
                        }}
                        disabled={user.isBlocked}
                        onClick={() => handleBlockUser(user._id)}
                      >
                        Block
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4">
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Users;
