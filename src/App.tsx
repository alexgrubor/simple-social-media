import { Route, Routes } from "react-router-dom";
import { Login, Welcome, Profile, Post, Friends, AllPosts, CreatePost, EditPost, AllUsers, SinglePost, SingleUserProfile } from "./pages";
import { useState } from "react";
import { UserContext } from "./context/UserContext";
import { LikesContext } from "./context/LikesConext";
import Navbar from "./components/Navbar";
interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userName: string;
  profilePicture: string;
}

function App() {
  const [user, setUser] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    userName: "",
    profilePicture: "",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
         <LikesContext.Provider value={{ likes: [], addLike(){} }}>
      <div className="">
        <Navbar />
        <div className="pt-16">
        <Routes>
          <Route path="/" element={<Welcome />} />

          <Route path="/login" element={<Login />} />
          <Route path="/user/profile" element={<Profile />} />

          <Route path="/user/post" element={<Post />} />
          <Route path="/user/createpost" element={<CreatePost />} />
          <Route path="/user/editpost/:id" element={<EditPost />} />
          <Route path="/user/singlepost/:id" element={<SinglePost />} />
          <Route path="/user/friends" element={<Friends />} />
          <Route path="/user/singleuserprofile/:id" element={<SingleUserProfile />} />
          <Route path="/posts" element={<AllPosts />} />
          <Route path="/users" element={<AllUsers />} />
        </Routes>
        </div>
      </div>
      </LikesContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
