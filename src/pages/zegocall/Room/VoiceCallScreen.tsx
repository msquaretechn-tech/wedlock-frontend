// // src/pages/VoiceCallScreen.tsx
// import { useEffect, useRef } from "react";
// import { useParams } from "react-router-dom";
// import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

// const VoiceCallScreen = () => {
//   const { roomId } = useParams<{ roomId: string }>();
//   const callContainerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (!roomId || !callContainerRef.current) return;

//     const appID = 1202014598;
//     const serverSecret = "9b9f494909d87f7d123a84c20d7b0d37";
//     const userId = localStorage.getItem("uid") || "";
//     const userName = localStorage.getItem("name") || "";

//     const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
//       appID,
//       serverSecret,
//       roomId,
//       userId,
//       userName
//     );

//     const zc = ZegoUIKitPrebuilt.create(kitToken);

//     zc.joinRoom({
//       container: callContainerRef.current,
//       scenario: {
//         mode: ZegoUIKitPrebuilt.OneONoneCall,
//       },
//       showScreenSharingButton: false,
//       showRoomTimer: true,
//       showPreJoinView: false,
//       turnOnCameraWhenJoining: false,
//       showMyCameraToggleButton: false,
//       showAudioVideoSettingsButton: true,
//       showLayoutButton: false,
//       showTextChat: false,
//     });

//     return () => {
//       zc.destroy();
//     };
//   }, [roomId]);

//   return <div ref={callContainerRef} className="w-full h-screen" />;
// };

// export default VoiceCallScreen;