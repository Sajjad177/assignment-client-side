import { useState, useEffect } from "react";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hook";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useGetSingleUserQuery,
  useUpdateUserDetailsMutation,
} from "@/redux/features/user/userManagement";
import { Description } from "@radix-ui/react-dialog";
import { toast } from "sonner";

const Profile = () => {
  const user = useAppSelector(selectCurrentUser);
  const { data } = useGetSingleUserQuery(user?.userId);

  const userData = data?.data;
  const [updateUserDetails] = useUpdateUserDetailsMutation();

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || "",
        email: userData.email || "",
        password: "",
      });
    }
  }, [userData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const toastId = toast.loading("Updating User...");
    try {
      const res = await updateUserDetails({
        id: user!.userId,
        data: formData,
      }).unwrap();

      if (res.error) {
        toast.error(res.message, { id: toastId });
      } else {
        toast.success(res.message, { id: toastId });
      }
      setOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", { id: toastId });
      setOpen(false);
    }
  };

  return (
    <div className="container mx-auto p-4 ">
      {/* Profile Header */}
      <div className="flex flex-col items-center md:flex-row md:items-start md:justify-between">
        <div className="flex items-center space-x-4">
          <Avatar className="w-24 h-24">
            <img
              src="https://png.pngtree.com/png-vector/20190710/ourlarge/pngtree-user-vector-avatar-png-image_1541962.jpg"
              alt="Profile"
            />
          </Avatar>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">
              {formData.name}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-xl font-bold">
              {formData.email}
            </p>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              {"This is my bio"}
            </p>
          </div>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-4">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="px-4 py-2 text-sm ">
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-primaryFront">Edit Profile</DialogTitle>
              </DialogHeader>
              <Description hidden>
                Make changes to your profile here. Click save when you're done.
              </Description>
              <form onSubmit={handleSubmit} className="space-y-4 font-primaryFront">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password">New Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter new password"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Save Changes</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
          
        </div>
      </div>
    </div>
  );
};

export default Profile;
