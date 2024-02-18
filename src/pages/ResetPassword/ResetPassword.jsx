// ResetPasswordForm.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { InputField } from "../../components/InputField/InputField";
import { toast } from "react-toastify";
import resetPassword from "../../firebase/auth/resetPassword";
import { useAuth } from "../../context/AuthContext";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, setUser } = useAuth();

  useEffect(() => {
    setUser(null);
    // Extract oobCode from URL parameters
    const searchParams = new URLSearchParams(location.search);
    const oobCode = searchParams.get("oobCode");

    if (!oobCode) {
      navigate("/signin");
    }
  }, [location]);

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    // Validate the form
    const errors = {};
    let isValid = true;

    if (formData.newPassword.trim() === "") {
      errors.newPassword = "New Password is required";
      isValid = false;
    }

    if (formData.confirmPassword.trim() === "") {
      errors.confirmPassword = "Confirm Password is required";
      isValid = false;
    } else if (formData.newPassword !== formData.confirmPassword) {
      errors.confirmPassword =
        "Confirm Password and Password fields do not match!";
      isValid = false;
    }

    setFormErrors(errors);
    if (isValid) {
      const oobCode = new URLSearchParams(location.search).get("oobCode");

      resetPassword(oobCode, formData.newPassword)
        .then(() => {
          toast.success("Password reset successfully!");

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
          onSubmit={(e) => handleResetPassword(e)}
        >
          <h3 className="text-2xl text-primary-700 font-semibold font-Lora">
            Reset Password
          </h3>
          <div className="flex flex-col gap-3 w-full">
            <InputField
              label={"New Password*"}
              placeholder={"Enter New Password"}
              type={"password"}
              value={formData.newPassword}
              onChange={handleChange}
              name={"newPassword"}
            />
            {formErrors.newPassword && (
              <span className="text-red-500 text-sm">
                {formErrors.newPassword}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-3 w-full">
            <InputField
              label={"Confirm Password*"}
              placeholder={"Confirm New Password"}
              type={"password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              name={"confirmPassword"}
            />
            {formErrors.confirmPassword && (
              <span className="text-red-500 text-sm">
                {formErrors.confirmPassword}
              </span>
            )}
          </div>

          <button
            className="bg-primary-500 text-white font-medium font-Poppins px-4 py-2 rounded-md hover:bg-primary-600 transition duration-300 text-sm lg:text-base focus:outline-none focus:border-primary-700 focus:ring focus:ring-primary-200 w-full"
            htmltype="submit"
          >
            Reset Password
          </button>
        </form>
        <p className="text-gray-400 text-center">
          --------------OR--------------
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
