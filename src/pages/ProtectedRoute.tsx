import { useEffect, useState } from "react";
import { useUser } from "../context/userContext";
import { Outlet, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const ProtectedRoute = () => {
  const { user, isLoading } = useUser();
  const navigate = useNavigate();
  const [localLoading, setLocalLoading] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      setLocalLoading(false);
      
      if (!user) {
        navigate("/", { 
          replace: true,
          state: { from: window.location.pathname }
        });
      }
    }
  }, [user, isLoading, navigate]);

  if (isLoading || localLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 text-pink-500 animate-spin mx-auto" />
          <p className="text-gray-300 text-lg">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return user ? <Outlet /> : null;
};

export default ProtectedRoute;
