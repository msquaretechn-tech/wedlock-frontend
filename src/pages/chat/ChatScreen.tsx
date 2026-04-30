import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref as rtdbRef, onValue } from "firebase/database";
import { FaMicrophone, FaSearch } from "react-icons/fa";
import { format } from "date-fns";
import { useGetConnectionStatusMutation } from "../../Redux/Api/connection.api";
import { useUnblockUserMutation, useGetBlockedUsersByMeQuery } from "../../Redux/Api/blockUser";
import { useGetBillingInfoQuery } from "../../Redux/Api/billing.api";
import { useGetUserSubscriptionStatusQuery } from "../../Redux/Api/checkout.api";
import { useGetUserImageQuery } from "../../Redux/Api/profile.api";
import { get, update } from "firebase/database";
import { toast } from 'sonner';
import { RootState } from "./../../Redux/store";
import { useSelector } from "react-redux";

interface UserModel {
  id: string;
  userId: string;
  displayName: string;
  firstName: string;
  lastName: string;
  profilePic: string;
  fcmToken: string;
  isOnline: boolean;
}

interface BlockedUser {
  userId: string;
  name: string;
  email: string;
  profileImage: string;
}

export default function ChatScreen() {
  const [connectedUsers, setConnectedUsers] = useState<UserModel[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [unseenCount, setUnseenCount] = useState<Record<string, number>>({});
  const [lastMessages, setLastMessages] = useState<Record<string, any>>({});
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'connected' | 'blocked'>('connected');

  const navigate = useNavigate();
  const [getConnectionStatus] = useGetConnectionStatusMutation();
  const { data: myDetails } = useGetUserImageQuery<any>();
  const [unblockUser] = useUnblockUserMutation();
  const { user } = useSelector((state: RootState) => state.userReducer);
  const userty = user;

  const { data: blockedUsersData, refetch: refetchBlockedUsers } = useGetBlockedUsersByMeQuery("");
  useEffect(() => {
    const auth = getAuth();
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      // console.log("User bata de ",currentUser)
      setLoading(false);
      if (!user) {
        navigate('/login');
      }
    });
    return () => unsubscribeAuth();
  }, [navigate]);
  useEffect(() => {
    if (!currentUser) return;

    const realtimeDb = getDatabase();
    const usersRef = rtdbRef(realtimeDb, "users");

    const unsubscribeDB = onValue(usersRef, async (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const rawUsers: UserModel[] = Object.entries(data).map(([id, user]) => ({
          id,
          ...(user as any),
        }));

        const filtered = rawUsers.filter((user) => user.id !== currentUser.uid);

        const connections = await Promise.all(
          filtered.map(async (user) => {
            if (!user.userId) {
              console.warn("User is missing userId:", user);
              return null;
            }

            try {
              const res: any = await getConnectionStatus(user.userId).unwrap();
              if (res?.data?.connection_status === "accepted") {
                return user;
              }
              return null;
            } catch (error) {
              console.error(`Error fetching connection status for ${user.userId}:`, error);
              return null;
            }
          })
        );

        setConnectedUsers(connections.filter(Boolean) as UserModel[]);
      }
    });

    return () => unsubscribeDB();
  }, [currentUser, getConnectionStatus]);
  const normalizeTimestamp = (ts: any): number => {
    if (!ts) return 0;

    // Already number
    if (typeof ts === "number") return ts;

    // String ISO date
    if (typeof ts === "string") return new Date(ts).getTime();

    return 0;
  };

  /* ================= UNREAD + LAST MESSAGE ================= */
  useEffect(() => {
    if (!currentUser || connectedUsers.length === 0) return;

    const db = getDatabase();

    connectedUsers.forEach((user) => {
      /* Incoming messages */
      const incomingRef = rtdbRef(
        db,
        `messages/${user.id}/${currentUser.uid}`
      );

      onValue(incomingRef, (snapshot) => {
        let unread = 0;
        let lastMsg: any = null;

        snapshot.forEach((child) => {
          const msg = child.val();
          if (msg.seen === false) unread++;
          if (
            !lastMsg ||
            normalizeTimestamp(msg.timestamp) >
            normalizeTimestamp(lastMsg.timestamp)
          ) {
            lastMsg = msg;
          }

        });

        setUnseenCount((prev) => ({ ...prev, [user.id]: unread }));
        if (lastMsg) {
          setLastMessages((prev) => ({ ...prev, [user.id]: lastMsg }));
        }
      });

      /* Outgoing messages (for last preview) */
      const outgoingRef = rtdbRef(
        db,
        `messages/${currentUser.uid}/${user.id}`
      );

      onValue(outgoingRef, (snapshot) => {
        let lastMsg: any = null;

        snapshot.forEach((child) => {
          const msg = child.val();
          if (!lastMsg || msg.timestamp > lastMsg.timestamp) {
            lastMsg = msg;
          }
        });

        if (lastMsg) {
          setLastMessages((prev) => {
            const existing = prev[user.id];
            if (!existing || lastMsg.timestamp > existing.timestamp) {
              return { ...prev, [user.id]: lastMsg };
            }
            return prev;
          });
        }
      });
    });
  }, [connectedUsers, currentUser]);



  const handleUnblockUser = async (userId: string) => {
    try {
      await unblockUser(userId).unwrap();
      refetchBlockedUsers();
    } catch (error) {
      console.error("Error unblocking user:", error);
    }
  };

  const { data: subscriptionData } = useGetUserSubscriptionStatusQuery<any>(null);
  const { data: billingInfo } = useGetBillingInfoQuery<any>();

  const handleChatOpen = async (user: UserModel) => {
    const billingData = billingInfo?.data;
    const currentPlan = (billingData?.currentPlan || subscriptionData?.usertype || userty?.usertype || "Standard").toLowerCase();
    const remainingDays = billingData?.remainingDays !== undefined ? Number(billingData.remainingDays) : 0;

    console.log("Chat Access Check:", { currentPlan, remainingDays, billingData });

    // 🚫 Block if Standard plan
    if (currentPlan === "standard") {
      toast.error("Standard users are not allowed to open chat. Please upgrade your plan.");
      return;
    }

    // 🚫 Block if plan has expired (remainingDays < 0)
    // Note: If remainingDays is "N/A" or undefined, we might want to allow it if currentPlan is not Standard
    if (billingData?.remainingDays !== "N/A" && remainingDays < 0) {
      toast.error("Your subscription has expired. Please renew your plan to continue chatting.");
      return;
    }
    const db = getDatabase();

    const incomingRef = rtdbRef(
      db,
      `messages/${user.id}/${currentUser.uid}`
    );

    const snapshot = await get(incomingRef);

    snapshot.forEach((child) => {
      const msg = child.val();

      // mark only unseen messages
      if (msg.seen !== true) {
        update(
          rtdbRef(
            db,
            `messages/${user.id}/${currentUser.uid}/${child.key}`
          ),
          { seen: true }
        );
      }
    });
    navigate(`/chat/${user.id}`, {
      state: {
        user,
        userIdToBlock: user.userId,
        currentUserId: currentUser.uid
      }
    });
  };

  const searchedUsers = connectedUsers.filter(
    (user) =>
      user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="p-6 max-w-5xl mx-auto">Loading...</div>;
  }

  if (!currentUser) {
    return <div className="p-6 max-w-5xl mx-auto">Not authenticated</div>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center mb-6">
        <img
          src={myDetails?.data || "/default-avatar.png"}
          alt="Avatar"
          className="w-12 h-12 rounded-full border-2 border-[#007EAF] mr-4"
        />
        <h1 className="text-3xl font-bold text-[#007EAF]">Messages</h1>
      </div>

      <div className="mb-6">
        <div className="flex items-center bg-[#f0f9fc] p-3 rounded-lg shadow">
          <FaSearch className="text-[#007EAF] mx-2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search connections..."
            className="bg-transparent outline-none flex-1 text-gray-700"
          />
          <FaMicrophone className="text-[#007EAF] mr-2" />
        </div>
      </div>

      <div className="flex mb-4 border-b border-gray-200">
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'connected' ? 'text-[#007EAF] border-b-2 border-[#007EAF]' : 'text-gray-500'}`}
          onClick={() => setActiveTab('connected')}
        >
          Connected People
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'blocked' ? 'text-[#007EAF] border-b-2 border-[#007EAF]' : 'text-gray-500'}`}
          onClick={() => setActiveTab('blocked')}
        >
          Blocked Users
        </button>
      </div>

      {activeTab === 'connected' ? (
        <>
          <div className="overflow-x-auto flex space-x-4 mb-6 pb-2">
            {searchedUsers.map((user) => (
              <div
                key={user.id}
                className="flex flex-col items-center cursor-pointer hover:scale-105 transition"
                onClick={() => handleChatOpen(user)}
              >
                <img
                  src={user.profilePic || "/default-avatar.png"}
                  alt={user.displayName}
                  className="w-16 h-16 rounded-full border-2 border-[#007EAF] mb-2"
                />
                <span className="text-sm text-gray-700">{user.firstName}</span>
              </div>
            ))}
          </div>

          <div className="divide-y divide-gray-200">
            {searchedUsers.map((user) => {
              const message = lastMessages[user.id] || {};
              const formattedTime = message?.timestamp
                ? format(
                  new Date(normalizeTimestamp(message.timestamp)),
                  "hh:mm a"
                )
                : "";


              return (
                <div
                  key={user.id}
                  className="flex justify-between items-center py-4 px-2 rounded-lg hover:bg-[#f5fcff] transition cursor-pointer"
                  onClick={() => handleChatOpen(user)}
                >
                  <div className="flex items-center">
                    <img
                      src={user.profilePic || "/default-avatar.png"}
                      alt={user.displayName}
                      className="w-10 h-10 rounded-full border border-[#007EAF] mr-3"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">{user.displayName}</p>
                      <p className="text-sm text-gray-500">
                        {message.text || "Say hi!"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">{formattedTime}</p>
                    {unseenCount[user.id] > 0 && (
                      <div className="bg-[#007EAF] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center mx-auto mt-1">
                        {unseenCount[user.id]}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold text-[#007EAF] mb-4">Blocked Users</h2>
          {blockedUsersData?.data?.length === 0 ? (
            <p className="text-gray-500">No users blocked.</p>
          ) : (
            <div className="space-y-4">
              {blockedUsersData?.data?.map((user: BlockedUser) => (
                <div key={user.userId} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center">
                    <img
                      src={user.profileImage || "/default-avatar.png"}
                      alt={user.name}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleUnblockUser(user.userId)}
                    className="bg-[#007EAF] text-white px-3 py-1 rounded-md text-sm hover:bg-[#006494] transition"
                  >
                    Unblock
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}