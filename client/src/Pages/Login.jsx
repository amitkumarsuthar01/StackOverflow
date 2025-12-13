import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import LaunchIcon from "@mui/icons-material/Launch";

import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  loginWithGoogle,
  loginWithGithub,
} from "../features/auth/authSlice";

import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Local state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Redux state
  const { status, user } = useSelector((state) => state.auth);

  // Redirect when logged in
  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  // Email login handler with toast validation
  const handleEmailLogin = (e) => {
    e.preventDefault();

    if (!email.trim()) return toast.error("Email is required");
    if (!email.includes("@")) return toast.error("Enter a valid email");

    if (!password.trim()) return toast.error("Password is required");

    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        toast.success("Logged in successfully!");
        navigate("/");
      })
      .catch((err) => {
        toast.error(err || "Login failed");
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 px-4">
      {/* Logo */}
      <Link to="/" className="mb-6">
        <img src="/short-ogo-stackoverflow.png" alt="logo" className="h-12" />
      </Link>

      {/* GOOGLE LOGIN */}
      <button
        onClick={() => dispatch(loginWithGoogle())}
        className="bg-white w-72 text-center p-2 rounded-md flex items-center justify-center gap-2 shadow-sm hover:bg-gray-100 cursor-pointer"
      >
        <GoogleIcon sx={{ fontSize: 20 }} />
        <span>Login with Google</span>
      </button>

      {/* GITHUB LOGIN */}
      <button
        onClick={() => dispatch(loginWithGithub())}
        className="bg-black text-white w-72 text-center p-2 rounded-md flex items-center justify-center gap-2 shadow-sm hover:bg-gray-900 cursor-pointer mt-2"
      >
        <GitHubIcon sx={{ fontSize: 20 }} />
        <span>Login with Github</span>
      </button>

      {/* FACEBOOK LOGIN DISABLED */}
      <button
        disabled
        className="bg-blue-400 text-white w-72 text-center p-2 rounded-md flex items-center justify-center gap-2 shadow-sm cursor-not-allowed mt-2"
      >
        <FacebookIcon sx={{ fontSize: 20 }} />
        <span>Login with Facebook</span>
      </button>

      {/* EMAIL LOGIN FORM */}
      <div className="bg-white w-72 p-4 rounded-md mt-4 shadow-sm">

        <label className="font-bold mb-1 block">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border-2 border-gray-300 w-full rounded-md p-2 mb-3 outline-none focus:border-blue-500"
        />

        <div className="flex justify-between items-center">
          <label className="font-bold">Password</label>
          <p className="text-blue-600 text-xs cursor-pointer hover:underline">
            Forget password?
          </p>
        </div>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border-2 border-gray-300 w-full rounded-md p-2 mt-1 outline-none focus:border-blue-500"
        />

        <button
          onClick={handleEmailLogin}
          disabled={status === "loading"}
          className="bg-blue-600 text-white text-sm p-2 rounded-md w-full mt-4 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          {status === "loading" ? "Logging in..." : "Log in"}
        </button>

        <hr className="mt-4" />
      </div>

      {/* LINKS */}
      <p className="text-sm text-gray-600 mt-4">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-600 hover:underline">
          Sign up
        </Link>
      </p>

      <p className="text-sm text-gray-600 mt-1">
        Are you an employer?{" "}
        <Link to="/signup" className="text-blue-600 hover:underline inline-flex gap-1 items-center">
          Sign up on Talent
          <LaunchIcon sx={{ fontSize: 15 }} />
        </Link>
      </p>
    </div>
  );
};

export default Login;
