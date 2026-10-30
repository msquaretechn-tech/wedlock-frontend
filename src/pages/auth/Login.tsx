import Input from "../../components/input/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useLoginMutation,
  useSendLoginOtpMutation,
  useVerifyLoginOtpMutation,
  useCheckSuspendStatusMutation,
} from "../../Redux/Api/user.api";
import { setUser } from "../../Redux/Reducers/user.reducer";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { connectSocket } from "../../services/socketservice";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../utils/firebaseConfig.ts";
import syncFirestoreProfileToAuth from "../services/firebaseSyncService.tsx";
import { z } from "zod";
import { LoadingOutlined } from "@ant-design/icons";
import { FiEye, FiEyeOff, FiMail, FiPhone } from "react-icons/fi";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, "Password is required"),
});

type FormData = z.infer<typeof loginSchema>;

type ApiResponse = {
  success: boolean;
  message: string;
  user: any;
  isDemo?: boolean;
};

type FetchBaseQueryErrorWithData = FetchBaseQueryError & {
  data: ApiResponse;
};

const Login = () => {
  const [isExclusive, setExclusive] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Tab State: 'email' or 'mobile'
  const [loginMethod, setLoginMethod] = useState<"email" | "mobile">("email");

  // Mobile OTP States
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const [checkSuspendStatus] = useCheckSuspendStatusMutation();
  const [login, { isLoading: isEmailLoading }] = useLoginMutation();
  const [sendLoginOtp, { isLoading: isSendingOtp }] = useSendLoginOtpMutation();
  const [verifyLoginOtp, { isLoading: isVerifyingOtp }] = useVerifyLoginOtpMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const isExcl = localStorage.getItem("isExclusive");
    if (isExcl) {
      setExclusive(true);
    }
  }, []);

  // Countdown timer for Resend OTP
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  // Reusable Post-Login Processor for both Email and Mobile OTP
  const processSuccessfulLogin = async (successData: ApiResponse) => {
    try {
      dispatch(setUser(successData));
      connectSocket();

      toast.success(successData.message || "Login successful!");

      const isLocationFormFilled = successData?.user?.isLocationFormFilled;
      const isPersonalFormFilled = successData?.user?.isPersonalFormFilled;
      const isImageFormFilled = successData?.user?.isImageFormFilled;
      const isQualificationFormFilled = successData?.user?.isQualificationFormFilled;
      const isOtherFormFilled = successData?.user?.isOtherFormFilled;
      const userId = successData?.user?.userId;

      if (!userId) {
        toast.error("No userId found.");
        return;
      }

      const suspensionResult = await checkSuspendStatus({ userId }).unwrap();
      if (suspensionResult?.isSuspended) {
        navigate("/suspended", {
          state: { suspension: suspensionResult },
        });
        return;
      }

      const allFormsFilled =
        isLocationFormFilled &&
        isPersonalFormFilled &&
        isImageFormFilled &&
        isQualificationFormFilled &&
        isOtherFormFilled;

      if (allFormsFilled) {
        navigate("/user-dashboard");
      } else {
        if (!isPersonalFormFilled) {
          navigate("/personal-details");
        } else if (!isQualificationFormFilled) {
          navigate("/qualification-details");
        } else if (!isLocationFormFilled) {
          navigate("/location-details");
        } else if (!isImageFormFilled) {
          navigate("/photoupload");
        } else if (!isOtherFormFilled) {
          navigate("/other-details");
        }
      }
    } catch (err: any) {
      console.error("Post-login error:", err);
      toast.error(err?.message || "An error occurred during session processing");
    }
  };

  // 1. Email Login Submit
  const onEmailSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const res = await login(data);

      if ("error" in res && res.error) {
        const errorData = res.error as FetchBaseQueryErrorWithData;
        if (errorData.data?.message) {
          toast.error(errorData.data.message);
          return;
        }
        toast.error("Invalid email or password");
        return;
      }

      try {
        await signInWithEmailAndPassword(auth, data.email, data.password);
        await syncFirestoreProfileToAuth();
      } catch (fbErr: any) {
        console.warn("Firebase Auth sign-in non-blocking warning:", fbErr?.message);
      }

      const successData = res.data as ApiResponse;
      await processSuccessfulLogin(successData);
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login");
    }
  };

  // 2. Mobile OTP: Send OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phoneNumber.replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }

    try {
      const res = await sendLoginOtp({
        phoneNumber: cleanPhone,
        countryCode,
      });

      if ("error" in res && res.error) {
        const errorData = res.error as FetchBaseQueryErrorWithData;
        toast.error(errorData.data?.message || "Failed to send OTP");
        return;
      }

      const data = res.data as ApiResponse;
      toast.success(data.message || "OTP sent successfully");
      if (data.isDemo) {
        toast.info("Demo mode: Use OTP 123456 to login", { duration: 8000 });
      }
      setOtpSent(true);
      setCountdown(30);
    } catch (err) {
      console.error("Send OTP error:", err);
      toast.error("Could not send OTP. Please try again.");
    }
  };

  // 3. Mobile OTP: Verify & Login
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp.trim()) {
      toast.error("Please enter the verification code");
      return;
    }

    try {
      const cleanPhone = phoneNumber.replace(/\D/g, "");
      const res = await verifyLoginOtp({
        phoneNumber: cleanPhone,
        otp: otp.trim(),
        countryCode,
      });

      if ("error" in res && res.error) {
        const errorData = res.error as FetchBaseQueryErrorWithData;
        toast.error(errorData.data?.message || "Invalid or expired OTP");
        return;
      }

      const successData = res.data as ApiResponse;
      await processSuccessfulLogin(successData);
    } catch (err) {
      console.error("Verify OTP error:", err);
      toast.error("OTP verification failed");
    }
  };

  return (
    <div
      className={`min-w-screen min-h-screen flex flex-col items-center justify-center p-4 ${
        isExclusive ? "bg-[#60457E]" : "bg-[#007EAF]"
      }`}
    >
      <div className="flex items-center justify-center pt-2 pb-2">
        <Link to="/" className="">
          <img src="/logowhite.png" alt="Wedlock Logo" className="h-20 md:h-24" />
        </Link>
      </div>

      <div className="flex flex-col items-center justify-center mt-2">
        <div className="bg-white flex items-center justify-center rounded-md w-12 h-12 shadow-md">
          <img src="/login.png" alt="login" className="w-8 h-8" />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center text-white mt-2 text-center">
        <h1 className="text-2xl md:text-3xl font-bold">Log in to your account</h1>
        <p className="mt-2 text-sm md:text-base text-gray-100">
          Welcome back! Please choose your login method.
        </p>
      </div>

      <div className="w-full max-w-md px-2 py-4 mt-2">
        {/* Toggle Tabs: Email vs Mobile */}
        <div className="flex bg-black/20 p-1 rounded-xl mb-5 backdrop-blur-sm border border-white/20">
          <button
            type="button"
            onClick={() => setLoginMethod("email")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm md:text-base font-semibold rounded-lg transition-all ${
              loginMethod === "email"
                ? "bg-white text-gray-900 shadow-md"
                : "text-white/80 hover:text-white hover:bg-white/10"
            }`}
          >
            <FiMail size={18} />
            Email Login
          </button>
          <button
            type="button"
            onClick={() => setLoginMethod("mobile")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm md:text-base font-semibold rounded-lg transition-all ${
              loginMethod === "mobile"
                ? "bg-white text-gray-900 shadow-md"
                : "text-white/80 hover:text-white hover:bg-white/10"
            }`}
          >
            <FiPhone size={18} />
            Mobile OTP
          </button>
        </div>

        {/* ================= EMAIL LOGIN FORM ================= */}
        {loginMethod === "email" && (
          <form onSubmit={handleSubmit(onEmailSubmit)}>
            <div>
              {/* Email */}
              <Input
                {...register("email")}
                placeholder="Enter your email"
                label="Email"
                labelStyle={{ color: "white", fontSize: "16px", fontWeight: "600" }}
                labelClassName="text-base md:text-lg font-semibold"
              />
              {errors.email && <p className="text-orange-200 text-sm -mt-2 mb-3">{errors.email.message}</p>}

              {/* Password */}
              <div style={{ position: "relative" }}>
                <Input
                  label="Password"
                  labelStyle={{ color: "white", fontSize: "16px", fontWeight: "600" }}
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-[42px] text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
              {errors.password && <p className="text-orange-200 text-sm -mt-2 mb-3">{errors.password.message}</p>}
            </div>

            <div className="flex items-center justify-end mb-6 text-[#F9F5FF] text-sm md:text-base">
              <Link to="/forgot-password" className="hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isEmailLoading}
              className={`bg-white ${
                isExclusive ? "text-[#60457E]" : "text-[#007EAF]"
              } w-full h-12 rounded-lg font-bold shadow-lg hover:bg-gray-100 transition flex items-center justify-center`}
            >
              {isEmailLoading ? (
                <LoadingOutlined className={`${isExclusive ? "text-[#60457E]" : "text-[#007EAF]"} animate-spin`} />
              ) : (
                "Log In"
              )}
            </button>
          </form>
        )}

        {/* ================= MOBILE OTP LOGIN FORM ================= */}
        {loginMethod === "mobile" && (
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
            {!otpSent ? (
              // Step 1: Enter Mobile Number & Send OTP
              <form onSubmit={handleSendOtp}>
                <label className="text-white text-sm md:text-base font-semibold block mb-2">
                  Mobile Number
                </label>
                <div className="flex gap-2">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="p-2.5 bg-white text-gray-900 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="+91">+91 (IN)</option>
                    <option value="+61">+61 (AU)</option>
                    <option value="+1">+1 (US)</option>
                    <option value="+44">+44 (UK)</option>
                    <option value="+971">+971 (AE)</option>
                  </select>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter 10-digit mobile number"
                    maxLength={15}
                    className="flex-1 p-2.5 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    required
                  />
                </div>
                <p className="text-white/80 text-xs mt-2 mb-6">
                  We will send a 6-digit verification code to this number.
                </p>

                <button
                  type="submit"
                  disabled={isSendingOtp}
                  className={`bg-white ${
                    isExclusive ? "text-[#60457E]" : "text-[#007EAF]"
                  } w-full h-12 rounded-lg font-bold shadow-lg hover:bg-gray-100 transition flex items-center justify-center`}
                >
                  {isSendingOtp ? (
                    <LoadingOutlined className={`${isExclusive ? "text-[#60457E]" : "text-[#007EAF]"} animate-spin`} />
                  ) : (
                    "Send OTP"
                  )}
                </button>
              </form>
            ) : (
              // Step 2: Enter OTP & Verify
              <form onSubmit={handleVerifyOtp}>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-white text-sm md:text-base font-semibold">
                    Enter 6-Digit OTP
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setOtpSent(false);
                      setOtp("");
                    }}
                    className="text-white/90 text-xs underline hover:text-white"
                  >
                    Change Number
                  </button>
                </div>

                <p className="text-white/90 text-xs mb-3">
                  Code sent to <span className="font-semibold">{countryCode} {phoneNumber}</span>
                </p>

                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="e.g. 123456"
                  maxLength={6}
                  className="w-full p-3 text-center tracking-widest text-xl font-bold border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white mb-4"
                  required
                />

                <div className="flex justify-between items-center mb-6 text-xs text-white">
                  <span>Didn't receive code?</span>
                  {countdown > 0 ? (
                    <span className="text-white/80">Resend in {countdown}s</span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={isSendingOtp}
                      className="font-bold underline hover:text-white"
                    >
                      Resend OTP
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isVerifyingOtp}
                  className={`bg-white ${
                    isExclusive ? "text-[#60457E]" : "text-[#007EAF]"
                  } w-full h-12 rounded-lg font-bold shadow-lg hover:bg-gray-100 transition flex items-center justify-center`}
                >
                  {isVerifyingOtp ? (
                    <LoadingOutlined className={`${isExclusive ? "text-[#60457E]" : "text-[#007EAF]"} animate-spin`} />
                  ) : (
                    "Verify & Log In"
                  )}
                </button>
              </form>
            )}
          </div>
        )}

        <button
          className="bg-transparent border border-white/60 text-white mt-4 w-full h-12 rounded-lg font-semibold hover:bg-white/10 transition"
          onClick={() => navigate("/questions")}
        >
          Create an account
        </button>
      </div>
    </div>
  );
};

export default Login;
