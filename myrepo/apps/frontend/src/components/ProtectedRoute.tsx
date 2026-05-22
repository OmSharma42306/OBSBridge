import { useAuth } from "@clerk/react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }:any) => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) return <div>Loading...</div>;

  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};
