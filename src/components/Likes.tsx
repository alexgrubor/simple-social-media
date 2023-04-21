import { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";

interface LikesProps {
  postId: string | undefined
  userId: string | null | undefined;
}

const Likes: React.FC<LikesProps> = ({ postId, userId }) => {
  const [likes, setLikes] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [some, SetSome] = useState(false);
  useEffect(() => {
    axios.get(`http://localhost:5000/api/likes/${postId}`).then((res) => {
      setLikes(res.data.data.likes);
    });
  }, [isLiked]);

  return (
    <div>
      <button
        onClick={() => {
          axios
            .post(`http://localhost:5000/api/like`, {
              user: userId,
              post: postId,
            })
            .then((res) => {
              setIsLiked(true);
            })
            .catch((err) => {
              console.log(err);
            });
        }}
        disabled={isLiked}
      >
        {isLiked ? <AiTwotoneHeart /> : <AiOutlineHeart />}
      </button>
      <p>
        {likes.length} {likes.length === 1 ? "like" : "likes"}
      </p>
    </div>
  );
};
export default Likes;
