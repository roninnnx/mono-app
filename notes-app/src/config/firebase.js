import {initializeApp} from "firebase/app"
import {getAuth,GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyC6cNzoJl_3kdZKzy8oerQEETXii8aWDEI",
    authDomain: "ensolvers-65649.firebaseapp.com",
    projectId: "ensolvers-65649",
    storageBucket: "ensolvers-65649.appspot.com",
    messagingSenderId: "740616487771",
    appId: "1:740616487771:web:d383d25de5101c37b6507e",
    measurementId: "G-6RXM1RK2TT"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();