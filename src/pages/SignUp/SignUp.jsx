import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { InputField } from "../../components/InputField/InputField";
import signUp from "../../firebase/auth/signup";
import { toast } from "react-toastify";

const SignUpPage = () => {
  const { googleSignIn } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Validate the form
    const errors = {};
    let isValid = true;

    Object.keys(formData).forEach((fieldName) => {
      const value = formData[fieldName];

      // Check if the field is a string and empty
      if (typeof value === "string" && value.trim() === "") {
        errors[fieldName] = "This field is required";
        isValid = false;
      }
    });

    setFormErrors(errors);

    if (isValid) {
      signUp(formData.email, formData.password)
        .then((userCredential) => {
          navigate("/");
          toast.success("User has registered successfully!");
        })
        .catch((error) => {
          toast.error(`${error.message}!`);
        });
    }
  };

  return (
    <div className="bg-gradient-to-r from-cyan-100 to-blue-200 dark:from-slate-900 dark:to-slate-900 h-full lg:h-[calc(100vh-70px)] flex items-center justify-center">
      <div
        className={`self-center p-6 xs:p-10 flex flex-col border bg-white dark:bg-gradient-to-r dark:from-cyan-100 dark:to-blue-200 border-secondary-200 shadow-xl rounded-lg my-[50px] mx-[30px] md:[65%] lg:w-1/2 xl:w-[40%] xs:w-[80%] h-fit gap-6 items-center`}
      >
        <form
          className="flex flex-col items-center gap-6 w-full"
          onSubmit={(e) => handleSignUp(e)}
        >
          <h3 className="text-2xl text-primary-700 font-semibold font-Lora">
            Sign Up
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <div className="flex flex-col gap-3 w-full">
              <InputField
                label={"First Name*"}
                placeholder={"Enter First Name"}
                type={"text"}
                value={formData.firstName}
                onChange={handleChange}
                name={"firstName"}
              />
              {formErrors.firstName && (
                <span className="text-red-500 text-sm">
                  {formErrors.firstName}*
                </span>
              )}
            </div>
            <div className="flex flex-col gap-3 w-full">
              <InputField
                label={"Last Name*"}
                placeholder={"Enter Last Name"}
                type={"text"}
                value={formData.lastName}
                onChange={handleChange}
                name={"lastName"}
              />
              {formErrors.lastName && (
                <span className="text-red-500 text-sm">
                  {formErrors.lastName}*
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <div className="flex flex-col gap-3 w-full">
              <InputField
                label={"Email*"}
                placeholder={"Enter Email"}
                type={"email"}
                value={formData.email}
                onChange={handleChange}
                name={"email"}
              />
              {formErrors.email && (
                <span className="text-red-500 text-sm">
                  {formErrors.email}*
                </span>
              )}
            </div>

            <div className="flex flex-col gap-3 w-full">
              <InputField
                label={"Password*"}
                placeholder={"Enter Password"}
                type={"password"}
                value={formData.password}
                onChange={handleChange}
                name={"password"}
              />
              {formErrors.password && (
                <span className="text-red-500 text-sm">
                  {formErrors.password}*
                </span>
              )}
            </div>
          </div>
          <button
            className="bg-primary-500 text-white font-medium font-Poppins px-4 py-2 rounded-md hover:bg-primary-600 transition duration-300 text-sm lg:text-base focus:outline-none focus:border-primary-700 focus:ring focus:ring-primary-200 w-fit"
            htmltype="submit"
          >
            Create Account
          </button>
        </form>
        <p className="text-gray-400 text-center">
          --------------OR--------------
        </p>
        <button
          className="hover:border-primary-700 border bg-white text-primary-700 font-medium font-Poppins px-4 py-2 rounded-md transition duration-300 focus:outline-none focus:border-primary-700 focus:ring focus:ring-primary-200 w-fit flex gap-4 justify-center items-center text-xs sm:text-sm lg:text-base"
          onClick={googleSignIn}
        >
          <FcGoogle size={24} />
          Sign Up with Google
        </button>
        <p className="text-gray-800 text-center text-base">
          Already have an account ?{" "}
          <Link to="/signin" className=" text-blue-500 underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
