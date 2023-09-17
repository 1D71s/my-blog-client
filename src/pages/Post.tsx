import { useParams } from 'react-router-dom'
import {  useCallback } from 'react'
import axios from '../utils/axios'
import ItemPost from '../components/ItemPost/ItemPost';
import { useQuery } from '@tanstack/react-query';
import Comments from '../components/Comments/Comments';

const Post = () => {
  const { id } = useParams();

  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/getonepost/${id}`)
    return data
  }, [])

  const { data, isLoading, isError } = useQuery({
    queryFn: fetchPost,
    queryKey: ['postOne']
  })

  if (isLoading) {
    return <h1>loading</h1>
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
      
      <Comments comments={data.comments} id={id} />
    </div>
  );
};

export { Post }