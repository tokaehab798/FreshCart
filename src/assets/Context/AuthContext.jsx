import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContextobj = createContext();

export default function AuthContext({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [userId, setUserId] = useState(localStorage.getItem('userId'));

  useEffect(() => {
    // Only attempt to decode the token if it's a non-null, valid string
    if (token && typeof token === "string" && token.trim() !== "") {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.id);
        localStorage.setItem('userId', decoded.id);
        console.log(decoded);
      } catch (error) {
        console.error("Invalid token:", error);
        setUserId(null);  // Reset userId if there's a decoding error
      }
    } else {
      // Reset the userId if token is null or invalid
      setUserId(null);
    }
  }, [token]); // Only re-run the effect when `token` changes

  function handleLogout() {
    setToken(null);  // Set token to null on logout
    setUserId(null);  // Clear userId on logout
    localStorage.removeItem('token');  // Remove token from localStorage
    localStorage.removeItem('userId');  // Remove userId from localStorage
  }

  return (
    <AuthContextobj.Provider value={{ token, setToken, userId, handleLogout }}>
      {children}
    </AuthContextobj.Provider>
  );
}
