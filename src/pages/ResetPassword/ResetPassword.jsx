import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { InputField } from "../../components/InputField/InputField";
import forgetPassword from "../../firebase/auth/forgetPassword";
import { toast } from "react-toastify";

const ResetPasswordPage = () => {
  const { user, setUser, googleSignIn } = useAuth();
  const navigate = useNavigate(); // Use useNavigate hook

  const [formData, setFormData] = useState({
    email: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleReset = (e) => {
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
      forgetPassword(formData.email)
        .then((userCredential) => {
          toast.success(`Reset Link has been sent to  ${formData.email}!`);
          navigate("/signin");
        })
        .catch((error) => {
          toast.error(`${error.message}!`);
        });
    }
  };

  return (
    <div className="bg-gradient-to-r from-cyan-100 to-blue-200 dark:from-slate-900 dark:to-slate-900 h-[calc(100vh-70px)] flex items-center justify-center">
      <div
        className={`self-center p-6 xs:p-10 flex flex-col border bg-white dark:bg-gradient-to-r dark:from-cyan-100 dark:to-blue-200 border-secondary-200 shadow-xl rounded-lg md:w-1/2 xl:w-[30%] xs:w-[80%] h-fit gap-6 m-[16px]`}
      >
        <form
          className="flex flex-col items-center gap-6 w-full"
          onSubmit={(e) => handleReset(e)}
        >
          <h3 className="text-2xl text-primary-700 font-semibold font-Lora">
            Forget Password
          </h3>

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
              <span className="text-red-500 text-sm">{formErrors.email}*</span>
            )}
          </div>

          <button
            className="bg-primary-500 text-white font-medium font-Poppins px-4 py-2 rounded-md hover:bg-primary-600 transition duration-300 text-sm lg:text-base focus:outline-none focus:border-primary-700 focus:ring focus:ring-primary-200 w-full"
            htmltype="submit"
          >
            Send Password Reset Link
          </button>
        </form>
        <p className="text-gray-400 text-center">
          -------------------OR-------------------
        </p>

        <p className="text-gray-800 text-center text-base font-normal">
          Already have an account ?{" "}
          <Link to="/signin" className=" text-blue-500 underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
