import { useEffect, useState } from "react";
import { useResetpasswordMutation } from "../../Redux/Api/user.api";
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import Cookies from 'js-cookie';
import Input from '../../components/input/Input';
import { Link, useNavigate } from "react-router-dom";
import { LoadingOutlined } from '@ant-design/icons';
import { IoEyeOutline } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { z } from 'zod';
import { toast } from 'sonner';

const ChangePassword = () => {
  const [isExclusive, setExclusive] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const isExclusive = localStorage.getItem("isExclusive");
    if (isExclusive) {
      setExclusive(true);
    }
  }, []);

  const navigate = useNavigate();
  const [resetpassword, { isLoading }] = useResetpasswordMutation();

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  const createPasswordSchema = z.object({
    password: z.string().min(8, "Password must be at least 8 characters long").regex(passwordRegex, "Password must include uppercase, lowercase, number, and special character"),
    confirmPassword: z.string().min(8),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

  type CreatePasswordInputs = z.infer<typeof createPasswordSchema>;

  const { register, handleSubmit, formState: { errors } } = useForm<CreatePasswordInputs>({
    resolver: zodResolver(createPasswordSchema),
  });

  type ApiResponse = {
    success: boolean;
    message: string;
  };

  type FetchBaseQueryErrorWithData = FetchBaseQueryError & {
    data: ApiResponse;
  };

  const onSubmit: SubmitHandler<CreatePasswordInputs> = async (data) => {
    const { password: confirmPassword } = data;
    try {
      const res = await resetpassword({ password: confirmPassword });

      if ('error' in res && res.error) {
        const errorData = res.error as FetchBaseQueryErrorWithData;
        if (errorData.data?.success === false) {
          toast.error(errorData.data.message);
          return;
        }
      } else {
        const successData = res.data as ApiResponse;
        toast.success(successData.message);
        Cookies.remove("answers");
        navigate("/personal-details");
      }

    } catch (error) {
      toast.error("An unexpected error occurred.");
      console.error(error);
    }
  };

  return (
    <div className={`min-w-screen h-screen flex flex-col items-center justify-center ${isExclusive ? 'bg-[#60457E]' : 'bg-[#007EAF]'}`}>
      <Link to="/" className="fixed top-10">
        <img src="/logowhite.png" alt="logo" className="w-72 h-24" />
      </Link>

      <div className="flex flex-col items-center justify-center mt-20">
        <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center">
          <div className="bg-[#D1FADF] rounded-full w-9 h-9 flex items-center justify-center">
            <img src="/confirm.png" alt="confirm" className="w-6 h-6" />
          </div>
        </div>
        <div className="text-white mt-4 text-center">
          <h1 className="text-3xl font-bold">Change your password</h1>
          <p className="mt-4 md:text-lg">
            Please choose a strong password that is long, random, and unique.
            <br />
            Strong passwords include numbers, letters, and punctuation marks.
            <br />
            Avoid using common words and personal information.
          </p>
        </div>
      </div>

      <div className="w-full max-w-md px-4 py-4 mt-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 relative">
            <Input
              label="Enter new Password"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className={`w-full rounded-md border-2 p-2 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-[43px] right-3 cursor-pointer text-gray-600"
            >
              {showPassword ? <FaEyeSlash /> : <IoEyeOutline />}
            </span>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <div className="mb-4 relative">
            <Input
              label="Re-enter password"
              placeholder="Re-enter password"
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword")}
              className={`w-full rounded-md border-2 p-2 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute top-[43px] right-3 cursor-pointer text-gray-600"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <IoEyeOutline />}
            </span>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            className={`bg-white ${isExclusive ? 'text-[#60457E]' : 'text-[#007EAF]'} w-full h-10 rounded-md mt-4 font-semibold`}
          >
            {isLoading ? (
              <LoadingOutlined className="animate-spin" />
            ) : (
              "Change Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
