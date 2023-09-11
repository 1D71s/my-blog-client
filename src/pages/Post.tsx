import { useParams } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'
import axios from '../axios'
import { PostTypes } from '../types'
import ItemPost from '../components/ItemPost/ItemPost';
import { useQuery } from '@tanstack/react-query';
import Comments from '../components/Comments/Comments';

type Comment = {
  text: string
}

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState<PostTypes | null>(null)

  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/getonepost/${id}`)
    return data
  }, [])

  const { data, isLoading, isError } = useQuery({
    queryFn: fetchPost,
    queryKey: ['postOne']
  })

  if (isLoading) {
    return <div>loading</div>
  }

  if (isError) {
    return <div>Error</div>
  }

  return (
    data && <div className='post-page-cont'>
      <ItemPost
        key={data._id}
        _id={data._id}
        author={data.author}
        image={data.image}
        title={data.title}
        text={data.text}
        views={data.views}
        comments={data.comments}
        likes={data.likes}
        createdAt={data.createdAt}
      />
      
      <Comments comments={data.comments}/>
    </div>
  );
};

export { Post }