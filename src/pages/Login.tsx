import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
const Login = () => {
  const { user, setUser } = useContext(UserContext);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const loginHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    axios
      .post("http://localhost:5000/api/users/login", data)
      .then((res) => {
     

        setUser(res.data.data.user);
        localStorage.setItem("token", res.data.data.token);
        localStorage.setItem("userId", res.data.data.user._id)
       
        navigate("/user/profile");


      })
      .catch((err) => {
        setError(err.response.data);
      });
  }
  return (
    <div className="flex flex-col items-center justify-center gap-4 h-screen bg-gradient-to-r from-orange-400 via-red-500 to-pink-500">
  <h1 className="text-4xl font-bold text-white">Login</h1>
  <div className="flex flex-col items-center justify-center gap-5 p-5 bg-gray-300 bg-opacity-25 border-solid border-4 border-gray-600 rounded shadow-lg">
    <form onSubmit={loginHandler} className="flex flex-col items-center justify-center gap-6">
      <input
        type="email"
        placeholder="Email"
        className="px-3 py-2 rounded border-2 border-gray-700 outline-none"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="px-3 py-2 rounded border-2 border-gray-700 outline-none"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="px-3 py-2 rounded bg-red-500 hover:bg-red-800 text-white"
      >
        Login
      </button>
    </form>
    <div>
      <p className="text-white">
        Don't have an account? <a href="/" className="underline hover:text-red-700">Register</a>
      </p>
    </div>
  </div>
</div>

  )
}
export default Login