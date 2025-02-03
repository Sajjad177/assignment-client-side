import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAddUserMutation } from "@/redux/features/user/userManagement";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

type RegisterFormInput = {
  name: string;
  email: string;
  password: string;
};

const Register = () => {
  const navigate = useNavigate();
  const [addUser] = useAddUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInput>();

  const onSubmit: SubmitHandler<RegisterFormInput> = async (data) => {
    const toastId = toast.loading("Creating User");
    try {
      const userInfo = {
        name: data.name,
        email: data.email,
        password: data.password,
      };

      const res = await addUser(userInfo).unwrap();
      if (res.error) {
        toast.error(res.error || "user registration failed", { id: toastId });
      } else {
        toast.success(res.message || "user registered successfully", {
          id: toastId,
        });
      }
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || "user registration failed", {
        id: toastId,
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 font-primaryFront">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>

        {/* Name Field */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <Input
            id="name"
            {...register("name", { required: "Name is required" })}
            placeholder="Enter your name"
            className="mt-2 w-full border border-gray-300 p-2 rounded-md"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <Input
            id="email"
            {...register("email", { required: "Email is required" })}
            placeholder="Enter your email"
            className="mt-2 w-full border border-gray-300 p-2 rounded-md"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors?.email?.message}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <Input
            id="password"
            type="password"
            {...register("password", { required: "Password is required" })}
            placeholder="Enter your password"
            className="mt-2 w-full border border-gray-300 p-2 rounded-md"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors?.password?.message}
            </p>
          )}
        </div>

        <p>
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
        {/* Submit Button */}
        <div>
          <Button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Register
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Register;
