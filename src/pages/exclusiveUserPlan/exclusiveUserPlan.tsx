import { useState } from "react";
// import Navbar from "../../components/home/Navbar.tsx";
// import Footer from "../../components/home/Footer.tsx";
// import FAQ from "../../components/faqs/Faqs.tsx";
// import Subscription from "../../components/Subscription/Subscription";
import "../../font.css";
import { useGetPlansQuery } from "../../Redux/Api/plan.api";
import PlanCard from "../../components/PlanCard/PlanCard";
import Loading from "../../components/Loading";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { useCreateCheckoutSessionMutation } from "../../Redux/Api/checkout.api";
import { toast } from "sonner";

const PricingPage = () => {
  const [activeTab, setActiveTab] = useState("Monthly");

  const { data: planData, isLoading, error } = useGetPlansQuery<any>();
  const [createCheckoutSession] = useCreateCheckoutSessionMutation();

  const getPlanDuration = () => {
    switch (activeTab) {
      case "Monthly":
        return "Per Month";
      case "3 Months":
      case "3-Month":
        return "For 3 Months";
      case "6 Months":
      case "6-Month":
        return "For 6 Months";
      case "Yearly":
        return "Per Year";
      default:
        return `For ${activeTab}`;
    }
  };

  // Filter plans based on activeTab and exclude "Premium"
  const filteredPlans = planData?.data?.filter((plan: any) => {
    if (plan.planName === "Premium") return false;

    const pt = (plan.planType || "").toLowerCase();
    const duration = Number(plan.durationInMonths) || 1;

    if (activeTab === "Monthly") {
      if (duration === 3 || duration === 6 || duration >= 12) return false;
      if (pt.includes("3") || pt.includes("6") || pt.includes("year") || pt.includes("annual")) return false;
      return pt.includes("month") || duration === 1;
    } else if (activeTab === "3 Months" || activeTab === "3-Month") {
      return duration === 3 || pt.includes("3") || pt.includes("quarter");
    } else if (activeTab === "6 Months" || activeTab === "6-Month") {
      return duration === 6 || pt.includes("6") || pt.includes("half");
    } else if (activeTab === "Yearly") {
      return duration === 12 || pt.includes("year") || pt.includes("annual");
    }
    return true;
  });

  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (error || !planData?.data) return <div>Error loading plans</div>;

  type ApiResponse = {
    success: boolean;
    message: string;
    url: string;
  };

  type FetchBaseQueryErrorWithData = FetchBaseQueryError & {
    data: ApiResponse;
  };

  const handleCheckout = async (id: string) => {
    try {
      const res = await createCheckoutSession({ planId: id });
      if ("error" in res && res.error) {
        const errorData = res.error as FetchBaseQueryErrorWithData;
        if (errorData.data?.success === false) {
          toast.error(errorData.data.message);
          return;
        }
      }
      const successData = res.data as ApiResponse;
      window.location.href = successData.url;
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#60457E] px-5 md:px-20 lg:px-40 3xl:px-60">
         
    
      <div className="px-2">
      <img
        src="/logowhite.png"
        alt="Wedlock Logo"
        className="w-72 h-24 mx-auto absolute top-0 right-0 left-0"
        />
        <div className="flex flex-col items-center justify-center md:flex-row">
          
          <div className="mt-5 flex flex-wrap items-center gap-1.5 md:gap-2 rounded-full bg-[#FFF9EE] p-1.5 xl:mt-0 shadow-sm border border-[#FFE7B8]">
            {["Monthly", "3 Months", "6 Months", "Yearly"].map((tab) => (
              <button
                key={tab}
                type="button"
                className={`flex h-10 px-4 md:px-5 items-center justify-center rounded-full transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-[#FFC759] shadow-sm text-white"
                    : "bg-transparent text-[#42526B] hover:text-black hover:bg-black/5"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                <span className="font-semibold text-sm md:text-base whitespace-nowrap">
                  {tab}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 justify-items-center gap-4 md:grid-cols-1 lg:gap-8 xl:gap-24">
          {filteredPlans.map((plan: any) => (
            <PlanCard
              key={plan.id}
              title={plan.planName}
              price={plan.price}
              duration={getPlanDuration()}
              isHighlighted={false}
              features={plan.featureList}
              id={plan.id}
              onClick={() => handleCheckout(plan.id)}
            />
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default PricingPage;
