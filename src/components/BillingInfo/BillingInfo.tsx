import { useEffect, useState } from "react";
import { Button, LinearProgress, Box, Typography, Paper, Stack } from "@mui/material";
import { useGetBillingInfoQuery } from "../../Redux/Api/billing.api";
import { useCreateCheckoutSessionMutation } from "../../Redux/Api/checkout.api";
import { useGetPlansQuery } from "../../Redux/Api/plan.api";
import { toast } from "sonner";

import Loading from "../Loading";
import { Alert } from "antd";
import { CiWarning } from "react-icons/ci";
import PricingPage from "../../pages/plan/Plan";
import PremiumPlan from "../../pages/planDiscriptions/PremiumPlan";
import ExclusivePlan from "../../pages/planDiscriptions/ExclusivePlan";

interface BillingData {
  currentPlan: string;
  expirationDate: string;
  notification: boolean;
  remainingDays: string;
  totalDays: string;
  price: string;
  planType: string;
}

const BillingInfo = () => {
  const [showPricing, setShowPricing] = useState(false);
  const [showPremiumDescription, setShowPremiumDescription] = useState(false);
  const [showExclusiveDescription, setShowExclusiveDescription] = useState(false);
  const [showExclusiveModal, setShowExclusiveModal] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  const [billingData, setBillingData] = useState<BillingData>({
    currentPlan: "",
    expirationDate: "",
    notification: false,
    remainingDays: "",
    totalDays: "",
    price: "",
    planType: "",
  });

  const { data: billingInfo, error, isLoading } = useGetBillingInfoQuery<any>();
  const { data: plansData } = useGetPlansQuery<any>();
  const [createCheckoutSession] = useCreateCheckoutSessionMutation();

  useEffect(() => {
    if (billingInfo?.success) {
      setBillingData(billingInfo.data);
    }
  }, [billingInfo]);

  const handleCheckout = async (id: string) => {
    try {
      const res: any = await createCheckoutSession(id).unwrap();
      if (res?.url) {
        window.location.href = res.url;
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "An error occurred during checkout");
    }
  };

  const handleUpgrade = async () => {
    if (!plansData?.data) {
      toast.error("Plans data is not available. Please try again.");
      return;
    }

    const currentPlanInfo = plansData.data.find((p: any) => {
      const nameMatch = p.planName.toLowerCase().trim() === billingData.currentPlan.toLowerCase().trim();
      const pt1 = (p.planType || "").toLowerCase().trim();
      const pt2 = (billingData.planType || "").toLowerCase().trim();
      const typeMatch = pt1 === pt2 || (pt1 && pt2 && (pt1.includes(pt2) || pt2.includes(pt1)));
      return nameMatch && typeMatch;
    });

    if (currentPlanInfo) {
      setSelectedPlanId(currentPlanInfo.id);
      if (currentPlanInfo.planName === "Exclusive") {
        setShowExclusiveDescription(true);
      } else if (currentPlanInfo.planName === "Premium") {
        setShowPremiumDescription(true);
      } else {
        handleCheckout(currentPlanInfo.id);
      }
    } else {
      toast.error(`Plan '${billingData.currentPlan}' with type '${billingData.planType}' not found.`);
    }
  };

  const handlePremiumContinue = () => {
    setShowPremiumDescription(false);
    if (selectedPlanId) handleCheckout(selectedPlanId);
  };

  const handleExclusiveContinue = () => {
    setShowExclusiveDescription(false);
    setShowExclusiveModal(true);
  };

  const handleEligible = () => {
    setShowExclusiveModal(false);
    if (selectedPlanId) handleCheckout(selectedPlanId);
  };

  if (isLoading) return <Loading />;
  if (error) return <Typography color="error">Error loading billing info</Typography>;

  const isExpired = Number(billingData.remainingDays) <= 0 && billingData.expirationDate !== "N/A";
  const displayPlanName = isExpired ? "Standard Plan" : (billingData.currentPlan || "—");

  return (
    <Box>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <h2 className="text-3xl font-bold mb-2">
          Exclusive Plan Details
        </h2>

        <Typography variant="subtitle1" fontWeight={400} sx={{ color: isExpired ? "inherit" : "inherit" }}>
          Current Plan : {displayPlanName}

        </Typography>
        {isExpired && (
          <Typography variant="subtitle1" fontWeight={400} sx={{ color: isExpired ? "red" : "inherit" }}>
            Expired: {billingData.currentPlan}
          </Typography>
        )}
        <Typography variant="body2" color="text.secondary" mb={2}>
          {isExpired ? "Your previous plan has expired. Please renew or change your plan." : "A simple start for everyone"}
        </Typography>

        <Typography variant="subtitle1" mb={2}>
          {billingData.expirationDate === "N/A"
            ? "Active"
            : isExpired
              ? `Expired on ${billingData.expirationDate}`
              : `Active until ${billingData.expirationDate}`}
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          We will send you a notification upon subscription expiration
        </Typography>

        <Typography variant="h6">
          {billingData.price}
          {billingData.price !== "Free" && ` / ${billingData.planType}`}
        </Typography>

        <Stack direction="row" spacing={2} mt={2}>
          {billingData.currentPlan !== "Standard" && (
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#007EAF",
                textTransform: "none",
                ":hover": { backgroundColor: "#005f80" },
              }}
              onClick={handleUpgrade}
            >
              Extend Plan
            </Button>
          )}

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#007EAF",
              textTransform: "none",
              ":hover": { backgroundColor: "#005f80" },
            }}
            onClick={() => setShowPricing(true)}
          >
            Change Plan
          </Button>
        </Stack>

        {showPricing && <PricingPage />}

        {billingData.notification && (
          <Box mt={3}>
            <Alert
              message="We need your attention!"
              description="Your plan requires an update"
              type="warning"
              showIcon
              icon={<CiWarning />}
              closable
            />
          </Box>
        )}

        {billingData.currentPlan !== "Standard" && (
          <Box mt={4}>
            <Typography variant="subtitle2" fontWeight={600}>
              Days Remaining
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {Math.max(0, Number(billingData.remainingDays))} of {billingData.totalDays} days
            </Typography>
            <LinearProgress
              variant="determinate"
              value={
                Math.max(0, (Number(billingData.remainingDays) /
                  Number(billingData.totalDays)) *
                  100)
              }
              sx={{ mt: 1, mb: 1, height: 8, borderRadius: 5, backgroundColor: isExpired ? "#ffdada" : "inherit" }}
              color={isExpired ? "error" : "primary"}
            />
            <Typography variant="caption" color={isExpired ? "error" : "text.secondary"}>
              {isExpired ? "Plan expired" : `${billingData.remainingDays} days left before renewal`}
            </Typography>
          </Box>
        )}
      </Paper>

      {/* Description & Eligibility Modals */}
      <PlanDescriptionModal
        isOpen={showPremiumDescription}
        onClose={() => setShowPremiumDescription(false)}
        onContinue={handlePremiumContinue}
        title="Premium Plan Details"
      >
        <PremiumPlan planType={billingData.planType} />
      </PlanDescriptionModal>

      <PlanDescriptionModal
        isOpen={showExclusiveDescription}
        onClose={() => setShowExclusiveDescription(false)}
        onContinue={handleExclusiveContinue}
        title="Exclusive Plan Details"
      >
        <ExclusivePlan planType={billingData.planType} />
      </PlanDescriptionModal>

      <ExclusiveEligibilityModal
        isOpen={showExclusiveModal}
        onClose={() => setShowExclusiveModal(false)}
        onEligible={handleEligible}
        onBack={() => {
          setShowExclusiveModal(false);
          setShowExclusiveDescription(true);
        }}
      />
    </Box>
  );
};

export default BillingInfo;

// --- MODAL COMPONENTS (DUPLICATED FOR BILLING CONTEXT) ---

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

  useEffect(() => {
    if (isOpen) {
      setIsAcknowledged(false);
      setIsAcknowledgedPolicy(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl flex flex-col max-h-[90vh] shadow-2xl overflow-hidden border border-gray-100">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h2 className="text-3xl font-bold text-[#007EAF]">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-8 bg-white custom-scrollbar">
          {children}
        </div>
        <div className="p-6 border-t border-gray-100 bg-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                className="w-5 h-5 rounded border-gray-300 text-[#007EAF] focus:ring-[#007EAF] cursor-pointer"
                checked={isAcknowledged}
                onChange={(e) => setIsAcknowledged(e.target.checked)}
              />
              <span className="text-sm font-medium text-gray-600">Payment not refundable</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                className="w-5 h-5 rounded border-gray-300 text-[#007EAF] focus:ring-[#007EAF] cursor-pointer"
                checked={isAcknowledgedPolicy}
                onChange={(e) => setIsAcknowledgedPolicy(e.target.checked)}
              />
              <span className="text-sm font-medium text-gray-600">Accepted Wedlock privacy policy & terms</span>
            </label>
          </div>
          <div className="flex gap-4 w-full sm:w-auto">
            <button className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-xl font-semibold" onClick={onClose}>Cancel</button>
            <button
              className={`px-8 py-2.5 rounded-xl font-semibold transition-all shadow-md ${isAcknowledged && isAcknowledgedPolicy ? "bg-[#007EAF] text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
              onClick={onContinue}
              disabled={!isAcknowledged || !isAcknowledgedPolicy}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const criteria = [
  "A minimum age of 18 years for females and 21 years for males.",
  "A minimum annual income threshold $80,000+",
  "Professional achievements or established career in a reputable industry.",
  "Comprehensive profile verification, including identity and occupation checks.",
  "Active membership in prestigious clubs.",
  "Background aligned with community and family values.",
  "Graduation completed (required)"
];

const ExclusiveEligibilityModal = ({ isOpen, onClose, onEligible, onBack }: { isOpen: boolean; onClose: () => void; onEligible: () => void; onBack: () => void }) => {
  const [checkedStates, setCheckedStates] = useState<boolean[]>(Array(criteria.length).fill(false));

  useEffect(() => {
    if (isOpen) setCheckedStates(Array(criteria.length).fill(false));
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCheckboxChange = (index: number) => {
    setCheckedStates(prev => prev.map((v, i) => (i === index ? !v : v)));
  };

  const isAllChecked = checkedStates.every(Boolean);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-[#8E69B4] text-white rounded-2xl w-full max-w-2xl p-8 shadow-2xl overflow-hidden border border-[#7a599b]">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <button
              onClick={onBack}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
              title="Back to Plan Details"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <h2 className="text-3xl font-bold">Exclusive Matchmaking Eligibility</h2>
          </div>
          <p className="text-purple-100 opacity-90 ml-11">Please confirm all conditions before proceeding.</p>
        </div>
        <ul className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
          {criteria.map((text, index) => (
            <li
              key={index}
              className="flex gap-4 p-4 rounded-xl bg-white/10 hover:bg-white/15 transition-colors cursor-pointer"
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
          <button className="px-6 py-2.5 bg-white/20 rounded-xl font-semibold" onClick={onClose}>Cancel</button>
          <button
            className={`px-8 py-2.5 rounded-xl font-semibold transition-all ${isAllChecked ? "bg-[#553985] text-white" : "bg-white/20 text-white/50 cursor-not-allowed"}`}
            disabled={!isAllChecked}
            onClick={() => { localStorage.setItem("exclusiveEligible", "true"); onEligible(); }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};
