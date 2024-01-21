import { EmptyTaskList } from "../../components/EmptyTaskList/EmptyTaskList";
import { useRef, useEffect, useState } from "react";
import { TaskFormModal } from "../../components/TaskFormModal/TaskFormModal";
import { TaskList } from "../../components/TaskList/TaskList";
import { DeleteTaskModal } from "../../components/DeleteTaskModal/DeleteTaskModal";
import createTodoListImage from "../../assets/createTodoListImage.png";
import todoCRUDServiceInstance from "../../services/todos.services";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { useAuth } from "../../context/AuthContext";

function HomePage() {
  const [currentTask, setCurrentTask] = useState(); //When modal is opened for editing task, the target task is stored in this state.
  const [newTask, setNewTask] = useState({ title: "", description: "" }); //State used to add new task
  const [deleteTaskId, setDeleteTaskId] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [firebaseTodoList, setFirebaseTodoList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const { user } = useAuth();

  useEffect(() => {
    getTodos();
    setCurrentUser(user);
  }, [user]);

  /** ----------------GET ALL TODOS QUERY------------------- */

  const getTodos = async () => {
    setLoading(true);
    try {
      const todos = await todoCRUDServiceInstance.getAllTodos();
      const allTodosList = todos.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setFirebaseTodoList(allTodosList);
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  /** To get TodoList from redux state that is being set from localstorage 
  const toDoList = useSelector((state) => state.todo.todoList);
  */

  /** Ref to scroll to the new todo added */
  const todoListContainerRef = useRef(null);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleConfirmationModal = () => {
    setShowConfirmationModal(!showConfirmationModal);
  };

  // Sets new task with current task information if it's in edit mode. Current task contains id, title, desc, completed.
  useEffect(() => {
    if (currentTask) {
      setNewTask(firebaseTodoList.find((task) => task.id === currentTask.id));
    }
    // eslint-disable-next-line
  }, [currentTask]);

  //-------------------REDUX IMPLEMENTATION----------------------------------

  /** It sets todoList(if exists) from redux to localStorage. This is done so that already existing todos do not disappear as page refreshes.  */
  // useEffect(() => {
  //   if (toDoList?.length > 0) {
  //     localStorage.setItem("todoList", JSON.stringify(toDoList || []));
  //   }
  // }, [toDoList]);

  /**After page refreshes, if there are any todos that are previously stored inside localstorage can be accessed from it and stored in redux*/

  // useEffect(() => {
  //   const localTodoTasks = JSON.parse(localStorage.getItem("todoList"));
  //   dispatch(setTodoList(localTodoTasks || []));
  // }, []);

  //-------------------REDUX IMPLEMENTATION----------------------------------

  const AddUpdateTaskHandler = async (todo) => {
    setLoading(true);
    try {
      /** ----------------UPDATE TODO QUERY------------------- */
      if (currentTask) {
        const updatedTask = {
          ...currentTask,
          title: todo.title,
          description: todo.description,
        };
        await todoCRUDServiceInstance.updateTodo(currentTask.id, updatedTask);
        setFirebaseTodoList((prevTaskList) =>
          prevTaskList.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
          )
        );
        toast.success("Todo has been updated successfully!");
        setCurrentTask(null);
      } else {
        /** ----------------ADD TODO QUERY------------------- */
        const newTask = {
          title: todo.title,
          description: todo.description,
          completed: false,
          userId: currentUser.uid,
        };
        await todoCRUDServiceInstance.addTodo(newTask);
        setFirebaseTodoList((prevTaskList) => [newTask, ...prevTaskList]);

        await getTodos();
        toast.success("Todo has been added successfully!");

        // dispatch(sortTodoList("all"));
      }
      setNewTask({ title: "", description: "" });
      toggleModal();
    } catch (error) {
      console.error("Error in AddUpdateTaskHandler:", error);
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  /** ----------------DELETE TODO QUERY------------------- */

  const deleteTaskHandler = async () => {
    setLoading(true);
    try {
      await todoCRUDServiceInstance.deleteTodo(deleteTaskId);
      const updatedTaskList = firebaseTodoList.filter(
        (task) => task.id !== deleteTaskId
      );
      setFirebaseTodoList(updatedTaskList);
      toast.success("Todo has been deleted!");
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }

    // dispatch(setTodoList(updatedTaskList));

    /**We need to set our updatedTaskList to localstorage as redux state got empty but still we have last todo in localstorage that fills redux state again on refresh */
    // localStorage.setItem("todoList", JSON.stringify(updatedTaskList));
    toggleConfirmationModal();
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
          addTaskHandler={AddUpdateTaskHandler}
          toggleModal={toggleModal}
          currentTask={currentTask}
          setCurrentTask={setCurrentTask}
          loading={loading}
        />
      )}

      {showConfirmationModal && (
        <DeleteTaskModal
          toggleConfirmationModal={toggleConfirmationModal}
          deleteTaskHandler={deleteTaskHandler}
          setTaskList={setFirebaseTodoList}
          setLoading={setLoading}
          loading={loading}
        />
      )}

      <main className="mx-auto max-w-4xl flex justify-center align-middle section-min-height dark:bg-slate-900">
        {loading ? (
          <div className="flex justify-center items-center">
            <LoadingSpinner loading={loading} />
          </div>
        ) : firebaseTodoList && firebaseTodoList.length > 0 ? (
          <TaskList
            getTodos={getTodos}
            toggleModal={toggleModal}
            onDeleteTask={onDeleteTask}
            taskList={firebaseTodoList}
            setTaskList={setFirebaseTodoList}
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

export default HomePage;
