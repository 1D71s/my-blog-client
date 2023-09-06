import { useParams } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'
import axios from '../axios'
import { PostTypes } from '../types'

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
    <div className='post-page-cont'>
      {post && (
        <div>
          <div>{post.title}</div>
          <div>{post.text}</div>
          <div>{post.views.length}</div>
        </div>
      )}
    </div>
  );
};

export { Post }