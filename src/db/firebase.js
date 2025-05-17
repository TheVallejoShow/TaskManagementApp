// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { addDoc, collection, getFirestore, onSnapshot } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZlHMl5D9pDZBeowVIApqov7MjdmwYOs0",
  authDomain: "task-management-app-19d66.firebaseapp.com",
  projectId: "task-management-app-19d66",
  storageBucket: "task-management-app-19d66.firebasestorage.app",
  messagingSenderId: "263533648005",
  appId: "1:263533648005:web:4f1ebd203a46f84f1371ec",
  measurementId: "G-Y0NX9RH8LR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore();

export const onGetProjects = ( callback ) => onSnapshot(collection(db, "Projects"), callback);

export const addProject = async (projectData) => {
  try {
    await addDoc(collection(db, "Projects"), {
      name: projectData.name,
      image: projectData.image || "",
      description: projectData.description || "",
      tasks: []
    });
  } catch (error) {
    console.error("Error adding project: ", error);
    throw error;
  }
};