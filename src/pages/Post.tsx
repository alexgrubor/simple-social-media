import axios from "axios";
import { useEffect, useState } from "react";
import useLogged from "../hooks/useLogged";
import { useNavigate } from "react-router-dom";
import { Posts } from "./EditPost";
import Likes from "../components/Likes";
import Comments from "../components/Comments";

const Post = () => {
  const isLogged = useLogged();
  const [posts, setPosts] = useState<Posts[]>([]);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");
  useEffect(() => {
    try {
      const getPosts = async () => {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:5000/api/posts/getpostbyuser/${userId}`,
          {
            headers: {
              auth: token,
            },
          }
        );
        if (res.status) {
          setPosts(res.data.data.posts);
        } else {
          console.error(
            `Error fetching posts: ${res.status} - ${res.statusText}`
          );
        }
      };
      if (isLogged) {
        getPosts();
      }
    } catch (error) {}
  }, [isLogged]);

  return (
    <div className="bg-gradient-to-b from-orange-400 via-red-500 to-pink-500 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center text-white mb-8">
        My Posts
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => {
          return (
            <div
              key={post._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={post.photo}
                alt={post.title}
                className="w-full  object-fill"
              />
              <div className="p-4">
                <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                <p className="text-gray-700 text-base">{post.text}</p>
                <div className="flex flex-col justify-center gap-4 mt-4">
                  <div className="flex">
                    <Likes postId={post._id} userId={userId} />
                  </div>
                  <div className="flex">
                    <Comments postId={post._id} userId={userId} />
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/user/editpost/${post._id}`)}
                  className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded mt-4"
                >
                  Edit Post
                </button>
              </div>
            </div>
          );
        })}
        {posts.length === 0 && (
          <div className="bg-white rounded-lg shadow-lg p-4 text-center">
            <h2 className="text-xl font-bold text-gray-800">
              You have no posts
            </h2>
          </div>
        )}
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={() => navigate("/user/createpost")}
          className="bg-red-500 hover:bg-red-600 text-white px-8 py-2 rounded"
        >
        &#10133;  Create New Post
        </button>
      </div>
    </div>
  );
};
export default Post;
