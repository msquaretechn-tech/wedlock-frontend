
import Input from '../../components/input/Input';
import { useEffect,useState } from 'react';
import{ useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {useForgotpasswordMutation} from "../../Redux/Api/user.api";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { toast } from 'sonner'
import { LoadingOutlined } from '@ant-design/icons';
import { setActivationToken } from "../../Redux/Reducers/user.reducer";
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { z } from 'zod';


const schema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
  });
  
  type FormData = z.infer<typeof schema>;
  

const forgotPassword = () => {
  const [isExclusive, setExclusive] = useState(false);




    useEffect(()=>{
      const isExclusive = localStorage.getItem("isExclusive");
      if(isExclusive){
        setExclusive(true)
      }
  
    })

    const navigate = useNavigate();

    const dispatch = useDispatch();
  
    const [forgotpassword,{isLoading}] = useForgotpasswordMutation();
  
  
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
      defaultValues: {
        email: "",
      },
      resolver: zodResolver(schema),
    });
  
    
    type ApiResponse = {
      success: boolean;
      message: string;
      activationToken?: string;
    };
  
    type FetchBaseQueryErrorWithData = FetchBaseQueryError & {
      data: ApiResponse;
    };

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        try {
          const res = await forgotpassword({ email: data.email });
    
          console.log(data)
      
          if ('error' in res && res.error) {
            const errorData = res.error as FetchBaseQueryErrorWithData;
      
            if (errorData.data?.success === false) {
              toast.error(errorData.data.message); 
              return;
            }
          }
          const successData = res.data as ApiResponse;
          toast.success(successData.message);
          dispatch(setActivationToken(successData.activationToken!));
          navigate("/verify-otp");
        } catch (error) {
          toast.error("An error occurred");
        }
      };



  return (
    <div className={`min-w-screen min-h-screen flex flex-col items-center bg-[#007EAF] ${isExclusive? 'bg-[#60457E]': 'bg-[#007EAF]'} `}>
    <div className="flex items-center justify-center mb-14 w-[268px] h-[90px]">
      <Link to={"/"} className='fixed top-8'>
      <img src="/logowhite.png" alt="Logo"   className='w-72 h-24 ' />
      </Link>
    </div>

    <div className="flex flex-col items-center justify-center  mt-8 mb-4">
      <div className="bg-white flex items-center justify-center rounded-full w-12 h-12">
        <div className="bg-[#D1FADF] rounded-full w-9 h-9 flex items-center justify-center ">
          <img src="/confirm.png" alt="Star"  className="w-6 h-6"/>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center text-center text-white mt-4">
        <h1 className="text-4xl font-bold">Forgot password</h1>
        <p className="mt-4  text-md ">
        You will receive OTP verification code via email for resetting your password
        </p>
      </div>
    </div>

    <div className="w-full max-w-md px-2  py-4">
      <form action="" className="space-y-6 rounded-[8px]" onSubmit={handleSubmit(onSubmit)}>

        <Input
          label="Email"
          type="email"
          {...register("email")}
          placeholder="Enter your email"
        />
        {errors.email && <p className="text-orange-200">{errors.email.message}</p>}

        <button
           type="submit"
          className={`w-full py-2 px-4 ${isExclusive? 'text-[#60457E]': 'text-[#007EAF]'} rounded bg-[#ffffff]`}
          disabled={isSubmitting}
          
        >
          {isLoading ? <LoadingOutlined className={`${isExclusive? 'text-[#60457E]': 'text-[#007EAF]'} animate-spin`} /> : 'Send Email'}
          </button>
      </form>
    </div>
  </div>
  )
}

export default forgotPassword
