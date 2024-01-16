export const ErrorFallback = ({ error, resetErrorBoundary }) => {
  console.log('error: ', error);
  return (
    <div className="bg-gradient-to-r from-cyan-100 to-blue-200 dark:from-slate-900 dark:to-slate-900 h-[calc(100vh-70px)] flex items-center justify-center">
      <div
        className={`self-center p-6 xs:p-10 flex flex-col border bg-white dark:bg-gradient-to-r dark:from-cyan-100 dark:to-blue-200 border-secondary-200 shadow-xl rounded-lg md:w-1/2 xl:w-[30%] xs:w-[80%] h-fit gap-6`}
      >
        <h1>Oops! Something went wrong.</h1>
        <p>{error.message}</p>
        <button
          onClick={resetErrorBoundary}
          className="bg-primary-500 text-white font-medium font-Poppins px-4 py-2 rounded-md hover:bg-primary-600 transition duration-300 text-sm lg:text-base focus:outline-none focus:border-primary-700 focus:ring focus:ring-primary-200 w-full"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};
