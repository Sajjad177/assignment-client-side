import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetAllUsersQuery } from "@/redux/features/user/userManagement";
import { useAppSelector } from "@/redux/hook";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const Profile = () => {
  const user = useAppSelector(selectCurrentUser);
//   const { data: allUsers } = useGetAllUsersQuery(undefined);

  return (
    <div >
      <div className="container mx-auto">
        {/* Profile Header */}
        <div className="flex flex-col items-center md:flex-row md:items-start md:justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="w-24 h-24">
              {/* Default avatar--------------------- */}
              <img
                src={
                  "https://png.pngtree.com/png-vector/20190710/ourlarge/pngtree-user-vector-avatar-png-image_1541962.jpg"
                }
                alt="Profile"
              />
            </Avatar>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">
                {user?.name }
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-xl font-bold">{user?.email}</p>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {"This is my bio"}
              </p>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-4">
            <Button variant="outline" className="px-4 py-2 text-sm">
              Edit Profile
            </Button>
            <Button variant="outline" className="px-4 py-2 text-sm">
              Your Products
            </Button>
          </div>
        </div>

        {/* Tabs Section */}
        {/* <Tabs defaultValue="about" className="mt-8">
          <TabsList className="flex space-x-4">
            <TabsTrigger
              value="followers"
              className="text-lg font-medium text-gray-800 dark:text-white"
            >
              Followers
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="followers">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allUsers?.data?.map((user: any) => (
                  <Card
                    className="bg-white dark:bg-gray-800 shadow-lg rounded-lg"
                    key={user._id}
                  >
                    <CardContent>
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          <img
                            src={user.profilePicture || "/default-avatar.png"}
                            alt={user.name}
                          />
                        </Avatar>
                        <div>
                          <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                            {user.name}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </div>
        </Tabs> */}
      </div>
    </div>
  );
};

export default Profile;
