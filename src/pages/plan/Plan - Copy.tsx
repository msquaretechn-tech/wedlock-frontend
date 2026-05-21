import { useState, useEffect } from "react";
// @ts-ignore
import FAQ from "../../components/faqs/Faqs.tsx";
import "../../font.css";
import { useGetPlansQuery } from "../../Redux/Api/plan.api";
import PlanCard from "../../components/PlanCard/PlanCard";
import Loading from "../../components/Loading";
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { useCreateCheckoutSessionMutation } from "../../Redux/Api/checkout.api";
import { toast } from 'sonner';
import { RootState } from "./../../Redux/store";
import { useSelector } from "react-redux";
// @ts-ignore
import { Link } from "react-router-dom";
import PremiumPlan from "../planDiscriptions/PremiumPlan";
import ExclusivePlan from "../planDiscriptions/ExclusivePlan";
import { Typography } from "@mui/material";


const PricingPage = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const [activeTab, setActiveTab] = useState("Monthly");
  const [showExclusiveModal, setShowExclusiveModal] = useState(false);
  const [showPremiumDescription, setShowPremiumDescription] = useState(false);
  const [showExclusiveDescription, setShowExclusiveDescription] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);




  const currentPlan = user?.usertype;

  const { data: planData, isLoading, error } = useGetPlansQuery<any>();
  const [createCheckoutSession] = useCreateCheckoutSessionMutation();

  // Debug: log raw API response to check planType values
  console.log("planData raw:", planData);
  console.log("plans array:", planData?.data);
  if (planData?.data?.length > 0) {
    console.log("First plan sample:", planData.data[0]);
    console.log("planType values:", planData.data.map((p: any) => p.planType));
  }

  const getPlanDuration = () =>
    activeTab === "Monthly" ? "Per Month" : "Per Year";

  // Case-insensitive filter — handles 'monthly', 'Monthly', 'month', etc.
  const filteredPlans = planData?.data
    ?.filter((plan: any) => {
      const pt = (plan.planType || "").toLowerCase();
      if (activeTab === "Monthly" && !pt.includes("month")) return false;
      if (activeTab === "Yearly" && !pt.includes("year") && !pt.includes("annual")) return false;
      if (currentPlan === "Exclusive" && plan.planName === "Premium") return false;
      return true;
    })
    .sort((a: any, b: any) => {
      if (a.planName === "Premium") return -1;
      if (b.planName === "Premium") return 1;
      return 0;
    });

  console.log("filteredPlans:", filteredPlans);

  if (isLoading) return <div><Loading /></div>;
  if (error || !planData?.data) return <div style={{ padding: 24, color: 'red' }}>Error loading plans. Check console.</div>;

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
    } catch {
      toast.error("An error occurred");
    }
  };

  const handlePlanClick = (planId: string, planName: string,) => {
    setSelectedPlanId(planId);
    if (planName === "Exclusive") {
      setShowExclusiveDescription(true);
    } else if (planName === "Premium") {
      setShowPremiumDescription(true);
    } else {
      handleCheckout(planId);
    }
  };

  const handleEligible = () => {
    setShowExclusiveModal(false);

    if (selectedPlanId) {
      handleCheckout(selectedPlanId);
    }
  };

  const handlePremiumContinue = () => {
    setShowPremiumDescription(false);
    if (selectedPlanId) {
      handleCheckout(selectedPlanId);
    }
  };

  const handleExclusiveContinue = () => {
    setShowExclusiveDescription(false);
    setShowExclusiveModal(true);
  };



  return (
    <>
      <div className=" ">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="flex flex-col space-y-4 mt-8 ">
            <h3 className="text-3xl max-md:text-xl  font-semibold">Subscription Plans</h3>
            <div>
              <Typography variant="subtitle1" fontWeight={400} sx={{ color: "inherit" }}>

                Choose a plan to enhance your experience.

              </Typography>

            </div>
          </div>

          <div className="mt-5 flex h-16 w-60 items-center gap-8 rounded-full bg-[#FFF9EE] p-3 xl:mt-0">
            <button
              className={`flex h-10 w-32 items-center justify-center p-2 rounded-full transition-all duration-300 ${activeTab === "Monthly" ? "bg-[#FFC759] w-52" : "bg-transparent"
                }`}
              onClick={() => setActiveTab("Monthly")}
            >
              <h1
                className={`font-semibold transition-colors duration-300 ${activeTab === "Monthly" ? "text-white" : "text-[#42526B]"
                  }`}
              >
                Monthly
              </h1>
            </button>

            <button
              className={`flex h-10 w-32 items-center justify-center p-2 rounded-full transition-all duration-300 ${activeTab === "Yearly" ? "bg-[#FFC759] w-52" : "bg-transparent"
                }`}
              onClick={() => setActiveTab("Yearly")}
            >
              <h1
                className={`font-semibold transition-colors duration-300 ${activeTab === "Yearly" ? "text-white" : "text-[#42526B]"
                  }`}
              >
                Yearly
              </h1>
            </button>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 justify-items-center content-center gap-4 md:grid-cols-2 lg:gap-8 xl:gap-24">

          {filteredPlans && filteredPlans.length > 0 ? (
            filteredPlans.map((plan: any) => (
              <PlanCard
                key={plan.id}
                title={plan.planName}
                price={plan.price}
                duration={getPlanDuration()}
                isHighlighted={plan.planName === "Exclusive"}
                features={plan.featureList}
                isDisabled={plan.planName === currentPlan && plan.planType === activeTab}
                id={plan.id}
                onClick={() => handlePlanClick(plan.id, plan.planName)}
              />
            ))
          ) : (
            <div className="col-span-2 text-center py-16">
              <p className="text-xl text-gray-500 font-medium">
                No plans available for <strong>{activeTab}</strong> billing.
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Available plan types from API: {planData?.data?.map((p: any) => p.planType).join(", ") || "none"}
              </p>
              <button
                className="mt-4 px-6 py-2 rounded-full bg-[#007EAF] text-white text-sm font-semibold hover:bg-[#005f85] transition"
                onClick={() => setActiveTab(activeTab === "Monthly" ? "Yearly" : "Monthly")}
              >
                Try {activeTab === "Monthly" ? "Yearly" : "Monthly"} plans
              </button>
            </div>
          )}
        </div>

        {/* Premium Description Modal */}
        <PlanDescriptionModal
          isOpen={showPremiumDescription}
          onClose={() => setShowPremiumDescription(false)}
          onContinue={handlePremiumContinue}
          title="Premium Plan Details"
        >
          <PremiumPlan planType={activeTab} />
        </PlanDescriptionModal>

        {/* Exclusive Description Modal */}
        <PlanDescriptionModal
          isOpen={showExclusiveDescription}
          onClose={() => setShowExclusiveDescription(false)}
          onContinue={handleExclusiveContinue}
          title="Exclusive Plan Details"
        >
          <ExclusivePlan planType={activeTab} />
        </PlanDescriptionModal>

        {/* Exclusive Eligibility Checklist */}
        <ExclusiveEligibilityModal
          isOpen={showExclusiveModal}
          onClose={() => setShowExclusiveModal(false)}
          onEligible={handleEligible}
        />

      </div>

      {/* <div>
        <FAQ />
      </div> */}
    </>
  );
};

export default PricingPage;



// --- MODAL COMPONENTS ---

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
  title: string;
  children: React.ReactNode;
}

const PlanDescriptionModal = ({ isOpen, onClose, onContinue, title, children }: ModalProps) => {
  const [isAcknowledged, setIsAcknowledged] = useState(false);
  const [isAcknowledgedPolicy, setIsAcknowledgedPolicy] = useState(false);

  // Reset acknowledgement when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsAcknowledged(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const isExclusiveTheme = title.toLowerCase().includes("exclusive");
  const themeColor = isExclusiveTheme ? "#60457E" : "#007EAF";
  const themeBgFull = isExclusiveTheme ? "bg-[#60457E]" : "bg-[#007EAF]";
  const themeTextFull = "text-white";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className={`${themeBgFull} ${themeTextFull} rounded-2xl w-full max-w-3xl flex flex-col max-h-[90vh] shadow-2xl overflow-hidden border border-white/10`}>
        <div className={`p-6 border-b border-white/10 flex justify-between items-center`}>
          <h2 className={`text-3xl font-bold`}>{title}</h2>
          <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {children}
        </div>

        <div className={`p-6 border-t border-white/10 bg-black/10 flex flex-col sm:flex-row items-center justify-between gap-4`}>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                className="w-5 h-5 rounded border-white/30 bg-white/10 text-white focus:ring-white/50 cursor-pointer transition-all"
                checked={isAcknowledged}
                onChange={(e) => setIsAcknowledged(e.target.checked)}
              />
              <span className="text-sm font-medium text-white/90 group-hover:text-white transition-colors">
                Payment not refundable
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                className="w-5 h-5 rounded border-white/30 bg-white/10 text-white focus:ring-white/50 cursor-pointer transition-all"
                checked={isAcknowledgedPolicy}
                onChange={(e) => setIsAcknowledgedPolicy(e.target.checked)}
              />
              <span className="text-sm font-medium text-white/90 group-hover:text-white transition-colors">
                Accepted Wedlock privacy policy & terms
              </span>
            </label>
          </div>

          <div className="flex gap-4 w-full sm:w-auto">
            <button
              className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-200 flex-1 sm:flex-none"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className={`px-8 py-2.5 rounded-xl font-semibold transition-all duration-200 shadow-md flex items-center justify-center gap-2 flex-1 sm:flex-none ${isAcknowledged && isAcknowledgedPolicy
                ? "text-white scale-100"
                : "bg-gray-300 text-gray-500 cursor-not-allowed scale-[0.98]"
                }`}
              style={{ backgroundColor: isAcknowledged && isAcknowledgedPolicy ? themeColor : undefined }}
              onClick={onContinue}
              disabled={!isAcknowledged || !isAcknowledgedPolicy}
            >
              Get Started
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};




interface EligibilityProps {
  isOpen: boolean;
  onClose: () => void;
  onEligible: () => void;
}

const criteria = [
  "A minimum age of 18 years for females and 21 years for males.",
  "A minimum annual income threshold $80,000+",
  "Professional achievements or established career in a reputable industry.",
  "Comprehensive profile verification, including identity and occupation checks.",
  "Active membership in prestigious clubs.",
  "Background aligned with community and family values.",
  "Graduation completed (required)"
];

const ExclusiveEligibilityModal = ({ isOpen, onClose, onEligible }: EligibilityProps) => {
  const [checkedStates, setCheckedStates] = useState<boolean[]>(
    Array(criteria.length).fill(false)
  );

  // ✅ RESET CHECKBOXES WHEN MODAL OPENS
  useEffect(() => {
    if (isOpen) {
      setCheckedStates(Array(criteria.length).fill(false));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCheckboxChange = (index: number) => {
    setCheckedStates(prev =>
      prev.map((v, i) => (i === index ? !v : v))
    );
  };

  const isAllChecked = checkedStates.every(Boolean);

  const handleContinue = () => {
    localStorage.setItem("exclusiveEligible", "true");
    onEligible();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-[#8E69B4] text-white rounded-2xl w-full max-w-2xl p-8 shadow-2xl overflow-hidden border border-[#7a599b]">
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-2">
            Exclusive Matchmaking Eligibility
          </h2>
          <p className="text-purple-100 opacity-90">
            Please confirm all conditions before proceeding to ensure the best matchmaking experience.
          </p>
        </div>

        <ul className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
          {criteria.map((text, index) => (
            <li
              key={index}
              className="flex gap-4 p-4 rounded-xl bg-white/10 hover:bg-white/15 transition-colors cursor-pointer group"
              onClick={() => handleCheckboxChange(index)}
            >
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={checkedStates[index]}
                  readOnly
                />
                <div
                  className={`w-6 h-6 rounded-md border-2 transition-all flex items-center justify-center ${checkedStates[index]
                    ? "bg-white border-white"
                    : "border-white/30 bg-transparent"
                    }`}
                >
                  {checkedStates[index] && (
                    <svg className="w-4 h-4 text-[#8E69B4]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-lg leading-snug">{text}</span>
            </li>
          ))}
        </ul>

        <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-white/20">
          <button
            className="px-6 py-2.5 bg-white/20 hover:bg-white/30 rounded-xl font-semibold transition-all duration-200"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className={`px-8 py-2.5 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 shadow-lg ${isAllChecked
              ? "bg-[#553985] hover:bg-[#432d69] text-white scale-100"
              : "bg-white/20 text-white/50 cursor-not-allowed scale-95"
              }`}
            disabled={!isAllChecked}
            onClick={handleContinue}
          >
            Continue
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};



