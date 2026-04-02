import React, { useRef } from 'react';
import { useEffect,useState } from 'react';
import Input from '../../components/input/Input';
import { useVerifyMutation } from "../../Redux/Api/user.api";
import { SubmitHandler, useForm } from "react-hook-form";
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie';
// import { useDispatch } from "react-redux";
// import {useForgotpasswordMutation} from "../../Redux/Api/user.api";
// import { setActivationToken } from "../../Redux/Reducers/user.reducer";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { z } from 'zod';
import { toast } from 'sonner';

const fieldNames = ['code0', 'code1', 'code2', 'code3'] as const;

const verificationSchema = z.object({
  code0: z.string().min(1, "Required").length(1, "Must be 1 character"),
  code1: z.string().min(1, "Required").length(1, "Must be 1 character"),
  code2: z.string().min(1, "Required").length(1, "Must be 1 character"),
  code3: z.string().min(1, "Required").length(1, "Must be 1 character"),
});


const Verify = () => {
  const [isExclusive, setExclusive] = useState(false);

  // const dispatch = useDispatch();


  useEffect(()=>{
    const isExclusive = localStorage.getItem("isExclusive");
    if(isExclusive){
      setExclusive(true)
    }
  },[])


  type VerificationInputs = z.infer<typeof verificationSchema>;

  const navigate = useNavigate();
  const [verify, { isLoading }] = useVerifyMutation();

  // const [forgotpassword, { isLoading: forgotpasswordLoading }] = useForgotpasswordMutation();

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<VerificationInputs>({
     resolver: zodResolver(verificationSchema),
   });
 

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    setValue(fieldNames[index], value); 
    if (value.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus(); // Focus on next input
    } else if (value.length === 0 && index > 0) {
      inputRefs.current[index - 1]?.focus(); // Focus on previous input if backspace is pressed
    }
  };

  type ApiResponse = {
    success: boolean;
    message: string;
    activationToken?: string;
  };

  type FetchBaseQueryErrorWithData = FetchBaseQueryError & {
    data: ApiResponse;
  };


  // const resendOtp = async () => {
  //   try {

  //     const email = localStorage.getItem("email");

  //     if(email){

  //     const res = await forgotpassword({ email: email });
    
      
  //         if ('error' in res && res.error) {
  //           const errorData = res.error as FetchBaseQueryErrorWithData;
      
  //           if (errorData.data?.success === false) {
  //             toast.error(errorData.data.message); 
  //             return;
  //           }
  //         }

          
  //       const successData = res?.data as ApiResponse;
  //       toast.success(successData.message);
  //       dispatch(setActivationToken(successData.activationToken!));
         
  //       }
     
  //   } catch (error) {
  //     toast.error("An error occurred");
  //   }
  // };






  const onSubmit: SubmitHandler<VerificationInputs> = async (data) => {
   try{
    const activationCode = data.code0 + data.code1 + data.code2 + data.code3;
    const activationToken = Cookies.get('activationToken');
    console.log(activationCode);

    const res = await verify({ activationCode, activationToken });

    if ('error' in res && res.error) {
      const errorData = res.error as FetchBaseQueryErrorWithData;
      if (errorData.data?.success === false) {
        toast.error(errorData.data.message);
        return;
      }
    }
    const successData = res.data as ApiResponse;
    
    toast.success(successData.message);
    Cookies.remove("activationToken");
    navigate("/change-password");

   }
   catch(error){
    toast.error("An error occurred");
   }
  };





  return (
    <div className={`min-w-screen min-h-screen flex flex-col items-center justify-center ${isExclusive? 'bg-[#60457E]': 'bg-[#007EAF]'}`}>
      <div className="flex items-center justify-center mb-14">
        <Link to={"/"} className='fixed top-4'>
        <img src="/logowhite.png" alt="" className="w-72 h-24 " />
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center mt-8 mb-2">
        <div className="bg-white flex items-center justify-center rounded-md w-12 h-12">
          <img src="/lock.png" alt="Lock" className="w-8 h-8" />
        </div>

        <div className="flex flex-col items-center justify-center text-white mt-4">
          <h1 className="text-4xl font-bold">One Time Password (OTP) verification code</h1>
          <p className="mt-4 md:text-lg text-center">
          Please enter a verification code sent to your email address
          </p>
        </div>
        <div className="flex items-center justify-center mt-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-4">
              {[0, 1, 2, 3].map((index) => (
                <div key={index}>
                  <Input
                    label=""
                    {...register(fieldNames[index])}
                    ref={el => inputRefs.current[index] = el} // Assign ref to input
                    className={`w-16 h-16 text-center rounded-xl text-3xl text-[#007EAF] placeholder-[#007EAF] outline-gray-400 ${errors[fieldNames[index] as typeof fieldNames[number]] ? 'border-red-500' : ''}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    placeholder="0"
                    onChange={(e) => handleInputChange(e, index)} // Handle input change to auto-shift focus
                  />
                  {errors[fieldNames[index] as typeof fieldNames[number]] && (
                    <p className="text-red-500 text-sm">
                      {errors[fieldNames[index] as typeof fieldNames[number]]?.message}
                    </p>
                  )}
                </div>
              ))}
            </div>
            {/* <div className="flex items-center justify-center mt-8 text-[#F9F5FF] gap-1 text-lg">
              <p>Did you not receive code? </p>
              <button onClick={resendOtp}>Click to resend.</button>
            </div> */}
            


            <button className={`bg-white ${isExclusive? 'text-[#8E69B4]': 'text-[#007EAF]'} w-full h-12 rounded-xl mt-6`}>
              {isLoading ? <LoadingOutlined className={`${isExclusive? 'text-[#60457E]': 'text-[#007EAF]'} animate-spin`} /> : 'Verify'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Verify;
