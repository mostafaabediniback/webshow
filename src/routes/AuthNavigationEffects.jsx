import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { hydrateAuthStore } from "../store/useAuthStore";

function AuthNavigationEffects() {
  const navigate = useNavigate();

  useEffect(() => {
    hydrateAuthStore();

    const handleUnauthorized = () => {
      hydrateAuthStore();
      navigate("/login", { replace: true });
    };

    const handleStorageChange = () => {
      hydrateAuthStore();
    };

    window.addEventListener("auth:unauthorized", handleUnauthorized);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("auth:unauthorized", handleUnauthorized);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [navigate]);

  return null;
}

export default AuthNavigationEffects;
