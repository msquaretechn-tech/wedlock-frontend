// CallService.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { auth, db } from "../../../utils/firebaseConfig";
import { ref, onValue, set, update, remove, get, serverTimestamp } from "firebase/database";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { onAuthStateChanged } from "firebase/auth";

let isReloaded = false;

const reloadOnce = () => {
  if (isReloaded) return;
  isReloaded = true;
  window.location.reload();
};

type CallData = {
  from: string;
  fromName: string;
  to: string;
  toName: string;
  roomId: string;
  type: "video" | "voice";
  status: "pending" | "accepted" | "rejected" | "ended";
  receiverImg: string;
  isOutgoing?: boolean;
};

class CallService {
  
  private static instance: CallService;
  private userId?: string;
  private userName?: string;

  private currentRoomId?: string;
  private currentReceiverId?: string;
  private isCalling = false;

  private hasJoinedCall = false;
  private modalOpen = false;
  private callTimeout?: NodeJS.Timeout;

  private zegoInstance?: ReturnType<typeof ZegoUIKitPrebuilt.create>;

  private previousScrollPosition = 0;
  private originalBodyStyles: { overflow: string; margin: string; padding: string } = {
    overflow: "",
    margin: "",
    padding: ""
  };
  previousPageContent?: string | undefined | null;
  profilePic?: string;
  unsubscribe?: () => void;
  isCaller: boolean = false;

  private constructor() {
    this.addGlobalStyles();
  }

  public static getInstance(): CallService {
    if (!CallService.instance) {
      CallService.instance = new CallService();
    }
    return CallService.instance;
  }

  private addGlobalStyles() {
    if (document.getElementById('call-service-styles')) return;

    const style = document.createElement('style');
    style.id = 'call-service-styles';
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateX(-50%) translateY(20px); }
        to { opacity: 1; transform: translateX(-50%) translateY(0); }
      }
      @keyframes fadeOut {
        from { opacity: 1; transform: translateX(-50%) translateY(0); }
        to { opacity: 0; transform: translateX(-50%) translateY(20px); }
      }
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
      }
      @keyframes ring {
        0% { transform: rotate(0deg); }
        25% { transform: rotate(15deg); }
        50% { transform: rotate(-15deg); }
        75% { transform: rotate(10deg); }
        100% { transform: rotate(0deg); }
      }
      .call-snackbar {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        padding: 12px 24px;
        border-radius: 4px;
        z-index: 99999;
        font-size: 14px;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        gap: 8px;
        animation: fadeIn 0.3s ease-out;
      }
      .call-snackbar.error {
        background: #ff4444;
        color: white;
      }
      .call-snackbar.success {
        background: #00C851;
        color: white;
      }
      .call-snackbar.info {
        background: #33b5e5;
        color: white;
      }
    `;
    document.head.appendChild(style);
  }

  private showSnackbar(message: string, type: "success" | "error" | "info" = "info") {
    const existing = document.querySelectorAll('.call-snackbar');
    existing.forEach(el => el.remove());

    const div = document.createElement("div");
    div.className = `call-snackbar ${type}`;
    div.textContent = message;

    const icon = document.createElement("span");
    icon.innerHTML = type === "error" ? "❌" : type === "success" ? "✓" : "ℹ️";
    div.prepend(icon);

    document.body.appendChild(div);

    setTimeout(() => {
      div.style.animation = "fadeOut 0.3s ease-out";
      setTimeout(() => div.remove(), 300);
    }, 3000);
  }

  private storeCurrentPageState() {
    // Save body styles to restore later
    this.originalBodyStyles = {
      overflow: document.body.style.overflow,
      margin: document.body.style.margin,
      padding: document.body.style.padding
    };

    // Save scroll position
    this.previousScrollPosition = window.scrollY;

    // Create a hidden container with the current page content
    const container = document.createElement('div');
    container.id = 'original-page-container';
    container.style.display = 'none';
    container.innerHTML = document.body.innerHTML;
    document.body.appendChild(container);
  }

  private restorePreviousPage() {
    // Remove call container if exists
    const callContainer = document.getElementById('zego-call-container');
    if (callContainer) callContainer.remove();

    // Remove any modals
    const modals = document.querySelectorAll('[data-call-service-modal]');
    modals.forEach(modal => modal.remove());

    // Restore original content if we saved it
    const originalContainer = document.getElementById('original-page-container');
    if (originalContainer) {
      document.body.innerHTML = originalContainer.innerHTML;
      originalContainer.remove();
    }

    // Restore body styles
    document.body.style.overflow = this.originalBodyStyles.overflow;
    document.body.style.margin = this.originalBodyStyles.margin;
    document.body.style.padding = this.originalBodyStyles.padding;

    // Restore scroll position
    window.scrollTo(0, this.previousScrollPosition);

    // Clear stored state
    this.previousPageContent = null;
    this.previousScrollPosition = 0;
  }

  public async initialize() {
    return new Promise<void>((resolve) => {
      onAuthStateChanged(auth, (user) => {
        if (!user) {
          console.error("[CallService] No logged-in user. Stopping listener.");
          return;
        }
        console.log("[Auth] User object:", user);
        // console.log("User details are ",user.uid,user.displayName,user.photoURL);
        // console.log("User details are 2 hai", user.uid, user.uid.displayName, user.uid.photoURL);


        this.userId = user.uid;
        this.userName = user.displayName || "Unknown";
        this.profilePic = user.photoURL || "";

        const callsRef = ref(db, `calls/${this.userId}`);
        this.unsubscribe = onValue(callsRef, async (snapshot) => {
          const rawData = snapshot.val();
          if (!snapshot.exists()) return;

          const callData = rawData as CallData;
          switch (callData.status) {
            case "pending":
              if (callData.isOutgoing || callData.from === this.userId) return;
              if (!this.isCalling && !this.modalOpen) {
                this.isCaller = false;
                this.showIncomingModal(
                  callData.fromName,
                  callData.type === "video",
                  callData.roomId,
                  callData.receiverImg
                );
              }
              break;
            case "accepted":
              if (this.closeModal) this.closeModal();
              this.showSnackbar("Call accepted", "success");
              this.joinRoom(callData.roomId, callData.type === "video");
              break;
            case "rejected":
              this.showSnackbar("Call declined", "error");
              this.cleanUp();
              break;
            case "ended":
              this.showSnackbar("Call ended", "info");
              this.cleanUp();
              break;
          }
        });
        resolve();
      });
    });
  }

  public async startCall({
    receiverId,
    receiverName,
    isVideo,
    profileImage,
  }: {
    receiverId: string;
    receiverName: string;
    isVideo: boolean;
    profileImage: string;
  }) {
    if (this.isCalling) {
      this.showSnackbar("You are already in a call", "error");
      return;
    }

    this.isCalling = true;
    this.isCaller = true;
    this.currentRoomId = `${this.userId}_${receiverId}`;
    this.currentReceiverId = receiverId;

    const callData: CallData = {
      from: this.userId!,
      fromName: this.userName!,
      to: receiverId,
      toName: receiverName,
      roomId: this.currentRoomId,
      type: isVideo ? "video" : "voice",
      status: "pending",
      receiverImg: profileImage,
    };

    await set(ref(db, `calls/${receiverId}`), { ...callData, timestamp: serverTimestamp() });
    await set(ref(db, `calls/${this.userId}`), { ...callData, isOutgoing: true });

    this.showOutgoingModal(receiverName, profileImage, isVideo, () => this.endCall(receiverId));
    this.setTimeoutCheck(receiverId);
  }

  private closeModal?: () => void;

  private showOutgoingModal(name: string, img: string, isVideo: boolean, onEnd: () => void) {
    this.modalOpen = true;
    const div = document.createElement("div");
    div.setAttribute('data-call-service-modal', 'true');
    document.body.appendChild(div);
    const root = createRoot(div);

    const close = () => {
      this.modalOpen = false;
      root.unmount();
      div.remove();
    };

    this.closeModal = close;

    root.render(
      <div style={styles.modalOverlay}>
        <div style={styles.modalContent}>
          <div style={styles.callHeader}>
            <h2 style={styles.callTitle}>Calling {name}</h2>
            <p style={styles.callType}>{isVideo ? "Video Call" : "Voice Call"}</p>
          </div>

          <div style={styles.avatarContainer}>
            <div style={styles.avatarPulse}></div>
            <img
              src={img}
              style={styles.avatarImage}
              alt={name}
              onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/150")}
            />
          </div>

          <div style={styles.callButtons}>
            <button
              onClick={() => { onEnd(); close(); }}
              style={{ ...styles.button, ...styles.endCallButton }}
            >
              <span style={styles.buttonIcon}>✕</span> End Call
            </button>
          </div>

          <div style={styles.callingAnimation}>
            <div style={styles.callingDot}></div>
            <div style={{ ...styles.callingDot, animationDelay: "0.2s" }}></div>
            <div style={{ ...styles.callingDot, animationDelay: "0.4s" }}></div>
          </div>
        </div>
      </div>
    );
  }

  private showIncomingModal(name: string, isVideo: boolean, roomId: string, img: string) {
    this.modalOpen = true;
    const div = document.createElement("div");
    div.setAttribute('data-call-service-modal', 'true');
    document.body.appendChild(div);
    const root = createRoot(div);

    const close = () => {
      this.modalOpen = false;
      root.unmount();
      div.remove();
    };

    root.render(
      <div style={styles.modalOverlay}>
        <div style={styles.modalContent}>
          <div style={styles.callHeader}>
            <h2 style={styles.callTitle}>Incoming Call</h2>
            <p style={styles.callType}>{isVideo ? "Video Call" : "Voice Call"}</p>
          </div>

          <div style={styles.avatarContainer}>
            <div style={styles.avatarRing}></div>
            <img
              src={img}
              style={styles.avatarImage}
              alt={name}
              onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/150")}
            />
          </div>

          <p style={styles.callerName}>{name}</p>

          <div style={styles.callButtons}>
            <button
              onClick={() => { this.acceptCall(roomId, isVideo); close(); }}
              style={{ ...styles.button, ...styles.acceptCallButton }}
            >
              <span style={styles.buttonIcon}>✓</span> Accept
            </button>
            <button
              onClick={() => { this.rejectCall(); close(); }}
              style={{ ...styles.button, ...styles.rejectCallButton }}
            >
              <span style={styles.buttonIcon}>✕</span> Decline
            </button>
          </div>
        </div>
      </div>
    );
  }

  private async acceptCall(roomId: string, isVideo: boolean) {
    const snap = await get(ref(db, `calls/${this.userId}`));
    if (!snap.exists()) return;
    const callerId = (snap.val() as CallData).from;
    await update(ref(db, `calls/${this.userId}`), { status: "accepted" });
    await update(ref(db, `calls/${callerId}`), { status: "accepted" });
    this.isCalling = true;
    this.isCaller = false;
    this.joinRoom(roomId, isVideo);
  }

  private async rejectCall() {
    const snap = await get(ref(db, `calls/${this.userId}`));
    if (!snap.exists()) return;
    const callerId = (snap.val() as CallData).from;
    await update(ref(db, `calls/${this.userId}`), { status: "rejected" });
    await update(ref(db, `calls/${callerId}`), { status: "rejected" });
    this.cleanUp();
    
  }

  private async endCall(receiverId?: string) {
    if (receiverId) await update(ref(db, `calls/${receiverId}`), { status: "ended" });
    if (this.userId) await update(ref(db, `calls/${this.userId}`), { status: "ended" });
    this.cleanUp();
        reloadOnce();

  }

  private joinRoom(roomId: string, isVideo: boolean) {
    if (this.hasJoinedCall) return;

    // Store current page state before taking over
    this.storeCurrentPageState();

    // Prepare the body for full-screen call
    document.body.innerHTML = '';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflow = 'hidden';

    const token = ZegoUIKitPrebuilt.generateKitTokenForTest(
      Number(import.meta.env.VITE_ZEGO_APP_ID),
      import.meta.env.VITE_ZEGO_SERVER_SECRET!,
      roomId,
      this.userId!,
      this.userName!
    );

    this.hasJoinedCall = true;
    this.zegoInstance = ZegoUIKitPrebuilt.create(token);

    const container = document.createElement('div');
    container.id = 'zego-call-container';
    Object.assign(container.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100vw',
      height: '100vh',
      background: '#1a1a1a',
      zIndex: '9998',
      display: 'flex',
      flexDirection: 'column',
    });

    // Call header with info and controls
    const header = document.createElement('div');
    header.style.cssText = `
      padding: 16px;
      background: rgba(0,0,0,0.7);
      color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 1;
    `;

    const title = document.createElement('div');
    title.textContent = `${isVideo ? 'Video' : 'Voice'} call`;
    title.style.fontWeight = '500';

    const endButton = document.createElement('button');
    endButton.textContent = 'End Call';
    endButton.style.cssText = `
      padding: 8px 16px;
      background: #ff4444;
      color: white;
      border: none;
      border-radius: 4px;
      font-weight: 500;
      cursor: pointer;
    `;
    endButton.onclick = () => this.endCall(this.currentReceiverId);

    header.appendChild(title);
    header.appendChild(endButton);
    container.appendChild(header);
    document.body.appendChild(container);

    this.zegoInstance.joinRoom({
      container: container,
      scenario: { mode: ZegoUIKitPrebuilt.OneONoneCall },
      turnOnCameraWhenJoining: isVideo,
      showRoomTimer: true,
      showPreJoinView: false,
      turnOnMicrophoneWhenJoining: true,
      // showScreenSharingButton: isVideo,
      showScreenSharingButton: false,
      showMyCameraToggleButton: isVideo,
      showAudioVideoSettingsButton: isVideo,
      onLeaveRoom: () => {
        this.endCall(this.currentReceiverId);
        this.restorePreviousPage();
        reloadOnce();
      },
      onUserLeave: () => {
        this.showSnackbar('Other user left the call', 'info');
        this.endCall(this.currentReceiverId);
        this.restorePreviousPage();
        reloadOnce();
      },
    });
  }

  private setTimeoutCheck(receiverId: string) {
    this.callTimeout = setTimeout(async () => {
      const snap = await get(ref(db, `calls/${receiverId}`));
      if (snap.exists() && snap.val().status === "pending") {
        this.showSnackbar("No answer. Call ended", "error");
        this.endCall(receiverId);
       
      }
    }, 60000);
  }

  private async cleanUp() {
    if (this.zegoInstance) {
      try {
        this.zegoInstance.destroy();
      } catch (err) {
        console.warn("Error leaving Zego room:", err);
      }
      this.zegoInstance = undefined;
    }

    this.restorePreviousPage();

    if (this.userId) await remove(ref(db, `calls/${this.userId}`));
    if (this.currentReceiverId) await remove(ref(db, `calls/${this.currentReceiverId}`));

    this.isCalling = false;
    this.isCaller = false;
    this.hasJoinedCall = false;
    this.modalOpen = false;
    this.currentRoomId = undefined;
    this.currentReceiverId = undefined;
    if (this.callTimeout) clearTimeout(this.callTimeout);
  }
}

// Styles object remains the same as in previous example


// Styles object for consistent styling
const styles = {
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    backdropFilter: "blur(5px)",
  } as React.CSSProperties,
  modalContent: {
    backgroundColor: "#2a2a2a",
    borderRadius: "16px",
    padding: "24px",
    width: "320px",
    maxWidth: "90vw",
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
    color: "#fff",
  } as React.CSSProperties,
  callHeader: {
    marginBottom: "20px",
  } as React.CSSProperties,
  callTitle: {
    margin: 0,
    fontSize: "22px",
    fontWeight: "600",
    color: "#fff",
  } as React.CSSProperties,
  callType: {
    margin: "4px 0 0",
    fontSize: "14px",
    color: "#aaa",
  } as React.CSSProperties,
  avatarContainer: {
    position: "relative",
    width: "120px",
    height: "120px",
    margin: "0 auto 20px",
  } as React.CSSProperties,
  avatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    objectFit: "cover",
    position: "relative",
    zIndex: 2,
    border: "3px solid #444",
  } as React.CSSProperties,
  avatarPulse: {
    position: "absolute",
    top: "-10px",
    left: "-10px",
    right: "-10px",
    bottom: "-10px",
    borderRadius: "50%",
    backgroundColor: "rgba(0, 200, 81, 0.3)",
    zIndex: 1,
    animation: "pulse 2s infinite",
  } as React.CSSProperties,
  avatarRing: {
    position: "absolute",
    top: "-10px",
    left: "-10px",
    right: "-10px",
    bottom: "-10px",
    borderRadius: "50%",
    border: "5px solid rgba(0, 200, 81, 0.5)",
    zIndex: 1,
    animation: "ring 1.5s infinite",
  } as React.CSSProperties,
  callerName: {
    fontSize: "18px",
    fontWeight: "500",
    margin: "0 0 20px",
    color: "#fff",
  } as React.CSSProperties,
  callButtons: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    marginTop: "20px",
  } as React.CSSProperties,
  button: {
    padding: "12px 20px",
    borderRadius: "50px",
    border: "none",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "all 0.2s",
  } as React.CSSProperties,
  acceptCallButton: {
    backgroundColor: "#00C851",
    color: "#fff",
  } as React.CSSProperties,
  rejectCallButton: {
    backgroundColor: "#ff4444",
    color: "#fff",
  } as React.CSSProperties,
  endCallButton: {
    backgroundColor: "#ff4444",
    color: "#fff",
    width: "100%",
    justifyContent: "center",
  } as React.CSSProperties,
  buttonIcon: {
    fontSize: "18px",
  } as React.CSSProperties,
  callingAnimation: {
    display: "flex",
    justifyContent: "center",
    gap: "8px",
    marginTop: "20px",
  } as React.CSSProperties,
  callingDot: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    backgroundColor: "#00C851",
    animation: "pulse 1.5s infinite",
  } as React.CSSProperties,
};

export default CallService.getInstance();