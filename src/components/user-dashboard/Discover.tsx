import { useState, useEffect } from "react";
import { PiSlidersLight } from "react-icons/pi";
import ProfileCard from "./ProfileCard";
import DiscoverModal from "../DiscoverPageModal/DiscoverModal";
import { useGetProfilesQuery } from "../../Redux/Api/profile.api";
import { useToggleFavMutation } from "../../Redux/Api/fav.api";
import { useGetFavQuery } from "../../Redux/Api/fav.api";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import Pagination from "./Pagination";
import SkeletonCard from "../SkeletonCard/SkeletonCard";
import { toast } from "sonner";

// Define type for filters

const Discover = () => {
  const [filters, setFilters] = useState({});
  const [filterModelOpen, setFilterModelOpen] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const skeletonArray = new Array(3).fill(0);
  const [toggle] = useToggleFavMutation();

  // Function to format query params properly
  const formatQueryParams = (queryParams: any) => {
    const formattedParams = new URLSearchParams();
    Object.entries(queryParams).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => formattedParams.append(key, item));
      } else {
        formattedParams.append(key, String(value));
      }
    });
    return formattedParams.toString();
  };

  const queryString = formatQueryParams(filters);

  const { data, isLoading, error } = useGetProfilesQuery(queryString);
  const { data: favData, refetch } = useGetFavQuery({});
  console.log("discover data are ",data)

  useEffect(() => {
    if (error && "status" in error) {
      const apiError = error as FetchBaseQueryError;

      if (apiError.status === 404) {
        toast.error("No profiles found!");
        setProfiles([]); // Clear profiles if not found
        return;
      }
    }

    if (data) {
      setProfiles(data.profiles);
    }
  }, [data, error]);

  useEffect(() => {
    refetch();
  }, [filters, refetch]); // Ensure only refetching when filters change

  // Update filters when page changes
  useEffect(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      page: currentPage,
    }));
  }, [currentPage]);

  const openFilterModel = () => setFilterModelOpen(true);
  const closeFilterModel = () => setFilterModelOpen(false);

  const totalPages = data?.totalPages || 1;
  const handlePageChange = (page: number) => setCurrentPage(page);

  const handleFormData = async (formData: any) => {
    console.log("Form Data Before Encoding:", formData);
    try {
      const encodedFilters = {
        ...formData,
        page: currentPage,
        pageSize: 20,
      };
      setFilters(encodedFilters);
      closeFilterModel();
    } catch (error) {
      toast.error("Failed to apply filters");
    }
  };

  const handleToggleFav = async (userId: string) => {
    try {
      const response = await toggle(userId).unwrap();
      if (response.error) {
        const errorData = response.error as FetchBaseQueryError & { data: { message: string } };
        toast.error(errorData.data.message);
        return;
      }
      toast.success(response.message);
      refetch();
    } catch (error) {
      toast.error("Failed to add to favorites");
    }
  };

  const isFavourite = (userId: string) => {
    return favData?.data?.some((fav: any) => fav.userId === userId);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-semibold">Discover your matches</h1>
        <div className="flex items-center gap-10">
          <h1 className="text-[#475467]">Filter by your preference</h1>
          <button onClick={openFilterModel}>
            <PiSlidersLight className="text-2xl text-[#061C3D]" />
          </button>
          <DiscoverModal
            isVisible={filterModelOpen}
            onClose={closeFilterModel}
            onFormSubmit={handleFormData}
          />
        </div>
      </div>

      <div className="mt-10  ">
        <div className="grid gap-10 lg:gap-40 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4">
          {isLoading ? (
            // Display loading skeletons while loading
            skeletonArray.map((_, index) => <SkeletonCard key={index} />)
          ) : profiles.length > 0 ? (
            profiles.map((profile: any) => (
              <ProfileCard
                key={profile.id}
                profiles={[profile]}
                isFavourite={isFavourite(profile.userId)}
                handleFavouriteToggle={handleToggleFav}
              />
            ))
          ) : (
            <div className="col-span-full h-[60vh] flex items-center justify-center text-center text-gray-500">
              No profiles found matching your criteria
            </div>
          )}
        </div>
      </div>

      <div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Discover;
