// import React , { useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { FaRegMap } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { RootState } from "./../../Redux/store";
import { useSelector } from "react-redux";
// import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { MdVerified } from "react-icons/md";
import "../../font.css";
import { FaStar } from "react-icons/fa";


interface Profile {
  id: string;
  profileImages: Array<string>;
  userId: string;
  userType: string;
  gender:string;
  age:string;
  match_percentage:string,
  displayName:string,
  firstName:string,
  occupation: string;
  religion: string;
  verified: boolean;
  country:string;
  state:string;
  maritalStatus: string;
}

interface ProfileCardProps {
  profiles: Profile[];
  isFavourite: boolean;
  handleFavouriteToggle: (userId: string) => void;
  
}



const ProfileCard: React.FC<ProfileCardProps> = ({ profiles, isFavourite, handleFavouriteToggle }) => {
  console.log("profiles are ",profiles);

  const {user } = useSelector((state: RootState) => state.userReducer) ;




  const navigate = useNavigate();


  


  const getBlurStyle = (currentUserType: string, targetUserType: string): string => {
    if (currentUserType === "Standard" && targetUserType === "Standard") {
      return " blur-[5px]";
    }
    if (currentUserType === "Standard" && targetUserType === "Premium") {
      return "blur-[5px]";
    }
    if (currentUserType === "Standard" && targetUserType === "Exclusive") {
      return "blur-[5px]";
    }

    if (currentUserType === "Premium" && targetUserType === "Standard") {
      return "";
    }
    if (currentUserType === "Premium" && targetUserType === "Exclusive") {
      return "blur-[5px]";
    }

    return "";
  };

  const handleCardClick = (userId: string, name: string) => {
    navigate(`/profile/${name}/${userId}`);
    window.location.reload();
  };

  const getPlanStyles = (userType: string) => {
    const type = (userType || "Standard").trim();
    switch (type) {
      case "Exclusive":
        return {
          topBorder: "border-t-[#60457E]",
          badgeBorder: "border-[#60457E]",
          badgeText: "text-[#C084FC]",
        };
      case "Premium":
        return {
          topBorder: "border-t-[#007EAF]",
          badgeBorder: "border-[#007EAF]",
          badgeText: "text-[#38BDF8]",
        };
      case "Standard":
      default:
        return {
          topBorder: "border-t-gray-500",
          badgeBorder: "border-gray-400",
          badgeText: "text-gray-300",
        };
    }
  };

  return (
    <div className=" ">
      {profiles.map((data) => {
        const planStyles = getPlanStyles(data.userType);
        return (
          <div 
            onClick={() => handleCardClick(data.userId, data.firstName)} 
            key={data.id}
            className={`relative w-full cursor-pointer md:w-[24rem] 
              h-[33.1rem] rounded-[1.9rem] border-t-[1rem] ${planStyles.topBorder}
            `}
          >
            <img
              src={data?.profileImages?.[0] ? data.profileImages[0] : 'path/to/default-image.jpg'}
              alt="p"
              className={`absolute h-full w-full rounded-2xl object-cover ${getBlurStyle(user?.usertype || '', data.userType)}`}  />

            <div
              className={`relative p-5 text-white ${data.userType !== "Standard" ? "space-y-[12.5rem]" : ""} h-full space-y-[13.5rem] rounded-2xl bg-black bg-opacity-45`}
            >
              <div className="flex items-center justify-between">
                <div className={`rounded-full border-2 ${planStyles.badgeBorder} bg-black/50 px-3 py-0.5`}>
                  <h1 className={`font-bold ${planStyles.badgeText}`}>{data.userType}</h1>
                </div>

                {
                  isFavourite ?  <button
                  className="flex items-center gap-2 "
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFavouriteToggle( data.userId);

                  }}
                > <FaStar className="text-2xl text-white" />  </button> :


              <button
              className="flex items-center gap-2 "
              onClick={(e) => {
                e.stopPropagation();
                handleFavouriteToggle( data.userId);

              }}
            >
              <FaRegStar className="text-2xl" />
            </button>
            }

              </div>
              <div className="flex flex-col gap-4">
                <div className="flex h-10 w-28 items-center justify-center rounded-lg bg-gradient-to-t from-[#FFD54266] to-[#C0970766] px-1">
                  <h1 className="text-white">{Math.round(parseFloat(data.match_percentage))}% Match</h1>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <h1 className="flex items-center gap-2 text-2xl md:text-3xl font-bold">
                      {" "}
                      {data.displayName || data.firstName}{" "}
                      {data.verified ? (
                        <MdVerified className="text-2xl text-[#0788F5]" />
                      ) : (
                        ""
                      )}
                    </h1>
                    <h1 className="text-base font-medium">{`${data.gender === 'Man' ? 'Male' : 'Female'}, ${data.age}`}</h1>
                    </div>
                  <div className="flex items-center justify-between">
                    <h1 className="text-lg font-semibold"> {data.occupation}</h1>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <h1 className="text-lg font-semibold">{data.religion}</h1>
                  <div className="flex items-center gap-2">
                    <span>
                      <FaRegUser />{" "}
                    </span>
                    <h1 className="font-semibold">{data.maritalStatus}</h1>
                  </div>
                </div>
                <div className="w-max rounded-full bg-[#F0F5FF] px-2 text-[#0B63E5]">
                  <h1
                    className="flex items-center justify-around"
                    style={{ fontFamily: "Proxima-Nova-Semibold, sans-serif" }}
                  >
                    {" "}
                    <FaRegMap className="mr-2" />
                    {` ${data.country } - ${data.state}`}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProfileCard;
