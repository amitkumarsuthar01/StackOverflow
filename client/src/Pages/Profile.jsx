import React from "react";
import { useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  // First letter avatar
  const firstLetter = user.displayName
    ? user.displayName.charAt(0).toUpperCase()
    : user.email.charAt(0).toUpperCase();

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* TOP SECTION */}
      <div className="flex flex-col md:flex-row md:items-start gap-6 border-b pb-6">

        {/* AVATAR (Initial only) */}
        <div className="h-28 w-28 rounded-md border shadow-sm bg-orange-500 flex items-center justify-center">
          <span className="text-white text-5xl font-bold">
            {firstLetter}
          </span>
        </div>

        {/* USER INFO */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold">
            {user.displayName || "User"}
          </h1>

          <p className="text-gray-700">{user.email}</p>

          <p className="mt-2 text-gray-600">
            Location:{" "}
            <span className="font-medium">
              {user.location || "Not set"}
            </span>
          </p>

          <p className="text-gray-600">
            Member since:{" "}
            <span className="font-medium">
              {user.createdAt?.seconds
                ? new Date(user.createdAt.seconds * 1000).toDateString()
                : "Unknown"}
            </span>
          </p>

          {user.website && (
            <p className="text-blue-600 mt-1">
              <a href={user.website} target="_blank" rel="noreferrer">
                {user.website}
              </a>
            </p>
          )}

          {/* EDIT PROFILE */}
          <Link
            to="/edit-profile"
            className="inline-flex items-center gap-1 mt-3 px-3 py-1 rounded-md text-sm bg-gray-100 hover:bg-gray-200 border"
          >
            <EditIcon sx={{ fontSize: 18 }} />
            Edit profile
          </Link>
        </div>

        {/* STATS PANEL */}
        <div className="flex gap-8 md:flex-col text-center">
          <div>
            <p className="font-bold text-xl">{user.reputation || 1}</p>
            <p className="text-gray-600 text-sm">Reputation</p>
          </div>
          <div>
            <p className="font-bold text-xl">{user.answerCount || 0}</p>
            <p className="text-gray-600 text-sm">Answers</p>
          </div>
          <div>
            <p className="font-bold text-xl">{user.questionCount || 0}</p>
            <p className="text-gray-600 text-sm">Questions</p>
          </div>
        </div>
      </div>

      {/* TABS SECTION */}
      <div className="flex gap-6 mt-6 border-b pb-2 text-gray-600 font-medium">
        <button className="pb-2 border-b-2 border-blue-600 text-blue-600">
          Profile
        </button>
        <button className="hover:text-blue-600">Activity</button>
        <button className="hover:text-blue-600">Questions</button>
        <button className="hover:text-blue-600">Answers</button>
        <button className="hover:text-blue-600">Tags</button>
        <button className="hover:text-blue-600">Badges</button>
      </div>

      {/* ABOUT SECTION */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-3">About</h2>
        <p className="text-gray-700 whitespace-pre-line">
          {user.bio || "No bio added yet."}
        </p>
      </div>

      {/* RECENT ACTIVITY */}
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-3">Recent Activity</h2>
        <p className="text-gray-700">No recent activity.</p>
      </div>
    </div>
  );
};

export default Profile;
