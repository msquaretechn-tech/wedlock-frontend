import { getAuth, updateProfile } from "firebase/auth";
import { getDatabase, ref, get, child } from "firebase/database";

const auth = getAuth();
const db = getDatabase();

async function syncRealtimeProfileToAuth() {
  const user = auth.currentUser;
  if (!user) return;

  const snapshot = await get(child(ref(db), `users/${user.uid}`));
  if (!snapshot.exists()) {
    console.warn("User not found in Realtime Database:", user.uid);
    return;
  }

  const userData = snapshot.val();

  await updateProfile(user, {
    displayName: userData.displayName ?? null,
    photoURL: userData.profilePic ?? null,
  });

  console.log("Firebase Auth profile updated from Realtime Database.");
}

export default syncRealtimeProfileToAuth;
