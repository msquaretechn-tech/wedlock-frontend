import { useState, useEffect } from "react";
import ProfileCard from "../../components/user-dashboard/ProfileCard";
import SkeletonCard from "../../components/SkeletonCard/SkeletonCard";
import { useGetMyConnectionsQuery, useGetSentConnectionRequestsQuery } from "../../Redux/Api/connection.api";
import { useGetMyProfileViewsQuery } from "../../Redux/Api/profileView.api";
import { useToggleFavMutation, useGetFavQuery } from "../../Redux/Api/fav.api";
import { useUserByidMutation } from "../../Redux/Api/profile.api";
import { toast } from "sonner";

// Define the structure of the connection item
interface ConnectionItemProps {
  userId: string;
  isFavourite: (userId: string) => boolean;
  handleToggleFav: (userId: string) => void;
}

const ConnectionCard = ({ userId, isFavourite, handleToggleFav }: ConnectionItemProps) => {
  const [profileData, setProfileData] = useState<any>(null);
  const [fetchProfile, { isLoading, isError }] = useUserByidMutation();

  useEffect(() => {
    const getProfileDetails = async () => {
      try {
        const response = await fetchProfile(userId).unwrap();
        if (response.success && response.data?.[0]) {
          setProfileData(response.data[0]);
        }
      } catch (error) {
        console.error(`Failed to fetch profile for ${userId}:`, error);
      }
    };

    getProfileDetails();
  }, [userId, fetchProfile]);

  if (isLoading || !profileData) return <SkeletonCard />;
  if (isError) return null; // Silent skip for failed profiles

  const mapToProfile = (data: any) => {
    const firstName = data.basic_and_lifestyle?.firstName || "Unknown";
    const lastName = data.basic_and_lifestyle?.lastName || "";
    
    return {
      id: data._id || data.id,
      userId: data.userId || data._id,
      profileImages: data.profileImage || [],
      userType: data.userType || "Standard",
      gender: data.basic_and_lifestyle?.gender || "N/A",
      age: data.basic_and_lifestyle?.age || "N/A",
      match_percentage: data.match_percentage || "0",
      displayName: `${firstName} ${lastName}`.trim(),
      firstName: firstName,
      occupation: data.personal_background?.occupation || data.occupation || "Not specified",
      religion: data.religious_background?.religion || data.basic_and_lifestyle?.religion || "Not specified",
      verified: data.verified || false,
      country: data.location_details?.country || "N/A",
      state: data.location_details?.state || "N/A",
      maritalStatus: data.basic_and_lifestyle?.maritalStatus || "N/A",
    };
  };

  const profile = mapToProfile(profileData);

  return (
    <ProfileCard
      key={profile.id}
      profiles={[profile]}
      isFavourite={isFavourite(profile.userId)}
      handleFavouriteToggle={handleToggleFav}
    />
  );
};

const Connections = () => {
  const [activeTab, setActiveTab] = useState<"connections" | "sent" | "viewed">("connections");

  const { data: connectionsData, isLoading: connectionsLoading } = useGetMyConnectionsQuery(undefined);
  const { data: sentRequestsData, isLoading: sentLoading } = useGetSentConnectionRequestsQuery(undefined);
  const { data: viewedData, isLoading: viewedLoading } = useGetMyProfileViewsQuery(undefined);
  const { data: favData, refetch: refetchFav } = useGetFavQuery({});
  const [toggleFav] = useToggleFavMutation();

  const isLoading = 
    activeTab === "connections" ? connectionsLoading : 
    activeTab === "sent" ? sentLoading : viewedLoading;

  const getRawData = () => {
    switch (activeTab) {
      case "connections": return connectionsData?.data;
      case "sent": return sentRequestsData?.data;
      case "viewed": return viewedData?.data;
      default: return [];
    }
  };

  const items = getRawData() || [];

  const handleToggleFav = async (userId: string) => {
    try {
      const response = await toggleFav(userId).unwrap();
      toast.success(response.message);
      refetchFav();
    } catch (error) {
      toast.error("Failed to update favorites");
    }
  };

  const isFavourite = (userId: string) => {
    return favData?.data?.some((fav: any) => fav.userId === userId);
  };

  return (
    <div className="p-4 md:p-10">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-[#061C3D]">Connections & Activities</h1>
          <p className="text-[#475467] mt-2">Manage your connections, sent requests, and profile views</p>
        </div>
        
        <div className="flex bg-gray-100 p-1 rounded-xl w-full md:w-auto overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab("connections")}
            className={`whitespace-nowrap px-6 py-2.5 rounded-lg font-semibold transition-all ${
              activeTab === "connections"
                ? "bg-white text-[#007EAF] shadow-sm"
                : "text-[#475467] hover:text-[#061C3D]"
            }`}
          >
            Connections ({connectionsData?.data?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab("sent")}
            className={`whitespace-nowrap px-6 py-2.5 rounded-lg font-semibold transition-all ${
              activeTab === "sent"
                ? "bg-white text-[#007EAF] shadow-sm"
                : "text-[#475467] hover:text-[#061C3D]"
            }`}
          >
            Sent Requests ({sentRequestsData?.data?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab("viewed")}
            className={`whitespace-nowrap px-6 py-2.5 rounded-lg font-semibold transition-all ${
              activeTab === "viewed"
                ? "bg-white text-[#007EAF] shadow-sm"
                : "text-[#475467] hover:text-[#061C3D]"
            }`}
          >
            Who Viewed Me ({viewedData?.data?.length || 0})
          </button>
        </div>
      </div>

      <div className="mt-10">
        <div className="grid gap-10 lg:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 3xl:grid-cols-4">
          {isLoading ? (
            new Array(4).fill(0).map((_, i) => <SkeletonCard key={i} />)
          ) : items.length > 0 ? (
            items.map((item: any) => (
              <ConnectionCard
                key={item.viewerId || item.userId || item._id}
                userId={item.viewerId || item.userId || item._id}
                isFavourite={isFavourite}
                handleToggleFav={handleToggleFav}
              />
            ))
          ) : (
            <div className="col-span-full h-[60vh] flex flex-col items-center justify-center text-center">
              <div className="bg-gray-100 p-8 rounded-full mb-4">
                <svg className="w-16 h-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {activeTab === "viewed" ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  )}
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#061C3D]">
                {activeTab === "connections" ? "No connections found" : 
                 activeTab === "sent" ? "No sent requests found" : 
                 "No profile views yet"}
              </h3>
              <p className="text-[#475467] mt-2 max-w-sm">
                {activeTab === "connections" 
                  ? "Start discovering matches to build your connections list." 
                  : activeTab === "sent"
                  ? "Go to the discover page to send connection requests."
                  : "Keep your profile updated to attract more views!"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Connections;
