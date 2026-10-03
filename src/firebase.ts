import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAmuBxHZgjeTAABrJHzDA8zeeL9wz-EvIE",
  authDomain: "bathukamma-be31d.firebaseapp.com",
  projectId: "bathukamma-be31d",
  storageBucket: "bathukamma-be31d.firebasestorage.app",
  messagingSenderId: "182032797936",
  appId: "1:182032797936:web:046aa13c93e02db9f1b235",
  measurementId: "G-46NG7FJVGR",
};

const app = initializeApp(firebaseConfig);
isSupported().then((ok) => ok && getAnalytics(app)).catch(() => {});
export const db = initializeFirestore(app, { experimentalForceLongPolling: true });


