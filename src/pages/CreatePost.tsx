import useLogged from "../hooks/useLogged";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const isLogged = useLogged();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [photo, setPhoto] = useState("");

  const createPostHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `http://localhost:5000/api/posts`,
        {
          title,
          text:body,
          photo,
          user:userId
        },
        {
          headers: {
            auth: token,
          },
        }
      );
      if (res.status) {
        console.log(res.data);
        navigate("/user/post");
      
      } else {
        console.error(`Error creating post: ${res.status} - ${res.statusText}`);
      }
    } catch (error) {
      console.error(`Error creating post: ${error}`);
    }

  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 flex flex-col justify-center items-center">
      <div className="w-10/12 sm:w-8/12 md:w-6/12 lg:w-4/12 xl:w-3/12 bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-4">Create Post</h1>
        <form onSubmit={createPostHandler}>
          <div className="mb-4">
            <label className="block font-bold mb-2" htmlFor="title">
              Post Title
            </label>
            <input
              className="w-full border rounded py-2 px-3"
              type="text"
              name="title"
              id="title"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2" htmlFor="body">
              Post Body
            </label>
            <textarea
              className="w-full border rounded py-2 px-3"
              name="body"
              id="body"
              placeholder="Write something..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2" htmlFor="photo">
              Image URL
            </label>
            <input
              className="w-full border rounded py-2 px-3"
              type="text"
              name="photo"
              id="photo"
              placeholder="Image URL"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
            />
          </div>
          <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" type="submit">Create Post</button>
        </form>
      </div>
    </div>
  );
};
export default CreatePost;
