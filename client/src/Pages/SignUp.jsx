import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import LaunchIcon from "@mui/icons-material/Launch";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

import { useDispatch, useSelector } from "react-redux";
import {
  registerUser,
  loginWithGoogle,
  loginWithGithub,
} from "../features/auth/authSlice";

import { toast } from "react-toastify";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Form values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");

  const { status, error, user } = useSelector((state) => state.auth);

  // Redirect if logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  // Password strength checker
  const getStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strength = getStrength(password);
  const strengthLabel = ["Weak", "Fair", "Good", "Strong"];
  const strengthColor = ["red", "orange", "gold", "green"];

  // Email sign-up + validation
  const handleEmailSignUp = (e) => {
    e.preventDefault();

    if (!displayName.trim()) return toast.error("Display name is required");
    if (!email.includes("@")) return toast.error("Enter a valid email address");
    if (password.length < 8)
      return toast.error("Password must be 8+ characters long");
    if (strength < 2) return toast.error("Password is too weak");

    dispatch(registerUser({ email, password, displayName }))
      .unwrap()
      .then(() => {
        toast.success("Account created successfully!");
        navigate("/");
      })
      .catch((err) => toast.error(err));
  };

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-center gap-10 min-h-screen bg-gray-200 px-4 lg:px-32">
      {/* LEFT SECTION */}
      <div className="w-full md:w-auto max-w-md flex flex-col gap-4 text-start text-gray-800">
        <img src="/logo-stackoverflow.png" alt="logo" className="h-8 w-3/5" />

        <p className="flex items-center gap-2">
          <QuestionAnswerIcon sx={{ fontSize: 30, color: "orange" }} />
          Get unstuck — ask a question!
        </p>

        <p className="flex items-center gap-2">
          <LocalOfferIcon sx={{ fontSize: 30, color: "orange" }} />
          Save your favorite posts, tags, and filters
        </p>

        <p className="flex items-center gap-2">
          <EmojiEventsIcon sx={{ fontSize: 30, color: "orange" }} />
          Answer questions and earn reputation
        </p>

        <p>
          Collaborate and share knowledge with a private group for FREE.{" "}
          <Link to="#" className="text-blue-600 hover:underline">
            Get Stack Overflow Internal free for up to 50 users.
          </Link>
        </p>
      </div>

      {/* RIGHT SECTION */}
      <div className="w-full md:w-[380px]">
        <div className="bg-white p-8 rounded-md shadow-sm">
          <h1 className="text-2xl font-bold text-center">
            Create your account
          </h1>

          <p className="text-xs text-center text-gray-600 mt-1 mb-3">
            By clicking “Sign up”, you agree to our{" "}
            <Link className="text-blue-500 hover:underline">
              terms of service
            </Link>{" "}
            and acknowledge you have read our{" "}
            <Link className="text-blue-500 hover:underline">
              privacy policy
            </Link>
            .
          </p>

          {/* ERROR MESSAGE */}
          {error && (
            <p className="text-red-500 text-xs mb-2 text-center">{error}</p>
          )}

          {/* NAME */}
          <label className="font-bold mb-1 block">Name</label>
          <input
            type="text"
            placeholder="Your display name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="border-2 border-gray-300 w-full rounded-md p-2 mb-3 outline-none focus:border-blue-500"
          />

          {/* EMAIL */}
          <label className="font-bold mb-1 block">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-gray-300 w-full rounded-md p-2 mb-3 outline-none focus:border-blue-500"
          />

          {/* PASSWORD */}
          <label className="font-bold mb-1 block">Password</label>
          <input
            type="password"
            placeholder="8+ characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-2 border-gray-300 w-full rounded-md p-2 outline-none focus:border-blue-500"
          />

          {/* STRENGTH METER */}
          <div className="mt-1 mb-3">
            <div className="h-2 rounded bg-gray-300">
              <div
                style={{
                  width: `${(strength / 4) * 100}%`,
                  backgroundColor: strengthColor[strength - 1] || "transparent",
                }}
                className="h-2 rounded transition-all"
              ></div>
            </div>

            {password && (
              <p className="text-xs mt-1 text-gray-700">
                Strength:{" "}
                <span
                  className="font-semibold"
                  style={{ color: strengthColor[strength - 1] }}
                >
                  {strengthLabel[strength - 1]}
                </span>
              </p>
            )}
          </div>

          <p className="text-xs text-gray-600 mb-3">
            Must contain at least 8 characters, including a letter and a number.
          </p>

          {/* SIGNUP BUTTON */}
          <button
            onClick={handleEmailSignUp}
            disabled={status === "loading"}
            className="bg-blue-600 text-white text-sm p-2 rounded-md w-full mt-1 hover:bg-blue-700 disabled:bg-blue-300"
          >
            {status === "loading" ? "Signing up..." : "Sign up"}
          </button>

          <hr className="my-4" />

          {/* GOOGLE */}
          <button
            onClick={() => dispatch(loginWithGoogle())}
            className="bg-white w-full text-center border border-gray-400 p-2 rounded-md flex items-center justify-center gap-2 shadow-sm hover:bg-gray-100 cursor-pointer"
          >
            <GoogleIcon sx={{ fontSize: 20 }} />
            Sign up with Google
          </button>

          {/* GITHUB */}
          <button
            onClick={() => dispatch(loginWithGithub())}
            className="bg-black text-white w-full text-center p-2 rounded-md flex items-center justify-center gap-2 shadow-sm hover:bg-gray-900 cursor-pointer mt-2"
          >
            <GitHubIcon sx={{ fontSize: 20 }} />
            Sign up with Github
          </button>

          {/* FACEBOOK */}
          <button
            disabled
            className="bg-blue-400 text-white w-full text-center p-2 rounded-md flex items-center justify-center gap-2 shadow-sm cursor-not-allowed mt-2"
          >
            <FacebookIcon sx={{ fontSize: 20 }} />
            Sign up with Facebook
          </button>
        </div>

        {/* FOOTER LINKS */}
        <p className="text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>

        <p className="text-sm text-gray-600 mt-1">
          Are you an employer?{" "}
          <Link className="text-blue-600 hover:underline inline-flex gap-1 items-center">
            Sign up on Talent <LaunchIcon sx={{ fontSize: 15 }} />
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
