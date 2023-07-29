import React, { useEffect, useRef, useState } from "react";
import { BiChevronDown } from "react-icons/bi";

/**
 * The `SortCriteriaDropdown` component is a dropdown menu that allows the user to select a sorting
 * criteria and triggers a callback function when a selection is made.
 */
export const SortCriteriaDropdown = ({ handleSort }) => {
  const sortOptions = [
    { label: "All", value: "all" },
    { label: "Completed", value: "completed" },
    { label: "Pending", value: "pending" },
  ];

  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);

  /** useRef to handle outside click of dropdown to close it */

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-[100%] xs:w-[150px]" ref={dropdownRef}>
      <div
        onClick={() => setOpen(!open)}
        className={`bg-white dark:bg-gradient-to-r dark:from-cyan-100 dark:to-blue-200 w-full p-2 flex items-center justify-between rounded ${
          !selected && "text-gray-700"
        }`}
      >
        {selected || "Filter Todos"}
        <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
      </div>
      <ul
        className={`bg-white dark:bg-gradient-to-r dark:from-cyan-100 dark:to-blue-200 mt-2 overflow-y-auto ${
          open ? "max-h-60" : "max-h-0"
        } rounded absolute w-[150px] z-5`}
      >
        {sortOptions.map((option) => (
          <li
            key={option.value}
            className={`p-3 text-sm hover:bg-primary-600 hover:text-white
              ${option.label === selected && "bg-primary-600 text-white"}
            `}
            onClick={() => {
              setSelected(option.label);
              handleSort(option.value);
              setOpen(false);
            }}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};
