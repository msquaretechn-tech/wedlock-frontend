// // src/hooks/useIncomingCall.ts
// import { useEffect, useState } from "react";
// import { ref, onValue, remove } from "firebase/database";
// import { db } from "../../../utils/firebaseConfig";

// interface CallData {
//   from: string;
//   fromName: string;
//   roomId: string;
//   type: string;
//   status: string;
//   timestamp: number;
//   receiverImg: string;
// }

// export const useIncomingCall = (userId: string) => {
//   const [incomingCall, setIncomingCall] = useState<CallData | null>(null);

//   useEffect(() => {
//     if (!userId) return;

//     const callRef = ref(db, `calls/${userId}`);
    
//     const unsubscribe = onValue(callRef, (snapshot) => {
//       const data = snapshot.val();
//       if (data && data.status === "pending") {
//         setIncomingCall(data);
//       } else {
//         setIncomingCall(null);
//       }
//     });

//     return () => unsubscribe();
//   }, [userId]);

//   const clearCall = async () => {
//     try {
//       await remove(ref(db, `calls/${userId}`));
//       setIncomingCall(null);
//     } catch (error) {
//       console.error("Error clearing call:", error);
//     }
//   };

//   return { incomingCall, clearCall };
// };