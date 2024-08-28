import React, { useState } from "react";
import axios from "axios";
import "./Home.css";

const Home = () => {
  const [emailId, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isSignUp
      ? "http://localhost:3001/api/users/sign-up"
      : "http://localhost:3001/api/users/sign-in";

    try {
      const response = await axios.post(endpoint, { emailId, name, password });
      // Store JWT token in localStorage
      if (isSignUp && response.status === 201) {
        setMessage("Sign-up successful! Redirecting to Sign In page...");
        setEmail("");
        setPassword("");
        setTimeout(() => {
          setIsSignUp(false);
        }, 2000);
      }
      localStorage.setItem("jwtToken", response.data.token);
      setMessage("Sign-up successful! Redirecting to Sign In page...");

      // Redirect to license plans page if sign-in
      if (!isSignUp) {
        window.location.href = "/license-plans"; // Redirect to license plans page
      }
    } catch (error) {
      setMessage(error.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <div className="container">
      <h1>{isSignUp ? "Sign Up" : "Sign In"}</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="email"
          placeholder="Email"
          value={emailId}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="input"
        />
        {isSignUp && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input"
          />
        )}
        <button type="submit" className="button">
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>
      </form>
      <p className="toggle" onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? "Already have an account? Sign In" : "New here? Sign Up"}
      </p>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Home;
