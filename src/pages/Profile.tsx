import axios from "axios";
import { useEffect, useState } from "react";
import useLogged from "../hooks/useLogged";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import {useNavigate} from 'react-router-dom'

const Profile = () => {
  const isLogged = useLogged();
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();
  useEffect(() => {
    const getUser = async () => {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get(`http://localhost:5000/api/users/${userId}`, {
          headers: {
            auth: token
          }
        });
        if (res.status) {
          setUser(res.data.data);
        } else {
          console.error(`Error fetching user data: ${res.status} - ${res.statusText}`);
        }
      } catch (error) {
        console.error(`Error fetching user data: ${error}`);
      }
    };
  
    if (isLogged) {
      getUser();
    }
  }, [isLogged]);




  return (
    <div className="flex flex-col items-center gap-4 w-full  py-16 bg-gradient-to-b from-orange-400 via-red-500 to-pink-500">
    <h1 className="text-4xl text-white font-bold">Profile</h1>
    {user && (
      <div className="flex flex-col items-center gap-4 p-8 bg-white rounded-lg shadow-lg">
        <img src={user.profilePicture} alt="profile picture" className="w-64 h-64 rounded-full object-cover" />
        <h2 className="text-2xl font-bold text-gray-800">{user.firstName} {user.lastName}</h2>
        <h2 className="text-lg font-semibold text-gray-700">Email: {user.email}</h2>
        <h2 className="text-lg font-semibold text-gray-700">Username: {user.userName ? user.userName : 'No username'}</h2>
        <div className="flex flex-col items-center gap-4">
          <p className="text-lg font-semibold text-gray-800">See all posts</p>
          <button className="px-4 py-2 rounded-lg text-white font-semibold bg-red-500 hover:bg-red-600 focus:outline-none" onClick={() => {navigate('/posts')}}>Posts</button>
          <p className="text-lg font-semibold text-gray-800">See my posts</p>
          <button className="px-4 py-2 rounded-lg text-white font-semibold bg-orange-400 hover:bg-orange-500 focus:outline-none" onClick={() => {navigate('/user/post')}}>My Posts</button>
        </div>
      </div>
    )}
  </div>
  );
};
export default Profile;
