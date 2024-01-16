/* The code is defining a React functional component called `EmptyTaskList`. It is used to render empty state of list when we have no todos created, no pending or no completed todos. */

export const EmptyTaskList = ({
  emptyImage,
  title,
  description,
  toggleModal,
  isButtonPresent,
}) => {
  return (
    <div
      className={`self-center p-6 xs:p-10 flex flex-col justify-between border bg-white dark:bg-gradient-to-r dark:from-cyan-100 dark:to-blue-200 border-secondary-200 shadow-xl rounded-lg  ${
        isButtonPresent ? "w-3/4" : "w-full md:w-5/4"
      } h-full sm:flex-row sm:h-96 gap-8 sm:gap-0 `}
    >
      <img
        src={emptyImage}
        alt="no-tasks"
        className="rounded-xl w-full sm:w-1/2 h-full sm:mr-6 self-center"
      />
      <div className="flex flex-col gap-4 sm:w-1/2 text-center justify-center w-full">
        <h3 className="text-2xl text-primary-700 font-semibold font-Lora">
          {title}
        </h3>
        <p className="text-md text-justify">{description}</p>
        {isButtonPresent && (
          <button
            className="bg-primary-700 text-primary-50 px-6 py-2 rounded-md font-Poppins w-fit self-center hover:bg-primary-600 transition duration-300 ease-in-out"
            onClick={toggleModal}
            id="createTaskButton"
          >
            Create Task
          </button>
        )}
      </div>
    </div>
  );
};
