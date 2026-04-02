import React, { useEffect, useState, useMemo, useCallback } from "react";
import { CiMap } from "react-icons/ci";
import { IoLanguage } from "react-icons/io5";
import { FaSmoking } from "react-icons/fa";
import { FaWineGlassAlt } from "react-icons/fa";
import { useUserByidMutation } from "../../Redux/Api/profile.api";
import { FaUserGraduate } from "react-icons/fa";
import {
  setConnectionStatus,
} from "../../Redux/Reducers/connection.reducer";
import {
  useGetConnectionStatusMutation,
  useCancelConnectionMutation,
  useRemoveConnectionMutation,
  useAcceptConnectionMutation,
} from "../../Redux/Api/connection.api";
import { useSendNotifcationMutation } from "../../Redux/Api/notification.api";
import { IoPersonAdd } from "react-icons/io5";
import { FaSpinner } from "react-icons/fa6";
import { useCreateConnectionMutation } from "../../Redux/Api/connection.api";
import { FaUserXmark } from "react-icons/fa6";
import { useAddProfileViewMutation } from "../../Redux/Api/profileView.api";
import "../../font.css";
import Loading from "../Loading";
import { toast } from "sonner";
import { RootState } from "./../../Redux/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ProfileSection from "./profileSection";
interface MatchProps {
  userId: string;
}

const Match: React.FC<MatchProps> = ({ userId }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { connectionStatus, connectionType } = useSelector(
    (state: RootState) => state.connectionReducer
  );

  const icons = {

    Qualification: <FaUserGraduate />,
    Occupation: <FaUserGraduate />,
    "Working Status": <FaUserGraduate />,
    Income: <FaUserGraduate />,
  };

  const [profileData, setProfileData] = useState<any>([]);
  const [userByid, { isLoading, isError }] = useUserByidMutation();
  const [cancel, { isLoading: isLoadingCancel }] = useCancelConnectionMutation();
  const [remove, { isLoading: isLoadingRemove }] = useRemoveConnectionMutation();
  const [accept, { isLoading: isLoadingAccept }] = useAcceptConnectionMutation();
  const [create, { isLoading: isLoadingConnection }] = useCreateConnectionMutation();
  const [sendNotification] = useSendNotifcationMutation();
  const [getConnectionStatus, { isLoading: isLoadingConnectionStatus }] = useGetConnectionStatusMutation();
  const [addProfileView] = useAddProfileViewMutation();

  // Memoize `isExclusive` for efficient computation
  const isExclusive = useMemo(() => {
    return localStorage.getItem("isExclusive") === "true" || user?.usertype === "Exclusive";
  }, [user?.usertype]);

  // Memoize notificationData to prevent unnecessary `localStorage` parsing
  const notificationData = useMemo(() => {
    return JSON.parse(localStorage.getItem("notificationData") || "null");
  }, []);

  // Fetch profile data only when userId changes
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await userByid(userId).unwrap();
        setProfileData(response.data[0]);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchProfileData();
  }, [userId, userByid]);

  // Record profile view
  useEffect(() => {
    if (userId && userId !== user?.userId) {
      addProfileView(userId);
    }
  }, [userId, user?.userId, addProfileView]);

  // Fetch connection status only when userId changes
  const getStatus = useCallback(async (userId: string) => {
    try {
      const response = await getConnectionStatus(userId).unwrap();
      if (response.success) {
        dispatch(setConnectionStatus(response.data));
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Failed to fetch connection status:", error);
    }
  }, [getConnectionStatus, dispatch]);

  useEffect(() => {
    getStatus(userId);
  }, [userId, getStatus]);

  // Connection Actions (Memoized)
  const createConnection = useCallback(async (userId: string) => {
    try {
      const response = await create(userId).unwrap();

      if (response.error) {
        toast.error(response.message);
        return;
      }
      toast.success("Connection request sent successfully!");

      if (!notificationData) {
        console.error("Notification data is not available");
        return;
      }

      await sendNotification({
        token: profileData?.fcmToken,
        title: "Connection Request",
        body: "You have a new connection request",
        data: {
          type: "connection",
          receiverId: String(userId),
          receiverFCM: String(profileData?.fcmToken),
          senderId: String(user?.userId),
          senderImage: String(notificationData?.profileImage),
          senderFCM: String(notificationData?.fcmToken),
          senderName: String(notificationData?.name),
        },
      });

      getStatus(userId);
    } catch (error) {
      toast.error("Failed to create connection. Please try again later.");
    }
  }, [create, sendNotification, profileData, notificationData, user?.userId, getStatus]);

  const cancelConnection = useCallback(async (userId: string) => {
    try {
      await cancel(userId).unwrap();
      toast.success("Connection canceled successfully!");
      getStatus(userId);
    } catch (error) {
      toast.error("Failed to cancel connection. Please try again later.");
    }
  }, [cancel, getStatus]);

  const getBlurStyle = (
    currentUserType: string,
    targetUserType: string
  ): string => {
    if (currentUserType === "Standard" && targetUserType === "Standard") {
      return " blur-sm";
    }
    if (currentUserType === "Standard" && targetUserType === "Premium") {
      return "blur-sm";
    }
    if (currentUserType === "Standard" && targetUserType === "Exclusive") {
      return "blur-sm";
    }

    if (currentUserType === "Premium" && targetUserType === "Standard") {
      return "";
    }
    if (currentUserType === "Premium" && targetUserType === "Exclusive") {
      return "blur-sm";
    }

    return "";
  };

  const removeConnection = useCallback(async (userId: string) => {
    try {
      await remove(userId).unwrap();
      toast.success("Connection removed successfully!");
      getStatus(userId);
    } catch (error) {
      toast.error("Failed to remove connection. Please try again later.");
    }
  }, [remove, getStatus]);

  const acceptConnection = useCallback(async (userId: string) => {
    try {
      await accept(userId).unwrap();
      toast.success("Connection accepted successfully!");
      getStatus(userId);
    } catch (error) {
      toast.error("Failed to accept connection. Please try again later.");
    }
  }, [accept, getStatus]);

  // Loading & Error Handling
  if (isLoading) return <Loading />;
  if (isError) return <p>Failed to load user data.</p>;


  return (
    <div className="min-w-screen flex min-h-screen flex-col gap-4 md:gap-10 lg:flex-row">

      <div className="mb-4 space-y-5 lg:grid grid-cols-1 gap-5  md:mb-0 h-full  auto-rows-[10rem] ">
        {profileData?.profileImage?.map((imageUrl: string, index: number) => (
          <img
            key={index}
            src={imageUrl}
            alt="profile image"
            className={`object-cover w-full h-full rounded-md ${getBlurStyle(
              user?.usertype || "",
              profileData.userType
            )}`}
          />
        ))}

      </div>
      <div className="col-span-1 xl:grid w-full md:col-span-2 gap-10">
        <div className="col-span-1 mb-4 xl:mb-0 rounded-xl bg-white p-6 md:col-span-2   md:w-auto  xl:h-[22rem]">
          <div className="self-start text-sm font-semibold  leading-5 text-zinc-900">
            <h1>Basic & Lifestyle</h1>
          </div>

          <div className="mt-2.5 flex flex-wrap items-center gap-2.5 self-start text-base font-medium leading-4 text-slate-900">
            <div
              className={`self-stretch text-xl font-bold leading-10  ${isExclusive ? "text-[#60457E]" : "text-[#007EAF]"
                }
 lg:text-3xl`}
            >
              <h1>
                {profileData?.basic_and_lifestyle?.displayName ||
                  profileData?.basic_and_lifestyle?.firstName +
                  " " +
                  profileData?.basic_and_lifestyle?.lastName}{" "}
              </h1>
            </div>
            <div className="text-md my-auto justify-center  self-stretch whitespace-nowrap rounded-[100px] bg-orange-100 px-1 py-1.5 text-center capitalize tracking-normal md:px-3 ">
              <p> {profileData?.basic_and_lifestyle?.gender}</p>
            </div>
            <div className=" my-auto text-md justify-center self-stretch whitespace-nowrap rounded-[100px] bg-orange-100 px-1 py-1.5 text-center capitalize trackingl md:px-3">
              {profileData?.basic_and_lifestyle?.age}
            </div>

            <div>
              {connectionType === "receiver" && (
                <div className="flex items-center justify-center gap-2">
                  {connectionStatus === "pending" && (
                    <>
                      <button
                        onClick={() => acceptConnection(userId)}
                        className="rounded-[0.5rem] bg-[#007EAF] px-4 py-2 text-white"
                      >
                        {
                          isLoadingAccept ? (
                            <FaSpinner className="animate-spin" />
                          ) : (

                            "Confirm request"

                          )

                        }

                      </button>
                      <button
                        onClick={() => removeConnection(userId)}
                        className="rounded-full bg-red-600 px-4 py-2 text-white w-12"
                      >
                        {isLoadingRemove ? (
                          <FaSpinner className="animate-spin" />
                        ) : (
                          <FaUserXmark />
                        )}
                      </button>
                    </>
                  )}
                </div>
              )}

              {connectionType === "sender" && (
                <div className="flex items-center justify-center gap-2">
                  {connectionStatus === "pending" && (
                    <>
                      <div className="rounded-[0.5rem] bg-gray-400 px-4 py-2 text-white">

                        Request Sent

                      </div>
                      <button
                        onClick={() => cancelConnection(userId)}
                        className="rounded-full bg-red-600 px-4 py-2 text-white w-12"
                      >
                        {isLoadingCancel ? (
                          <FaSpinner className="animate-spin" />
                        ) : (
                          <FaUserXmark />
                        )}
                      </button>
                    </>
                  )}
                </div>
              )}

              {(connectionType === "receiver" || connectionType === "sender") &&
                connectionStatus === "accepted" && (
                  <div className="flex items-center justify-center gap-2">
                    <div className="rounded-[0.5rem] bg-gray-400 px-4 py-2 text-white">
                      {
                        isLoadingConnectionStatus && (
                          <FaSpinner className="animate-spin" />
                        )

                      }
                      Connected
                    </div>
                    <button
                      onClick={() => removeConnection(userId)}
                      className="rounded-full bg-red-600 px-4 py-2 text-white w-12"
                    >
                      {isLoadingRemove ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        <FaUserXmark />
                      )}
                    </button>
                  </div>
                )}

              {connectionType === "none" &&
                connectionStatus !== "pending" &&
                connectionStatus !== "accepted" && (
                  <button
                    onClick={() => createConnection(userId)}
                    className={`rounded-[0.5rem] ${isExclusive ? "bg-[#60457E]" : "bg-[#007EAF]"
                      } px-4 py-2 text-white`}
                  >
                    {isLoadingConnection ? (
                      <FaSpinner className="animate-spin" />
                    ) : (
                      <div className="flex items-center gap-2">
                        Connect <IoPersonAdd />
                      </div>
                    )}
                  </button>
                )}
            </div>
          </div>

          <div className="mt-6 flex flex-col rounded-xl bg-cyan-600 bg-opacity-20 px-6 py-3 max-md:max-w-full max-md:px-5">
            <div className="text-base font-bold leading-6 tracking-wide text-gray-900 text-opacity-90 max-md:max-w-full">
              About{" "}
              {profileData?.basic_and_lifestyle?.displayName ||
                profileData?.basic_and_lifestyle?.firstName +
                " " +
                profileData?.basic_and_lifestyle?.lastName}
            </div>
            <div className="mt-4 text-sm leading-7 tracking-wide text-slate-600 max-md:max-w-full md:text-lg">
              <p> {profileData?.basic_and_lifestyle?.about}</p>
            </div>
          </div>
          <div className="mt-4 flex flex-col max-md:max-w-full md:px-5">
            <div className="flex justify-between gap-0 max-md:flex-wrap">
              <div
                className="text-md flex-1 font-normal leading-8 tracking-wide text-gray-900 text-opacity-90 max-md:max-w-full md:text-lg"
                style={{ fontFamily: "Proxima-Nova-Semibold, sans-serif" }}
              >
                Religion
              </div>
              <div className="justify-center self-start whitespace-nowrap rounded-[100px] bg-blue-50 px-3 py-1.5 text-center text-base font-medium capitalize leading-4 tracking-normal text-blue-600">
                {profileData?.basic_and_lifestyle?.religion}
              </div>
            </div>
            <div className="mt-2 flex justify-between gap-0 font-normal max-md:flex-wrap">
              <div
                className="text-md flex-1 leading-8 tracking-wide text-gray-900 text-opacity-90 max-md:max-w-full md:text-lg"
                style={{ fontFamily: "Proxima-Nova-Semibold, sans-serif" }}
              >
                Marital status
              </div>
              <div className="justify-center self-start rounded-[100px] bg-orange-100 px-3 py-1.5 text-center text-base font-medium capitalize leading-4 tracking-normal text-slate-900">
                {profileData?.basic_and_lifestyle?.maritalStatus}
              </div>
            </div>
            <div className="mt-2 flex justify-between gap-0 max-md:flex-wrap">
              <div
                className="text-md flex-1 font-normal leading-8 tracking-wide text-gray-900 text-opacity-90 max-md:max-w-full md:text-lg"
                style={{ fontFamily: "Proxima-Nova-Semibold, sans-serif" }}
              >
                Posted By
              </div>
              <div className="justify-center self-start rounded-[100px] bg-purple-100 px-3 py-1.5 text-center text-base font-medium capitalize leading-4 tracking-normal text-violet-600">
                {profileData?.basic_and_lifestyle?.postedBy}
              </div>
            </div>
          </div>
        </div>

        {profileData?.family_details &&

          <ProfileSection
            title="Family Background"
            data={{
              "Father's Occupation": profileData?.family_details?.fatherOccupation,
              "Mother's Occupation": profileData?.family_details?.motherOccupation,
              "Number of Siblings": profileData?.family_details?.numberOfSiblings,
              "Living with Family": profileData?.family_details?.livingWithFamily,

            }}
            isExclusive={isExclusive}
            fieldColors={{
              "Father's Occupation": "bg-purple-100 text-violet-600",
              "Mother's Occupation": "bg-orange-100 text-slate-900",
              "Number of Siblings": "bg-pink-50 text-pink-400",
              "Living with Family": "bg-green-100 text-green-700",
            }}
          />
        }

        {
          profileData?.personal_background &&
          <div className="row-span-3 lg:row-span-3 mb-4  xl:mb-0 rounded-xl bg-white ">
            <div className="flex flex-col rounded-xl bg-white pb-6 shadow-sm">
              <div
                className={`justify-center border-b font-Proxima-Nova-Bold border-solid border-zinc-300 px-6 py-4 text-lg leading-6 tracking-wide  ${isExclusive ? "text-[#60457E]" : "text-[#007EAF]"
                  } max-md:px-5 md:text-xl`}
              >
                Personal Background
              </div>
              <div className="mt-6 flex flex-col px-6 gap-4 max-md:px-5">
                <div className="flex items-center gap-1 whitespace-nowrap">
                  <div
                    className={`text-xl leading-8 ${isExclusive ? "text-[#60457E]" : "text-[#007EAF]"
                      } md:text-3xl`}
                  >
                    <CiMap />
                  </div>
                  <div className="text-lg leading-8 text-slate-600 md:text-xl">
                    Height
                  </div>
                </div>

                <div className="text-md ml-8 mt-2 justify-center self-start rounded-[100px] bg-blue-50 px-3 py-1.5 text-center font-medium capitalize leading-7 text-cyan-600 max-md:ml-2.5 md:text-xl">
                  {profileData?.personal_background?.height}
                </div>
                <div className="mt-6 flex items-center gap-1 whitespace-nowrap">
                  <div
                    className={`text-xl leading-8 ${isExclusive ? "text-[#60457E]" : "text-[#007EAF]"
                      } md:text-3xl`}
                  >
                    <CiMap />
                  </div>
                  <div className="text-lg leading-8 tracking-wide text-slate-600 md:text-xl">
                    Weight
                  </div>
                </div>
                <div className="text-md ml-8 mt-2 justify-center self-start rounded-[100px] bg-blue-50 px-3 py-1.5 text-center font-medium capitalize leading-7 text-cyan-600 max-md:ml-2.5 md:text-xl">
                  {profileData?.personal_background?.weight}
                </div>
                <div className="mt-6 flex items-center gap-1">
                  <div
                    className={`text-xl leading-8 ${isExclusive ? "text-[#60457E]" : "text-[#007EAF]"
                      } md:text-3xl`}
                  >
                    <CiMap />
                  </div>
                  <div className="text-lg leading-8 tracking-wide text-slate-600 md:text-xl">
                    Body Type
                  </div>
                </div>
                <div className="text-md ml-8 mt-2 flex justify-center gap-1.5 self-start rounded-[100px] border border-solid border-gray-200 bg-blue-50 bg-opacity-50 px-5 py-2 font-medium capitalize leading-7 text-cyan-600 max-md:ml-2.5 md:py-4 md:text-xl">
                  {profileData?.personal_background?.bodyType}
                </div>
                <div className="mt-6 flex items-center gap-1 whitespace-nowrap text-xl leading-8 tracking-wide text-slate-600">
                  <div
                    className={`text-xl leading-8 ${isExclusive ? "text-[#60457E]" : "text-[#007EAF]"
                      } md:text-3xl`}
                  >
                    <IoLanguage />
                  </div>

                  <div className="text-lg leading-8 text-slate-600 md:text-xl">
                    Language
                  </div>
                </div>
                <div className="text-md ml-8 mt-2 justify-center self-start rounded-[100px] bg-pink-50 px-3 py-1.5 text-center font-medium capitalize leading-7 text-pink-400 max-md:ml-2.5 md:text-xl">
                  {profileData?.personal_background?.language}
                </div>
                <div className="mt-6 flex items-center gap-1 text-xl leading-8 tracking-wide text-slate-600">
                  <div
                    className={`text-xl leading-8 ${isExclusive ? "text-[#60457E]" : "text-[#007EAF]"
                      } md:text-3xl`}
                  >
                    {" "}
                    <FaSmoking />
                  </div>
                  <div className="text-lg leading-8 text-slate-600 md:text-xl">
                    Smoking habbits
                  </div>
                </div>
                <div className="text-md ml-9 mt-2 justify-center self-start rounded-[100px] bg-green-100 px-3 py-1.5 text-center font-medium capitalize leading-7 text-green-700 max-md:ml-2.5 md:text-xl">
                  {profileData?.personal_background?.smokingHabbit}
                </div>
                <div className="mt-6 flex items-center gap-1 text-xl leading-8 tracking-wide text-slate-600">
                  <div
                    className={`text-xl leading-8 ${isExclusive ? "text-[#60457E]" : "text-[#007EAF]"
                      } md:text-3xl`}
                  >
                    {" "}
                    <FaWineGlassAlt />{" "}
                  </div>

                  <div className="text-lg leading-8 text-slate-600 md:text-xl">
                    Drinking habbit
                  </div>
                </div>
                <div className="text-md ml-7 mt-2 justify-center self-start rounded-[100px] bg-gray-200 px-3 py-1.5 text-center font-medium capitalize leading-7 text-slate-900 max-md:ml-2.5 md:text-xl">
                  {profileData?.personal_background?.drinkingHabbit}
                </div>
                <div className="mt-6 flex items-center gap-1 whitespace-nowrap">
                  <div
                    className={`text-xl leading-8 ${isExclusive ? "text-[#60457E]" : "text-[#007EAF]"
                      } md:text-3xl`}
                  >
                    <CiMap />
                  </div>
                  <div className="text-lg leading-8 tracking-wide text-slate-600 md:text-xl">
                    Diet
                  </div>
                </div>
                <div className="text-md ml-8 mt-2 justify-center self-start whitespace-nowrap rounded-[100px] bg-neutral-100 px-3 py-1.5 text-center font-medium capitalize leading-7 text-slate-900 max-md:ml-2.5 md:text-xl">
                  {profileData?.personal_background?.diet}
                </div>
                <div className="mt-6 flex items-center gap-2 whitespace-nowrap">
                  <div
                    className={`text-xl leading-8 ${isExclusive ? "text-[#60457E]" : "text-[#007EAF]"
                      } md:text-3xl`}
                  >
                    <CiMap />
                  </div>
                  <div className="text-lg leading-8 tracking-wide text-slate-600 md:text-xl">
                    Complexion
                  </div>
                </div>
                <div className="text-md ml-8 mt-2 justify-center self-start rounded-[100px] bg-neutral-100 px-3 py-1.5 text-center font-medium capitalize leading-7 text-slate-900 max-md:ml-2.5 md:text-xl">
                  {profileData?.personal_background?.complexion}
                </div>
              </div>
            </div>
          </div>
        }

        {
          profileData?.family_background &&
          <ProfileSection
            title="Religious Background"
            data={{
              Religion: profileData?.religious_background?.religion,
              SubCommunity: profileData?.religious_background?.subCommunity,
              Community: profileData?.religious_background?.community,
              Gothra: profileData?.religious_background?.gotra,
              "Date of Birth": profileData?.religious_background?.dateOfBirth,
              "Time of Birth": profileData?.religious_background?.timeOfBirth,
              "Place of Birth": profileData?.religious_background?.placeOfBirth,
              "Mother Tongue": profileData?.religious_background?.motherTongue,
            }}
            isExclusive={isExclusive}
            fieldColors={{
              Religion: "bg-purple-100 text-violet-600",
              SubCommunity: "bg-orange-100 text-slate-900",
              Community: "bg-pink-50 text-pink-400",
              "Time of Birth": "bg-green-100 text-green-700",
            }}
          />

        }



        {profileData?.location_background &&
          <ProfileSection
            title="Location Background"
            data={{
              Country: profileData?.location_background?.country,
              State: profileData?.location_background?.state,
              "Current Location": profileData?.location_background?.currentLocation,
              "City of Residence": profileData?.location_background?.cityOfResidence,
              Nationality: profileData?.location_background?.nationality,
              Citizenship: profileData?.location_background?.citizenShip,
              "Residency Visa Status": profileData?.location_background?.residencyVisaStatus,
            }}
            isExclusive={isExclusive}
            fieldColors={{
              State: "bg-purple-100 text-violet-600",
              Nationality: "bg-orange-100 text-slate-900",
              Citizenship: "bg-pink-50 text-pink-400",
              "Residency Visa Status": "bg-green-100 text-green-700",
            }}
          />
        }


        <div className="h-auto py-4 rounded-xl">
          <div className=" flex max-w-[499px] flex-col pb-9 leading-8 text-slate-900">
            <div
              className={`w-full text-lg font-Proxima-Nova-Bold leading-[110%]  ${isExclusive ? "text-[#60457E]" : "text-[#007EAF]"
                } max-md:max-w-full md:text-xl`}
            >
              Interest and hobbies
            </div>
            <div className="mt-4 flex gap-2.5 whitespace-nowrap text-center capitalize tracking-wide max-md:pr-5 md:flex-wrap">
              {profileData?.interest_and_hobbies?.map((interest: string) => (
                <div
                  key={interest}
                  className="justify-center rounded-[100px] bg-gray-200 px-3 py-1.5"
                >
                  {interest}
                </div>
              ))}
            </div>
          </div>
        </div>


        {profileData?.education_and_financial &&

          <ProfileSection
            title="Educational and Financial Background"
            data={{
              "Qualification": profileData?.education_and_financial?.qualification,
              "Occupation": profileData?.education_and_financial?.occupation,
              "Working Status": profileData?.education_and_financial?.workingStatus,
              "Income": profileData?.education_and_financial?.income,

            }}
            isExclusive={isExclusive}
            fieldColors={{
              "Qualification": "bg-purple-100 text-violet-600",
              "Occupation": "bg-orange-100 text-slate-900",
              "Working Status": "bg-pink-50 text-pink-400",
              "Income": "bg-green-100 text-green-700",
            }}
            icons={icons}
          />
        }

      </div>
    </div>
  );
};

export default Match;
