import React, { useState, useEffect } from "react";
import Header from "../../components/header-footer-profile/Header";
import Footer from "../../components/header-footer-profile/Footer";
import { ConfigProvider, Tag } from "antd";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { useNavigate } from "react-router-dom";
import Discover from "../../components/user-dashboard/Discover";
import Favourate from "../../components/user-dashboard/Favourate";
import Notification from "../../components/user-dashboard/Notification";
import { useParams } from "react-router-dom";
import { RootState } from "./../../Redux/store";
import { useSelector } from "react-redux";
import { useGetBillingInfoQuery } from "../../Redux/Api/billing.api";
import Match from "../../components/match/Match";

const Profile: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { user } = useSelector((state: RootState) => state.userReducer);
  const navigate = useNavigate();
  const { data: billingInfo } = useGetBillingInfoQuery<any>();

  const [isExclusive, setIsExclusive] = useState(false);

  useEffect(() => {
    const isExclusiveLocal = localStorage.getItem("isExclusive");
    if (isExclusiveLocal === "true" || user?.usertype === "Exclusive") {
      setIsExclusive(true);
    }
  }, [user]);

  // Get the current tab from URL parameters
  const params = new URLSearchParams(location.search);
  const activeTab = params.get("tab") || "matches";

  const handleTabChange = (key: string) => {
    params.set("tab", key);
    navigate({ search: params.toString() }, { replace: true });
  };

  const items: TabsProps["items"] = [
    {
      key: "matches",
      label: `Matches`,
      children: (
        <div>
          <Match userId={userId!} />
        </div>
      ),
    },
    {
      key: "discover",
      label: `Discover`,
      children:
        <div><Discover /></div>,
    },
    {
      key: "favorite-profiles",
      label: `Favorite Profile`,
      children:
        <div>
          <Favourate />
        </div>,
    },
    {
      key: "notifications",
      label: `Notifications`,
      children: <div><Notification /></div>,
    },
  ];

  const planName = billingInfo?.data?.currentPlan || "Standard";
  const isExpired = Number(billingInfo?.data?.remainingDays) <= 0 && billingInfo?.data?.expirationDate !== "N/A";
  const displayPlan = isExpired ? "Standard" : planName;

  const getPlanColor = (plan: string) => {
    switch (plan.toLowerCase()) {
      case 'exclusive': return '#60457E';
      case 'premium': return '#007EAF';
      default: return '#8c8c8c';
    }
  };

  return (
    <div className="min-w-screen flex min-h-screen flex-col">
      <Header />
      <div className="flex-grow bg-[#E6F2F7] mt-10">
        <div className="px-4 pt-10">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-semibold md:text-2xl lg:text-3xl m-0">
              User Profile
            </h1>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-500">Membership:</span>
              <Tag 
                color={getPlanColor(displayPlan)}
                className="px-4 py-1 rounded-full border-none text-white font-bold text-sm shadow-sm"
              >
                {displayPlan.toUpperCase()}
              </Tag>
              {isExpired && (
                <Tag color="error" className="rounded-full">EXPIRED</Tag>
              )}
            </div>
          </div>
          <div className="p-0 md:p-4">
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: `${isExclusive ? "#60457E" : "#007EAF"}`,
                },
                components: {
                  Tabs: {
                    colorBgContainer: "#E6F2F7",
                    colorText: "black",
                    colorBgTextActive: "#363636",
                    colorBorder: "#E6F2F7",
                    fontSize: 16,
                    fontFamily: "Proxima-Nova-semibold",
                  },
                },
              }}
            >
              <Tabs
                activeKey={activeTab}
                onChange={handleTabChange}
                items={items}
                className="ant-tabs"
              />
            </ConfigProvider>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
