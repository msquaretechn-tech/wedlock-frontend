import { useLocation, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "../../Redux/Api/user.api";
import { useUpdateProfileAndBioMutation } from "../../Redux/Api/form.api";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { logout } from "../../Redux/Reducers/user.reducer";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Pencil, Loader2 } from "lucide-react";

const Suspended = () => {
  const location = useLocation();
  const { suspension } = location.state || {};

  const [logoutUser] = useLogoutUserMutation();
  const [updateProfileAndBio, { isLoading: isUpdating }] = useUpdateProfileAndBioMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [bio, setBio] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [triggerRefresh, setTriggerRefresh] = useState(false);

  const [showBioEdit, setShowBioEdit] = useState(false);
  const [showImageEdit, setShowImageEdit] = useState(false);

  const fetchData = () => {
    if (!suspension) {
      navigate("/login");
      return;
    }
    setBio(suspension?.userDetails?.aboutYourSelf || "");
    setImageFile(null);
    setPreviewUrl("");
    setShowBioEdit(false);
    setShowImageEdit(false);
  };

  useEffect(() => {
    fetchData();
  }, [suspension, navigate, triggerRefresh]);

  const {
    reason,
    suspendedAt,
    unsuspendAt,
    userDetails = {},
  } = suspension || {};

  const {
    email = "",
    displayName = "",
    aboutYourSelf = "",
    profileImage = [],
  } = userDetails;

  const profilePicUrl = profileImage[0];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
  
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleUpdate = async () => {
    if (!bio && !imageFile) {
      toast.warning("Please update something to proceed");
      return;
    }

    const formData = new FormData();
    if (bio) formData.append("aboutYourSelf", bio);
    if (imageFile) formData.append("profileImage", imageFile);

    try {
      const res = await updateProfileAndBio(formData).unwrap();
      console.log(res);
      
      toast.success("Updated successfully");
      setTriggerRefresh(prev => !prev); // Trigger data refetch
    } catch (err) {
      toast.error("Failed to update profile");
    }
  };

  const handleLogout = async () => {
    try {
      const res = await logoutUser().unwrap();
      if (res.success) {
        toast.success(res.message);
        Cookies.remove("isImageFormFilled");
        Cookies.remove("isProfileFormFilled");
        Cookies.remove("isLocationFormFilled");
        Cookies.remove("isQualificationFormFilled");
        Cookies.remove("isOtherFormFilled");
        Cookies.remove("isPersonalFormFilled");
        localStorage.clear();
        dispatch(logout());
        navigate("/login");
        window.location.reload();
      }
    } catch (err) {
      toast.error("Error during logout");
    }
  };

  if (!suspension) return null;

  return (
    <div className="bg-[#007EAF] text-white">
      <div className="w-full bg-white bg-opacity-10 backdrop-blur-lg p-8 md:p-12 lg:p-16">
        <div className="max-w-4xl mt-28 mb-4 mx-auto">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="flex-shrink-0">
              <img
                src={previewUrl || profilePicUrl}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white/30 shadow-lg"
              />
            </div>

            <div className="flex-grow">
              {displayName && <h2 className="text-2xl font-bold mb-1">{displayName}</h2>}
              {email && <p className="text-md text-white/80 mb-4">{email}</p>}

              <h1 className="text-3xl font-bold mb-3">Account Suspended</h1>
              <p className="text-lg mb-2">Due to the following reason:</p>

              {reason && (
  <div className="text-md font-medium text-yellow-200  mb-4">
    {(() => {
      const originalReason = reason;
      const cleanReason = reason.trim().toLowerCase();

   

      if (cleanReason.includes("inappropriate-bio")) {

        return "Profile content in bio/about section does not meet Wedlock’s guidelines";
      } else if (cleanReason.includes("inappropriate-image")) {
       
        return "Profile photo(s) does not meet Wedlock’s guidelines";
      } else {
   
        return originalReason.replace(/-/g, " ");
      }
    })()}
  </div>
)}






              <div className="text-sm text-white/80 mb-2">
                <span className="font-semibold">Bio:</span> {aboutYourSelf || "No bio yet"}
              </div>

              <div className="mt-6 space-y-4">
                {/* Bio Edit Section */}
                <div>
                  <button
                    onClick={() => setShowBioEdit(!showBioEdit)}
                    className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white py-2 px-4 rounded transition-all"
                  >
                    <Pencil size={16} />
                    {showBioEdit ? "Cancel Bio Edit" : "Edit Bio"}
                  </button>

                  {showBioEdit && (
                    <div className="mt-3">
                      <textarea
                        className="w-full p-3 rounded-md bg-white/20 text-white placeholder-white/50 border border-white/30"
                        rows={4}
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Update your bio..."
                      />
                    </div>
                  )}
                </div>

                {/* Image Edit Section */}
                <div>
                  <button
                    onClick={() => setShowImageEdit(!showImageEdit)}
                    className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white py-2 px-4 rounded transition-all"
                  >
                    <Pencil size={16} />
                    {showImageEdit ? "Cancel Image Edit" : "Change Profile Image"}
                  </button>

                  {showImageEdit && (
                    <div className="mt-3">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="text-sm text-white file:mr-3 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-white/20 file:text-white hover:file:bg-white/30"
                      />
                    </div>
                  )}
                </div>

                {(showBioEdit || showImageEdit) && (
                  <div>
                    <button
                      onClick={handleUpdate}
                      disabled={isUpdating}
                      className="w-full py-3 bg-white/30 hover:bg-white/40 rounded transition-all font-semibold disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isUpdating ? "Saving..." : "Save Changes"}
                    </button>
                    {isUpdating && (
                      <div className="flex justify-center mt-2">
                        <Loader2 className="h-5 w-5 animate-spin text-white" />
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="text-sm text-white/70 mt-8">
                <div>
                  <span className="font-medium">Suspended On:</span>{" "}
                  {new Date(suspendedAt).toLocaleString()}
                </div>

                {unsuspendAt && (
                  <div className="mt-2">
                    <span className="font-medium">Scheduled Unsuspend:</span>{" "}
                    {new Date(unsuspendAt).toLocaleString()}
                  </div>
                )}
              </div>

              <button
                onClick={handleLogout}
                className="mt-8 w-full py-3 bg-white/20 hover:bg-white/30 rounded transition-all font-semibold"
              >
                Logout
              </button>
              <div className="mt-12">
  <div className="mx-auto max-w-4xl bg-white/10 border border-white/20 rounded-2xl shadow-lg backdrop-blur-md p-6 md:p-8 transition-all">
    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Need Assistance?</h3>
    <p className="text-white/80 text-md md:text-lg mb-4">
      Your Wedlock account has been temporarily suspended. To restore access, please follow the instructions sent to your registered email address.
    </p>
    <p className="text-white/80 text-md md:text-lg mb-4">
    If you need assistance, our friendly support team is here to help:

    </p>





    <div className="text-white/90 text-sm md:text-base space-y-2">
      <div className="flex items-center gap-2">
        <span className="font-medium">📧 Email:</span>
        <a
          href="mailto:IT-Support@wedlock.com.au"
          className="underline hover:text-white transition-all"
        >
          IT-Support@wedlock.com.au
        </a>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-medium">📞 Phone:</span>
        <span>+61 (1300 WEDLOCK)</span>
      </div>
    </div>
  </div>
</div>


            </div>
            
          </div>
        </div>
      </div>
      {/* Support Card Section */}

    </div>
  );
};

export default Suspended;