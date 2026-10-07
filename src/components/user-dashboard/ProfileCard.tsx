import React from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { FaRegMap, FaRegUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { RootState } from "./../../Redux/store";
import { useSelector } from "react-redux";
import { MdVerified } from "react-icons/md";
import "../../font.css";

interface Profile {
  id: string;
  profileImages: Array<string>;
  userId: string;
  userType: string;
  gender: string;
  age: string;
  match_percentage: string;
  displayName: string;
  firstName: string;
  occupation: string;
  religion: string;
  verified: boolean;
  country: string;
  state: string;
  maritalStatus: string;
}

interface ProfileCardProps {
  profiles: Profile[];
  isFavourite: boolean;
  handleFavouriteToggle: (userId: string) => void;
}

const getPlanTopBorderColor = (userType: string): string => {
  const type = (userType || "").toLowerCase().trim();
  if (type === "exclusive") {
    return "border-t-[#60457E]"; // Purple
  } else if (type === "premium") {
    return "border-t-[#007EAF]"; // Blue
  } else {
    return "border-t-gray-400"; // Grey for Standard
  }
};

const getPlanTagStyle = (userType: string): string => {
  const type = (userType || "").toLowerCase().trim();
  if (type === "exclusive") {
    return "border-[#60457E] bg-[#60457E]/80 text-white";
  } else if (type === "premium") {
    return "border-[#007EAF] bg-[#007EAF]/80 text-white";
  } else {
    return "border-gray-400 bg-gray-500/80 text-white";
  }
};

const ProfileCard: React.FC<ProfileCardProps> = ({ profiles, isFavourite, handleFavouriteToggle }) => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const navigate = useNavigate();

  const getBlurStyle = (currentUserType: string, targetUserType: string): string => {
    const cur = (currentUserType || "").toLowerCase().trim();
    const tar = (targetUserType || "").toLowerCase().trim();

    if (cur === "standard" && (tar === "standard" || tar === "premium" || tar === "exclusive")) {
      return "blur-[5px]";
    }
    if (cur === "premium" && tar === "exclusive") {
      return "blur-[5px]";
    }
    return "";
  };

  const handleCardClick = (userId: string, name: string) => {
    navigate(`/profile/${name}/${userId}`);
    window.location.reload();
  };

  return (
    <div className=" ">
      {profiles.map((data) => {
        const planType = data.userType || (data as any).usertype || "Standard";
        const topBorderClass = getPlanTopBorderColor(planType);
        const tagStyleClass = getPlanTagStyle(planType);

        return (
          <div
            onClick={() => handleCardClick(data.userId, data.firstName)}
            key={data.id}
            className={`relative w-full cursor-pointer md:w-[24rem] h-[33.1rem] rounded-[1.9rem] border-t-[1rem] ${topBorderClass}`}
          >
            <img
              src={data?.profileImages?.[0] ? data.profileImages[0] : '/path/to/default-image.jpg'}
              alt="Profile"
              className={`absolute h-full w-full rounded-2xl object-cover ${getBlurStyle(user?.usertype || '', planType)}`}
            />

            <div className="relative p-5 text-white h-full flex flex-col justify-between rounded-2xl bg-black bg-opacity-45">
              <div className="flex items-center justify-between">
                <div className={`rounded-full border-2 px-3 py-0.5 text-sm font-bold shadow-md ${tagStyleClass}`}>
                  <span>{planType}</span>
                </div>

                {isFavourite ? (
                  <button
                    className="flex items-center gap-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFavouriteToggle(data.userId);
                    }}
                  >
                    <FaStar className="text-2xl text-white" />
                  </button>
                ) : (
                  <button
                    className="flex items-center gap-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFavouriteToggle(data.userId);
                    }}
                  >
                    <FaRegStar className="text-2xl" />
                  </button>
                )}
              </div>

              <div className="flex flex-col gap-4 mt-auto">
                <div className="flex h-10 w-28 items-center justify-center rounded-lg bg-gradient-to-t from-[#FFD54266] to-[#C0970766] px-1">
                  <h1 className="text-white">{Math.round(parseFloat(data.match_percentage || "0"))}% Match</h1>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <h1 className="flex items-center gap-2 text-4xl font-bold">
                      {data.displayName || data.firstName}{" "}
                      {data.verified ? (
                        <MdVerified className="text-2xl text-[#0788F5]" />
                      ) : (
                        ""
                      )}
                    </h1>
                    <h1>{`${data.gender === 'Man' ? 'Male' : 'Female'}, ${data.age}`}</h1>
                  </div>
                  <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">{data.occupation}</h1>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <h1 className="text-xl font-semibold">{data.religion}</h1>
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
                    <FaRegMap className="mr-2" />
                    {`${data.country} - ${data.state}`}
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
