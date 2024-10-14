import React, { useState, useEffect } from "react";
import ff from "../asset/ff1.jpg";
import pb from "../asset/pb1.jpg";
import "./loginSignupComp.css"; // Import your CSS file
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
// import { setSignupData, sendOtp } from "./yourReduxSlice";
import { useNavigate } from "react-router-dom";
import { sendOtp } from "../services/authAPI";
import { setSignupData } from "../slices/authSlice";

const LoginSignupComp = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(`url(${ff})`);
  useEffect(() => {
    // Array of background image URLs
    const images = [`url(${pb})`, `url(${ff})`];

    let index = 0;
    const changeBackground = () => {
      index = (index + 1) % images.length;
      setBackgroundImage(images[index]);
    };

    const intervalId = setInterval(changeBackground, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const toggleForm = () => {
    setIsSignup(!isSignup);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitSignupForm = async (data) => {
    try {
      // Dispatch signup data to the slice
      dispatch(setSignupData(data));

      // Send OTP to the user for verification
      await dispatch(sendOtp(data.email)); // Assuming sendOtp returns a promise
      reset(); // Reset form after submission
    } catch (error) {
      console.error("Error sending OTP:", error);
      // Handle any error (optional)
    }
  };

  return (
    <div
      className="section flex items-center justify-center relative w-full h-full min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: backgroundImage,
        transition: "background-image 1s ease-in-out",
      }}
    >
      <div className="container">
        <div className="flex justify-center space-x-4 my-4">
          <span
            className={`auth-toggle-btn ${
              !isSignup ? "active-btn" : "inactive-btn"
            }`}
            onClick={toggleForm}
          >
            Log In
          </span>
          <span
            className={`auth-toggle-btn ${
              isSignup ? "active-btn" : "inactive-btn"
            }`}
            onClick={toggleForm}
          >
            Sign Up
          </span>
        </div>
        <div className={`card-3d-wrap ${isSignup ? "rotate" : ""}`}>
          {/* Log In Form */}
          <div className="backface-hidden absolute inset-0 bg-gray-800 text-white p-8">
            <div className="text-center">
              <h1 className="styled-heading">Good to See You Again</h1>
              <h4 className="mb-4 text-xl font-semibold">Log In</h4>
              <div className="mb-4 relative">
                <input
                  type="email"
                  className="form-style"
                  placeholder="Your Email"
                />
                <i className="input-icon uil uil-at text-yellow-300"></i>
              </div>
              <div className="mb-4 relative">
                <input
                  type="password"
                  className="form-style"
                  placeholder="Your Password"
                />
                <i className="input-icon uil uil-lock-alt text-yellow-300"></i>
              </div>
              <button className="btn">Submit</button>
            </div>
          </div>

          {/* Sign Up Form */}
          <div className="backface-hidden absolute inset-0 bg-gray-800 text-white p-5 rotate-y-180">
            <div className="text-center">
              <h4 className="mb-2 signup p-2 text-2xl font-bold">Sign Up</h4>
              <form onSubmit={handleSubmit(submitSignupForm)}>
                <div className="mb-1 relative">
                  <input
                    type="text"
                    className={`form-style ${
                      errors.fullname ? "border-red-500" : ""
                    }`}
                    placeholder="Your Full Name"
                    {...register("fullname", {
                      required: "Full name is required",
                    })}
                  />
                  <i className="input-icon uil uil-user text-yellow-300"></i>
                  {errors.fullname && (
                    <span className="text-red-500">
                      {errors.fullname.message}
                    </span>
                  )}
                </div>
                <div className="mb-1 relative">
                  <input
                    type="text"
                    className={`form-style ${
                      errors.uid ? "border-red-500" : ""
                    }`}
                    placeholder="Your U-ID"
                    {...register("uid", { required: "U-ID is required" })}
                  />
                  <i className="input-icon uil uil-user text-yellow-300"></i>
                  {errors.uid && (
                    <span className="text-red-500">{errors.uid.message}</span>
                  )}
                </div>
                <div className="mb-1 relative">
                  <input
                    type="email"
                    className={`form-style ${
                      errors.email ? "border-red-500" : ""
                    }`}
                    placeholder="Your Email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Email format is invalid",
                      },
                    })}
                  />
                  <i className="input-icon uil uil-at text-yellow-300"></i>
                  {errors.email && (
                    <span className="text-red-500">{errors.email.message}</span>
                  )}
                </div>
                <div className="mb-1 relative">
                  <input
                    type="password"
                    className={`form-style ${
                      errors.password ? "border-red-500" : ""
                    }`}
                    placeholder="Your Password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  <i className="input-icon uil uil-lock-alt text-yellow-300"></i>
                  {errors.password && (
                    <span className="text-red-500">
                      {errors.password.message}
                    </span>
                  )}
                </div>
                <div className="mb-1 relative">
                  <input
                    type="password"
                    className={`form-style ${
                      errors.confirmPassword ? "border-red-500" : ""
                    }`}
                    placeholder="Confirm Password"
                    {...register("confirmPassword", {
                      required: "Confirm Password is required",
                      // validate: (value) => {
                      //   const { password } = getValues(); 
                      //   return value === password || "Passwords do not match";
                      
                    })}
                  />
                  <i className="input-icon uil uil-lock-alt text-yellow-300"></i>
                  {errors.confirmPassword && (
                    <span className="text-red-500">
                      {errors.confirmPassword.message}
                    </span>
                  )}
                </div>
                <button type="submit" className="btn">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignupComp;
