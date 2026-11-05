import { useState, useEffect } from "react";
// @ts-ignore
import FAQ from "../../components/faqs/Faqs.tsx";
import "../../font.css";
import { useGetPlansQuery } from "../../Redux/Api/plan.api";
import PlanCard from "../../components/PlanCard/PlanCard";
import Loading from "../../components/Loading";
import { useCreateCheckoutSessionMutation } from "../../Redux/Api/checkout.api";
import { useGetBillingInfoQuery } from "../../Redux/Api/billing.api";
import { toast } from 'sonner';
import { RootState } from "./../../Redux/store";
import { useSelector } from "react-redux";
// @ts-ignore
import { Link } from "react-router-dom";
import PremiumPlan from "../planDiscriptions/PremiumPlan";
import ExclusivePlan from "../planDiscriptions/ExclusivePlan";
import { Typography } from "@mui/material";
import { FaStripe, FaPaypal } from "react-icons/fa6";



const PricingPage = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const [activeTab, setActiveTab] = useState("Monthly");
  const [showExclusiveModal, setShowExclusiveModal] = useState(false);
  const [showPremiumDescription, setShowPremiumDescription] = useState(false);
  const [showExclusiveDescription, setShowExclusiveDescription] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<"stripe" | "paypal">("stripe");
  


  const { data: planData, isLoading, error } = useGetPlansQuery<any>();
  const { data: billingInfo } = useGetBillingInfoQuery<any>(undefined, { skip: !user });

  // "Purchased" only for the plan the user currently holds: same plan name AND same duration, not expired
  const activeBilling = billingInfo?.data;
  const hasActivePlan =
    !!activeBilling &&
    activeBilling.expirationDate !== "N/A" &&
    Number(activeBilling.remainingDays) > 0;
  const durationLabel = (months: number) =>
    months >= 12 ? "Year" : months === 6 ? "6 Months" : months === 3 ? "3 Months" : "Month";
  const isActivePlan = (plan: any) =>
    hasActivePlan &&
    plan.planName?.toLowerCase() === activeBilling.currentPlan?.toLowerCase() &&
    durationLabel(Number(plan.durationInMonths) || 1) === activeBilling.planType;
  const [createCheckoutSession] = useCreateCheckoutSessionMutation();

  // Debug: log raw API response to check planType values
  console.log("planData raw:", planData);
  console.log("plans array:", planData?.data);
  if (planData?.data?.length > 0) {
    console.log("First plan sample:", planData.data[0]);
    console.log("planType values:", planData.data.map((p: any) => p.planType));
  }

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

  // Case-insensitive filter — handles 'Monthly', '3 Months', '6 Months', and 'Yearly'
  const filteredPlans = planData?.data
    ?.filter((plan: any) => {
      const pt = (plan.planType || "").toLowerCase();
      const duration = Number(plan.durationInMonths) || 1;

      if (activeTab === "Monthly") {
        if (duration === 3 || duration === 6 || duration >= 12) return false;
        if (pt.includes("3") || pt.includes("6") || pt.includes("year") || pt.includes("annual")) return false;
        if (!pt.includes("month") && duration !== 1) return false;
      } else if (activeTab === "3 Months" || activeTab === "3-Month") {
        if (duration !== 3 && !pt.includes("3") && !pt.includes("quarter")) return false;
      } else if (activeTab === "6 Months" || activeTab === "6-Month") {
        if (duration !== 6 && !pt.includes("6") && !pt.includes("half")) return false;
      } else if (activeTab === "Yearly") {
        if (duration !== 12 && !pt.includes("year") && !pt.includes("annual")) return false;
      }

      // Premium and Exclusive are both listed for everyone so users can upgrade, downgrade or change duration
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

  const handleCheckout = async (id: string, paymentMethod: "stripe" | "paypal" = "stripe") => {
    try {
      console.log("checkout payload", { planId: id, paymentMethod });
      const successData = await createCheckoutSession({ planId: id, paymentMethod }).unwrap();
      console.log("Checkout session created successfully:", successData);

      const redirectUrl = successData?.url || successData?.paypalUrl || successData?.redirectUrl || successData?.redirect || successData?.paymentUrl;
      if (redirectUrl) {
        window.location.href = redirectUrl;

        console.log("Redirecting to:", redirectUrl);
        return;
      }
      console.error('No redirect URL returned from createCheckoutSession:', successData);
      toast.error('No redirect URL returned from server.');
    } catch (err: any) {
      const message = err?.data?.message || err?.error?.message || err?.message || "Failed to create checkout session. Please try again later.";
      console.error("Checkout failed", err);
      toast.error(message);
    }
  };

  const handlePlanClick = (planId: string, planName: string, plan?: any) => {
  const normalized = planName.toLowerCase();

  setSelectedPlanId(planId);
  setSelectedPlan(plan || null);
  setSelectedPaymentMethod("stripe");

  if (normalized.includes("exclusive")) {
    setShowExclusiveDescription(true);
    setShowPremiumDescription(false);
    setShowPaymentModal(false);
  } 
  else if (normalized.includes("premium")) {
    setShowPremiumDescription(true);
    setShowExclusiveDescription(false);
    setShowPaymentModal(false);
  } 
  else {
    setShowPaymentModal(true);
    setShowPremiumDescription(false);
    setShowExclusiveDescription(false);
  }
};

  const handlePaymentContinue = () => {
    setShowPaymentModal(false);
    if (selectedPlanId) {
      handleCheckout(selectedPlanId, selectedPaymentMethod);
    }
  };

  const handleEligible = () => {
    setShowExclusiveModal(false);

    if (selectedPlanId) {
      handleCheckout(selectedPlanId, selectedPaymentMethod);
    }
  };

  const handlePremiumContinue = () => {
    setShowPremiumDescription(false);
    if (selectedPlanId) {
      handleCheckout(selectedPlanId, selectedPaymentMethod);
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

          {/* Mobile: dropdown */}
          <div className="mt-5 w-full md:hidden">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="w-full h-11 rounded-xl border border-[#FFE7B8] bg-[#FFF9EE] px-4 text-base font-semibold text-[#42526B] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFC759]"
            >
              {["Monthly", "3 Months", "6 Months", "Yearly"].map((tab) => (
                <option key={tab} value={tab}>
                  {tab}
                </option>
              ))}
            </select>
          </div>

          {/* Desktop: tabs */}
          <div className="mt-5 hidden md:flex flex-wrap items-center gap-1.5 md:gap-2 rounded-full bg-[#FFF9EE] p-1.5 xl:mt-0 shadow-sm border border-[#FFE7B8]">
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
                isDisabled={isActivePlan(plan)}
                id={plan.id}
                onClick={() => handlePlanClick(plan.id, plan.planName, plan)}
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
              <div className="mt-4 flex flex-wrap gap-2 justify-center">
                {["Monthly", "3 Months", "6 Months", "Yearly"]
                  .filter((t) => t !== activeTab)
                  .map((t) => (
                    <button
                      key={t}
                      type="button"
                      className="px-4 py-2 rounded-full bg-[#007eaf] text-white text-xs md:text-sm font-semibold hover:bg-[#005f85] transition"
                      onClick={() => setActiveTab(t)}
                    >
                      Try {t} plans
                    </button>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Premium Description Modal */}
        <PlanDescriptionModal
          isOpen={showPremiumDescription}
          onClose={() => setShowPremiumDescription(false)}
          onContinue={handlePremiumContinue}
          title="Premium Plan"
          paymentMethod={selectedPaymentMethod}
          onPaymentMethodChange={setSelectedPaymentMethod}
        >
          <PremiumPlan planType={activeTab} plan={selectedPlan} />
        </PlanDescriptionModal>

        {/* Exclusive Description Modal */}
        <PlanDescriptionModal
          isOpen={showExclusiveDescription}
          onClose={() => setShowExclusiveDescription(false)}
          onContinue={handleExclusiveContinue}
          title="Exclusive Plan"
          paymentMethod={selectedPaymentMethod}
          onPaymentMethodChange={setSelectedPaymentMethod}
        >
          <ExclusivePlan planType={activeTab} plan={selectedPlan} />
        </PlanDescriptionModal>

        {/* Generic Payment Method Modal */}
        <PlanDescriptionModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          onContinue={handlePaymentContinue}
          title={"Choose Payment Method"}
          paymentMethod={selectedPaymentMethod}
          onPaymentMethodChange={setSelectedPaymentMethod}
        >
          <div className="space-y-4 text-white/90">
            <p>Select a payment method before proceeding.</p>
          </div>
        </PlanDescriptionModal>

        {/* Exclusive Eligibility Checklist */}
        <ExclusiveEligibilityModal
          isOpen={showExclusiveModal}
          onClose={() => setShowExclusiveModal(false)}
          onEligible={handleEligible}
          onBack={() => {
          setShowExclusiveModal(false);
          setShowExclusiveDescription(true);
        }}
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
  paymentMethod?: "stripe" | "paypal";
  onPaymentMethodChange?: (method: "stripe" | "paypal") => void;
}

const PlanDescriptionModal = ({ isOpen, onClose, onContinue, title, children, paymentMethod, onPaymentMethodChange }: ModalProps) => {
  const [isAcknowledged, setIsAcknowledged] = useState(false);
  const [isAcknowledgedPolicy, setIsAcknowledgedPolicy] = useState(false);
  const [hasChosenPayment, setHasChosenPayment] = useState(false);

  // Reset acknowledgement when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsAcknowledged(false);
      setIsAcknowledgedPolicy(false);
      setHasChosenPayment(true); // Stripe already selected
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const isExclusiveTheme = title.toLowerCase().includes("exclusive");
  const themeColor = isExclusiveTheme ? "#007eaf" : "#007eaf";
  const themeBgFull = isExclusiveTheme ? "bg-[#60457e]" : "bg-[#007eaf]";
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

<div className="p-6 border-t border-white/10 bg-black/10">
  {/* Payment Methods */}
  {onPaymentMethodChange && (
    <div className="mb-6 rounded-2xl border border-white/20 bg-white/10 p-4">
      <p className="mb-3 text-sm font-semibold text-white">
        Select payment method
      </p>

      <div className="grid grid-cols-2 gap-3">
  <button
    type="button"
    onClick={() => {
      onPaymentMethodChange("stripe");
      setHasChosenPayment(true);
    }}
    className={`flex items-center justify-center gap-2 rounded-2xl border text-sm font-semibold transition ${
      paymentMethod === "stripe"
        ? "border-[#00D1FF] bg-[#00D1FF]/15 text-white"
        : "border-white/20 bg-white/10 text-white/80 hover:bg-white/20"
    }`}
  >
    <FaStripe className="text-3xl" style={{fontSize:"45px"}}/>
    {/* <span>Stripe Pay</span> */}
  </button>

  <button
    type="button"
    onClick={() => {
      onPaymentMethodChange("paypal");
      setHasChosenPayment(true);
    }}
    className={`flex items-center justify-center gap-2 rounded-2xl border text-sm font-semibold transition ${
      paymentMethod === "paypal"
        ? "border-[#FFD43B] bg-[#FFD43B]/15 text-white"
        : "border-white/20 bg-white/10 text-white/80 hover:bg-white/20"
    }`}
  >
    <FaPaypal className="text-2xl" style={{fontSize:"30px"}}/>
    <span>PayPal</span>
  </button>
</div>
    </div>
  )}

  {/* Footer */}
  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
    <div className="flex flex-col gap-2">
      <label className="flex items-center gap-3 cursor-pointer group">
        <input
          type="checkbox"
          className="w-5 h-5 rounded border-white/30 bg-white/10 text-white"
          checked={isAcknowledged}
          onChange={(e) => setIsAcknowledged(e.target.checked)}
        />
        <span className="text-sm font-medium text-white/90">
          I understand and agree that all payments are non-refundable
        </span>
      </label>

      <label className="flex items-center gap-3 cursor-pointer group">
        <input
          type="checkbox"
          className="w-5 h-5 rounded border-white/30 bg-white/10 text-white"
          checked={isAcknowledgedPolicy}
          onChange={(e) => setIsAcknowledgedPolicy(e.target.checked)}
        />
        <span className="text-sm font-medium text-white/90">
          I agree to the Privacy Policy and consent to data sharing as described
        </span>
      </label>
    </div>

    <div className="flex gap-4 w-full sm:w-auto">
      {/* Cancel & Continue buttons */}
      <div className="flex gap-4 w-full sm:w-auto">
  <button
    type="button"
    className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-200 flex-1 sm:flex-none"
    onClick={onClose}
  >
    Cancel
  </button>

  <button
    type="button"
    className={`px-8 py-2.5 rounded-xl font-semibold transition-all duration-200 shadow-md flex items-center justify-center gap-2 flex-1 sm:flex-none ${
      isAcknowledged &&
      isAcknowledgedPolicy &&
      (!onPaymentMethodChange || hasChosenPayment)
        ? "text-white"
        : "bg-gray-300 text-gray-500 cursor-not-allowed"
    }`}
    style={{
      backgroundColor:
        isAcknowledged &&
        isAcknowledgedPolicy &&
        (!onPaymentMethodChange || hasChosenPayment)
          ? themeColor
          : undefined,
    }}
    onClick={onContinue}
    disabled={
      !isAcknowledged ||
      !isAcknowledgedPolicy ||
      (onPaymentMethodChange && !hasChosenPayment)
    }
  >
    {
      title === "Premium Plan" ? "Purchase" : "Continue"
    }
    
    {/* <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M14 5l7 7m0 0l-7 7m7-7H3"
      />
    </svg> */}
  </button>
</div>
      
    </div>
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
  onBack: () => void
}

const criteria = [
  "Minimum age of 18 years for females and 21 years for males.",
  "Minimum annual income of $100,000+.",
  "Graduate degree or higher qualification.",
  "Demonstrated professional achievements or an established career in a reputable industry.",
  "Background aligned with strong community and family values.",
  "No criminal background.",
  "Willingness to undergo comprehensive profile verification, including identity and occupation checks, where required."
];

const ExclusiveEligibilityModal = ({ isOpen, onClose, onEligible, onBack }: EligibilityProps) => {
  const [checkedStates, setCheckedStates] = useState<boolean[]>(
    Array(criteria.length).fill(false)
  );

  // RESET CHECKBOXES WHEN MODAL OPENS
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
      <div className="bg-[#60457e] text-white rounded-2xl w-full max-w-2xl p-8 shadow-2xl overflow-hidden border border-[#7a599b]">
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-2">
            Exclusive Plan Eligibility Criteria 
          </h2>
          <p className="" style={{fontSize: "14px"}}>
            To maintain the quality, integrity, and exclusivity of our membership community, applicants for an Exclusive profile

should generally meet the following criteria:
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
                    <svg className="w-4 h-4 text-[#60457e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="leading-snug" style={{fontSize:"1rem"}}>{text}</span>

            </li>
          ))}
        </ul>

        <p className="mt-5" style={{fontSize:"14px"}}>Eligibility criteria are considered holistically, and exceptional candidates may be assessed on a case-by-case basis.</p>

        <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-white/20">
          <button
              onClick={onBack}
              className="px-6 py-2.5 bg-white/20 rounded-xl font-semibold"
              title="Back to Plan Details"
            >
              Back
          </button>

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
            Purchase
          </button>
        </div>
      </div>
    </div>
  );
};


