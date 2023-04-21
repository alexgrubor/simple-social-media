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
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          
          <h2>{post?.title}</h2>
          <img src={post?.photo} alt={post?.title} />
          <p>{post?.text}</p>
          <p>{post?.createdAt.slice(0,10)} {
            post?.createdAt.slice(11,16)
          }</p>
      <div>
      <Likes postId={post?._id} userId={post?.userId} />
      <Comments postId={post?._id} userId={post?.userId}/>
    </div>
    </div>
 
  )}
  </div>
  )
}
export default SinglePost