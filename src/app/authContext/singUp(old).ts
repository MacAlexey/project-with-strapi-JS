import { API } from "../../constants";

export const signUp = async (
  username: string,
  email: string,
  password: string
) => {
  try {
    const response = await fetch(`${API}/api/auth/local/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
      throw new Error("Error during registration 1");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during registration 2:", error);
    throw error;
  }
};
