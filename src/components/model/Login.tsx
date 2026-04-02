import React from "react";
import Input from "../input/Input";
import { useNavigate, Link } from "react-router-dom";
import { useLoginMutation } from "../../Redux/Api/user.api";
import { setUser } from "../../Redux/Reducers/user.reducer";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { LoadingOutlined } from "@ant-design/icons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../utils/firebaseConfig.ts";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, "Password is required"),
});

type FormData = z.infer<typeof loginSchema>;

interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  


  const [login, { isLoading }] = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors},
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  type ApiResponse = {
    success: boolean;
    message: string;
    user?: any;
  };

  type FetchBaseQueryErrorWithData = FetchBaseQueryError & {
    data: ApiResponse;
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
     

      const res = await login(data);

      if ("error" in res && res.error) {
        const errorData = res.error as FetchBaseQueryErrorWithData;

        if (errorData.data?.success === false) {
          toast.error(errorData.data.message);
          return;
        }
      }
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      console.log('signIn user', user);
      

      dispatch(setUser(res.data));

      const successData = res.data as ApiResponse;
      toast.success(successData.message);

      if (successData.success === true) {

        const isLocationFormFilled = successData?.user?.isLocationFormFilled;
        const isPersonalFormFilled = successData?.user?.isPersonalFormFilled;
        const isImageFormFilled = successData?.user?.isImageFormFilled;
        const isQualificationFormFilled = successData?.user?.isQualificationFormFilled;
        const isOtherFormFilled = successData?.user?.isOtherFormFilled;




          const allFormsFilled = isLocationFormFilled && isPersonalFormFilled && isImageFormFilled && isQualificationFormFilled && isOtherFormFilled
    
          if (allFormsFilled) {
            navigate('/user-dashboard');
          } 
          else {
            if (!isPersonalFormFilled) {
              navigate('/personal-details');
            } else if (!isQualificationFormFilled) { 
              navigate('/qualification-details');
            } else if (!isLocationFormFilled) {
              navigate('/location-details');
            } else if (!isImageFormFilled) {
              navigate('/photoupload');
            } else if (!isOtherFormFilled) {
              navigate('/other-details');
            }
          }
        }

      
    } catch (error) {
      toast.error("An error occurred");
    }
  };

 
  if (!isOpen) return null;

  return (
    <div className="flex items-center justify-center  ">
      <div
        className="backdrop-blur-xl
  p-8 rounded-2xl absolute top-20 right-5 left-5 md:left-auto md:top-16 xl:top-32 md:right-20 xl:w-[50%] "
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-2xl text-black bg-white rounded-sm w-10"
        >
          &times;
        </button>
        <form
          className="grid grid-cols-1 xl:grid-cols-5 gap-4 mt-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-4 md:col-span-2">
            <Input
              label=""
              {...register("email")}
              type="email"
              className="border w-full  bg-white border-gray-300  text-black px-10 p-2 rounded-3xl"
              placeholder="Enter your Email"
            />
            {errors.email && (
              <p className="text-orange-200">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-4 md:col-span-2">
            <Input
              label=""
              type="password"
              {...register("password")}
              className="border w-full bg-white border-gray-300 text-black px-10 p-2 rounded-3xl"
              placeholder="Enter your Password"
            />
            {errors.password && (
              <p className="text-orange-200">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-[#007EAF] text-white px-4 py-2  h-10 w-full rounded-3xl"
          >
            {isLoading ? (
              <LoadingOutlined className="text-white animate-spin" />
            ) : (
              "Login"
            )}
          </button>
        </form>
        <div className="flex flex-col xl:flex-row items-center justify-between xl:justify-between  mb-4 mt-2 ">
          <div className="flex items-center">
            <input type="checkbox" id="rememberMe" className="mr-2" />
            <label htmlFor="rememberMe" className="text-white">
              Remember me
            </label>
          </div>
          <Link
            to="/forgot-password"
            className="text-white xl:mr-40 underline"
          >
            Forgot your login details?
          </Link>
        </div>
        <div className="flex items-center justify-center my-4">
          <hr className="flex-grow border-gray-400" />
          <span className="mx-4 text-white">Or</span>
          <hr className="flex-grow border-gray-400" />
        </div>
        <div className="flex xl:items-left xl:justify-left ">
          <p>
            New User ?{" "}
            <Link to="/questions" className="text-white ">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
