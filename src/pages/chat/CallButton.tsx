import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { RootState } from "../../Redux/store";
import CallService from "../zegocall/CallService ";
import { Phone, Video } from "lucide-react";

function CallButton({ userId, userName, userImage }: any) {
  const user = useSelector((state: RootState) => state.userReducer.user);
  const usertype = (user?.usertype || "Standard").toLowerCase();
  const navigate = useNavigate();

  const handleStartVideoCall = () => {
    if (usertype === "standard") {
      toast.error("Video calls are available on Premium (15 mins/call) and Exclusive (30 mins/call). Please upgrade your plan.", {
        action: {
          label: "Upgrade",
          onClick: () => navigate("/plan"),
        },
      });
      return;
    }

    CallService.startCall({
      receiverId: userId,
      receiverName: userName,
      isVideo: true,
      profileImage: userImage,
    });
  };

  const handleStartVoiceCall = () => {
    if (usertype === "standard") {
      toast.error("Voice calls are available on Premium and Exclusive plans. Please upgrade your plan.", {
        action: {
          label: "Upgrade",
          onClick: () => navigate("/plan"),
        },
      });
      return;
    }

    CallService.startCall({
      receiverId: userId,
      receiverName: userName,
      isVideo: false,
      profileImage: userImage,
    });
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleStartVideoCall}
        className="p-3 text-white active:scale-95 transition-all"
        title="Start Video Call"
      >
        <Video className="w-5 h-5" />
      </button>

      <button
        onClick={handleStartVoiceCall}
        className="p-3 text-white active:scale-95 transition-all"
        title="Start Voice Call"
      >
        <Phone className="w-5 h-5" />
      </button>
    </div>
  );
}

export default CallButton;
