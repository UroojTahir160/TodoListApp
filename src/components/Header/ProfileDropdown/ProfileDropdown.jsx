import { Link } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../context/AuthContext";

export const ProfileDropdown = ({ photoURL }) => {
  const { signOut } = useAuth();

  const userProfileDropdownLinks = ["Help Center", "Settings"];

  const dropdownRef = useRef(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const onMenuItemClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  }

  const signOutHandler = () => {
    signOut();
    onMenuItemClick();
  }

  return (
    <div className="relative group cursor-pointer" ref={dropdownRef}>
      <img
        src={photoURL}
        alt="profile-pic"
        width={43}
        height={43}
        className={`rounded-full border border-gray-400 bg-gray-400 ${
          !photoURL && "opacity-50"
        }`}
        onClick={toggleDropdown}
      />
      {isDropdownOpen && (
        <div className="absolute py-4 px-4 right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
          <ul>
            {userProfileDropdownLinks.map((menuItem, index) => (
              <li
                className="px-4 py-[8px] hover:bg-gray-100 place rounded-xl"
                key={index}
                onClick={onMenuItemClick}
              >
                <Link to="/" className="text-black text-md font-normal">
                  {menuItem}
                </Link>
              </li>
            ))}

            <div className="h-[0.5px] my-3 opacity-[0.20] bg-gray-700"></div>

            <li className="px-4 py-[8px] hover:bg-gray-100  place rounded-xl" onClick={signOutHandler}>
              <Link
                to="/"
                className="text-black text-md font-normal"
              >
                Sign Out
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
