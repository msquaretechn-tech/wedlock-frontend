import { initializeApp } from 'firebase/app';
import { getAuth} from 'firebase/auth';
import { getMessaging } from 'firebase/messaging';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyBOG_Yg-2kKeH1a0sdjc_zBvn_p7A_WaJE",
    authDomain: "wedlock-4f698.firebaseapp.com",
    databaseURL: "https://wedlock-4f698-default-rtdb.firebaseio.com",
    projectId: "wedlock-4f698",
    storageBucket: "wedlock-4f698.appspot.com",
    messagingSenderId: "539956268610",
    appId: "1:539956268610:web:f01a4dbc2ced2e96c027db",
    measurementId: "G-95Z5LR49PG"
};


const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);
const database = getDatabase(app);
const auth = getAuth(app);

// Get the storage
const storage = getStorage(app);
export const db = getDatabase(app);

export { app, auth, messaging, database,storage} ;
