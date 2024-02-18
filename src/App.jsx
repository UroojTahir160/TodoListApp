import React from "react";
import { Routes, Route } from "react-router-dom";
import SignInPage from "./pages/SignIn/SignIn";
import { Header } from "./components/Header/Header";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./components/ErrorFallback/ErrorFallback";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import { Navigate } from "react-router-dom";
import HomePage from "./pages/Home/Home";
import SignUpPage from "./pages/SignUp/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import ForgetPasswordPage from "./pages/ForgetPassword/ForgetPassword";
import ResetPasswordPage from "./pages/ResetPassword/ResetPassword";

function App() {
  const { user } = useAuth();

  return (
    <>
      <Header />
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => window.location.reload()}
      >
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signin"
            element={
              user?.emailVerified ? <Navigate to="/" replace /> : <SignInPage />
            }
          />
          <Route
            path="/signup"
            element={
              user?.emailVerified ? (
                <Navigate to="/signin" replace />
              ) : (
                <SignUpPage />
              )
            }
          />
          <Route
            path="/forget-password"
            element={
              user ? <Navigate to="/" replace /> : <ForgetPasswordPage />
            }
          />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Routes>
      </ErrorBoundary>
      <ToastContainer />
    </>
  );
}

export default App;
