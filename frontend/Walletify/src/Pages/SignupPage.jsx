import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/Axios";

const SignupPage = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/users/signup", {
        username,
        first_name: firstname,
        last_name: lastname,
        email,
        password,
      });
      if (response.data.token) {
        localStorage.setItem("x-auth-token", response.data.token);
        setSuccessMessage("Signup successful!");
        setErrorMessage("");
        setTimeout(() => {
          navigate("/login");
        }, 2000); // Redirect after 2 seconds
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Signup failed!");
      setSuccessMessage("");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-200 vw-100 bg-light">
      <div className="signup-container bg-white p-4 rounded shadow-sm">
        <h2 className="text-center text-primary mb-4">Sign Up</h2>

        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="firstname" className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              id="firstname"
              placeholder="Enter your first name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="lastname" className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="lastname"
              placeholder="Enter your last name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mt-3">
            Sign Up
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-primary">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
