// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCT9F_LgRtnZ3fuVgjT8ns0hsGVdgYw5dc",
  authDomain: "ditto-6c6de.firebaseapp.com",
  projectId: "ditto-6c6de",
  storageBucket: "ditto-6c6de.appspot.com",
  messagingSenderId: "496792427491",
  appId: "1:496792427491:web:a0fd3d8d74a220f1559ed6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);