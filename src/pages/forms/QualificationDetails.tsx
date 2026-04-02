import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { useQualificationDetailsMutation } from "../../Redux/Api/form.api";
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from '@ant-design/icons';

import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from 'sonner'
import { useGetQualificationQuery, useGetOccupationQuery, useGetIncomeQuery } from "../../Redux/Api/dropdown.api";


// Define the Zod schema for form validation
const qualificationDetailsSchema = z.object({
  qualification: z.string().min(1, { message: "Qualification is required" }),
  currentWorkingStatus: z.string().min(1, { message: "Working status is required" }),
  occupation: z.string().min(1, { message: "Occupation is required" }),
  income: z.string().min(1, { message: "Income is required" }),
});

type QualificationDetailsFormData = z.infer<typeof qualificationDetailsSchema>;

const QualificationDetails = () => {
  const [isExclusive, setExclusive] = useState(false);
  const [qualifications, setQualifications] = useState<{ id: string; value: string }[]>([]);
  const [occupations, setOccupations] = useState<{ id: string; value: string }[]>([]);
  const [incomes, setIncomes] = useState<{ id: string; value: string }[]>([]);


  const { data: qualificationData, isLoading: isQualificationLoading } = useGetQualificationQuery();
  const { data: occupationData, isLoading: isOccupationLoading } = useGetOccupationQuery();
  const { data: incomeData, isLoading: isIncomeLoading } = useGetIncomeQuery();

  useEffect(() => {
    const isExclusive = localStorage.getItem("isExclusive");
    if (isExclusive) {
      setExclusive(true)
    }
  }, [])

  // const dispatch = useDispatch();
  const [qualificationDetails, { isLoading }] = useQualificationDetailsMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QualificationDetailsFormData>({
    resolver: zodResolver(qualificationDetailsSchema),
  });


  useEffect(() => {
    if (qualificationData && occupationData && incomeData) {
      setQualifications((qualificationData as any).data);
      setOccupations((occupationData as any).data);
      setIncomes((incomeData as any).data);
    }
  }, [qualificationData, occupationData, incomeData]);


  type ApiResponse = {
    success: boolean;
    message: string;
  };
  type FetchBaseQueryErrorWithData = FetchBaseQueryError & {
    data: ApiResponse;
  };


  const onSubmit = async (data: QualificationDetailsFormData) => {

    try {

      const res = await qualificationDetails(data);

      if ('error' in res && res.error) {
        const errorData = res.error as FetchBaseQueryErrorWithData;

        if (errorData.data?.success === false) {
          console.log(errorData.data.message);
          toast.error(errorData.data.message);
          return;
        }
      } else {
        const successData = res.data as ApiResponse;
        console.log(successData);
        // const isQualificationDetailsFormFilled = true
        toast.success(successData.message);
        // dispatch(setUser(isQualificationDetailsFormFilled));
        navigate("/location-details");
      }

    } catch (error) {
      console.log(error);
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <div className={`flex min-h-screen flex-col items-center justify-center ${isExclusive ? 'bg-[#60457E]' : 'bg-[#007EAF]'} px-5 md:px-20 lg:px-40 3xl:px-60`}>
      <img
        src="/logowhite.png"
        alt="Wedlock Logo"
        className="w-72 h-24 mx-auto mb-2"
      />
      <div className="mt-5 w-full flex-grow xl:mt-20 2xl:mt-10">
        <div className="mb-6 text-center text-white md:mb-20">
          <h1
            className="text-xl md:mb-2 md:text-3xl 2xl:text-5xl"
            style={{ fontFamily: "Proxima-Nova-Bold, sans-serif" }}
          >
            Your Qualification details
          </h1>
          <p className="text-sm leading-6 xl:text-xl">
            Sharing your qualifications allows us to match you with individuals who align with your educational and career aspirations
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="md:px-30 mt-5 flex flex-col md:px-20 xl:px-40 2xl:px-60 3xl:mt-20 3xl:px-60"
        >
          <div className="mb-2">
            <label className="block text-white">Highest qualification*</label>
            <div className="">
              <select
                {...register("qualification")}
                className="w-full rounded-[0.5rem] border bg-[#F9F5FFE5] p-2 text-[#838E9E]"
              >

                <option value="" disabled selected>
                  Select your highest qualification
                </option>
                {isQualificationLoading && <p>Loading...</p>}

                {qualifications.map((qualification) => (
                  <option key={qualification.id} value={qualification.value}>
                    {qualification.value}
                  </option>
                ))}
              </select>
              {errors.qualification && (
                <p className="text-orange-200 text-sm mt-1">
                  {errors.qualification.message}
                </p>
              )}
            </div>
          </div>

          <div className="mb-2">
            <label className="block text-white">Current working status</label>
            <div className="">
              <select

                {...register("currentWorkingStatus")}
                className="w-full rounded-[0.5rem] border bg-[#F9F5FFE5] p-2 text-[#838E9E]"
              >
                <option value="" disabled selected>
                  Select your working status
                </option>
                <option value={"working"}>Working</option>
                <option value={"selfEmployed"}>Self-employed</option>
                <option value={"unemployed"}>Unemployed</option>
                <option value={"retired"}>Retired</option>
                <option value="others">Others</option>
              </select>
              {errors.currentWorkingStatus && (
                <p className="text-orange-200 text-sm mt-1">
                  {errors.currentWorkingStatus.message}
                </p>
              )}
            </div>
          </div>

          <div className="mb-2">
            <label className="block text-white">Occupation*</label>
            <select
              {...register("occupation")}
              className="w-full rounded-[0.5rem] border bg-[#F9F5FFE5] p-2 text-[#838E9E]"
            >
              <option value="" disabled selected>
                Select your occupation
              </option>
              {isOccupationLoading && <p>Loading...</p>}
              {occupations.map((occupation) => (
                <option key={occupation.id} value={occupation.value}>
                  {occupation.value}
                </option>
              ))}
            </select>
            {errors.occupation && (
              <p className="text-orange-200 text-sm mt-1">
                {errors.occupation.message}
              </p>
            )}
          </div>

          <div className="mb-2">
            <label className="block text-white">Income*</label>
            <select
              {...register("income")}
              className="w-full rounded-[0.5rem] border bg-[#F9F5FFE5] p-2 text-[#838E9E]"
            >
              <option value="" disabled selected >
                Select your income
              </option>
              {isIncomeLoading && <p>Loading...</p>}
              {incomes.map((income) => (
                <option key={income.id} value={income.value}>
                  {income.value}
                </option>
              ))}
            </select>
            {errors.income && (
              <p className="text-orange-200 text-sm mt-1">
                {errors.income.message}
              </p>
            )}
          </div>

          <div className="mb-5 flex w-full justify-end py-8 pb-4 xl:px-10 2xl:mb-4 2xl:px-0 3xl:mb-20 3xl:px-0">
            <button
              type="submit"
              className={`w-full rounded-[0.5rem] bg-[#F9F5FFE5] px-4 py-2 ${isExclusive ? 'text-[#60457E]' : 'text-[#007EAF]'}
          md:w-20 2xl:w-32`}
            >
              {isLoading ? <LoadingOutlined className={`${isExclusive ? 'text-[#60457E]' : 'text-[#007EAF]'} animate-spin`} /> : 'Save'}

            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QualificationDetails;
