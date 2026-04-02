// // Roomid.tsx
// import { useEffect, useRef } from "react";
// import { useParams } from "react-router-dom";
// import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
// import axios from "axios";

// const Roomid = () => {
//     const { roomId } = useParams<{ roomId: string }>();
//     const meetingRef = useRef<HTMLDivElement | null>(null);
//     const startTime = useRef<number>(0);

//     useEffect(() => {
//         if (!roomId || !meetingRef.current) return;

//         const appID = 2115183927;
//         const serverSecret = "4977c76aa1ed87f352489cec1c99c5f8";

//         const userId = localStorage.getItem("uid") || Date.now().toString();
//         const userName = localStorage.getItem("name") || "Guest";

//         const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
//             appID,
//             serverSecret,
//             roomId,
//             userId,
//             userName
//         );

//         const zc = ZegoUIKitPrebuilt.create(kitToken);

//         zc.joinRoom({
//             container: meetingRef.current,
//             scenario: {
//                 mode: ZegoUIKitPrebuilt.OneONoneCall,
//             },
//             showScreenSharingButton: false,
//             onJoinRoom: () => {
//                 startTime.current = Date.now();
//             },
//             onLeaveRoom: async () => {
//                 const durationInSeconds = Math.floor((Date.now() - startTime.current) / 1000);
//                 const token = localStorage.getItem("token");

//                 if (!token) return;

//                 const callieId = roomId.includes("_") ? roomId.split("_")[1] : roomId;

//                 try {
//                     await axios.put(
//                         "http://localhost:3005/api/v1/call/updateCallDuration",
//                         {
//                             callieId,
//                             totalCallDuration: durationInSeconds,
//                         },
//                         {
//                             headers: {
//                                 Authorization: `Bearer ${token}`,
//                             },
//                         }
//                     );
//                 } catch (error) {
//                     console.error("Failed to update call duration", error);
//                 }
//             },
            
//         });
//     }, [roomId]);

//     return <div ref={meetingRef} style={{ width: "100%", height: "100vh" }} />;
// };

// export default Roomid;
