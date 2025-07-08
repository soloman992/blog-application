import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function useAutoLogout(timeoutMinutes = 15) {
  const navigate = useNavigate();

  useEffect(() => {
    let logoutTimer;

    const resetTimer = () => {
      clearTimeout(logoutTimer);
      logoutTimer = setTimeout(() => {
        localStorage.removeItem("token");
        alert("You have been logged out due to inactivity.");
        window.location.href = "/blog-application/login";
      }, timeoutMinutes * 60 * 1000);
    };

    const events = ["mousemove", "keydown", "click", "scroll"];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    resetTimer(); // Start timer on mount

    return () => {
      clearTimeout(logoutTimer);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [navigate, timeoutMinutes]);
}

export default useAutoLogout;