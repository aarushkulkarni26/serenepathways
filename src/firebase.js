import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyATmux-wHxEHvUdjzi_41kGqQ8p44nIeKs",
  authDomain: "serenepathways.firebaseapp.com",
  projectId: "serenepathways",
  storageBucket: "serenepathways.appspot.com",
  messagingSenderId: "167463619095",
  appId: "1:167463619095:web:71c68adf72fe8c8e716a52",
  measurementId: "G-N2DXR7F171",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;
