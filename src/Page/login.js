import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Field from "../UI/Form/Input/Field";
import { setFiledLogin } from "../Redux/AlertReducer";
import { Helper } from "../tools/Helper";
import { api_Routes } from "../tools/api_Routes";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(""); // State for error messages
  const [loading, setLoading] = useState(false); // State for button loader

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Show loader
    setError(""); // Clear previous errors

    const formData = new FormData(event.target);
    const inputData = {
      email: formData.get("Email"),
      password: formData.get("Password"),
    };

    try {
      const { response, message } = await Helper.Post({
        url: api_Routes.Auth.login,
        data: inputData,
      });

      if (response) {
        localStorage.setItem("token", response.token); 
        localStorage.setItem("name", response.name); 

        navigate("/Home"); 
        dispatch(setFiledLogin(false)); 
      } else {
        throw new Error(message || "Invalid credentials. Please try again.");
      }
    } catch (error) {
      setError("Login Failed!");
      dispatch(setFiledLogin(true)); // Update Redux state for login failure
    } finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="m-auto p-6 bg-white rounded-lg shadow-lg w-full max-w-xl">
        <h3 className="text-2xl font-semibold text-center mb-2">
          Login to Group Chat
        </h3>
        <p className="text-center text-gray-600 mb-6">
          Please enter your email and password
        </p>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Field
            label="Email"
            placeholder="Enter your email"
            name="Email"
            type="email"
          />
          <Field
            label="Password"
            placeholder="Enter your password"
            name="Password"
            type="password"
          />
          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-lg text-white font-semibold transition duration-200 ${loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
              }`}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 text-white mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Logging in...
              </div>
            ) : (
              "Login"
            )}
          </button>


        </form>
        <p className="text-center text-gray-500 mt-4">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;

