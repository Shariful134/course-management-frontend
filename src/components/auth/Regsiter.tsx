/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router-dom";
import type { FieldValues } from "react-hook-form";
import { useState } from "react";
import { useRegisterUserMutation } from "@/redux/auth/authApi";
import type { TResponse } from "@/type/types";
import { toast } from "sonner";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

const Registration = () => {
  const navigate = useNavigate();
  const [addRegisterUser] = useRegisterUserMutation();
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // ✅ state for toggle

  const validatePassword = (password: string) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!regex.test(password)) {
      setPasswordError(
        "Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (@, $, %, etc.)."
      );
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleRegister = async (e: FieldValues) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    if (!validatePassword(data?.password as string)) return;

    try {
      const res = (await addRegisterUser(data)) as TResponse<any>;
      console.log("response: ", res);
      if (res?.error) {
        toast.error(res?.error?.data?.message);
      } else {
        toast.success(res?.data?.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 font-inter px-4">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* Left Side: Info */}
        <div className="text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Register Now!
          </h1>
          <p className="text-gray-600 mb-6">
            Join our platform and start learning from top instructors. Grow your
            skills and achieve your goals.
          </p>
          <p className="text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-semibold underline">
              Login
            </Link>
          </p>
        </div>

        {/* Right Side: Registration Form */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
            Create Account
          </h2>
          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label className="mb-1 text-gray-700 dark:text-gray-300 font-medium">
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-gray-700 dark:text-gray-300 font-medium">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>

            <div className="flex flex-col relative">
              <label className="mb-1 text-gray-700 dark:text-gray-300 font-medium">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"} // ✅ toggle type
                name="password"
                placeholder="Password"
                className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition pr-10"
                required
              />
              <div
                className="absolute right-3 top-11 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-500" />
                )}
              </div>
              {passwordError && (
                <p className="text-red-600 text-sm mt-1">{passwordError}</p>
              )}
            </div>

            <button
              type="submit"
              className="mt-2 cursor-pointer bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-shadow shadow-md hover:shadow-lg"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
