// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { addDoc, arrayRemove, arrayUnion, collection, deleteDoc, doc, getDoc, getFirestore, onSnapshot, updateDoc } from "firebase/firestore";

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
// const analytics = getAnalytics(app);

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

export const updateProjectName = async (id, newName) => {
  const projectRef = doc(db, "Projects", id);
  await updateDoc(projectRef, { name: newName });
};

export const deleteProject = async (id) => {
  const projectRef = doc(db, "Projects", id);
  await deleteDoc(projectRef);
};

export const getProjectById = async (projectId) => {
  try {
    const docRef = doc(db, "Projects", projectId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error("Proyecto no encontrado");
    }
  } catch (error) {
    console.error("Error getting project by ID:", error);
    throw error;
  }
};

export const getTasksFromRefs = async (taskRefs) => {
  const taskDocs = await Promise.all(
    taskRefs.map(async (taskRefOrId) => {
      try {
        let taskId;

        if (typeof taskRefOrId === "object" && taskRefOrId?.id) {
          taskId = taskRefOrId.id;
        } 
        else if (typeof taskRefOrId === "string") {
          taskId = taskRefOrId;
        } 
        else {
          console.warn("Referencia inválida de tarea:", taskRefOrId);
          return null;
        }

        const taskRef = doc(db, "Tasks", taskId);
        const docSnap = await getDoc(taskRef);

        if (docSnap.exists()) {
          return { id: docSnap.id, ...docSnap.data() };
        } else {
          return null;
        }
      } catch (error) {
        console.error("Error fetching task:", error);
        return null;
      }
    })
  );

  return taskDocs.filter((task) => task !== null);
};

export const createTaskAndLinkToProject = async (projectId, taskData) => {
  const tasksCollection = collection(db, "Tasks");
  const taskDoc = await addDoc(tasksCollection, taskData);

  const projectRef = doc(db, "Projects", projectId);
  await updateDoc(projectRef, {
    tasks: arrayUnion(taskDoc.id),
  });

  return taskDoc.id;
};

export const deleteTask = async (taskId, projectId) => {
  try {
    await deleteDoc(doc(db, "Tasks", taskId));

    const projectRef = doc(db, "Projects", projectId);
    await updateDoc(projectRef, {
      tasks: arrayRemove({ id: taskId }),
    });

  } catch (error) {
    console.error("Error al eliminar la tarea:", error);
    throw error;
  }
};