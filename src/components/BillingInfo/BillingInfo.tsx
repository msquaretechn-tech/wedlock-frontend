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

  console.log('showPricing', showPricing)

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

  const handleUpgrade = async () => {
    console.log("Upgrading plan. Current billingData:", billingData);
    console.log("Available plansData:", plansData);

    if (!plansData?.data) {
      toast.error("Plans data is not available. Please try again.");
      return;
    }

    // Find the plan that matches currentPlan and planType (case-insensitive)
    const currentPlanInfo = plansData.data.find((p: any) => {
      const nameMatch = p.planName.toLowerCase().trim() === billingData.currentPlan.toLowerCase().trim();
      
      const pt1 = (p.planType || "").toLowerCase().trim();
      const pt2 = (billingData.planType || "").toLowerCase().trim();
      
      // Flexible match for planType (e.g., "Monthly" vs "monthly" or "Month")
      const typeMatch = pt1 === pt2 || (pt1 && pt2 && (pt1.includes(pt2) || pt2.includes(pt1)));
      
      return nameMatch && typeMatch;
    });

    console.log("Found plan info:", currentPlanInfo);

    if (currentPlanInfo) {
      try {
        const res: any = await createCheckoutSession(currentPlanInfo.id).unwrap();
        if (res?.url) {
          window.location.href = res.url;
        }
      } catch (err: any) {
        toast.error(err?.data?.message || "An error occurred during checkout");
      }
    } else {
      toast.error(`Plan '${billingData.currentPlan}' with type '${billingData.planType}' not found.`);
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <Typography color="error">Error loading billing info</Typography>;

  return (
    <Box>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h6" gutterBottom>
          Current Plan
        </Typography>

        <Typography variant="subtitle1" fontWeight={600}>
          Your Current Plan is {billingData.currentPlan || "—"}
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          A simple start for everyone
        </Typography>

        <Typography variant="subtitle1" mb={2}>
          {billingData.expirationDate === "N/A"
            ? "Active"
            : `Active until ${billingData.expirationDate}`}
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          We will send you a notification upon Subscription expiration
        </Typography>

        <Typography variant="h6">
          {billingData.price}
          {billingData.price !== "Free" && ` / ${billingData.planType}`}

        </Typography>
        <Stack direction="row" spacing={2} mt={2}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#007EAF",
              ":hover": { backgroundColor: "#005f80" },
            }}
            onClick={() => setShowPricing(true)}
          >
            Change Plan
          </Button>

          {billingData.currentPlan !== "Standard" && (
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#007EAF",
                ":hover": { backgroundColor: "#005f80" },
              }}
              onClick={handleUpgrade}
            >
              Upgrade Plan
            </Button>
          )}
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
              {billingData.remainingDays} of {billingData.totalDays} days
            </Typography>
            <LinearProgress
              variant="determinate"
              value={
                (Number(billingData.remainingDays) /
                  Number(billingData.totalDays)) *
                100
              }
              sx={{ mt: 1, mb: 1, height: 8, borderRadius: 5 }}
            />
            <Typography variant="caption" color="text.secondary">
              {billingData.remainingDays} days left before renewal
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default BillingInfo;
