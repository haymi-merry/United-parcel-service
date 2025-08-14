import Form from "@/components/Form";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);
  const navigate = useNavigate();
  function handleLogin() {
    if (username === "admin" && password === "admin123") {
      Swal.fire({
        title: "Login Successful",
        text: "Welcome to the Admin Dashboard!",
        icon: "success",
        background: "#232110",
        color: "#bbba9b",
        confirmButtonText: "Continue",
      }).then(() => {
        navigate("/admin-dashboard");
      });
    } else {
      Swal.fire({
        title: "Login Failed",
        text: "Invalid username or password for admin password.",
        icon: "error",
        background: "#232110",
        color: "#bbba9b",
        confirmButtonText: "Try Again",
      });
    }
  }
  return (
    <Form
      username={username}
      setUsername={setUsername}
      forWhich="admin_login"
      password={password}
      setPassword={setPassword}
      onContinue={handleLogin}
    />
  );
}
