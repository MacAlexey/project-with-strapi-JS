import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./authContextProps";
import { API } from "../../constants";
import { setToken } from "../../helpers";

const SignUp: React.FC = () => {
  const { setUser } = useAuthContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const onFinish = async (values: any) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API}/auth/local/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();

      if (data?.error) throw data.error;

      setToken(data.jwt);
      setUser(data.user);
      navigate("/profile", { replace: true });
    } catch (error: any) {
      console.error(error);
      setError(error?.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Add form implementation here
    <div>Sign Up Form</div>
  );
};

export default SignUp;
