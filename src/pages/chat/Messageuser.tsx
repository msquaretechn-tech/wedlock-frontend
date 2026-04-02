import { useEffect, useRef, useState } from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { motion } from "framer-motion";
import { Ban, Trash2, MapPin, File, Mic, MicOff, Eye, Check, X } from "lucide-react";
import { useBlockUserMutation, useUnblockUserMutation } from "../../Redux/Api/blockUser";
import { toast } from "sonner";
import { db } from "../../../utils/firebaseConfig";
import { ref, push, onValue, remove } from "firebase/database";
import CallButton from "./CallButton";
import { useUploadFileMutation } from "../../Redux/Api/fileupload.api";


interface Message {
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: string;
  seen: boolean;
}

interface User {
  userId: string;
  displayName: string;
  profilePic: string;
  firstName?: string;
  lastName?: string;
}

export default function MessageUser() {
  const { id: recipientId } = useParams();
  // console.log("user recipientId are",recipientId)
  const location = useLocation();
  const navigate = useNavigate();
  const recipientUser = location.state?.user as User | undefined;
  // console.log("redpUser are ",recipientUser)

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [fileUpload, setFileUpload] = useState<File | null>(null);
  const [uploadingFile, setUploadingFile] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentUser = getAuth().currentUser;
  const currentUserId = currentUser?.uid;
  // console.log("currect user are",currentUser);

  const scrollRef = useRef<HTMLDivElement>(null);

  const [blockUser] = useBlockUserMutation();
  const [unblockUser] = useUnblockUserMutation();
  const [uploadFile] = useUploadFileMutation();

  const generateTimestamp = (): string => {
    return new Date().toISOString();
  };

  const parseTimestamp = (timestamp: string): Date => {
    return new Date(timestamp);
  };

  const uploadFileToBackend = async (file: File) => {
    try {
      const response = await uploadFile({ file }).unwrap();
      return response;
    } catch (err) {
      console.error('Upload failed:', err);
      throw err;
    }
  };

  function groupMessages(messages: Message[]) {
    if (!messages.length) return [];

    const groupedByDate: Record<string, { senderId: string; messages: Message[] }[]> = {};
    let previousSenderId: string | null = null;

    const sortedMessages = [...messages].sort((a, b) =>
      parseTimestamp(a.timestamp).getTime() - parseTimestamp(b.timestamp).getTime()
    );

    for (const msg of sortedMessages) {
      const dateObj = parseTimestamp(msg.timestamp);
      const dateStr = dateObj.toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      if (!groupedByDate[dateStr]) {
        groupedByDate[dateStr] = [];
        previousSenderId = null;
      }

      const groups = groupedByDate[dateStr];

      if (!groups.length || previousSenderId !== msg.senderId) {
        groups.push({
          senderId: msg.senderId,
          messages: [msg],
        });
      } else {
        groups[groups.length - 1].messages.push(msg);
      }

      previousSenderId = msg.senderId;
    }

    return Object.entries(groupedByDate).map(([date, groups]) => ({
      date,
      groups,
    }));
  }

  const getMessageType = (text: string): 'text' | 'image' | 'audio' | 'video' | 'document' | 'location' => {
    if (!text) return 'text';

    // Check for location (Google Maps URL pattern)
    if (text.includes('maps.google.com') || text.includes('google.com/maps') ||
      text.startsWith('geo:') || text.startsWith('https://maps.app.goo.gl/')) {
      return 'location';
    }

    // Check for file URLs
    if (text.startsWith('http') || text.startsWith('https')) {
      const extension = text.split('.').pop()?.toLowerCase();

      // Image extensions
      if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp'].includes(extension || '')) {
        return 'image';
      }

      // Audio extensions
      if (['mp3', 'wav', 'ogg', 'm4a', 'aac'].includes(extension || '')) {
        return 'audio';
      }

      // Video extensions
      if (['mp4', 'webm', 'mov', 'avi', 'mkv'].includes(extension || '')) {
        return 'video';
      }

      // Document extensions
      if (['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt'].includes(extension || '')) {
        return 'document';
      }
    }

    return 'text';
  };

  useEffect(() => {
    if (!currentUserId || !recipientId) return;

    const blockRef = ref(db, `blockedUsers/${currentUserId}/${recipientId}`);
    const unsubscribe = onValue(blockRef, (snapshot) => {
      setIsBlocked(snapshot.exists());
    });

    return () => unsubscribe();
  }, [currentUserId, recipientId]);

  useEffect(() => {
    if (!currentUserId || !recipientId) return;

    const myPath = ref(db, `messages/${currentUserId}/${recipientId}`);
    const theirPath = ref(db, `messages/${recipientId}/${currentUserId}`);

    let all: Message[] = [];

    const updateMessages = () => {
      const deduped = all.filter(
        (msg, index, self) =>
          index ===
          self.findIndex(
            (m) =>
              m.timestamp === msg.timestamp &&
              m.text === msg.text &&
              m.senderId === msg.senderId
          )
      );
      deduped.sort((a, b) =>
        parseTimestamp(a.timestamp).getTime() - parseTimestamp(b.timestamp).getTime()
      );
      setMessages(deduped);
      setLoading(false);
    };

    const unsubMe = onValue(myPath, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const mine = Object.values(data) as Message[];
        all = [...all.filter((m) => m.senderId !== currentUserId), ...mine];
        updateMessages();
      }
    });

    const unsubThem = onValue(theirPath, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const theirs = Object.values(data) as Message[];
        all = [...all.filter((m) => m.senderId !== recipientId), ...theirs];
        updateMessages();
      }
    });

    return () => {
      unsubMe();
      unsubThem();
    };
  }, [currentUserId, recipientId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!currentUserId || !recipientId) return;

    if (fileUpload) {
      handleFileUpload();
      return;
    }

    if (newMessage.trim()) {
      sendMessage(newMessage.trim());
      toast.success("Message sent", {
        description: "Your message has been delivered",
        className: "bg-green-50 text-green-800",
        duration: 3000,
      });
      setNewMessage("");
    }
  };

  const sendMessage = (text: string) => {
    if (!currentUserId || !recipientId) return;

    const myPath = ref(db, `messages/${currentUserId}/${recipientId}`);
    const theirPath = ref(db, `messages/${recipientId}/${currentUserId}`);

    const message: Message = {
      senderId: currentUserId,
      receiverId: recipientId,
      text,
      timestamp: generateTimestamp(),
      seen: false
    };

    push(myPath, message);
    push(theirPath, message);
  };

  const getFileType = (file: File): 'image' | 'audio' | 'video' | 'document' => {
    if (file.type.startsWith('image/')) return 'image';
    if (file.type.startsWith('audio/')) return 'audio';
    if (file.type.startsWith('video/')) return 'video';
    return 'document';
  };

  const handleFileUpload = async () => {
    if (!fileUpload || !currentUserId || !recipientId) return;

    setUploadingFile(true);
    try {
      const response = await uploadFileToBackend(fileUpload);
      const fileType = getFileType(fileUpload);

      const fileTypeNames = {
        image: "Photo",
        audio: "Audio",
        video: "Video",
        document: "Document"
      };

      toast.success(`${fileTypeNames[fileType]} Shared`, {
        description: `Your ${fileType.toLowerCase()} was uploaded and shared successfully`,
        className: "bg-blue-50 text-blue-800",
        duration: 4000,
        icon: <File className="w-5 h-5" />,
      });

      sendMessage(response.url);

      setFileUpload(null);
      setNewMessage("");
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Upload Failed", {
        description: "Failed to upload file",
        className: "bg-red-50 text-red-800",
      });
    } finally {
      setUploadingFile(false);
    }
  };

  const handleSendLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation Error", {
        description: "Geolocation not supported by your browser",
        className: "bg-red-50 text-red-800",
      });
      return;
    }

    const loadingToast = toast.loading("Location Sharing", {
      description: "Getting your location...",
      className: "bg-blue-50 text-blue-800",
    });

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // const response = await fetch(
          //   `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_GOOGLE_MAPS_API_KEY`
          // );
          // const data = await response.json();
          // const address = data.results[0]?.formatted_address || "Unknown location";

          const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
          sendMessage(mapsUrl);

          toast.success("Location Shared", {
            description: "Your current location has been shared securely",
            className: "bg-green-50 text-green-800",
            duration: 4000,
            icon: <MapPin className="w-5 h-5" />,
          });
        } catch (error) {
          console.error("Error getting address:", error);
          const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
          sendMessage(mapsUrl);

          toast.success("Location Shared", {
            description: "Your coordinates have been shared",
            className: "bg-green-50 text-green-800",
            duration: 4000,
            icon: <MapPin className="w-5 h-5" />,
          });
        }
        toast.dismiss(loadingToast);
      },
      (error) => {
        console.error("Error getting location:", error);
        toast.error("Location Error", {
          description: "Unable to retrieve your location",
          className: "bg-red-50 text-red-800",
        });
        toast.dismiss(loadingToast);
      }
    );
  };

 
  const handleDeleteChat = async () => {
  if (!currentUserId || !recipientId) return;

  try {
    const myChatRef = ref(db, `messages/${currentUserId}/${recipientId}`);
    const theirChatRef = ref(db, `messages/${recipientId}/${currentUserId}`);

    await Promise.all([
      remove(myChatRef),
      remove(theirChatRef),
    ]);

    toast.success("Chat Deleted", {
      description: "All messages have been removed",
      duration: 3000,
    });

    setMessages([]);
    setShowDeleteModal(false);
    navigate("/user-dashboard?tab=chats");
  } catch (error) {
    console.error(error);
    toast.error("Deletion Failed", {
      description: "Unable to delete messages",
    });
  }
};


  const handleBlockUser = async () => {
    if (!recipientUser?.userId) return;
    try {
      await blockUser(recipientUser?.userId).unwrap();
      toast.success("User Blocked", {
        description: "You won't receive messages from this user",
        className: "bg-red-50 text-red-800",
        duration: 3000,
        icon: <Ban className="w-5 h-5" />,
      });
      setIsBlocked(true);
      setShowMenu(false);
    } catch (error) {
      console.error("Error blocking user:", error);
      toast.error("Block Failed", {
        description: "Failed to block user",
        className: "bg-red-50 text-red-800",
      });
    }
  };

  const handleUnblockUser = async () => {
    if (!recipientUser?.userId) return;
    try {
      await unblockUser(recipientUser?.userId).unwrap();
      toast.success("User Unblocked", {
        description: "You can now message this user",
        className: "bg-green-50 text-green-800",
        duration: 3000,
        icon: <Check className="w-5 h-5" />,
      });
      setIsBlocked(false);
      setShowMenu(false);
    } catch (error) {
      console.error("Error unblocking user:", error);
      toast.error("Unblock Failed", {
        description: "Failed to unblock user",
        className: "bg-red-50 text-red-800",
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const maxSize = 25 * 1024 * 1024; // 25MB

      if (file.size > maxSize) {
        toast.error("File Size Limit", {
          description: "File size should be less than 25MB",
          className: "bg-red-50 text-red-800",
        });
        return;
      }

      setFileUpload(file);
    }
  };

  const renderFilePreview = () => {
    if (!fileUpload) return null;

    const fileType = getFileType(fileUpload);
    const fileUrl = URL.createObjectURL(fileUpload);

    return (
      <div className="relative mb-2">
        {fileType === 'image' && (
          <img
            src={fileUrl}
            alt="Preview"
            className="max-w-xs max-h-40 rounded-lg object-cover"
          />
        )}

        {fileType === 'audio' && (
          <div className="flex items-center gap-2 p-3 bg-gray-100 rounded-lg">
            <audio controls className="w-full">
              <source src={fileUrl} type={fileUpload.type} />
              Your browser does not support audio
            </audio>
          </div>
        )}

        {fileType === 'video' && (
          <video controls className="max-w-xs max-h-40 rounded-lg">
            <source src={fileUrl} type={fileUpload.type} />
            Your browser does not support video
          </video>
        )}

        {fileType === 'document' && (
          <div className="flex items-center gap-2 p-3 bg-gray-100 rounded-lg">
            <File className="w-5 h-5 text-gray-500" />
            <span className="text-sm truncate">{fileUpload.name}</span>
          </div>
        )}

        <button
          onClick={() => {
            setFileUpload(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
          }}
          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
        >
          <Trash2 className="w-3 h-3" />
        </button>

        {uploadingFile && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
    );
  };

  const renderMessageContent = (message: Message) => {
    const type = getMessageType(message.text);

    switch (type) {
      case 'location':
        const coordsMatch = message.text.match(/q=([-\d.]+),([-\d.]+)/);
        if (coordsMatch) {
          const lat = parseFloat(coordsMatch[1]);
          const lng = parseFloat(coordsMatch[2]);
          return (
            <div className="mb-2">
              <a
                href={message.text}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-500 hover:underline"
              >
                <MapPin className="w-4 h-4" />
                Shared Location
              </a>
              <div className="mt-2">
                <iframe
                  width="100%"
                  height="150"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight={0}
                  marginWidth={0}
                  src={`https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`}
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
          );
        }
        return <a href={message.text} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View Location</a>;

      case 'image':
        return (
          <img
            src={message.text}
            alt="Sent image"
            className="max-w-full max-h-64 rounded-lg object-cover"
          />
        );

      case 'audio':
        return (
          <div className="flex items-center gap-2 p-3 bg-white/20 rounded-lg">
            <audio controls className="w-full">
              <source src={message.text} type="audio/wav" />
              Your browser does not support audio
            </audio>
          </div>
        );

      case 'video':
        return (
          <video controls className="max-w-full max-h-64 rounded-lg">
            <source src={message.text} type="video/mp4" />
            Your browser does not support video
          </video>
        );

      case 'document':
        return (
          <a
            href={message.text}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-2 bg-white/20 rounded-lg hover:underline"
          >
            <File className="w-4 h-4" />
            <span>Download File</span>
          </a>
        );

      default:
        return <div>{message.text}</div>;
    }
  };

  if (!recipientId) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">No chat selected</p>
      </div>
    );
  }

  return (
    <>
    <div className="mt-8 flex justify-center">
      <Link
        to="/user-dashboard?tab=chats"
        className="group flex  items-center gap-2 text-sm font-medium text-[#007EAF] transition hover:text-[#016890]"
        aria-label="Close chat"
      >
    <button
      aria-label="Close"
      className="group flex cursor-pointer h-10 w-10 items-center justify-center rounded-full bg-[#007EAF] text-white transition-all duration-300 hover:bg-[#01668e] hover:text-white"
    >
      <X className="text-xl transition-transform duration-300 group-hover:rotate-90" />
    </button>
      </Link>
    </div>
  
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col max-w-4xl mx-auto my-6 border border-[#007EAF] rounded-3xl bg-white/90 backdrop-blur shadow-xl overflow-hidden"
    >
      {/* Header */}
      <div className="sticky top-0 z-40 bg-[#007EAF] flex justify-between items-center px-5 py-4 text-white">
        <div className="flex items-center gap-3">
          <img
            src={recipientUser?.profilePic || "/default-avatar.png"}
            className="w-12 h-12 rounded-full border-2 border-white shadow-md"
            alt="Profile"
          />
          <div>
            <h2 className="text-lg font-semibold">
              {recipientUser?.displayName || "Chat"}
            </h2>
            <p className="text-xs text-white/80">
              {isBlocked ? "Blocked" : "Online"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!isBlocked && recipientUser && (
            <CallButton
              userId={recipientId}
              userName={recipientUser.displayName}
              userImage={recipientUser.profilePic}
              onRecordingStart={() => {
                toast.info("Call Recording", {
                  description: "Recording of your call has started",
                  className: "bg-blue-50 text-blue-800",
                  duration: 3000,
                  icon: <Mic className="w-5 h-5" />,
                });
              }}
              onRecordingStop={() => {
                toast.info("Call Recording", {
                  description: "Call recording was stopped",
                  className: "bg-blue-50 text-blue-800",
                  duration: 3000,
                  icon: <MicOff className="w-5 h-5" />,
                });
              }}
            />
          )}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="text-xl font-bold"
          >
            ⋮
          </button>
          {showMenu && (
            <div className="absolute right-5 top-14 bg-white rounded-lg shadow-md overflow-hidden z-50 w-48">
              {isBlocked ? (
                <button
                  onClick={handleUnblockUser}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm flex items-center gap-2 text-green-500"
                >
                  <Ban className="w-4 h-4" />
                  Unblock User
                </button>
              ) : (
                <button
                  onClick={handleBlockUser}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm flex items-center gap-2 text-red-500"
                >
                  <Ban className="w-4 h-4" />
                  Block User
                </button>
              )}
              <button
                onClick={() => {
                  setShowMenu(false);
                  setShowDeleteModal(true);
                }}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm flex items-center gap-2 text-red-500"
              >
                <Trash2 className="w-4 h-4" />
                Delete Chat
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 bg-gray-50 max-h-[calc(100vh-200px)]">
        {isBlocked ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <Ban className="w-12 h-12 text-red-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">User Blocked</h3>
            <p className="text-gray-600 mb-4">
              You have blocked this user. Unblock to send messages.
            </p>
            <button
              onClick={handleUnblockUser}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Unblock User
            </button>
          </div>
        ) : loading ? (
          <div className="flex flex-col gap-3 items-center justify-center py-10">
            <div className="w-8 h-8 border-4 border-[#007EAF] border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-gray-500">Loading conversation...</p>
          </div>
        ) : (
          <>
            {groupMessages(messages).map((dayGroup, idx) => (
              <div key={idx} className="mb-8">
                <div className="text-center text-sm text-gray-500 font-medium mb-4">
                  {dayGroup.date}
                </div>

                {dayGroup.groups.map((senderGroup, j) => (
                  <div key={j} className="flex flex-col gap-1">
                    {senderGroup.messages.map((msg, k) => (
                      <motion.div
                        key={`${msg.timestamp}-${k}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm shadow ${msg.senderId === currentUserId
                          ? "bg-[#007EAF] text-white self-end"
                          : "bg-gray-200 text-gray-800 self-start"
                          }`}
                      >
                        {renderMessageContent(msg)}

                        <div
                          className={`text-xs mt-1 text-right opacity-70 ${msg.senderId === currentUserId
                            ? "text-white/70"
                            : "text-gray-600"
                            }`}
                        >
                          {parseTimestamp(msg.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                          {msg.seen && (
                            <span className="ml-1">
                              <Eye className="w-3 h-3 inline" />
                            </span>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
            <div ref={scrollRef} />
          </>
        )}
      </div>

      {/* Input */}
      {!isBlocked && (
        <div className="flex flex-col gap-2 p-4 border-t bg-white">
          {renderFilePreview()}

          <div className="flex items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*,audio/*,video/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
              className="hidden"
              disabled={uploadingFile}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 text-gray-600 hover:text-[#007EAF] transition"
              disabled={uploadingFile}
            >
              <File className="w-5 h-5" />
            </button>

            <button
              onClick={handleSendLocation}
              className="p-2 text-gray-600 hover:text-[#007EAF] transition"
              disabled={uploadingFile}
            >
              <MapPin className="w-5 h-5" />
            </button>

            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={fileUpload ? "Add a caption (optional)..." : "Type your message..."}
              className="flex-1 px-4 py-2 rounded-full border focus:ring-2 focus:ring-[#007EAF] outline-none transition"
              disabled={loading || uploadingFile}
            />

            <button
              onClick={handleSendMessage}
              className="bg-[#007EAF] text-white px-4 py-2 rounded-full hover:bg-[#005f88] transition disabled:opacity-50"
              disabled={
                loading ||
                uploadingFile ||
                (!newMessage.trim() && !fileUpload)
              }
            >
              {uploadingFile ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-80 text-center space-y-4">
            <h2 className="text-lg font-semibold">Delete Chat</h2>
            <p className="text-sm text-gray-600">
              Are you sure you want to delete this conversation?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteChat}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
      </>
  );
}