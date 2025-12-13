import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { setUser } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const [displayName, setDisplayName] = useState(user.displayName);
  const [bio, setBio] = useState(user.bio || "");
  const [location, setLocation] = useState(user.location || "");
  const [website, setWebsite] = useState(user.website || "");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);

      // Simple avatar from first letter
      const avatarLetter = displayName ? displayName[0].toUpperCase() : "U";
      const avatarURL = `https://ui-avatars.com/api/?name=${avatarLetter}&background=random`;

      const updatedData = {
        displayName,
        bio,
        location,
        website,
        photoURL: avatarURL,
      };

      // 🔥 Update Firestore
      await updateDoc(doc(db, "users", user.uid), updatedData);

      // 🔥 Update Firebase Auth displayName + photo
      await updateProfile(auth.currentUser, {
        displayName,
        photoURL: avatarURL,
      });

      // 🔥 Update Redux
      dispatch(setUser({ ...user, ...updatedData }));

      toast.success("Profile updated successfully!");
      navigate("/profile");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>

      {/* DISPLAY NAME */}
      <label className="block mt-4 font-semibold">Name</label>
      <input
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        className="border p-2 rounded w-full"
      />

      {/* BIO */}
      <label className="block mt-4 font-semibold">Bio</label>
      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        className="border p-2 rounded w-full h-24"
      />

      {/* LOCATION */}
      <label className="block mt-4 font-semibold">Location</label>
      <input
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="border p-2 rounded w-full"
      />

      {/* WEBSITE */}
      <label className="block mt-4 font-semibold">Website</label>
      <input
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="border p-2 rounded w-full"
      />

      <button
        onClick={handleSave}
        disabled={loading}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-blue-400"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
};

export default EditProfile;
