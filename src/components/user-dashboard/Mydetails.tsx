import { useState, useEffect } from "react";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { FaEdit } from "react-icons/fa";
// import { Link } from "react-router-dom";
import { Switch } from "antd";
import { CiMap } from "react-icons/ci";
import { IoLanguage } from "react-icons/io5";
// import {setNotificationData} from "../../Redux/Reducers/user.reducer";
import { FaSmoking } from "react-icons/fa";
// import { useDispatch } from "react-redux";
import { FaWineGlassAlt } from "react-icons/fa";
import Loading from "../Loading";
import { FaUserGraduate } from "react-icons/fa";
import { useMyDetailsQuery, useGetProfilePercentageQuery } from "../../Redux/Api/profile.api";
import { useDispatch } from "react-redux";
import "../../font.css";
import ReligiouModel from "../user-dashboard-model/ReligiousModel";
import FamilyModel from "../user-dashboard-model/FamilyModel";
import PersonalBagroundModal from "../user-dashboard-model/PersonalBagroundModal";
import EducationFinancialModal from "../user-dashboard-model/EducationFinancialModal";
import LocationBackgroundModal from "../user-dashboard-model/LocationBackgroundModal";
import { RootState } from "./../../Redux/store";
import { useToggleMutation } from "../../Redux/Api/toggle.api"
import { toast } from "sonner";
import { RiUserSharedLine } from "react-icons/ri";
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

import { useSelector } from "react-redux";
import { setMyDetails } from "../../Redux/Reducers/user.reducer";
import { updateProfile } from "firebase/auth";
import { auth } from "../../../utils/firebaseConfig";
import ContactNumberView from "./ContactNumberView";
import { useGetPreferencesQuery } from "../../Redux/Api/preferences.api";
import PartnerPreferenceModal from "../user-dashboard-model/PartnerPreferenceModal";
import { useGetMyConnectionsQuery, useGetSentConnectionRequestsQuery } from "../../Redux/Api/connection.api";
import MyConnectionsModal from "../user-dashboard-model/MyConnectionsModal";
import SentRequestsModal from "../user-dashboard-model/SentRequestsModal";


const MyDetails = () => {
  const dispatch = useDispatch();

  const [toggle, { isLoading: isToggleLoading }] = useToggleMutation();

  const { user, myDetails } = useSelector((state: RootState) => state.userReducer);
  console.log("my details are", myDetails)


  const [isPersonalDetails, setIsPersonalDetails] = useState(false);
  const [isReligiousDetails, setIsReligiousDetails] = useState(false);
  const [isFamilyDetails, setIsFamilyDetails] = useState(false);
  const [isEducationFinancial, setIsEducationFinancial] = useState(false);
  const [isLocationBackground, setIsLocationBackground] = useState(false);
  const [isConnectionsModalVisible, setIsConnectionsModalVisible] = useState(false);
  const [isSentRequestsModalVisible, setIsSentRequestsModalVisible] = useState(false);

  console.log(myDetails?.toggleStatus);
  useEffect(() => {
    if (myDetails?.toggleStatus) {
      setIsPersonalDetails(myDetails.toggleStatus.personal_details);
      setIsReligiousDetails(myDetails.toggleStatus.religious_details);
      setIsFamilyDetails(myDetails.toggleStatus.family_details);
      setIsEducationFinancial(myDetails.toggleStatus.education_and_financial_details);
      setIsLocationBackground(myDetails.toggleStatus.location_details);
    }
  }, [myDetails]); // Runs whenever `myDetails` updates





  const [Percentage, setProfilePercentage] = useState(0);
  const { data: myDetailsData, isLoading: isLoading } = useMyDetailsQuery<any>();


  useEffect(() => {
    if (myDetailsData) {
      dispatch(setMyDetails(myDetailsData?.data[0]));
    }
  }, [myDetailsData, dispatch]);



  const [isExclusive, setIsExclusive] = useState(false);

  useEffect(() => {
    const isExclusive = localStorage.getItem("isExclusive");
    if (isExclusive === "true" || user?.usertype === "Exclusive") {
      setIsExclusive(true);
    }
    [];
  });


  const TogglePersonalDetails = async () => {
    const newStatus = !isPersonalDetails; // Determine new status
    setIsPersonalDetails(newStatus);

    try {
      const response = await toggle({
        section: "personal_details",
        status: newStatus,
      });

      if (response.error) {
        const errorData = response.error as FetchBaseQueryError & { data: { message: string } };
        toast.error(errorData.data.message);
        return;
      }

      toast.success(
        newStatus ? " Personal Background is now visible." : "Personal Background is now hidden."
      );


    } catch (error) {
      toast.error("Failed to update Personal Background visibility.");
    }
  };


  const ToggleReligiousDetails = async () => {
    const newStatus = !isReligiousDetails; // Determine new status
    setIsReligiousDetails(newStatus);

    try {
      const response = await toggle({
        section: "religious_details",
        status: newStatus,
      });

      if (response.error) {
        const errorData = response.error as FetchBaseQueryError & { data: { message: string } };
        toast.error(errorData.data.message);
        return;
      }

      toast.success(
        newStatus ? "Religious Background is now visible." : "Religious Background is now hidden."
      );

    } catch (error) {
      toast.error("Failed to update Religious Background visibility.");
    }
  };

  const ToggleFamilyDetails = async () => {
    const newStatus = !isFamilyDetails; // Determine new status
    setIsFamilyDetails(newStatus);

    try {
      const response = await toggle({
        section: "family_details",
        status: newStatus,
      });

      if (response.error) {
        const errorData = response.error as FetchBaseQueryError & { data: { message: string } };
        toast.error(errorData.data.message);
        return;
      }

      toast.success(
        newStatus ? "Family Background is now visible." : "Family Background is now hidden."
      );


    } catch (error) {
      toast.error("Failed to update Family Background visibility.");

    }
  };


  const ToggleEducationFinancial = async () => {
    const newStatus = !isEducationFinancial; // Determine new status
    setIsEducationFinancial(newStatus);

    try {
      const response = await toggle({
        section: "education_and_financial_details",
        status: newStatus,
      });

      if (response.error) {
        const errorData = response.error as FetchBaseQueryError & { data: { message: string } };
        toast.error(errorData.data.message);
        return;
      }

      toast.success(
        newStatus ? "Education Financial Background is now visible." : "Education Financial Background is now hidden."
      );


    } catch (error) {
      toast.error("Failed to update Education Financial Background visibility.");



    }
  };

  const ToggleLocationBackground = async () => {
    const newStatus = !isLocationBackground; // Determine new status
    setIsLocationBackground(newStatus);

    try {
      const response = await toggle({
        section: "location_details",
        status: newStatus,
      });

      if (response.error) {
        const errorData = response.error as FetchBaseQueryError & { data: { message: string } };
        toast.error(errorData.data.message);
        return;
      }

      toast.success(
        newStatus ? " Location Background is now visible. " : "Location Background is now hidden."
      );


    } catch (error) {
      toast.error(
        "Failed to update Location Background visibility."
      )
    }
  };


  const { data: profileData, isLoading: isprofileDataLoading, refetch } = useGetProfilePercentageQuery();




  useEffect(() => {
    const notificationData = {
      userId: user?.userId,
      profileImage: myDetails?.profileImage[0],
      name: `${myDetails?.basic_and_lifestyle?.firstName} ${myDetails?.basic_and_lifestyle?.lastName}`,
      fcmToken: myDetails?.fcmToken,
    };

    if (myDetails) {

      localStorage.setItem("notificationData", JSON.stringify(notificationData));


    }


  }, [myDetails]);


  const [religiousModelOpen, setReligiousModelOpen] = useState(false);
  const [familyModelOpen, setFamilyModelOpen] = useState(false);
  const [personalBagroundModalOpen, setPersonalBagroundModalOpen] =
    useState(false);
  const [educationFinancialModalOpen, setEducationFinancialModalOpen] =
    useState(false);
  const [locationBackgroundModalOpen, setLocationBackgroundModalOpen] =
    useState(false);
  const [partnerPreferenceModalOpen, setPartnerPreferenceModalOpen] = useState(false);


  const openReligiousModel = () => {
    setReligiousModelOpen(true);
    refetch();

  };

  const closeReligiousModel = () => {
    setReligiousModelOpen(false);
    refetch();

  };

  const openFamilyModel = () => {
    setFamilyModelOpen(true);
    refetch();

  };

  const closeFamilyModel = () => {
    setFamilyModelOpen(false);
    refetch();
  };

  const openPersonalBagroundModal = () => {
    setPersonalBagroundModalOpen(true);
    refetch();

  };

  const closePersonalBagroundModal = () => {
    setPersonalBagroundModalOpen(false);
    refetch();
  };

  const openEducationFinancialModal = () => {
    setEducationFinancialModalOpen(true);
    refetch();


  };

  const closeEducationFinancialModal = () => {
    setEducationFinancialModalOpen(false);
    refetch();
  };

  const openLocationBackgroundModal = () => {
    setLocationBackgroundModalOpen(true);
    refetch();


  };
  const closeLocationBackgroundModal = () => {
    setLocationBackgroundModalOpen(false);
    refetch();

  };

  const openPartnerPreferenceModal = () => {
    setPartnerPreferenceModalOpen(true);
  };

  const closePartnerPreferenceModal = () => {
    setPartnerPreferenceModalOpen(false);
  };

  // const openInterestHobbiesModal = () => {
  //   setInterestHobbiesModalOpen(true);
  // };
  // const closeInterestHobbiesModal = () => {
  //   setInterestHobbiesModalOpen(false);
  // };

  // const openLifestyleModel = () => {
  //   setLifestyleModelOpen(true);
  //   refetch();

  // };

  // const closeLifestyleModel = () => {
  //   setLifestyleModelOpen(false);
  //   refetch();

  // };





  useEffect(() => {
    if (profileData && profileData.percentage) {
      setProfilePercentage(profileData.percentage);


    }
  }, [profileData, refetch]);


  const capitalize = (str: string | undefined) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";
  // After user signs up or logs in
  if (auth.currentUser) {
    updateProfile(auth.currentUser, {
      displayName: myDetails?.basic_and_lifestyle?.firstName,  // set user name
      photoURL: myDetails?.profileImage[0],// set profile pic
    });
    // console.log("name and photoUrl are", myDetails?.basic_and_lifestyle?.firstName, myDetails?.profileImage[0]);
  }

  const { data: preferencesData, isLoading: isPreferencesLoading } = useGetPreferencesQuery();
  const { data: connectionsData } = useGetMyConnectionsQuery(undefined);
  const { data: sentData } = useGetSentConnectionRequestsQuery(undefined);
  const connectionsCount = connectionsData?.data?.length || 0;
  const sentRequestsCount = sentData?.data?.length || 0;
  console.log("preferencesData in Mydetails:", preferencesData);

  return (


    <div>
      {isLoading || isprofileDataLoading || isPreferencesLoading ? (
        <div className="flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <div className="min-w-screen flex min-h-screen flex-col gap-4 md:gap-10 lg:flex-row">
          <div className="mb-4 space-y-5 lg:grid grid-cols-1 gap-5  md:mb-0 h-full  auto-rows-[10rem] ">
            {myDetails?.profileImage.map(
              (imageUrl: string, index: number) => (
                <img
                  key={index}
                  src={imageUrl}
                  alt="profile image"
                  className="max-lg:object-cover w-full h-full rounded-md"
                />
              )
            )}
          </div>

          <div className="col-span-1 xl:grid w-full md:col-span-2 gap-10">
            <div className="col-span-1 mb-4 xl:mb-0 rounded-xl bg-white p-6 md:col-span-2   md:w-auto  xl:h-[29rem]">
              <div className="flex w-full flex-col  items-center justify-between gap-10 xl:flex-row">
                <div className=" xl:w-[70%] w-full ">
                  <div className="flex items-center justify-between self-start  text-xl font-semibold leading-5 text-zinc-900">
                    Basic & Lifestyle
                    <div className="flex gap-4 text-cyan-600">
                      {/* <button
                      className="w-2 text-2xl"
                      onClick={openLifestyleModel}
                    >
                      <FaEdit />
                    </button> */}
                      {/* <LifestyleModel
                      isVisible={lifestyleModelOpen}
                      onClose={closeLifestyleModel}
                    />

                    <div>
                      <Switch defaultChecked />
                    </div> */}
                    </div>
                  </div>

                  <div className="mt-2.5 flex flex-wrap py-6 items-center gap-2.5 self-start text-base font-medium  leading-4 text-slate-900">
                    <div className={`self-stretch text-xl font-bold leading-10 ${isExclusive ? 'text-[#60457E]' : 'text-[#007EAF]'} lg:text-3xl`}>
                      {`${capitalize(myDetails?.basic_and_lifestyle?.firstName)} ${capitalize(myDetails?.basic_and_lifestyle?.lastName)}`}
                    </div>
                    <div className="my-auto justify-center self-stretch whitespace-nowrap rounded-[100px] bg-orange-100 px-3 py-1.5 text-center capitalize tracking-normal">
                      {myDetails?.basic_and_lifestyle?.gender}
                    </div>
                    <div className="my-auto justify-center self-stretch whitespace-nowrap rounded-[100px] bg-orange-100 px-3 py-1.5 text-center capitalize tracking-normal">
                      {myDetails?.basic_and_lifestyle?.age}
                    </div>
                    {/* <div 
                    onClick={() => setIsConnectionsModalVisible(true)}
                    className="flex items-center gap-1 my-auto justify-center self-stretch cursor-pointer whitespace-nowrap rounded-[100px] bg-blue-100 px-3 py-1.5 text-center capitalize tracking-normal hover:bg-blue-200 transition-colors"
                  >
                    <RiUserSharedLine className="text-blue-600" />
                    <span className="text-blue-600 font-bold">Connections: {connectionsCount}</span>
                  </div>
                  <div 
                    onClick={() => setIsSentRequestsModalVisible(true)}
                    className="flex items-center gap-1 my-auto justify-center self-stretch cursor-pointer whitespace-nowrap rounded-[100px] bg-purple-100 px-3 py-1.5 text-center capitalize tracking-normal hover:bg-purple-200 transition-colors"
                  >
                    <RiUserSharedLine className="text-purple-600 font-bold" />
                    <span className="text-purple-600 font-bold">Sent Requests: {sentRequestsCount}</span>
                  </div> */}
                  </div>
                  <div className="mt-6 flex flex-col rounded-xl bg-cyan-600 bg-opacity-20 px-6 py-3 max-md:max-w-full max-md:px-5">
                    <div className="text-base font-bold leading-6 tracking-wide text-gray-900 text-opacity-90 max-md:max-w-full">
                      About{" "}
                      {myDetails?.basic_and_lifestyle?.firstName +
                        " " +
                        myDetails?.basic_and_lifestyle?.lastName}
                    </div>
                    <div className="mt-4 text-sm leading-7 tracking-wide text-slate-600 max-md:max-w-full md:text-lg">
                      {myDetails?.basic_and_lifestyle?.about}
                    </div>
                  </div>
                  <div className="mt-4 flex flex-col px-2 max-md:max-w-full max-md:px-5 gap-3">
                    <div className="flex justify-between gap-0 max-md:flex-wrap">
                      <div className="flex-1 text-lg leading-8 tracking-wide text-gray-900 text-opacity-90 max-md:max-w-full">
                        Religion
                      </div>
                      <div className="justify-center self-start whitespace-nowrap rounded-[100px] bg-blue-50 px-3 py-1.5 text-center text-base font-medium capitalize leading-4 tracking-normal text-blue-600">
                        {myDetails?.basic_and_lifestyle?.religion}
                      </div>
                    </div>

                    <div className="mt-2 flex justify-between gap-0 max-md:flex-wrap">
                      <div className="flex-1 text-lg leading-8 tracking-wide text-gray-900 text-opacity-90 max-md:max-w-full">
                        Marital status
                      </div>
                      <div className="justify-center self-start rounded-[100px] bg-orange-100 px-3 py-1.5 text-center text-base font-medium capitalize leading-4 tracking-normal text-slate-900">
                        {myDetails?.basic_and_lifestyle?.maritalStatus}
                      </div>
                    </div>

                    <div className="mt-2 flex justify-between gap-0 max-md:flex-wrap">
                      <div className="flex-1 text-lg leading-8 tracking-wide text-gray-900 text-opacity-90 max-md:max-w-full">
                        Posted by{" "}
                      </div>
                      <div className="justify-center self-start rounded-[100px] bg-purple-100 px-3 py-1.5 text-center text-base font-medium capitalize leading-4 tracking-normal text-violet-600">
                        {myDetails?.basic_and_lifestyle?.postedBy}
                      </div>
                    </div>
                    <div className="mt-2 flex justify-between gap-0 max-md:flex-wrap">
                      <div className="flex-1 text-lg leading-8 tracking-wide text-slate-900 text-opacity-90 max-md:max-w-full">
                        Phone {" "}
                      </div>
                      <div className="justify-center self-start rounded-[100px] bg-blue-100 px-3 py-1.5 text-center text-base font-medium capitalize leading-4 tracking-normal text-violet-600">
                        <ContactNumberView userId={user?.userId} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-[28rem] xl:w-[30%]  w-auto rounded-lg bg-[#FEE7BD]  md:p-5 md:h-[26rem]">
                  <h2 className="font-[Proxima-Nova-Semibold] text-xl md:text-2xl text-center mt-2 md:text-start">Complete your profile</h2>
                  <div className="flex flex-col items-center justify-center p-5">
                    <Gauge
                      width={230}
                      height={150}
                      value={Percentage}
                      startAngle={-90}
                      endAngle={90}
                      text={({ valueMax }) =>
                        `Completed ${(Math.round((Percentage / valueMax) * 100)).toFixed(0)}%`
                      }
                      sx={(theme) => ({
                        [`& .${gaugeClasses.valueText}`]: {
                          fontSize: 20,
                          fontWeight: 'bold',
                        },
                        [`& .${gaugeClasses.valueArc}`]: {
                          fill: `${isExclusive ? '#60457E' : '#007EAF'}`,
                        },
                        [`& .${gaugeClasses.referenceArc}`]: {
                          fill: theme.palette.text.disabled,
                        },
                      })}



                    />
                  </div>

                  <p className="text-lg font-[Proxima-Nova-Regular] text-center">
                    Complete at least 50% of your profile to unlock messaging. Our
                    tip: Answer more profile questions.
                  </p>
                  {/* <div className="mt-2 text-center text-lg text-[#007EAF] underline">
                  <Link to={"/questions"}> Click to complete profile</Link>
                </div> */}
                </div>
              </div>
            </div>

            {/* Family details */}

            <div className="w-75% mb-4  xl:mb-0 flex flex-col rounded-xl bg-white md:w-auto h-[17rem]">
              {/* <div className="flex flex-col pb-6 bg-white rounded-xl shadow-sm max-md:max-w-full"> */}
              <div
                className={`w-full justify-center border-b border-solid border-zinc-300 px-6 py-4 text-lg leading-6 tracking-wide ${isExclusive ? 'text-[#60457E]' : 'text-[#007EAF]'} max-md:max-w-full max-md:px-5 md:text-xl`}
                style={{ fontFamily: "Proxima-Nova-Bold, sans-serif" }}
              >
                <div className="flex items-center justify-between">
                  Family details
                  <div className="flex gap-4">
                    <button className="w-2 text-2xl" onClick={openFamilyModel}>
                      <FaEdit />
                    </button>
                    <FamilyModel
                      isVisible={familyModelOpen}
                      onClose={closeFamilyModel}
                    />

                    <div>

                      <Switch checked={isFamilyDetails} onChange={ToggleFamilyDetails} disabled={isToggleLoading} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-6  mt-6 flex flex-col px-6 max-md:max-w-full max-md:px-5  md:mb-0">
                <div className="flex  justify-between gap-0 max-md:flex-wrap">
                  <div className="text-md flex-1 font-normal leading-8 tracking-wide text-slate-600 md:text-xl">
                    Father occupation
                  </div>
                  <div className="justify-center self-start whitespace-nowrap rounded-[100px] bg-blue-50 px-3 py-1.5 text-center text-base font-medium capitalize leading-4 tracking-normal text-blue-600">
                    {myDetails?.family_details?.fatherOccupation}
                  </div>
                </div>
                <div className="mt-4 flex justify-between gap-0 max-md:flex-wrap">
                  <div className="text-md flex-1 font-normal leading-8 tracking-wide text-slate-600 md:text-xl">
                    Mother occupation
                  </div>
                  <div className="justify-center self-start rounded-[100px] bg-neutral-100 px-3 py-1.5 text-center text-base font-medium capitalize leading-4 tracking-normal text-slate-900">
                    {myDetails?.family_details?.motherOccupation}
                  </div>
                </div>
                <div className="mt-4 flex justify-between gap-0 max-md:flex-wrap">
                  <div className="text-md flex-1 font-normal leading-8 tracking-wide text-slate-600 md:text-xl">
                    Number of siblings
                  </div>
                  <div className="justify-center self-start rounded-[100px] bg-orange-100 px-3 py-1.5 text-center text-base font-medium capitalize leading-4 tracking-normal text-slate-900">
                    {myDetails?.family_details?.numberOfSiblings}
                  </div>
                </div>
                <div className="mt-4 flex justify-between gap-4 max-md:max-w-full max-md:flex-wrap">
                  <div className="text-md font-normal leading-8 tracking-wide text-slate-600 md:text-xl">
                    Living with family
                  </div>
                  <div className="justify-center self-start rounded-[100px] bg-purple-100 px-3 py-1.5 text-center text-base font-medium capitalize leading-4 tracking-normal text-violet-600">
                    {myDetails?.family_details?.livingWithFamily}
                  </div>
                </div>
                {/* </div> */}
              </div>
            </div>
            {/* Personal Background */}

            <div className="row-span-3 lg:row-span-3 mb-4  xl:mb-0 rounded-xl bg-white ">
              <div className="flex flex-col rounded-xl bg-white pb-6 shadow-sm">
                <div
                  className={`justify-center border-b border-solid border-zinc-300 px-6 py-4 text-lg leading-6 tracking-wide ${isExclusive ? 'text-[#60457E]' : 'text-[#007EAF]'} max-md:px-5 md:text-xl`}
                  style={{ fontFamily: "Proxima-Nova-Bold, sans-serif" }}
                >
                  <div className="flex items-center justify-between">
                    Personal Background
                    <div className="flex gap-4">
                      <button
                        className="w-2 text-2xl"
                        onClick={openPersonalBagroundModal}
                      >
                        <FaEdit />
                      </button>
                      <PersonalBagroundModal
                        isVisible={personalBagroundModalOpen}
                        onClose={closePersonalBagroundModal}
                      />
                      <div>
                        <Switch checked={isPersonalDetails} onChange={TogglePersonalDetails} disabled={isToggleLoading} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex flex-col px-6 max-md:px-5 xl:gap-3 ">
                  <div className="flex items-center gap-1 whitespace-nowrap">
                    <div className={`text-xl leading-8 ${isExclusive ? 'text-[#60457E]' : 'text-[#007EAF]'} md:text-3xl`}>
                      <CiMap />
                    </div>
                    <div className="text-lg leading-8 text-slate-600 md:text-xl">
                      Height
                    </div>
                  </div>
                  <div className={`text-md ml-8 mt-2 justify-center self-start rounded-[100px] bg-blue-50 px-3 py-1.5 text-center font-medium capitalize leading-7 ${isExclusive ? 'text-[#60457E]' : 'text-[#007EAF]'} max-md:ml-2.5 md:text-md`}>
                    {myDetails?.personal_background?.height}
                  </div>
                  <div className="mt-6 flex items-center gap-1 whitespace-nowrap">
                    <div className={`text-xl leading-8 ${isExclusive ? 'text-[#60457E]' : 'text-[#007EAF]'} md:text-3xl`}>
                      <CiMap />
                    </div>
                    <div className="text-lg leading-8 tracking-wide text-slate-600 md:text-xl">
                      Weight
                    </div>
                  </div>
                  <div className={`text-md ml-8 mt-2 justify-center self-start rounded-[100px] bg-blue-50 px-3 py-1.5 text-center font-medium capitalize leading-7 ${isExclusive ? 'text-[#60457E]' : 'text-[#007EAF]'} max-md:ml-2.5 md:text-md`}>
                    {myDetails?.personal_background?.weight}
                  </div>
                  <div className="mt-6 flex items-center gap-1">
                    <div className={`text-xl leading-8 ${isExclusive ? 'text-[#60457E]' : 'text-[#007EAF]'} md:text-3xl`}>
                      <CiMap />
                    </div>
                    <div className="text-lg leading-8 tracking-wide text-slate-600 md:text-xl">
                      Body Type
                    </div>
                  </div>
                  <div className={`text-md ml-8 mt-2 flex justify-center gap-1.5 self-start rounded-[100px] border border-solid border-gray-200 bg-blue-50 bg-opacity-50 px-5 py-2 font-medium capitalize leading-7 ${isExclusive ? 'text-[#60457E]' : 'text-[#007EAF]'} max-md:ml-2.5 md:py-4 md:text-md`}>
                    {myDetails?.personal_background?.bodyType}
                  </div>
                  <div className="mt-6 flex items-center gap-1 whitespace-nowrap text-xl leading-8 tracking-wide text-slate-600">
                    <div className={`text-xl leading-8 ${isExclusive ? 'text-[#60457E]' : 'text-[#007EAF]'} md:text-3xl`}>
                      <IoLanguage />
                    </div>

                    <div className="text-lg leading-8 text-slate-600 md:text-xl">
                      Language
                    </div>
                  </div>
                  <div className="text-md ml-8 mt-2 justify-center self-start rounded-[100px] bg-pink-50 px-3 py-1.5 text-center font-medium capitalize leading-7 text-pink-400 max-md:ml-2.5 md:text-md">
                    {myDetails?.personal_background?.language}
                  </div>
                  <div className="mt-6 flex items-center gap-1 text-xl leading-8 tracking-wide text-slate-600">
                    <div className={`text-xl leading-8 ${isExclusive ? 'text-[#60457E]' : 'text-[#007EAF]'} md:text-3xl`}>
                      {" "}
                      <FaSmoking />
                    </div>

                    <div className="text-lg leading-8 text-slate-600 md:text-xl">
                      Smoking habbits
                    </div>
                  </div>
                  <div className="text-md ml-9 mt-2 justify-center self-start rounded-[100px] bg-green-100 px-3 py-1.5 text-center font-medium capitalize leading-7 text-green-700 max-md:ml-2.5 md:text-md">
                    {myDetails?.personal_background?.smokingHabbit}
                  </div>
                  <div className="mt-6 flex items-center gap-1 text-xl leading-8 tracking-wide text-slate-600">
                    <div className={`text-xl leading-8 ${isExclusive ? 'text-[#60457E]' : 'text-[#007EAF]'} md:text-3xl`}>
                      {" "}
                      <FaWineGlassAlt />{" "}
                    </div>

                    <div className="text-lg leading-8 text-slate-600 md:text-xl">
                      {" "}
                      Drinking habbit
                    </div>
                  </div>
                  <div className="text-md ml-7 mt-2 justify-center self-start rounded-[100px] bg-gray-200 px-3 py-1.5 text-center font-medium capitalize leading-7 text-slate-900 max-md:ml-2.5 md:text-md">
                    {myDetails?.personal_background?.drinkingHabbit}
                  </div>
                  <div className="mt-6 flex items-center gap-1 whitespace-nowrap">
                    <div className={`text-xl leading-8 ${isExclusive ? 'text-[#60457E]' : 'text-[#007EAF]'} md:text-3xl`}>
                      <CiMap />
                    </div>
                    <div className="text-lg leading-8 tracking-wide text-slate-600 md:text-xl">
                      Diet
                    </div>
                  </div>
                  <div className="text-md ml-8 mt-2 justify-center self-start whitespace-nowrap rounded-[100px] bg-neutral-100 px-3 py-1.5 text-center font-medium capitalize leading-7 text-slate-900 max-md:ml-2.5 md:text-md">
                    {myDetails?.personal_background?.diet}
                  </div>
                  <div className="mt-6 flex items-center gap-2 whitespace-nowrap">
                    <div className={`text-xl leading-8 ${isExclusive ? 'text-[#60457E]' : 'text-[#007EAF]'} md:text-3xl`}>
                      <CiMap />
                    </div>
                    <div className="text-lg leading-8 tracking-wide text-slate-600 md:text-xl">
                      Complexion
                    </div>
                  </div>
                  <div className="text-md ml-8 mt-2 justify-center self-start rounded-[100px] bg-neutral-100 px-3 py-1.5 text-center font-medium capitalize leading-7 text-slate-900 max-md:ml-2.5 md:text-md">
                    {myDetails?.personal_background?.complexion}
                  </div>
                </div>
              </div>
            </div>
            {/* Religious Background */}

            <div className="h-[31rem] md:h-[28rem] mb-4 xl:mb-0 rounded-xl bg-white">
              <div className="flex h-[28rem] flex-col rounded-xl bg-white pb-6 shadow-sm max-md:max-w-full">
                <div
                  className={`justify-center border-b border-solid border-zinc-300 px-6 py-4 text-lg leading-6 tracking-wide ${isExclusive ? 'text-[#60457E]' : 'text-[#007EAF]'} max-md:max-w-full max-md:px-5 md:text-xl`}
                  style={{ fontFamily: "Proxima-Nova-Bold, sans-serif" }}
                >
                  <div className="flex items-center justify-between">
                    Religious Background
                    <div className="flex gap-4">
                      <button
                        className="w-2 text-2xl"
                        onClick={openReligiousModel}
                      >
                        <FaEdit />
                      </button>
                      <ReligiouModel
                        isVisible={religiousModelOpen}
                        onClose={closeReligiousModel}
                      />

                      <div>
                        <Switch checked={isReligiousDetails} onChange={ToggleReligiousDetails} disabled={isToggleLoading} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex flex-col px-6 max-md:max-w-full max-md:px-5">
                  <div className="flex justify-between gap-0 max-md:flex-wrap">
                    <div className="text-md flex-1 font-normal leading-8 tracking-wide text-slate-600 md:text-xl">
                      Religion
                    </div>
                    <div className="justify-center self-start whitespace-nowrap rounded-[100px] bg-blue-50 px-3 py-1.5 text-center text-base font-medium capitalize leading-4 tracking-normal text-blue-600">
                      {myDetails?.religious_background?.religion}
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between gap-0 max-md:flex-wrap">
                    <div className="text-md flex-1 font-normal leading-8 tracking-wide text-slate-600 md:text-xl">
                      Sub community
                    </div>
                    <div className="justify-center self-start rounded-[100px] bg-orange-100 px-3 py-1.5 text-center text-base font-medium capitalize leading-4 tracking-normal text-slate-900">
                      {myDetails?.religious_background?.subCommunity}
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between gap-0 font-normal max-md:flex-wrap">
                    <div className="text-md flex-1 leading-8 tracking-wide text-slate-600 md:text-xl">
                      Community
                    </div>
                    <div className="justify-center self-start rounded-[100px] bg-purple-100 px-3 py-1.5 text-center text-base font-medium capitalize leading-4 tracking-normal text-violet-600">
                      {myDetails?.religious_background?.community}
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between gap-0 font-normal max-md:flex-wrap">
                    <div className="text-sm font-normal leading-8 tracking-wide text-slate-600 md:text-xl">
                      Gothra/Gothram
                    </div>
                    <div className="justify-center self-start rounded-[100px] bg-pink-50 px-3 py-1.5 text-center text-base font-medium capitalize leading-4 tracking-normal text-pink-400 ">
                      {myDetails?.religious_background?.gotra}
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between gap-4 max-md:max-w-full max-md:flex-wrap">
                    <div className="text-md font-normal leading-8 tracking-wide text-slate-600 md:text-xl">
                      Time of Birth
                    </div>
                    <div className="justify-center self-start rounded-[100px] bg-pink-50 px-3 py-1.5 text-center text-base font-medium capitalize leading-4 tracking-normal text-pink-400">
                      {myDetails?.religious_background?.timeOfBirth}
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between gap-4 max-md:max-w-full max-md:flex-wrap">
                    <div className="text-md font-normal leading-8 tracking-wide text-slate-600 md:text-xl">
                      Date of Birth
                    </div>
                    <div className="justify-center self-start rounded-[100px] bg-pink-50 px-3 py-1.5 text-center text-base font-medium capitalize leading-4 tracking-normal text-pink-400">
                      {myDetails?.religious_background?.dateOfBirth}
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between gap-4 max-md:max-w-full max-md:flex-wrap">
                    <div className="text-md font-normal leading-8 tracking-wide text-slate-600 md:text-xl">
                      Place of Birth
                    </div>
                    <div className="justify-center self-start rounded-[100px] bg-pink-50 px-3 py-1.5 text-center text-base font-medium capitalize leading-4 tracking-normal text-pink-400">
                      {myDetails?.religious_background?.placeOfBirth}
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between gap-4 max-md:max-w-full max-md:flex-wrap mb-4">
                    <div className="text-md font-normal leading-8 tracking-wide text-slate-600 md:text-xl">
                      Mother Tongue
                    </div>
                    <div className="justify-center self-start whitespace-nowrap rounded-[100px] bg-green-100 px-3 py-1.5 text-center text-base font-medium capitalize leading-4 tracking-normal text-green-700">
                      {myDetails?.religious_background?.motherTongue}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Location Background */}

            <div className="h-auto py-4  rounded-xl mb-4 xl:mb-0 bg-white">
              <div
                className={`justify-center border-b border-solid border-zinc-300 px-6 py-4 text-lg leading-6 tracking-wide ${isExclusive ? 'text-[#60457E]' : 'text-[#007EAF]'} max-md:max-w-full max-md:px-5 md:text-xl`}
                style={{ fontFamily: "Proxima-Nova-Bold, sans-serif" }}
              >
                <div className="flex items-center justify-between">
                  Location
                  <div className="flex gap-4">
                    <button
                      className="w-2 text-2xl"
                      onClick={openLocationBackgroundModal}
                    >
                      <FaEdit />
                    </button>
                    <LocationBackgroundModal
                      isVisible={locationBackgroundModalOpen}
                      onClose={closeLocationBackgroundModal}
                    />
                    <div>
                      <Switch checked={isLocationBackground} onChange={ToggleLocationBackground} disabled={isToggleLoading} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex flex-col px-6 max-md:max-w-full max-md:px-5">

                <div className="flex justify-between gap-0 max-md:flex-wrap">
                  <div className="text-md flex-1 font-normal leading-8 tracking-wide text-slate-600 md:text-xl">
                    Country
                  </div>
                  <div className="justify-center self-start whitespace-nowrap rounded-[100px] bg-blue-50 px-3 py-1.5 text-center text-base font-medium capitalize leading-4 tracking-normal text-blue-600">
                    {myDetails?.location_background?.country}
                  </div>
                </div>

                <div className="mt-4 mb-4 flex justify-between gap-0 max-md:flex-wrap">
                  <div className="text-md flex-1 font-normal leading-8 tracking-wide text-slate-600 md:text-xl">
                    State
                  </div>
                  <div className="justify-center self-start rounded-[100px] bg-purple-100 px-3 py-1.5 text-center text-base font-medium capitalize leading-4 tracking-normal text-violet-600">
                    {myDetails?.location_background?.state ||
                      "Not Specified"}
                  </div>
                </div>


                <div className="flex justify-between gap-0 max-md:flex-wrap">
                  <div className="text-md flex-1 font-normal leading-8 tracking-wide text-slate-600 md:text-xl">
                    Current location
                  </div>
                  <div className="justify-center self-start whitespace-nowrap rounded-[100px] bg-blue-50 px-3 py-1.5 text-center text-base font-medium capitalize leading-4 tracking-normal text-blue-600">
                    {myDetails?.location_background?.currentLocation}
                  </div>

                </div>
                <div className="mt-4 flex justify-between gap-0 max-md:flex-wrap">
                  <div className="text-md flex-1 font-normal leading-8 tracking-wide text-slate-600 md:text-xl">
                    City of residence
                  </div>
                  <div className="justify-center self-start rounded-[100px] bg-purple-100 px-3 py-1.5 text-center text-base font-medium capitalize leading-4 tracking-normal text-violet-600">
                    {myDetails?.location_background?.cityOfResidence ||
                      "Not Specified"}
                  </div>
                </div>
                <div className="mt-4 flex justify-between gap-0 max-md:flex-wrap">
                  <div className="text-md flex-1 font-normal leading-8 tracking-wide text-slate-600 md:text-xl">
                    Nationality
                  </div>
                  <div className="justify-center self-start rounded-[100px] bg-orange-100 px-3 py-1.5 text-center text-base font-medium capitalize leading-4 tracking-normal text-slate-900">
                    {myDetails?.location_background?.nationality}
                  </div>
                </div>
                <div className="mt-4 flex justify-between gap-4 max-md:max-w-full max-md:flex-wrap">
                  <div className="text-md font-normal leading-8 tracking-wide text-slate-600 md:text-xl">
                    Citizenship
                  </div>
                  <div className="justify-center self-start rounded-[100px] bg-pink-50 px-3 py-1.5 text-center text-base font-medium capitalize leading-4 tracking-normal text-pink-400">
                    {myDetails?.location_background?.citizenShip}
                  </div>
                </div>
                <div className="mt-4 flex justify-between gap-4 max-md:max-w-full max-md:flex-wrap">
                  <div className="text-md font-normal leading-8 tracking-wide text-slate-600 md:text-xl">
                    Residency visa status
                  </div>
                  <div className="justify-center self-start whitespace-nowrap rounded-[100px] bg-green-100 px-3 py-1.5 text-center text-base font-medium capitalize leading-4 tracking-normal text-green-700">
                    {myDetails?.location_background?.residencyVisaStatus}
                  </div>
                </div>
              </div>
            </div>

            {/* Interest and hobbies */}
            <div className="h-auto py-4 rounded-xl">
              <div className=" flex max-w-[499px] flex-col pb-9 leading-8 text-slate-900">
                <div className={`flex items-center justify-between text-lg font-semibold leading-[110%] ${isExclusive ? 'text-[#60457E]' : 'text-[#007EAF]'} md:text-xl`}>
                  Interest and hobbies
                  {/* <div className="flex gap-4 ${isExclusive? 'text-[#60457E]': 'text-[#007EAF]'}">
                  <button
                    className="w-2 text-2xl"
                    onClick={openInterestHobbiesModal}
                  >
                    <FaEdit />
                  </button>
                  <InterestHobbiesModal
                    isVisible={interestHobbiesModalOpen}
                    onClose={closeInterestHobbiesModal}
                  />
                  <div>
                    <Switch defaultChecked />
                  </div>
                </div> */}
                </div>

                <div className="mt-4 flex  gap-2.5 whitespace-nowrap  capitalize tracking-wide max-md:pr-5 flex-wrap">
                  {myDetails?.interest_and_hobbies?.map(
                    (interest: string) => (
                      <div
                        key={interest}
                        className="justify-center rounded-[100px] bg-gray-200 px-3 py-1.5"
                      >
                        {interest}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* education and finacial */}
            <div className="h-auto  rounded-xl bg-white">
              <div className="flex flex-col rounded-xl border border-solid border-gray-200 bg-white pb-6 shadow-sm">
                <div
                  className={`justify-center border-b border-solid border-zinc-300 px-6 py-4 text-lg leading-6 tracking-wide ${isExclusive ? 'text-[#60457E]' : 'text-[#007EAF]'} max-md:px-5 md:text-xl`}
                  style={{ fontFamily: "Proxima-Nova-Bold, sans-serif" }}
                >
                  <div className="flex items-center justify-between">
                    Education and financial
                    <div className="flex gap-4">
                      <button
                        className="w-2 text-2xl"
                        onClick={openEducationFinancialModal}
                      >
                        <FaEdit />
                      </button>
                      <EducationFinancialModal
                        isVisible={educationFinancialModalOpen}
                        onClose={closeEducationFinancialModal}
                      />

                      <div>
                        <Switch checked={isEducationFinancial} onChange={ToggleEducationFinancial} disabled={isToggleLoading} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex flex-col px-6 max-md:px-5">
                  <div className="flex justify-between gap-2 whitespace-nowrap pr-8 max-md:pr-5">
                    <div className="text-md flex items-center justify-between gap-2 self-start leading-8 tracking-wide text-slate-600 md:text-xl">
                      <span className={`${isExclusive ? 'text-[#60457E]' : 'text-[#007EAF]'}`}>
                        <FaUserGraduate />
                      </span>
                      <div>Qualification</div>
                    </div>
                    <div className="justify-center rounded-[100px] bg-orange-100 px-3 py-1.5 text-center text-[12px] font-medium capitalize leading-7 text-slate-900 md:text-md">
                      {myDetails?.education_and_financial?.qualification}
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between gap-2 whitespace-nowrap pr-8 max-md:pr-5">
                    <div className="text-md flex items-center justify-between gap-2 self-start leading-8 tracking-wide text-slate-600 md:text-xl">
                      <span className={`${isExclusive ? 'text-[#60457E]' : 'text-[#007EAF]'}`}>
                        <FaUserGraduate />
                      </span>
                      <div>Occupation</div>
                    </div>
                    <div className="justify-center rounded-[100px] bg-orange-100 px-3 py-1.5 text-center text-[12px] font-medium capitalize leading-7 text-slate-900 md:text-md">
                      {myDetails?.education_and_financial?.occupation}
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between gap-2 whitespace-nowrap pr-8 max-md:pr-5">
                    <div className="text-md flex items-center justify-between gap-2 self-start leading-8 tracking-wide text-slate-600 md:text-xl">
                      <span className={`${isExclusive ? 'text-[#60457E]' : 'text-[#007EAF]'}`}>
                        <FaUserGraduate />
                      </span>
                      <div>Working Status</div>
                    </div>
                    <div className="justify-center rounded-[100px] bg-orange-100 px-3 py-1.5 text-center text-[12px] font-medium capitalize leading-7 text-slate-900 md:text-md">
                      {myDetails?.education_and_financial?.workingStatus}
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between gap-2 pr-8 max-md:pr-5">
                    <div className="text-md flex items-center justify-around gap-2 self-start whitespace-nowrap leading-8 tracking-wide text-slate-600 md:text-xl">
                      <span className={`${isExclusive ? 'text-[#60457E]' : 'text-[#007EAF]'}`}>
                        <FaUserGraduate />
                      </span>
                      <div>Income</div>
                    </div>
                    <div className="justify-center rounded-[100px] bg-orange-100 px-3 py-1.5 text-center text-[12px] font-medium capitalize leading-7 text-slate-900 md:text-md">

                      <span className="">
                        {myDetails?.education_and_financial?.income}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Partner Preference */}
            <div className="h-auto rounded-xl bg-white mb-10 overflow-hidden">
              <div className="flex flex-col rounded-xl border border-solid border-gray-200 bg-white pb-6 shadow-sm">
                <div
                  className={`justify-center border-b border-solid border-zinc-300 px-6 py-4 text-lg leading-6 tracking-wide ${isExclusive ? 'text-[#60457E]' : 'text-[#007EAF]'} max-md:px-5 md:text-xl`}
                  style={{ fontFamily: "Proxima-Nova-Bold, sans-serif" }}
                >
                  <div className="flex items-center justify-between">
                    Partner Preference
                    <div className="flex gap-4">
                      <button
                        className="w-2 text-2xl"
                        onClick={openPartnerPreferenceModal}
                      >
                        <FaEdit />
                      </button>
                      <PartnerPreferenceModal
                        isVisible={partnerPreferenceModalOpen}
                        onClose={closePartnerPreferenceModal}
                        initialValues={preferencesData?.preferences}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-6 px-6 max-md:px-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6">
                    {/* Row 1 */}
                    <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                      <span className="text-slate-600 font-medium">Looking For</span>
                      <span className="text-gray-900 font-semibold">{preferencesData?.preferences?.lookingFor || "Not Specified"}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                      <span className="text-slate-600 font-medium">Age Range</span>
                      <span className="text-gray-900 font-semibold">{preferencesData?.preferences?.lookingPartnerAge ? `${preferencesData?.preferences?.lookingPartnerAge} Years` : "Not Specified"}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                      <span className="text-slate-600 font-medium">Wedding Goals</span>
                      <span className="text-gray-900 font-semibold text-right">{preferencesData?.preferences?.weddingGoals || "Not Specified"}</span>
                    </div>

                    {/* Row 2 */}
                    <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                      <span className="text-slate-600 font-medium">My Gender</span>
                      <span className="text-gray-900 font-semibold">{preferencesData?.preferences?.gender || "Not Specified"}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                      <span className="text-slate-600 font-medium">My Age</span>
                      <span className="text-gray-900 font-semibold">{preferencesData?.preferences?.age ? `${preferencesData?.preferences?.age} Years` : "Not Specified"}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                      <span className="text-slate-600 font-medium">Living in Australia?</span>
                      <span className="text-gray-900 font-semibold">{preferencesData?.preferences?.livingInAustralia || "Not Specified"}</span>
                    </div>

                    {/* Row 3 */}
                    <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                      <span className="text-slate-600 font-medium">Horoscope Match</span>
                      <span className="text-gray-900 font-semibold">{preferencesData?.preferences?.horoscopeMatch || "Not Specified"}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                      <span className="text-slate-600 font-medium">Caste/Religion Matter?</span>
                      <span className="text-gray-900 font-semibold">{preferencesData?.preferences?.castReligionMatterOrNot || "Not Specified"}</span>
                    </div>
                  </div>

                  {/* Interests & Hobbies section */}
                  <div className="mt-8 border-t pt-6">
                    <h4 className="text-slate-600 font-medium mb-4">Interests & Hobbies</h4>
                    <div className="flex flex-wrap gap-2">
                      {preferencesData?.preferences?.interest_and_hobbies?.length > 0 ? (
                        preferencesData.preferences.interest_and_hobbies.map((hobby: string) => (
                          <span key={hobby} className="bg-cyan-50 text-cyan-700 px-3 py-1 rounded-full text-sm font-medium border border-cyan-100">
                            {hobby}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-400 italic">None specified</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <MyConnectionsModal isVisible={isConnectionsModalVisible} onClose={() => setIsConnectionsModalVisible(false)} />
      <SentRequestsModal isVisible={isSentRequestsModalVisible} onClose={() => setIsSentRequestsModalVisible(false)} />
    </div>
  );
};

export default MyDetails;
