import { useRef, useEffect } from "react";

/*  This component is responsible for rendering a modal that allows users to add or update a task. */
export const TaskFormModal = ({
  newTask,
  setNewTask,
  currentTask,
  setCurrentTask,
  addTaskHandler,
  toggleModal,
}) => {
  /* It handles outside clicks to close the modal. */
  const modelContainerRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        modelContainerRef.current &&
        !modelContainerRef.current.contains(event.target) &&
        //added this condition as model ref is taking Add button as event taregt so condition is not met and modal does not open
        !document.getElementById("addTaskButton") &&
        !document.getElementById("createTaskButton")
      ) {
        toggleModal();
      }
    };
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-500 ease-out z-10">
      <div
        className="border px-8 py-4 rounded-md bg-white dark:bg-slate-800 dark:border-slate-700 sm:w-4/6 md:w-3/6 lg:w-2/5 xl:w-2/6"
        ref={modelContainerRef}
      >
        <h2 className="font-Poppins font-semibold text-xl mb-4 text-black dark:text-white">
          {currentTask ? "Update Your Task" : "Add New Task"}
        </h2>
        <form
          class="flex flex-col gap-4"
          onSubmit={() => addTaskHandler(newTask)}
        >
          <div className="flex flex-col gap-2">
            <label
              for="title"
              class="text-md font-Poppins text-black dark:text-white"
            >
              Task Title<span className="text-red-500 font-semibold">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter Title"
              className="appearance-none dark:border-non border border-secondary-300 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-primary-600 text-black"
              required
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              for="description"
              class="text-md font-Poppins text-black dark:text-white"
            >
              Task Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter Description"
              className="appearance-none dark:border-non border border-secondary-300 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-primary-600 text-black"
              cols="30"
              rows="5"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
            />
          </div>

          <div className="gap-3 flex flex-row justify-end mt-4">
            <button
              className="border border-primary-900 text-primary-900 dark:border-secondary-400 dark:text-secondary-400 px-6 py-2 rounded-md font-Poppins w-fit self-center hover:bg-primary-100 dark:hover:text-primary-900 transition duration-300 ease-in-out"
              onClick={() => {
                toggleModal();
                setNewTask({ title: "", description: "" });
                setCurrentTask(null);
              }}
            >
              Cancel
            </button>
            <button
              className="bg-primary-700 text-primary-50 px-6 py-2 rounded-md font-Poppins w-fit self-center hover:bg-primary-600 transition duration-300 ease-in-out"
              htmltype="submit"
            >
              {currentTask ? "Save Changes" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
