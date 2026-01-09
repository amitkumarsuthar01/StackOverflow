import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { syncUserToMongo } from "./features/auth/authSlice";
import { useEffect } from "react";

function AuthWatcher({ children }) {
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await syncUserToMongo();
      }
    });

    return () => unsub();
  }, []);

  return children;
}

export default function AppProviders({ children }) {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AuthWatcher>{children}</AuthWatcher>
      </BrowserRouter>
    </Provider>
  );
}
