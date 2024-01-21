import React, { useEffect, useRef } from "react";

import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export const DeleteTaskModal = ({
  toggleConfirmationModal,
  deleteTaskHandler,
  loading,
}) => {
  const modelContainerRef = useRef(null);
  // const toDoList = useSelector((state) => state.todo.todoList);
  // const dispatch = useDispatch();

  /* The `useEffect` hook in this code is used to add an event listener to the document for handling
  outside clicks for modal. */
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        modelContainerRef.current &&
        !modelContainerRef.current.contains(event.target) &&
        !document.getElementById("deleteTaskButton")
      ) {
        toggleConfirmationModal();
      }
    };
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-500 ease-out z-10 "
      ref={modelContainerRef}
    >
      <div className="border px-8 py-4 rounded-md bg-white dark:bg-slate-800 dark:border-slate-700 w-[85%] sm:w-4/6 md:w-3/6 lg:w-2/5 xl:w-2/6 ">
        <h2 className="font-Poppins font-semibold text-lg sm:text-xl text-black dark:text-white mb-4">
          Delete Task
        </h2>
        <p className="text-md mb-4 text-black dark:text-white">
          Are you sure you want to delete this todo?
        </p>

        <div className="gap-3 flex flex-row justify-end mt-4">
          <button
            className="border border-primary-900 text-primary-900 dark:border-secondary-400 dark:text-secondary-400 px-6 py-2 rounded-md font-Poppins w-fit self-center hover:bg-primary-100 dark:hover:text-primary-900 transition duration-300 ease-in-out"
            onClick={toggleConfirmationModal}
          >
            Cancel
          </button>
          <button
            className="bg-primary-700 flex items-center text-primary-50 px-6 py-2 rounded-md font-Poppins w-fit self-center hover:bg-primary-600 transition duration-300 ease-in-out"
            onClick={() => deleteTaskHandler()}
          >
            {loading && (
              <LoadingSpinner
                loading={loading}
                className={"h-4 w-4 mr-2"}
                color="white"
              />
            )}
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
