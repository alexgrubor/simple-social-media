import { useParams, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import axios from "axios";

export interface Posts {
  title: string;
  _id: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  photo: string;
}
const EditPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Posts>();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [isEdited, setIsEdited] = useState(false);
    const navigate = useNavigate();
  useEffect(() => {
    const getPost = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/posts/${id}`
        );
        if (data.status) {
          setPost(data.data.post);
        }
      } catch (error) {
        console.error(`Error fetching post: ${error}`);
      }
    };
    getPost();
  }, [id, isEdited]);
  const editHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.patch(
        `http://localhost:5000/api/posts/${id}`,
        {
          title,
          text,
        },
        {
          headers: {
            auth: token,
          },
        }
      );
      if (data.status) {
        setIsEdited(!isEdited);
      }
    } catch (error) {
      console.error(`Error editing post: ${error}`);
    }
  };
  return (
    <div className="bg-gradient-to-b from-orange-400 to-pink-400 h-full max-h-screen overflow-auto p-4 sm:p-8 md:p-12">
    <h1 className="text-3xl font-bold text-white mb-8">Edit Post</h1>
    {post && (
      <div className="flex flex-col justify-start items-center">
        <h2 className="text-xl font-bold mb-4">{post.title}</h2>
        <p className="text-lg mb-8">{post.text}</p>
  
        <img
          src={post.photo}
          alt="post"
          className="w-full sm:w-auto md:w-1/2 lg:w-1/3 mb-8"
        />
  
        <form onSubmit={editHandler} className="w-full">
          <label className="block text-white font-bold mb-2">
            Add new Title
          </label>
          <input
            type="text"
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-white rounded p-2 mb-4"
          />
          <label className="block text-white font-bold mb-2">
            Add new Text Content
          </label>
          <input
            type="text"
            placeholder="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full bg-white rounded p-2 mb-8"
          />
          <button className="bg-white rounded text-orange-500 font-bold py-2 px-4 hover:bg-orange-500 hover:text-white transition-colors duration-300">
            Submit
          </button>
        </form>
      </div>
    )}
    <button
      onClick={() => {
        navigate("/user/post");
      }}
      className="bg-white rounded text-orange-500 font-bold py-2 px-4 mt-8 hover:bg-orange-500 hover:text-white transition-colors duration-300"
    >
      Back to my posts
    </button>
  </div>
  

  );
};
export default EditPost;
