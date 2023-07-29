import { AiOutlinePlus } from "react-icons/ai";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { SortCriteriaDropdown } from "./SortCriteriaDropdown";
import { EmptyTaskList } from "../EmptyTaskList/EmptyTaskList";

import {
  sortTodoList,
  taskCompletionToggle,
} from "../../redux-store/todoSlicer";
import allTasksCompleted from "../../assets/allTasksCompleted.png";
import noTasksCompleted from "../../assets/noTasksCompleted.png";

export const TaskList = ({
  taskList,
  onDeleteTask,
  setCurrentTask,
  toggleModal,
  todoListContainerRef,
}) => {
  const dispatch = useDispatch();

  const onEditTask = (task) => {
    toggleModal();
    setCurrentTask(task);
  };

  const sortCriteria = useSelector((state) => state.todo.sortCriteria);

  const handleSort = (selectedCriteria) => {
    dispatch(sortTodoList(selectedCriteria));
  };

  /** currentTodoList is used to render all the todos that are stored in localstorage*/
  const currentTodoList = taskList.filter((todo) => {
    if (sortCriteria === "all") return true;
    else if (sortCriteria === "completed" && todo.completed) return true;
    else if (sortCriteria === "pending" && !todo.completed) return true;
    else return false;
  });

  // const sortedTasks = currentTodoList.sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1));

  return (
    <div className="flex flex-col py-10 w-3/4 ">
      <div className="flex flex-col gap-4 xs:flex-row justify-between h-fit w-full mb-14">
        <h2 className="text-3xl font-semibold font-Lora text-primary-700">
          Tasks
        </h2>
        <div className="flex xs:flex-row gap-2 flex-col">
          <SortCriteriaDropdown handleSort={handleSort} />

          <button
            className="bg-primary-700 text-primary-50 px-4 py-2 rounded-md font-Poppins self-center hover:bg-primary-600 transition duration-300 ease-in-out w-fit flex items-center"
            onClick={toggleModal}
            id="addTaskButton"
          >
            <AiOutlinePlus className="h-4 w-4 mr-2" />
            Add Task
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4" ref={todoListContainerRef}>
        {currentTodoList.length > 0 ? (
          currentTodoList.map((task) => (
            <div
              className={`${
                task.completed
                  ? `bg-green-200`
                  : `bg-white dark:bg-gradient-to-r dark:from-cyan-100 dark:to-blue-200 `
              }  border-l-4 border-primary-700 rounded-md p-4 flex justify-between flex-col gap-4 xs:flex-row xs:gap-0 items-start`}
              key={task.id}
            >
              <div className="flex flex-row items-center">
                <input
                  checked={task.completed}
                  type="checkbox"
                  id={task.id}
                  className="peer appearance-none w-5 h-5 mr-5 border rounded-sm focus:outline-none checked:bg-primary-700 border-primary-700 after:checked:content-['\2713'] after:checked:text-white after:inline-block after:translate-x-[30%] after:translate-y-[-16%]"
                  onChange={(e) =>
                    dispatch(
                      taskCompletionToggle({
                        id: task.id,
                        completed: e.target.checked,
                      })
                    )
                  }
                />

                <div className=" w-[175px] xs:w-auto">
                  <h3
                    className={`text-md font-semibold font-Lora  ${
                      task.completed && `line-through`
                    }`}
                  >
                    {task.title}
                  </h3>
                  <p
                    className={`${
                      task.completed ? `text-md  line-through` : `text-md `
                    }`}
                  >
                    {task.description}
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-2 self-center">
                {!task.completed && (
                  <button
                    className="bg-primary-700 text-primary-50 px-4 py-2 rounded-md font-Poppins hover:bg-primary-600 transition duration-300 ease-in-out flex align-middle"
                    onClick={() => onEditTask(task)}
                  >
                    <FaEdit className="h-5 w-4 mr-2" />
                    Edit
                  </button>
                )}

                <button
                  onClick={() => onDeleteTask(task.id)}
                  className="bg-red-600 text-primary-50 px-4 py-2 rounded-md font-Poppins hover:bg-red-500 transition duration-300 ease-in-out flex items-center"
                  id="deleteTaskButton"
                >
                  <FaTrashAlt className="h-4 w-[12px] mr-2" />
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <EmptyTaskList
            emptyImage={
              sortCriteria == "pending"
                ? allTasksCompleted
                : noTasksCompleted
            }
            title={
              sortCriteria == "pending"
                ? "No Tasks Pending Yet!"
                : "No Tasks Completed Yet!"
            }
            description={
              sortCriteria == "pending"
                ? "Hooray! You have completed all your pending tasks. Well done! If there's anything else you need to do, feel free to add new tasks!"
                : "Oops! It looks like there are no completed tasks yet. Keep up the good work and check back later to see your completed tasks."
            }
            isButtonPresent={false}
          />
        )}
      </div>
    </div>
  );
};
