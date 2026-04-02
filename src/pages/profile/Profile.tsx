import React,{useState,useEffect} from "react";
import Header from "../../components/header-footer-profile/Header";
import Footer from "../../components/header-footer-profile/Footer";
import { ConfigProvider } from "antd";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { useNavigate } from "react-router-dom";
import Discover from "../../components/user-dashboard/Discover";
// import {Messaging} from 'firebase/messaging'
import Favourate from "../../components/user-dashboard/Favourate";
import Notification from "../../components/user-dashboard/Notification";
import { useParams } from "react-router-dom";
import { RootState } from "./../../Redux/store";
import { useSelector } from "react-redux";



import Match from "../../components/match/Match";

const Profile: React.FC = () => {
  
  const { userId } = useParams<{ userId: string }>(); 
  const {user } = useSelector((state: RootState) => state.userReducer) ;
    const navigate = useNavigate();

  const [isExclusive, setIsExclusive] = useState(false);

  useEffect(() => {
    const isExclusive = localStorage.getItem("isExclusive");
    if (isExclusive === "true" || user?.usertype === "Exclusive") {
      setIsExclusive(true);
    }
    [];
  });

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

  return (
    <div className="min-w-screen flex min-h-screen flex-col">
      <Header />
      <div className="flex-grow bg-[#E6F2F7] mt-10">
        <div className="px-4  ">
          <h1 className="mb-2 text-xl font-semibold md:text-2xl lg:text-3xl">
            User Profile
          </h1>
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
