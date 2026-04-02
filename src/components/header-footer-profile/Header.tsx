import { Link } from "react-router-dom";
import { memo } from "react";
// import { useState } from "react";
import { useState,useEffect } from "react";
import { Popover,  Skeleton } from "antd";
import { IoIosLogOut } from "react-icons/io";
import { AiOutlineUserDelete } from "react-icons/ai";
import {
  useLogoutUserMutation,
} from "../../Redux/Api/user.api";
import { useGetUserImageQuery } from "../../Redux/Api/profile.api";
import { IoNotifications } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { logout } from "../../Redux/Reducers/user.reducer";
import { RootState } from "./../../Redux/store";
import { useSelector } from "react-redux";
import ReauthenticateModal from "./RauthenticateModel.tsx";
import Cookies from "js-cookie";
import { useGetNotificationQuery } from "../../Redux/Api/notification.api.ts";
import {
  setNotification,
} from "../../Redux/Reducers/notification.reducers";



const Header = memo(() => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { data: notificationData} = useGetNotificationQuery<any>();
  // console.log("notification updated header are",notifacations)
  useEffect(() => {
    if (!isLoading && notificationData) {
      dispatch(setNotification(notificationData.data));
    }
  }, [notificationData, dispatch]);
  
  const {user } = useSelector((state: RootState) => state.userReducer) ;
  const {notifacations } = useSelector((state: RootState) => state.notificationReducer) ;

  const [isExclusive, setIsExclusive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const isExclusive = localStorage.getItem("isExclusive");
    if (isExclusive === "true" || user?.usertype === "Exclusive") {
      setIsExclusive(true);
    }
    [];
  });

  



  
  const [logoutUser] = useLogoutUserMutation();
 
  interface LogoutResponse {
    success: boolean;
    message: string;
  }



  const handleNotificationClick = () => {
    navigate(`?tab=notifications`);
  };




  const handleLogout = async () => {
    try {
      const response: LogoutResponse = await logoutUser().unwrap();
      console.log(response);
      if (response?.success === true) {
        localStorage.clear();
        toast.success(response?.message);
        Cookies.remove("isImageFormFilled");
        Cookies.remove("isProfileFormFilled");
        Cookies.remove("isLocationFormFilled");
        Cookies.remove("isQualificationFormFilled");
        Cookies.remove("isOtherFormFilled");
        Cookies.remove("isPersonalFormFilled");
        dispatch(logout());
        navigate("/login");
        window.location.reload();
      } else {
        toast.error("Logout failed. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while logging out");
    }
  };

  const { data: myDetails, isLoading } = useGetUserImageQuery<any>();

  console.log(myDetails);

  const profile = (
    <div className="flex flex-col gap-4">
      <button className="flex items-center gap-2" onClick={handleLogout}>
        <span>
          <IoIosLogOut />
        </span>{" "}
        Logout
      </button>
      <button className="flex items-center gap-2" onClick={() => setIsModalOpen(true)}>
        <span>
          <AiOutlineUserDelete />
        </span>
        Delete Account
      </button>
    </div>
  );



  return (
    <div className={`fixed z-10 h-20 w-full ${isExclusive? 'bg-[#60457E]': 'bg-[#007EAF]'}`}>
      <div className="flex h-full items-center justify-between px-4 md:px-10 ">
        <div className="">
          <Link to="/user-dashboard">
            <img
              src="/logowhite.png"
              alt="logo"
              className="h-auto w-24 md:w-36 lg:w-40"
            />
          </Link>
        </div>

        <div className="flex items-center justify-between gap-2 md:gap-4">
          <div className="relative">
            <button
              onClick={handleNotificationClick}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white md:h-12 md:w-12"
            >
              <IoNotifications size={28} />
            </button>

            {/* Notification IoNotificationsbadge */}
            <span className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white text-xs">
              {notifacations?.length?? 0} 
            </span>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white md:h-12 md:w-12">
            <Popover content={profile}>
              <button>
                <Skeleton
                  loading={isLoading}
                  avatar={true}
                  active={true}
                  className="flex items-center ml-4 justify-center h-10 w-10 "
                />
                {myDetails?.data && (
                  <img
                    src={myDetails?.data}
                    alt="profile"
                    className="h-10 w-10 rounded-full md:h-10 md:w-10"
                  />
                )}
              </button>
            </Popover>
          </div>

          <div className="">
            <button>
              <img
                src="/Aus.svg"
                alt="lang"
                className="h-5 w-5 md:h-8 md:w-8"
              />
            </button>
          </div>
          <ReauthenticateModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
      </div>
    </div>
  );
});

export default Header;
