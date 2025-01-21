import React from "react";
import Navbar from "../Component/Navbar";
import axiosInstance from "../utils/Axios";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/users/login", {
        email,
        password,
      });
      if (response.data.token) {
        localStorage.setItem("x-auth-token", response.data.token);
        setSuccessMessage("Logged in successfully!");
        console.log("Logged in successfully!");
        setErrorMessage("");
        navigate('/dashboard')
      }
    } catch (error) {
      setErrorMessage("Invalid email or password!");
      setSuccessMessage("");
    }
  };

  return (
    <>
      <Navbar />
      <div className="d-flex vh 150 vw-100 align-items-center justify-content-center vh-90 bg-light">
        <div className="login-container bg-white p-5 rounded shadow">
          <h2 className="text-center text-primary mb-4">Login</h2>

          {successMessage && (
            <div className="alert alert-success text-center">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="alert alert-danger text-center">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
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
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="rememberMe"
                />
                <label className="form-check-label" htmlFor="rememberMe">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-primary">
                Forgot password?
              </a>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
          <p className="text-center mt-4">
            Don't have an account?{" "}
            <Link href="/signup" className="text-primary">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
