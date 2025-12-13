import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth, db } from "../../firebase";
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";

import { googleProvider, githubProvider } from "../../firebase";

/* ============================================================
   🔥 Helper: Fetch user profile from Firestore
============================================================ */
const fetchUserProfile = async (uid) => {
  const userRef = doc(db, "users", uid);
  const snap = await getDoc(userRef);
  return snap.exists() ? snap.data() : null;
};

/* ============================================================
   🔥 EMAIL REGISTER
============================================================ */
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ email, password, displayName }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // Update Firebase Auth display name
      if (displayName) {
        await updateProfile(user, { displayName });
      }

      // Save Firestore Profile
      const userProfile = {
        uid: user.uid,
        email,
        displayName,
        photoURL: user.photoURL || null,
        bio: "",
        location: "",
        website: "",
        reputation: 1,
        authProvider: "email",
        createdAt: serverTimestamp(),
      };

      await setDoc(doc(db, "users", user.uid), userProfile);

      return userProfile;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/* ============================================================
   🔥 EMAIL LOGIN
============================================================ */
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const loginResult = await signInWithEmailAndPassword(auth, email, password);

      // Fetch Firestore profile
      const profile = await fetchUserProfile(loginResult.user.uid);

      return profile;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/* ============================================================
   🔥 GOOGLE LOGIN
============================================================ */
export const loginWithGoogle = createAsyncThunk(
  "auth/loginWithGoogle",
  async (_, { rejectWithValue }) => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);

      // If new user → Create profile
      if (!docSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          bio: "",
          location: "",
          website: "",
          reputation: 1,
          authProvider: "google",
          createdAt: serverTimestamp(),
        });
      }

      return await fetchUserProfile(user.uid);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/* ============================================================
   🔥 GITHUB LOGIN
============================================================ */
export const loginWithGithub = createAsyncThunk(
  "auth/loginWithGithub",
  async (_, { rejectWithValue }) => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          bio: "",
          location: "",
          website: "",
          reputation: 1,
          authProvider: "github",
          createdAt: serverTimestamp(),
        });
      }

      return await fetchUserProfile(user.uid);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/* ============================================================
   🔥 LOGOUT
============================================================ */
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      return true;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/* ============================================================
   🔥 SLICE
============================================================ */
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null, //
    status: "idle",
    error: null,
    authChecked: false,
  },

  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      state.authChecked = true;
    },
  },

  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(registerUser.pending, (s) => {
        s.status = "loading";
      })
      .addCase(registerUser.fulfilled, (s, action) => {
        s.status = "succeeded";
        s.user = action.payload;
      })
      .addCase(registerUser.rejected, (s, action) => {
        s.status = "failed";
        s.error = action.payload;
      })

      // EMAIL LOGIN
      .addCase(loginUser.pending, (s) => {
        s.status = "loading";
      })
      .addCase(loginUser.fulfilled, (s, action) => {
        s.status = "succeeded";
        s.user = action.payload;
      })
      .addCase(loginUser.rejected, (s, action) => {
        s.status = "failed";
        s.error = action.payload;
      })

      // GOOGLE LOGIN
      .addCase(loginWithGoogle.fulfilled, (s, action) => {
        s.status = "succeeded";
        s.user = action.payload;
      })
      .addCase(loginWithGoogle.rejected, (s, action) => {
        s.status = "failed";
        s.error = action.payload;
      })

      // GITHUB LOGIN
      .addCase(loginWithGithub.fulfilled, (s, action) => {
        s.status = "succeeded";
        s.user = action.payload;
      })
      .addCase(loginWithGithub.rejected, (s, action) => {
        s.status = "failed";
        s.error = action.payload;
      })

      // LOGOUT
      .addCase(logoutUser.fulfilled, (s) => {
        s.user = null;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
