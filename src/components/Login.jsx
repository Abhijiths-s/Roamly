import { useState } from "react";
import bgimage from "../assets/person-traveling-enjoying-their-vacation.jpg";
import { Link, useNavigate } from "react-router-dom";

const Login = ( {showAlert} ) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPasswordHidden, setPasswordHidden] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(""); // Clear previous error
    setSuccess(""); // Clear previous success message

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token); // Store the token
        localStorage.setItem("username", data.username); // Store the username
        console.log("Login successful:", data);
        setSuccess("Login successful"); 
        // Success message
        showAlert("Logged in Successfully","success")// Redirect after successful login
        navigate("/dashboard"); 
      } else {
        const err = await response.json();
        setError(err.message || "Login failed.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <main className="w-full flex">
      <div className="flex-1 flex items-center justify-center h-screen bg-gray-100 shadow-inner shadow-black">
        <div className="w-full max-w-md space-y-8 px-4 bg-white text-gray-600 sm:px-5 sm:py-5 py-6 rounded-2xl shadow-gray-400 shadow-md z-10 hover:scale-105 transition-all ease-in duration-300">
          <div>
            <div className="mt-5 space-y-2 ">
              <h3 className="text-orange-600 text-2xl font-bold sm:text-4xl text-center mb-8">
                Log in
              </h3>
              <p>
                Don't have an account?{" "}
                <Link
                  to="/"
                  className="font-medium text-orange-600 hover:text-orange-500 hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
          {error && <div className="text-red-600">{error}</div>}
          {success && <p className="text-green-500">{success}</p>}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="font-medium">Email</label>
              <input
                type="email"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-orange-600 shadow-sm rounded-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <label className="font-medium">Password</label>
              <button
                type="button" // Prevent form submission on button click
                className="text-gray-400 absolute right-3 top-8 inset-y-0 my-auto active:text-gray-600"
                onClick={() => setPasswordHidden(!isPasswordHidden)}
              >
                {isPasswordHidden ? (
                  <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                )}
              </button>
              <input
                type={isPasswordHidden ? "password" : "text"}
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-orange-600 shadow-sm rounded-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white font-medium bg-orange-600 hover:bg-orange-500 active:bg-orange-600 rounded-lg duration-150"
            >
              Log in
            </button>
          </form>
        </div>
        <div
          className="absolute inset-0 my-auto h-[500px]"
          style={{
            background:
              "linear-gradient(152.92deg, rgba(102, 178, 255, 0.2) 4.54%, rgba(135, 206, 235, 0.26) 34.2%, rgba(255, 183, 77, 0.1) 77.55%)",
            filter: "blur(118px)",
          }}
        ></div>
      </div>
      <div className="relative flex-1 hidden items-center justify-center h-screen lg:flex">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${bgimage})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <div
          className="absolute inset-0 z-11"
          style={{
            background:
              "radial-gradient(circle, rgba(102, 178, 255, 0.3) 0%, rgba(135, 206, 235, 0.2) 50%, rgba(255, 183, 77, 0) 100%)",
            filter: "blur(118px)",
          }}
        ></div>

        <div className="absolute inset-0 z-12  mt-12 ">
          <img src="src/assets/logo.png" className="" />
          <div className="flex items-center justify-center mt-4 ">
            <p
              className="text-6xl  font-sans font-extrabold text-center leading-tight 
             bg-gradient-to-r from-blue-400 via-teal-400 to-orange-400 bg-clip-text text-transparent 
              px-4 sm:px-6 lg:px-8 "
            >
              "Your journey to new horizons begins here."
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
