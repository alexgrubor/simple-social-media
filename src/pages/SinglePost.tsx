import { useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import axios from 'axios'
import Comments from '../components/Comments';
import Likes from '../components/Likes';


export interface Posts {
  title: string;
  _id: string;
  photo: string;
  createdAt: string;
  updatedAt: string;
  text:string;
  userId:string;
}




const SinglePost = () => {
  const {id} = useParams()
  const [post, setPost] = useState<Posts>()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getPost = async () => {
      try {
        setIsLoading(true)
        const res = await axios.get(`http://localhost:5000/api/posts/${id}`)
        if (res.status) {
          setPost(res.data.data.post)
          setIsLoading(false)
        } else {
          console.error(`Error fetching post: ${res.status} - ${res.statusText}`)
        }
      } catch (error) {
        console.error(`Error fetching post: ${error}`)
      }
    }
    getPost()


  },[])



  
  
  
  return (
   
    <div className="bg-gradient-to-br from-orange-400 to-pink-400   flex flex-col justify-center items-center px-2 py-4">
    <div className="bg-white rounded-lg shadow-lg p-8 w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold">{post?.title}</h2>
          <img className="w-full" src={post?.photo} alt={post?.title} />
          <p className="text-lg">{post?.text}</p>
          <p className="text-gray-500">
            {post?.createdAt.slice(0, 10)} {post?.createdAt.slice(11, 16)}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Likes postId={post?._id} userId={post?.userId} />
            <Comments postId={post?._id} userId={post?.userId} />
          </div>
        </div>
      )}
    </div>
  </div>
  
  )
}
export default SinglePost