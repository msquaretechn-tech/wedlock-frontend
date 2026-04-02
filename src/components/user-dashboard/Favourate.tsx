import { useState, useEffect } from 'react';
import Pagination from './Pagination';
import { useGetProfilesQuery } from "../../Redux/Api/profile.api";
import { useToggleFavMutation, useGetFavQuery } from "../../Redux/Api/fav.api";
import SkeletonCard from "../SkeletonCard/SkeletonCard";
import { toast } from "sonner";
import ProfileCard from "./ProfileCard";

const Favourate = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterData, setFilterData] = useState([]);

  const [toggle,] = useToggleFavMutation();
  const { data: profilesData, isLoading } = useGetProfilesQuery({});
  const { data: favData, refetch } = useGetFavQuery({});
  


  useEffect(() => {
    if (favData && favData.data) {
      setFilterData(favData.data);
    }
  }, [favData]);

  useEffect(() => {
    setTotalPages(Math.ceil(filterData.length / 10));
  }, [filterData]);

  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleToggleFav = async (profileId: string) => {
    try {
      const response = await toggle(profileId).unwrap();
      if (!response || response.error) {
        toast.error(response?.error?.data?.message || "Error toggling favorite status.");
        return;
      }
      toast.success(response.message);
      refetch();
    } catch (error) {
      toast.error("Failed to add to favorites. Please try again later.");
    }
  };

  const isFavourite = (profileId: string) =>
    favData?.data?.some((profile: any) => profile.userId === profileId);

  const filteredProfiles = profilesData?.profiles
    ?.filter((profile: any) =>
      favData?.data.some((favProfile: any) => favProfile.userId === profile.userId)
    )
    .map((profile: any) => ({
      ...profile,
      id: profile._id,
    }));

  const profilesToDisplay = filteredProfiles?.slice(
    (currentPage - 1) * 10,
    currentPage * 10
  );

  const skeletonArray = Array.from({ length: 10 }, (_, index) => index);

  return (
    <div>
      <div className="mt-10">
        <div className="grid gap-10 lg:gap-40 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4">
          {isLoading ? (
            skeletonArray.map((_, index) => <SkeletonCard key={index} />)
          ) : profilesToDisplay && profilesToDisplay.length > 0 ? (
            profilesToDisplay.map((profile: any) => (
              <ProfileCard
                key={profile.id}
                profiles={[profile]}
                isFavourite={isFavourite(profile.userId)}
                handleFavouriteToggle={handleToggleFav}
              />
            ))
          ) : (
            <div className="col-span-full h-[60vh] flex items-center justify-center text-center text-gray-500">
              No Fav profiles found!
            </div>
          )}
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Favourate;
