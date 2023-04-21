import useLogged from "../hooks/useLogged";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface Posts {
  title: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  photo: string;
}

const AllPosts = () => {
  const isLogged = useLogged();
  const [posts, setPosts] = useState<Posts[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/posts");
        if (res.status) {
          setPosts(res.data.data.posts);
        } else {
          console.error(
            `Error fetching posts: ${res.status} - ${res.statusText}`
          );
        }
      } catch (error) {
        console.error(`Error fetching posts: ${error}`);
      }
    };
    if (isLogged) {
      getPosts();
    }
  }, [isLogged]);

  return (
    <div className="bg-gradient-to-b from-orange-500 to-pink-500 px-2">
    <h1 className="text-4xl font-bold text-white text-center py-8">All Posts</h1>
    <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {posts && (
        <>
          {posts.map((post) => (
            <div key={post._id} className="bg-white rounded-md shadow-md">
              <img
                src={post.photo}
                alt={post.title}
                className="w-full rounded-t-md"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{post.title}</h2>
                <button
                  onClick={() => {
                    navigate(`/user/singlepost/${post._id}`, {
                      state: {
                        post: post,
                      },
                    });
                  }}
                  className="bg-orange-500 text-white px-4 py-2 rounded-md mt-4 inline-block hover:bg-orange-600"
                >
                  See more
                </button>
              </div>
            </div>
          ))}
        </>
      )}
  
      <div className="text-center py-4">
        <p>See my posts</p>
        <button
          onClick={() => {
            navigate("/user/post");
          }}
          className="bg-orange-500 text-white px-4 py-2 rounded-md mt-4 inline-block hover:bg-orange-600"
        >
          My Posts
        </button>
      </div>
    </div>
  </div>
  );
};
export default AllPosts;
