import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

export default function Redirect() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }, [navigate]);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2>You are not authorized to access this page</h2>
      <p>Redirecting to home page...</p>
      <FaSpinner className="animate-spin text-4xl" />
    </div>
  );
}
