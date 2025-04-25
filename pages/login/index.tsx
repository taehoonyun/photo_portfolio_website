"use strict";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // Call the login API for regular user login
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // If login is successful, set localStorage and redirect
        localStorage.setItem("user", "user");
        
        // Add a short delay before redirecting (allows time for localStorage to be set)
        setTimeout(() => {
          // Redirect with reload to ensure state is properly updated
          window.location.href = "/"; // Use window.location instead of router.push to force page reload
        }, 100);
      } else {
        // If login fails, show an error message
        const data = await response.json();
        setErrorMessage(data.message || "Failed to login");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  const handleAnonymousLogin = async () => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ anonymous: true }), // Send anonymous login request
      });

      if (response.ok) {
        const data = await response.json();

        router.push("/"); // Redirect after anonymous login
      } else {
        console.error("Anonymous login failed");
      }
    } catch (error) {
      console.error("An error occurred during anonymous login:", error);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex justify-center items-center">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">Log in</h2>

        {errorMessage && (
          <p className="text-red-500 text-sm text-center">{errorMessage}</p>
        )}

        <form onSubmit={handleLogin} className="mt-6 space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="flex flex-col space-y-4">
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={handleAnonymousLogin}
              className="w-full px-4 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Continue as Guest
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
