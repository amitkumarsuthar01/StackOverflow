import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import PageLayout from "./components/PageLayout";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import AskQuestion from "./Pages/AskQuestion";
import ViewQuestion from "./components/ViewQuestion";
import QuestionList from "./components/QuestionList";
import Sidebar from "./components/Sidebar";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { setUser } from "./features/auth/authSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./Pages/Profile";
import EditProfile from "./Pages/EditProfile";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const [leftOpen, setLeftOpen] = useState(false);
  const location = useLocation();

  const hideFooter =
    location.pathname === "/login" || location.pathname === "/signup";

  const dispatch = useDispatch();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          })
        );
      } else {
        dispatch(setUser(null));
      }
    });
    return () => unsub();
  }, [dispatch]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <Header leftOpen={leftOpen} setLeftOpen={setLeftOpen} />

      <div className="md:hidden">
        <Sidebar open={leftOpen} setLeftOpen={setLeftOpen} />
      </div>

      <Routes>
        {/* Layout wrapper */}
        <Route
          path="/"
          element={<PageLayout leftOpen={leftOpen} setLeftOpen={setLeftOpen} />}
        >
          {/* Home = Question List */}
          <Route index element={<QuestionList />} />

          {/* View Question inside layout */}
          <Route path="view-question/:id" element={<ViewQuestion />} />

          {/* Ask Question inside layout */}
        </Route>

        {/* Pages WITHOUT layout */}

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected Routes */}
        <Route
          path="ask-question"
          element={
            <ProtectedRoute>
              <AskQuestion />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />
      </Routes>

      {!hideFooter && <Footer />}
    </>
  );
}
