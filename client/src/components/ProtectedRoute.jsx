import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { user, authChecked } = useSelector((s) => s.auth);

  if (!authChecked) return null; // wait for Firebase to check status

  if (!user) return <Navigate to="/login" replace />;

  return children;
}
