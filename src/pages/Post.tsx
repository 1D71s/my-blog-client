import { useParams } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'
import axios from '../axios'
import { PostTypes } from '../types'
import ItemPost from '../components/ItemPost/ItemPost';

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState<PostTypes | null>(null)

  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/getonepost/${id}`)
    setPost(data)
  }, [])

  useEffect(() => {
    fetchPost()
  }, [id])

  return (
    post && <div className='post-page-cont'>
      <ItemPost
        key={post._id}
        _id={post._id}
        author={post.author}
        image={post.image}
        title={post.title}
        text={post.text}
        views={post.views}
        comments={post.comments}
        likes={post.likes}
        createdAt={post.createdAt}
      />
    </div>
  );
};

export { Post }