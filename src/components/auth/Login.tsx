/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLoginMutation } from "@/redux/auth/authApi";
import { setUser } from "@/redux/auth/authSlice";
import { useAppDispath } from "@/redux/hooks";
import type { TUser } from "@/type/types";
import { verifyToken } from "@/utils/Verifytoken";
import type { FieldValues } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

export type TLoginResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  Data: string[];
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispath();
  const [addLogin] = useLoginMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: FieldValues) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log("data: ", data);
    const toastId = toast.loading("Logging in...");

    try {
      const res = (await addLogin(data).unwrap()) as TLoginResponse;
      console.log("response: ", res);
      const user = verifyToken(res?.Data[0] || "") as TUser;

      dispatch(setUser({ user: user, token: res?.Data[0] || "" }));
      toast.success("Logged in successfully!", { id: toastId, duration: 1500 });
      if (res.success) {
        navigate("/");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Login failed!", {
        id: toastId,
        duration: 1500,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 font-inter px-4">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Info */}
        <div className="hidden lg:flex flex-col justify-center space-y-6">
          <h1 className="text-5xl font-bold text-gray-900">Welcome Back!</h1>
          <p className="text-gray-600 text-lg">
            Login to access your courses and continue your learning journey.
            Stay connected and grow your skills with our expert instructors.
          </p>
          <p className="text-gray-500 text-md">
            New here?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-semibold underline"
            >
              Create an account
            </Link>
          </p>
        </div>

        {/* Right Side: Login Form */}
        <div className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-2xl w-full max-w-md mx-auto relative">
          {/* Demo Credentials Box */}
          <div className="text-center bg-blue-100 border border-blue-300 text-blue-700 text-sm px-4 py-2 rounded-lg shadow-sm font-medium mb-6">
            <p className="font-semibold">Demo: Email demo@example.com</p>
            <p className="font-semibold">Password Demo@1234</p>
          </div>

          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-8 text-center mt-6">
            Login
          </h2>

          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            {/* Email */}
            <div className="flex flex-col">
              <label className="mb-2 text-gray-700 dark:text-gray-300 font-medium">
                Email
              </label>
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm hover:shadow-md"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="flex flex-col relative">
              <label className="mb-2 text-gray-700 dark:text-gray-300 font-medium">
                Password
              </label>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition shadow-sm hover:shadow-md pr-10"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="absolute right-3 top-12 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-500" />
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-shadow shadow-md hover:shadow-lg"
            >
              Login
            </button>

            {/* Bottom Text */}
            <p className="text-center text-gray-500 mt-4">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 cursor-pointer font-semibold underline"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
