import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set, get } from "firebase/database";

const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "hydromind-prueba.firebaseapp.com",
  databaseURL: "https://hydromind-prueba-default-rtdb.firebaseio.com",
  projectId: "hydromind-prueba",
  storageBucket: "hydromind-prueba.firebasestorage.app",
  messagingSenderId: "509731570199",
  appId: "1:509731570199:web:8d14d07bea1ef66fbc1252",
  measurementId: "G-CBXZFWMG9N"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, onValue, set, get };