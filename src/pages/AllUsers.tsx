import axios from "axios";
import { useEffect, useState } from "react";
const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");


  

  useEffect(() => {
    const getUsers = async () => {
      const response = await axios.get("http://localhost:5000/api/users");
      const allUsers = response.data
        const filteredUsers = allUsers.filter((user:any) => user._id !== userId)
      setUsers(filteredUsers);
    };
    getUsers();
  }, []);

  const addFriendHandler = async (id :string) => {
    const response = await axios.post(
      `http://localhost:5000/api/friends`,
      {
        friendId: userId,
        user:id
      },
      {
        headers: {
          auth: token
        },
      }
    );

    console.log(response);
  };

  return (
    <div className="bg-gradient-to-br from-orange-400 to-pink-500 min-h-screen p-4">
    <div className="container mx-auto p-4 rounded-lg shadow-lg bg-white">
      <h1 className="text-3xl font-bold mb-4">All Users</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user: any) => (
          <div key={user._id} className="bg-white rounded-lg shadow-lg p-4">
            <h3 className="text-xl font-bold mb-2">
              {user.firstName} {user.lastName}
            </h3>
            <p className="text-gray-700 mb-2">{user.email}</p>
            <img
              src={user.profilePicture}
              alt={user.firstName}
              className="w-full h-auto mb-2"
            />
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2">
              View Profile
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
              onClick={() => {
                addFriendHandler(user._id);
              }}
            >
              Add Friend
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
  
  );
};
export default AllUsers;
