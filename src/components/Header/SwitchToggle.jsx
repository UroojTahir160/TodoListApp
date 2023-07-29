import React, { useEffect, useState } from "react";


/**
 * 
 * @returns - This component represents a toggle button for switching between light and dark themes. 
 */

export const SwitchToggle = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "system"
  );

  const isThemeDark = theme == "dark";

  /**used to check whether the user's system prefers a dark color scheme or not. */
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

  const handleThemeToggle = () => {
    setTheme(theme == "dark" ? "light" : "dark");
  };

  /**
This function checks if the user has explicitly chosen dark mode or if the user's system preference is set to dark mode.
If dark mode is detected, it sets the class "dark" on the root HTML element, indicating that the dark mode styles should be applied, and updates the theme state to "dark". Otherwise, it removes the "dark" class and updates the theme state to "light".
 */
  const onWindowMatch = () => {
    if (
      localStorage.theme == "dark" ||
      (darkQuery.matches && !("theme" in localStorage))
    ) {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    }
  };

  useEffect(() => {
    switch (theme) {
      case "dark":
        localStorage.setItem("theme", theme);
        onWindowMatch();
        break;
      case "light":
        localStorage.setItem("theme", theme);
        onWindowMatch();
        break;
      default:
        break;
    }
  }, [theme]);

  /* The code snippet is adding an event listener to the `darkQuery` object, which represents a media
query for the user's preferred color scheme. When the color scheme changes from user's system, the event listener is
triggered. */
  darkQuery.addEventListener("change", (e) => {
    if ("theme" in localStorage) {
      if (e.matches) {
        document.documentElement.classList.add("dark");
        setTheme("dark");
      } else {
        document.documentElement.classList.remove("dark");
        setTheme("light");
      }
    }
  });

  return (
    <button
      className={`relative inline-flex items-center py-1 xs:py-1.5 px-2 rounded-full transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus:outline-none ${
        isThemeDark
          ? "bg-slate-700 text-slate-400 focus-visible:ring-slate-500"
          : "bg-primary-500 text-primary-200 focus-visible:ring-primary-600"
      }`}
      id="theme-toggle"
      role="switch"
      type="button"
      tabIndex="0"
      aria-checked={isThemeDark}
      data-headlessui-state={isThemeDark ? "checked" : ""}
      onClick={handleThemeToggle}
    >
      <span className="sr-only">Toggle dark mode</span>
      <svg
        width="24"
        height="24"
        fill="none"
        aria-hidden="true"
        className={`transform transition-transform scale-${
          isThemeDark ? "100" : "0"
        } duration-300`}
      >
        <path
          d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
        <path
          d="M12 4v1M18 6l-1 1M20 12h-1M18 18l-1-1M12 19v1M7 17l-1 1M5 12H4M7 7 6 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
      <svg
        width="24"
        height="24"
        fill="none"
        aria-hidden="true"
        className={`ml-3.5 transform transition-transform scale-${
          isThemeDark ? "0" : "100"
        } duration-500`}
      >
        <path
          d="M18 15.63c-.977.52-1.945.481-3.13.481A6.981 6.981 0 0 1 7.89 9.13c0-1.185-.04-2.153.481-3.13C6.166 7.174 5 9.347 5 12.018A6.981 6.981 0 0 0 11.982 19c2.67 0 4.844-1.166 6.018-3.37ZM16 5c0 2.08-.96 4-3 4 2.04 0 3 .92 3 3 0-2.08.96-3 3-3-2.04 0-3-1.92-3-4Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
      <span
        className={`absolute top-0.5 left-0.5 bg-white w-7 xs:w-8 h-7 xs:h-8 rounded-full flex items-center justify-center transition duration-500 transform ${
          isThemeDark ? "translate-x-[2.625rem]" : ""
        }`}
      >
        <svg
          width="24"
          height="24"
          fill="none"
          aria-hidden="true"
          className={`flex-none transition duration-500 transform text-primary-500 ${
            isThemeDark ? "opacity-0 scale-0" : "opacity-100 scale-100"
          }`}
        >
          <path
            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
          <path
            d="M12 4v1M18 6l-1 1M20 12h-1M18 18l-1-1M12 19v1M7 17l-1 1M5 12H4M7 7 6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
        <svg
          width="24"
          height="24"
          fill="none"
          aria-hidden="true"
          className={`flex-none -ml-6 transition duration-500 transform text-slate-700 ${
            isThemeDark ? "opacity-100 scale-100" : "opacity-0 scale-0"
          }`}
        >
          <path
            d="M18 15.63c-.977.52-1.945.481-3.13.481A6.981 6.981 0 0 1 7.89 9.13c0-1.185-.04-2.153.481-3.13C6.166 7.174 5 9.347 5 12.018A6.981 6.981 0 0 0 11.982 19c2.67 0 4.844-1.166 6.018-3.37ZM16 5c0 2.08-.96 4-3 4 2.04 0 3 .92 3 3 0-2.08.96-3 3-3-2.04 0-3-1.92-3-4Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </span>
    </button>
  );
};
