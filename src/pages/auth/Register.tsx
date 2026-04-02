import { useState,useEffect } from 'react';
import Input from '../../components/input/Input';
import {useRegisterUserMutation} from "../../Redux/Api/user.api";
import { setActivationToken } from "../../Redux/Reducers/user.reducer";
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { useDispatch } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import {LoadingOutlined} from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { toast } from 'sonner'
import { z } from 'zod';




const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

type FormData = z.infer<typeof schema>;



const register = () => {
  const [isExclusive, setExclusive] = useState(false);

  useEffect(()=>{
    const isExclusive = localStorage.getItem("isExclusive");
    if(isExclusive){
      setExclusive(true)
    }

  })




    const navigate = useNavigate();
    
    const dispatch = useDispatch();
  const [registerUser,{isLoading}] = useRegisterUserMutation();

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

     localStorage.setItem("email", data.email);
      const res = await registerUser({ email: data.email });
  
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
      navigate("/verification");
    } catch (error) {
      toast.error("An error occurred");
    }
  };


    

  return (
    <div className={`min-w-screen min-h-screen flex flex-col items-center justify-center ${isExclusive? 'bg-[#60457E]': 'bg-[#007EAF]'}`}>
      <div className="flex items-center justify-center mb-14">
        <Link to={"/"} className='mx-auto mb-2 fixed top-10'>
        <img src="/logowhite.png" alt="Logo"  className="w-72 h-24 " />
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center mt-8 mb-2">
        <div className="bg-white flex items-center justify-center rounded-md w-10 h-10">
          <img src="/star.png" alt="Star"  />
        </div>
        <div className="flex flex-col items-center justify-center text-white mt-4 text-center">
          <h1 className="text-4xl font-bold">Create an account</h1>
          <p className="mt-4 md:text-xl">By tapping the button, you agree to our  Terms. Learn  how we  process <br className='hidden md:block'/> your data  in our Privacy Policy and Cookie Policy.
          </p>
        </div>
      </div>

      <div className="w-full max-w-md px-2 py-4">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Email"
            type="email"
            {...register("email")}
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-orange-200">{errors.email.message}</p>}

          <button
            type="submit"
            className={`w-full py-2 px-4 ${isExclusive? 'text-[#8E69B4]': 'text-[#60457E]'} rounded bg-[#ffffff]`}
            disabled={isSubmitting}
          >
            {isLoading ? <LoadingOutlined className={`${isExclusive? 'text-[#60457E]': 'text-[#007EAF]'} animate-spin`} /> : '         Create an account'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default register
