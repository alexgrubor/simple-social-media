import axios from "axios";
import { useEffect, useState } from "react";
import useLogged from "../hooks/useLogged";
const Friends = () => {
  const [friends, setFriends] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    const getFriends = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const response = await axios.get(
        `http://localhost:5000/api/friends/user/${userId}`,
        {
          headers: {
            auth: token,
          },
        }
      );

      setFriends(response.data);
    };

    getFriends();
  }, [isDeleted]);

  const deleteFriendHandler = async (id: string) => {
    const token = localStorage.getItem("token");
    const response = await axios.delete(
      `http://localhost:5000/api/friends/${id}`,
      {
        headers: {
          auth: token,
        },
      }
    );

    setIsDeleted(!isDeleted);
  };

  return (
    <div className="bg-gradient-to-br from-orange-400 to-pink-400 h-screen flex flex-col justify-center items-center px-2">
  <div className="bg-white rounded-lg shadow-lg p-8 w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
    <h1 className="text-3xl font-bold mb-4">My Friends</h1>
    <div className="flex flex-col gap-4">
      {friends &&
        friends.map((friend: any) => (
          <div
            key={friend._id}
            className="bg-gray-100 rounded-lg p-4 flex flex-col gap-2"
          >
            <p className="text-lg font-medium">
              {friend.user.firstName} {friend.user.lastName}
            </p>
            <p className="text-gray-500">{friend.user.email}</p>
            <img
              src={friend.user.profilePicture}
              alt={friend.user.firstName}
              className="w-40 h-40 object-cover rounded-full mx-auto"
            />
            <button
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-200"
              onClick={() => {
                deleteFriendHandler(friend._id);
              }}
            >
              delete friend
            </button>
          </div>
        ))}
    </div>
  </div>
</div>
  );
};
export default Friends;
