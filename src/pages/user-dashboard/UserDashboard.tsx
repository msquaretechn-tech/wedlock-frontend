import React, { useEffect, useState } from "react";
import { Tabs, Badge, ConfigProvider } from "antd";
import type { TabsProps } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { getDatabase, ref as rtdbRef, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useGetMyConnectionsQuery } from "../../Redux/Api/connection.api";

import Header from "../../components/header-footer-profile/Header";
import Footer from "../../components/header-footer-profile/Footer";
// import Plan from "../../pages/plan/Plan";
import BillingInfo from "../../components/BillingInfo/BillingInfo";
import Notification from "../../components/user-dashboard/Notification";
import Discover from "../../components/user-dashboard/Discover";
import Favourate from "../../components/user-dashboard/Favourate";
import MyDetails from "../../components/user-dashboard/Mydetails";
import ChatScreen from "../../pages/chat/ChatScreen";
import Faqs from "../faqs/Faqs";
import CallService from "../zegocall/CallService ";
import Connections from "../connections/Connections";
// import { MessageOutlined } from "@ant-design/icons";

const UserDashboard: React.FC = () => {


  useEffect(() => {
    (async () => {
      await CallService.initialize();
      console.log("[UserDashboard] CallService ready for calls");
    })();
  }, []);
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { data: connectionsData } = useGetMyConnectionsQuery(undefined);
  const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({});
  const totalUnread = Object.values(unreadCounts).reduce((acc, count) => acc + count, 0);

  const [isExclusive, setIsExclusive] = useState(false);

  useEffect(() => {
    const isExclusive = localStorage.getItem("isExclusive");
    if (isExclusive === "true" || user?.usertype === "Exclusive") {
      setIsExclusive(true);
    }
  }, [user]);

  useEffect(() => {
    const myUid = user?.uid || localStorage.getItem("uid");
    
    if (!myUid || !connectionsData?.data) return;

    const db = getDatabase();
    const usersRef = rtdbRef(db, "users");
    
    let activeListeners: (() => void)[] = [];

    const unsubUsers = onValue(usersRef, (snapshot) => {
      const usersData = snapshot.val();
      if (!usersData) return;

      // Clear old listeners
      activeListeners.forEach(unsub => unsub());
      activeListeners = [];
      setUnreadCounts({});

      const connectionDBIds = new Set(connectionsData.data.map((c: any) => c.userId));
      
      Object.entries(usersData).forEach(([fUid, uData]: [string, any]) => {
        if (connectionDBIds.has(uData.userId) && fUid !== myUid) {
          const msgRef = rtdbRef(db, `messages/${fUid}/${myUid}`);
          const unsubMsg = onValue(msgRef, (msgSnap) => {
            let unread = 0;
            msgSnap.forEach((child) => {
              const msg = child.val();
              if (msg.seen === false) unread++;
            });
            setUnreadCounts(prev => ({ ...prev, [fUid]: unread }));
          });
          activeListeners.push(unsubMsg);
        }
      });
    });

    return () => {
      unsubUsers();
      activeListeners.forEach(unsub => unsub());
    };
  }, [connectionsData, user?.uid]);

  // Get the current tab from URL parameters
  const params = new URLSearchParams(location.search);
  const activeTab = params.get("tab") || "details"; // Default to 'my-details' if no tab is provided

  // Function to handle tab change and update URL
  const handleTabChange = (key: string) => {
    params.set("tab", key);
    navigate({ search: params.toString() }, { replace: true });
  };



  const items: TabsProps["items"] = [
    {
      key: "details",
      label: `My Details`,
      children: <MyDetails />,
    },
    {
      key: "discover",
      label: `Discover`,
      children: <Discover />,
    },
    {
      key: "Connections",
      label: `Connections`,
      children: <Connections />,
    },
    {
      key: "favorite-profiles",
      label: `Favourite Profiles`,
      children: <Favourate />,
    },
    // {
    //   key: "plans",
    //   label: `Plan`,
    //   children: <Plan />,
    // },
    {
      key: "billings",
      label: `Plan & Billing`,
      children: <BillingInfo />,
    },
    {
      key: "notifications",
      label: `Notifications`,
      children: <Notification />,
    },
    {
      key: "chats",
      label: (
        <span className="flex items-center gap-2">
          Chats 
          {totalUnread > 0 && <Badge count={totalUnread} size="small" style={{ backgroundColor: isExclusive ? "#60457E" : "#007EAF" }} />}
        </span>
      ),
      children: <ChatScreen />,
    },
    {
      key: "faqs",
      label: `Frequently Asked Questions`,
      children: <Faqs />,
    },

  ];


  return (
    <div className="flex min-h-screen flex-col">
      <Header />


      <div className="flex-grow bg-[#E6F2F7]">
        <div className="flex justify-center">
          <img src="/bigad.png" alt="logo" className="h-14 w-full" />
        </div>

        <div className="px-4 py-6">
          <div className="p-0 md:p-4">
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: isExclusive ? "#60457E" : "#007EAF",
                },
                components: {
                  Tabs: {
                    colorBgContainer: "#E6F2F7",
                    colorText: "black",
                    colorBgTextActive: "#363636",
                    colorBorder: "#E6F2F7",
                    fontSize: 18,
                    fontFamily: "Proxima-Nova-Semibold",
                  },
                },
              }}
            >
              <Tabs
                activeKey={activeTab}
                onChange={handleTabChange}
                items={items}
                tabBarStyle={{ backgroundColor: "#E6F2F7" }}
              />
            </ConfigProvider>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserDashboard;
