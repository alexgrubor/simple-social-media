import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  id: string;
  createdAt?: string;
  updatedAt?: string;
  profilePicture: string;
  userName?: string;
}
const SingleUserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    id: "",
    createdAt: "",
    updatedAt: "",
    profilePicture: "",
  });
  const token = localStorage.getItem("token");
  const [posts, setPost] = useState([])

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/api/users/${id}`,
        {
          headers: {
            auth: token,
          },
        }
      );
      setUser(data.data);

        const posts = await axios.get(`http://localhost:5000/api/posts/getpostbyuser/${id}`,  {
            headers: {
              auth: token,
            },
          })
            setPost(posts.data.data.posts)

        

    };
    fetchUser();
  }, []);

  
  console.log(posts);
  

  if (!user) return null;
  return (
    <div className="bg-gradient-to-br from-orange-400 to-pink-400 h-screen flex flex-col justify-center items-center px-2">
    <div className="bg-white rounded-lg shadow-lg p-8 w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
      <h1 className="text-3xl font-bold mb-4">{user?.firstName}'s Profile</h1>
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex flex-col items-center">
          <img
            src={user?.profilePicture}
            alt={user?.firstName}
            className="w-40 h-40 object-cover rounded-full mb-2"
          />
          <h2 className="text-xl font-bold">
            Name: {user?.firstName} {user?.lastName}
          </h2>
          <h3 className="text-gray-500">{user?.email}</h3>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-200 mt-4"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold mb-4">
            {user?.firstName}'s Posts
          </h2>
          <div className="flex flex-col gap-4">
            {posts.map((post: any) => (
              <div key={post._id} className="bg-gray-100 rounded-lg p-4">
                <h3 className="text-xl font-bold">{post.title}</h3>
                <p className="text-gray-500 mb-2">{post.text}</p>
                <img
                  src={post.photo}
                  alt={post.title}
                  className="w-full object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
          {
                posts.length === 0 && <h1 className="text-2xl font-bold text-center">No Posts Jet</h1>
          }
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default SingleUserProfile;
