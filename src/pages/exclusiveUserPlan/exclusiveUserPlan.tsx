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

  const getPlanDuration = () =>
    activeTab === "Monthly" ? "Per Month" : "Per Year";

  // Filter plans based on activeTab and exclude "Premium"
  const filteredPlans = planData?.data?.filter(
    (plan: any) =>
      (activeTab === "Monthly"
        ? plan.planType === "Monthly"
        : plan.planType === "Yearly") && plan.planName !== "Premium"
  );

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
      const res = await createCheckoutSession(id);
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
          
          <div className="mt-5 flex h-16 w-60 items-center gap-8 rounded-full bg-[#FFF9EE] p-3 xl:mt-0">
            <button
              className={`flex h-10 w-32 items-center justify-center p-2 rounded-full transition-all duration-300 ${
                activeTab === "Monthly" ? "bg-[#FFC759] w-52" : "bg-transparent"
              }`}
              onClick={() => setActiveTab("Monthly")}
            >
              <h1
                className={`font-semibold transition-colors duration-300 ${
                  activeTab === "Monthly" ? "text-white" : "text-[#42526B]"
                }`}
              >
                Monthly
              </h1>
            </button>

            <button
              className={`flex h-10 w-32 items-center justify-center p-2 rounded-full transition-all duration-300 ${
                activeTab === "Yearly" ? "bg-[#FFC759] w-52" : "bg-transparent"
              }`}
              onClick={() => setActiveTab("Yearly")}
            >
              <h1
                className={`font-semibold transition-colors duration-300 ${
                  activeTab === "Yearly" ? "text-white" : "text-[#42526B]"
                }`}
              >
                Yearly
              </h1>
            </button>
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
