import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { InputField } from "../../components/InputField/InputField";
import signIn from "../../firebase/auth/signin";
import { toast } from "react-toastify";
import { Checkbox } from "../../components/Checkbox/Checkbox";

const SignInPage = () => {
  const { user, setUser, googleSignIn } = useAuth();
  const navigate = useNavigate(); // Use useNavigate hook

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const data = localStorage.getItem("todo-data");
    if (data) {
      const decodedData = atob(data);
      const parsedData = JSON.parse(decodedData);
      if (parsedData.email) {
        setFormData({ ...formData, email: parsedData.email });
      }
      if (parsedData.password) {
        setFormData({ ...formData, password: parsedData.password });
      }

      if (parsedData.rememberMe)
        setFormData({ ...formData, rememberMe: parsedData.rememberMe });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const newValue = type === "checkbox" ? e.target.checked : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleLogin = (e) => {
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
      console.log(formData);
      if (formData.rememberMe) {
        localStorage.setItem(
          "todo-data",
          btoa(
            JSON.stringify({
              email: formData.email,
              password: formData.password,
              rememberMe: true,
            })
          )
        );
      } else {
        localStorage.setItem("todo-data", "");
      }
      signIn(formData.email, formData.password)
        .then((userCredential) => {
          const user = userCredential.user;
          setUser(user);

          toast.success(`Welcome ${user.email}!`);
          navigate("/");
        })
        .catch((error) => {
          toast.error(`${error.message}!`);
        });
    }
  };

  return (
    <div className="bg-gradient-to-r from-cyan-100 to-blue-200 dark:from-slate-900 dark:to-slate-900 h-screen lg:h-[calc(100vh-70px)] flex items-center justify-center">
      <div
        className={`self-center p-6 xs:p-10 flex flex-col border bg-white dark:bg-gradient-to-r dark:from-cyan-100 dark:to-blue-200 border-secondary-200 shadow-xl rounded-lg md:w-1/2 xl:w-[30%] xs:w-[80%] h-fit gap-6 m-[20px]`}
      >
        <form
          className="flex flex-col items-center gap-6 w-full"
          onSubmit={(e) => handleLogin(e)}
        >
          <h3 className="text-2xl text-primary-700 font-semibold font-Lora">
            Login
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
            <div className="flex justify-between">
              <div className="grid grid-cols-1">
                <Checkbox
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  label="Remember Me"
                />
              </div>
              <div className="justify-end flex">
                <Link
                  to={"/reset-password"}
                  className="text-sm font-normal text-dull-blue opacity-8  hover:underline text-blue-500"
                >
                  Forgot Password ?
                </Link>
              </div>
            </div>
          </div>

          <button
            className="bg-primary-500 text-white font-medium font-Poppins px-4 py-2 rounded-md hover:bg-primary-600 transition duration-300 text-sm lg:text-base focus:outline-none focus:border-primary-700 focus:ring focus:ring-primary-200 w-full"
            htmltype="submit"
          >
            Login
          </button>
        </form>
        <p className="text-gray-400 text-center">
          --------------OR--------------
        </p>
        <button
          className="hover:border-primary-700 border items-center bg-white text-primary-700 font-medium font-Poppins px-4 py-2 rounded-md transition duration-300 focus:outline-none focus:border-primary-700 focus:ring focus:ring-primary-200 w-full flex gap-4 justify-center text-sm lg:text-base"
          onClick={googleSignIn}
        >
          <FcGoogle size={24} />
          Sign In with Google
        </button>
        <p className="text-gray-800 text-center text-base font-normal">
          Don't have an account ?{" "}
          <Link to="/signup" className=" text-blue-500 underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
