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
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { connectSocket } from "../../services/socketservice";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../utils/firebaseConfig.ts";
import syncFirestoreProfileToAuth from "../services/firebaseSyncService.tsx";
import { z } from "zod";
import { LoadingOutlined } from "@ant-design/icons";
import { FiEye, FiEyeOff } from "react-icons/fi";

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
  otpRequired?: boolean;
  maskedPhone?: string;
};

type FetchBaseQueryErrorWithData = FetchBaseQueryError & {
  data: ApiResponse;
};

const Login = () => {
  const [isExclusive, setExclusive] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Step 2 (mandatory): OTP sent to the registered mobile after email + password are verified
  const [credentials, setCredentials] = useState<FormData | null>(null);
  const [maskedPhone, setMaskedPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(0);

  const [checkSuspendStatus] = useCheckSuspendStatusMutation();
  const [login, { isLoading: isEmailLoading }] = useLoginMutation();
  const [sendLoginOtp, { isLoading: isSendingOtp }] = useSendLoginOtpMutation();
  const [verifyLoginOtp, { isLoading: isVerifyingOtp }] = useVerifyLoginOtpMutation();

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const startOtpStep = (data: FormData, res: Partial<ApiResponse>) => {
    setCredentials(data);
    setMaskedPhone(res.maskedPhone || "");
    setOtp("");
    setCountdown(30);
    if (res.isDemo) {
      toast.info("Demo mode: Use OTP 123456 to login", { duration: 8000 });
    }
  };

  // Login modal (home navbar) hands over to this page for the OTP step
  useEffect(() => {
    const state = location.state as { credentials?: FormData; maskedPhone?: string; isDemo?: boolean } | null;
    if (state?.credentials) {
      startOtpStep(state.credentials, state);
      navigate(location.pathname, { replace: true, state: null });
    }
  }, []);

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

  // 1. Email + password -> backend sends OTP to the registered mobile (no session yet)
  const onEmailSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const res = await login(data);

      if ("error" in res && res.error) {
        const errorData = res.error as FetchBaseQueryErrorWithData;
        toast.error(errorData.data?.message || "Invalid email or password");
        return;
      }

      const resData = res.data as ApiResponse;
      toast.success(resData.message || "OTP sent to your registered mobile number");
      startOtpStep(data, resData);
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login");
    }
  };

  // 2. Resend OTP (server re-validates email + password)
  const handleResendOtp = async () => {
    if (!credentials) return;
    try {
      const res = await sendLoginOtp(credentials);

      if ("error" in res && res.error) {
        const errorData = res.error as FetchBaseQueryErrorWithData;
        toast.error(errorData.data?.message || "Failed to send OTP");
        return;
      }

      const data = res.data as ApiResponse;
      toast.success(data.message || "OTP sent successfully");
      startOtpStep(credentials, data);
    } catch (err) {
      console.error("Send OTP error:", err);
      toast.error("Could not send OTP. Please try again.");
    }
  };

  // 3. Verify OTP -> session is issued only now
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!credentials) return;
    if (!otp.trim()) {
      toast.error("Please enter the verification code");
      return;
    }

    try {
      const res = await verifyLoginOtp({ ...credentials, otp: otp.trim() });

      if ("error" in res && res.error) {
        const errorData = res.error as FetchBaseQueryErrorWithData;
        toast.error(errorData.data?.message || "Invalid or expired OTP");
        return;
      }

      try {
        await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
        await syncFirestoreProfileToAuth();
      } catch (fbErr: any) {
        console.warn("Firebase Auth sign-in non-blocking warning:", fbErr?.message);
      }

      const successData = res.data as ApiResponse;
      setCredentials(null);
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
          {credentials
            ? "For your security, verify the OTP sent to your registered mobile."
            : "Welcome back! Please enter your details."}
        </p>
      </div>

      <div className="w-full max-w-md px-2 py-4 mt-2">
        {/* ================= STEP 1: EMAIL + PASSWORD ================= */}
        {!credentials && (
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

        {/* ================= STEP 2: MANDATORY MOBILE OTP ================= */}
        {credentials && (
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
              <form onSubmit={handleVerifyOtp}>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-white text-sm md:text-base font-semibold">
                    Enter 6-Digit OTP
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setCredentials(null);
                      setOtp("");
                    }}
                    className="text-white/90 text-xs underline hover:text-white"
                  >
                    Back
                  </button>
                </div>

                <p className="text-white/90 text-xs mb-3">
                  Code sent to your registered mobile{" "}
                  {maskedPhone && <span className="font-semibold">{maskedPhone}</span>}
                </p>

                <input
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
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
                      onClick={handleResendOtp}
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
