import { Header } from "./components/Header/Header";
import { EmptyTaskList } from "./components/EmptyTaskList/EmptyTaskList";
import { useRef, useEffect, useState } from "react";
import { TaskFormModal } from "./components/TaskFormModal/TaskFormModal";
import { TaskList } from "./components/TaskList/TaskList";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodoTask,
  setTodoList,
  sortTodoList,
  updateTodoTask,
} from "./redux-store/todoSlicer";
import { DeleteTaskModal } from "./components/DeleteTaskModal/DeleteTaskModal";
import createTodoListImage from "./assets/createTodoListImage.png";

function App() {
  const [currentTask, setCurrentTask] = useState(); //When modal is opened for editing task, the target task is stored in this state.
  const [newTask, setNewTask] = useState({ title: "", description: "" }); //State used to add new task
  const [deleteTaskId, setDeleteTaskId] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const dispatch = useDispatch();
  const toDoList = useSelector((state) => state.todo.todoList);

  /** Ref to scroll to the new todo added */
  const todoListContainerRef = useRef(null);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleConfirmationModal = () => {
    setShowConfirmationModal(!showConfirmationModal);
  };

  //Sets new task with current task information if it's in edit mode. Current task contains id, title, desc, completed.
  useEffect(() => {
    if (currentTask) {
      setNewTask(toDoList.find((task) => task.id === currentTask.id));
    }
    // eslint-disable-next-line
  }, [currentTask]);

  /** It sets todoList(if exists) from redux to localStorage. This is done so that already existing todos do not disappear as page refreshes.  */
  useEffect(() => {
    if (toDoList.length > 0) {
      localStorage.setItem("todoList", JSON.stringify(toDoList));
    }
  }, [toDoList]);

  /**After page refreshes, if there are any todos that are previously stored inside localstorage can be accessed from it and stored in redux*/

  useEffect(() => {
    const localTodoTasks = JSON.parse(localStorage.getItem("todoList"));
    dispatch(setTodoList(localTodoTasks));
    // eslint-disable-next-line
  }, []);

  const addTaskHandler = (todo) => {
    //UPDATE TASK
    if (currentTask) {
      dispatch(updateTodoTask(newTask));
      setCurrentTask(null);
    } else {
      //ADD TASK
      dispatch(
        addTodoTask({
          title: todo.title,
          description: todo.description,
        })
      );
      dispatch(sortTodoList("all"));
      // Scroll to the new todo after adding it to the list
      if (todoListContainerRef.current) {
        const newTodoElement = todoListContainerRef.current.lastElementChild;
        if (newTodoElement) {
          newTodoElement.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
    setNewTask({ title: "", description: "" });
    toggleModal();
  };

  const onDeleteTask = (taskId) => {
    setDeleteTaskId(taskId);
    toggleConfirmationModal();
  };

  return (
    <div className="bg-gradient-to-r from-cyan-100 to-blue-200 dark:from-slate-900 dark:to-slate-900">
      {showModal && (
        <TaskFormModal
          newTask={newTask}
          setNewTask={setNewTask}
          addTaskHandler={addTaskHandler}
          toggleModal={toggleModal}
          currentTask={currentTask}
          setCurrentTask={setCurrentTask}
        />
      )}

      {showConfirmationModal && (
        <DeleteTaskModal
          toggleConfirmationModal={toggleConfirmationModal}
          deleteTaskId={deleteTaskId}
        />
      )}

      <Header />
      <main class="mx-auto max-w-4xl flex justify-center align-middle section-min-height dark:bg-slate-900">
        {toDoList.length > 0 ? (
          <TaskList
            toggleModal={toggleModal}
            onDeleteTask={onDeleteTask}
            taskList={toDoList}
            setCurrentTask={setCurrentTask}
            todoListContainerRef={todoListContainerRef}
          />
        ) : (
          <EmptyTaskList
            emptyImage={createTodoListImage}
            title={"No Pending Tasks Yet!"}
            description={
              "Your to-do list is currently empty. Start adding tasks and stay organized with our intuitive to-do list interface!"
            }
            toggleModal={toggleModal}
            isButtonPresent={true}
          />
        )}
      </main>
    </div>
  );
}

export default App;
