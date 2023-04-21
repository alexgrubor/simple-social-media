import axios from "axios";
import { useState, useEffect } from "react";

interface CommentsProps {
  postId: string | undefined
  userId: string | null | undefined;
}

const Comments: React.FC<CommentsProps> = ({ postId, userId }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState<string>("");
  const [isCommented, setIsCommented] = useState(false);

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/comments/${postId}`
        );
        if (res.status) {
          setComments(res.data.data.comments);
        } else {
          console.error(
            `Error fetching comments: ${res.status} - ${res.statusText}`
          );
        }
      } catch (error) {
        console.error(`Error fetching comments: ${error}`);
      }
    };
    getComments();
  }, [isCommented]);

  return (
    <div className="flex flex-col rounded-lg  p-8 ">
  <h1 className="text-3xl font-bold mb-4">Comments</h1>
  <div className="mb-8">
    {comments && (
      <div>
        {comments.map((comment: any) => {
          return (
            <div key={comment._id} className="mb-4">
              <p className="text-lg">{comment.text}</p>

            </div>
          );
        })}
      </div>
    )}
  </div>

  <div className="flex flex-col items- justify-start">
    <label htmlFor="" className="text-lg mb-4">New comment</label>
    <input
      type="text"
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      className="bg-gray-200 px-4 py-2 rounded-lg mb-4 w-full"
    />
    <button
      onClick={() => {
        axios
          .post(`http://localhost:5000/api/comments`, {
            text: comment,
            user: userId,
            post: postId,
          })
          .then((res) => {
            if (res.status) {
              setIsCommented(!isCommented);
              setComment("");
            } else {
              console.error(
                `Error adding comment: ${res.status} - ${res.statusText}`
              );
            }
          })
          .catch((error) => {
            console.error(`Error adding comment: ${error}`);
          });
      }}
      className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg"
    >
     &#10133; Add comment
    </button>
  </div>
</div>

  );
};
export default Comments;
