import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  writeBatch,
} from 'firebase/firestore/lite';
import { ITodo } from '../features/todo/todoSlice';

const firebaseConfig = {
  apiKey: 'AIzaSyABjd5Oqfn60SIrLCGbskQ82d_jy1dYl4E',
  authDomain: 'todo-154de.firebaseapp.com',
  projectId: 'todo-154de',
  storageBucket: 'todo-154de.appspot.com',
  messagingSenderId: '47715368615',
  appId: '1:47715368615:web:a8764b068e88bb38946582',
  measurementId: 'G-P86LGQ6BRH',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function fetchTodos() {
  const todosCol = collection(db, 'todos');
  const todoSnapshot = await getDocs(todosCol);
  const todosList = todoSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return todosList as ITodo[];
}

export async function addTodo({
  content,
  completed,
}: {
  content: string;
  completed: boolean;
}) {
  const { id } = await addDoc(collection(db, 'todos'), {
    content: content,
    completed: completed,
  });

  return id;
}

export async function deleteTodo(id: string) {
  const todoRef = doc(db, 'todos', id);
  await deleteDoc(todoRef);
}

export async function updateCompleted(id: string, completed: boolean) {
  const todoRef = doc(db, 'todos', id);
  await updateDoc(todoRef, { completed });
}

export async function deleteCompleted(ids: string[]) {
  const batch = writeBatch(db);
  const todosCol = collection(db, 'todos');
  const todoSnapshot = await getDocs(todosCol);

  ids.forEach((id) => {
    todoSnapshot.docs.forEach((doc) => {
      if (doc.id === id) batch.delete(doc.ref);
    });
  });

  await batch.commit();
}
