// import { useSelector } from "react-redux";
// import CallService from "../zegocall/CallService ";
// import { RootState } from '../../Redux/store';
// import { useState } from "react";
// import { toast } from "sonner";
// import { Phone, Video } from "lucide-react";

// function CallButton({ userId, userName, userImage }: any) {
//   const usertype = useSelector((state: RootState) => state.userReducer.user?.usertype);
//   const [premiumCallTimeUsed, setPremiumCallTimeUsed] = useState(0); // in minutes

//   const MAX_PREMIUM_MINUTES = 60;

//   const handleStartCall = (isVideo: boolean) => {
//     if (usertype === "Standard") {
//       toast.warning("Activation of this feature is contingent upon approval of your request and your enrollment in the Wedlock subscription plan.");
//       return;
//     }

//     if (usertype === "Premium" && premiumCallTimeUsed >= MAX_PREMIUM_MINUTES) {
//       toast.error("You have used your 1-hour call limit. Upgrade to Exclusive for unlimited calls.");
//       return;
//     }

//     CallService.startCall({
//       receiverId: userId,
//       receiverName: userName,
//       isVideo,
//       profileImage: userImage,
//     });

//     toast.success(isVideo ? "Video call started" : "Voice call started");

//     if (usertype === "Premium") {
//       simulatePremiumCallDuration();
//     }
//   };

//   const simulatePremiumCallDuration = () => {
//     const simulatedMinutes = 10;
//     setPremiumCallTimeUsed(prev => Math.min(prev + simulatedMinutes, MAX_PREMIUM_MINUTES));
//   };

//   return (
//     <div className="flex items-center gap-3">
//       <button className="p-3   text-white  active:scale-95 transition-all "
//        title="Start Video Call" onClick={() => handleStartCall(true)}> <Video className="w-5 h-5" /></button>
//       <button className="p-3   text-white  active:scale-95 transition-all "
//              title="Start Voice Call"
//         onClick={() => handleStartCall(false)}> <Phone className="w-5 h-5" /></button>

//       {usertype === "Premium" && (
//         <p>Used {premiumCallTimeUsed}/{MAX_PREMIUM_MINUTES} minutes of your call limit.</p>
//       )}
//     </div>
//   );
// }

// export default CallButton;






import CallService from "../zegocall/CallService ";
import { Phone, Video } from "lucide-react";


function CallButton({ userId, userName, userImage }: any) {

  // console.log("here call details are ",userId,userName,userImage);
  const handleStartVideoCall = () => {
    CallService.startCall({
      receiverId: userId,
      receiverName: userName,
      isVideo: true,
      profileImage: userImage,
    });
  };

  const handleStartVoiceCall = () => {
    console.log(`reciver id : ${userId}`);
    
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
        className="p-3   text-white  active:scale-95 transition-all "
        title="Start Video Call"
      >
        <Video className="w-5 h-5" />
      </button>

      <button
        onClick={handleStartVoiceCall}
        className="p-3   text-white  active:scale-95 transition-all "
        title="Start Voice Call"
      >
        <Phone className="w-5 h-5" />
      </button>
    </div>

  );
}

export default CallButton;
