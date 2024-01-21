import { getAuth } from "firebase/auth";
import firebase_app, { db } from "../firebase/init";

import {
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  collection,
  serverTimestamp,
  query,
  orderBy,
  where,
} from "firebase/firestore";

export const TodosCollectionRef = collection(db, "todos");

const auth = getAuth(firebase_app);

class TodoCRUDService {
  getAllTodos = () => {
    const user = auth.currentUser;

    if (user) {
      const orderedQuery = query(
        TodosCollectionRef,
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc")
      );

      return getDocs(orderedQuery);
    }
  };
  getTodo = (id) => {
    const TodoRef = doc(db, "todos", id);
    return getDoc(TodoRef);
  };
  addTodo = (newTodo) => {
    return addDoc(TodosCollectionRef, {
      ...newTodo,
      createdAt: serverTimestamp(),
    });
  };
  updateTodo = (id, updatedTodo) => {
    const TodoRef = doc(db, "todos", id);
    return updateDoc(TodoRef, updatedTodo);
  };
  toggleComplete = (currentTodo) => {
    const TodoRef = doc(db, "todos", currentTodo.id);
    return updateDoc(TodoRef, {
      ...currentTodo,
      completed: !currentTodo.completed,
    });
  };
  deleteTodo = (id) => {
    const TodoRef = doc(db, "todos", id);
    return deleteDoc(TodoRef);
  };
}

const todoCRUDServiceInstance = new TodoCRUDService();

export default todoCRUDServiceInstance;
