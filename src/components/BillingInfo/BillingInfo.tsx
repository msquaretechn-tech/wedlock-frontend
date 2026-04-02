import { useEffect, useState } from "react";
import { Button, LinearProgress, Box, Typography, Paper } from "@mui/material";
import { useGetBillingInfoQuery } from "../../Redux/Api/billing.api";

import Loading from "../Loading";
import { Alert } from "antd";
import { CiWarning } from "react-icons/ci";
import { RootState } from "./../../Redux/store";
import { useSelector } from "react-redux";
import PricingPage from "../../pages/plan/Plan";

const BillingInfo = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const [showPricing, setShowPricing] = useState(false);
  const [isExclusive, setIsExclusive] = useState(false);

  console.log('showPricing', showPricing)

  useEffect(() => {
    const storedExclusive = localStorage.getItem("isExclusive");
    if (storedExclusive === "true" || user?.usertype === "Exclusive") {
      setIsExclusive(true);
    }
  }, [user]);

  const [billingData, setBillingData] = useState({
    currentPlan: "",
    expirationDate: "",
    notification: false,
    remainingDays: "",
    totalDays: "",
    price: "",
    planType: "",
  });
  type BillingInfoResponse = {
    success: boolean;
    data: any;
  };

  const { data, error, isLoading } = useGetBillingInfoQuery();


  useEffect(() => {
    const res = data as BillingInfoResponse | undefined;
    if (res?.success) {
      setBillingData(res.data);
    }
  }, [data]);

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

        {!isExclusive && (
          <Button
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: "#007EAF",
              ":hover": { backgroundColor: "#005f80" },
            }}
            onClick={() => setShowPricing(true)}
          >
            Upgrade Plan
          </Button>
        )}


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
