import { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
const Welcome = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const signUpHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      firstName,
      lastName,
      email,
      password,
      userName,
    };
    axios
      .post("http://localhost:5000/api/users/register", data)
      .then((res) => {
        navigate("/login");
      })
      .catch((err) => {
        setError(err.response.data);
      });
  };

  return (
    <div
      className="
      flex flex-col items-center justify-center min-h-screen gap-3
      bg-gradient-to-r from-orange-400 via-red-500 to-pink-500
      text-white
    
    "
    >
      <h1
        className="
        text-4xl font-bold
        "
      >
        Welcome
      </h1>
      <h2
        className="
        text-2xl font-bold
        "
      >
        {" "}
        to the Simple Social Media{" "}
      </h2>
      <p className="mb-5">Sign up for a new Social Media</p>
      <div className="flex flex-col justify-center lg:flex-row w-full px-10">
        <div
          className="
          flex flex-col items-center justify-center gap-3
          bg-gray-300 bg-opacity-25
          border-solid border-4 border-gray-600
          p-5 rounded shadow-lg shadow-gray-600 shadow-opacity-25
          w-full lg:w-1/2
          "
        >
          <form
            onSubmit={signUpHandler}
            className="
            flex flex-col items-center justify-center gap-3
        w-full text-white
          "
          >
            <label
              htmlFor=""
              className="
            text-2xl font-bold
            "
            >
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="border-2 border-gray-700 text-lg
              text-black
              "
            />
            <label
              htmlFor=""
              className="
           text-2xl font-bold
           "
            >
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="border-2 border-gray-700 text-lg  text-black"
            />
            <label
              htmlFor=""
              className="
           text-2xl font-bold
           "
            >
              User Name
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              className="border-2 border-gray-700 text-lg  text-black"
            />
            <label
              htmlFor=""
              className="
           text-2xl font-bold
           "
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-2 border-gray-700 text-lg  text-black"
            />
            <label
              htmlFor=""
              className="
           text-2xl font-bold
           "
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className="border-2 border-gray-700 text-lg  text-black"
            />
            <button
              type="submit"
              className="
            bg-red-500
            hover:bg-red-700
            text-white
            font-bold
            py-2
            px-4
            rounded
            "
            >
              Sign Up
            </button>
          </form>
          <div className="flex items-center justify-center w-full ">
            <p
              className="
            text-white
            font-bold

            "
            >
              Already have an account?
            </p>
            <button
              onClick={() => {
                navigate("/login");
              }}
              className="
            hover:text-red-200 
            hover:underline 
            text-gray-500
            font-bold
            py-2
            px-4
            rounded
            "
            >
              Login
            </button>
          </div>
        </div>
        <div
          className="
          w-full lg:w-1/2
      "
        >
          <img
            src="https://images.pexels.com/photos/2694434/pexels-photo-2694434.jpeg?auto=compress&cs=tinysrgb&"
            alt="social media"
            className=" h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};
export default Welcome;
