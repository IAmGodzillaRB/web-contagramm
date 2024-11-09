// Importa las funciones necesarias desde los SDK de Firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { query, where, getDocs, collection } from 'firebase/firestore';

// Configuración de Firebase para tu aplicación web
const firebaseConfig = {
  apiKey: "AIzaSyAktCMmICRVzdxY5AZpguktm9F5LglQiZ0",
  authDomain: "empleado-contagramm.firebaseapp.com",
  projectId: "empleado-contagramm",
  storageBucket: "empleado-contagramm.appspot.com",
  messagingSenderId: "254055482990",
  appId: "1:254055482990:web:91bbc22418bee430cec87f",
  measurementId: "G-SMPPC38DG3"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

console.log("Firebase ha sido inicializado exitosamente", app);

export { db, app, analytics, query, where, getDocs, collection};
