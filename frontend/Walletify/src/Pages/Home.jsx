import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white vw-100 shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <a href="/" className="text-2xl font-bold">
          Walletify
        </a>

        
        <div className="space-x-6">
          <Link to="/" className="hover:text-blue-300">
            Home
          </Link>
          <Link to="/about" className="hover:text-blue-300">
            About
          </Link>
          <Link to="/contact" className="hover:text-blue-300">
            Contact
          </Link>
          <Link to="/login" className="hover:text-blue-300">
            Login
          </Link>
          <Link to="/signup" className="hover:text-blue-300">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

const HomePage = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
     
      <Navbar />

     
      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="max-w-3xl bg-white shadow-md rounded-lg overflow-hidden">
          <header className="bg-blue-600 text-white p-6 text-center">
            <h1 className="text-4xl font-bold">Welcome to Walletify!</h1>
            <p className="text-lg mt-2">
              Your go-to app for managing finances with ease.
            </p>
          </header>

          <div className="p-6 text-gray-700">
            <h2 className="text-2xl font-semibold mb-4">What is Walletify?</h2>
            <p className="mb-4 leading-relaxed">
              Walletify helps you track your transactions, monitor spending, and
              stay in control of your finances—all in one place. Whether you're
              managing personal expenses or overseeing a business budget,
              Walletify simplifies the process for you.
            </p>
            <p className="mb-4 leading-relaxed">
              Let's get started and take control of your finances today!
            </p>
            <div className="text-center">
              <Link
                href="/signup"
                className="inline-block text-blue-600 bg-white py-2 px-6 rounded-lg  border-spacing-1 shadow hover:bg-blue-700 transition duration-200"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-blue-600 text-white text-center py-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Walletify. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
