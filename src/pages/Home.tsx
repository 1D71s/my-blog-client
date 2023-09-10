import { useEffect, useState } from 'react';
import ItemPost from '../components/ItemPost/ItemPost';
import axios from '../axios';
import { PostTypes } from '../types';
import { useQuery } from '@tanstack/react-query';

const Home = () => {
  const [whatIsPosts, setWhatisPosts] = useState('new');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts
  });

  async function fetchPosts() {
    try {
      const response = await axios.get('/posts/allposts');

      return response.data.posts; 
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  useEffect(() => {
    fetchPosts();
  }, [whatIsPosts]);

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  if (isError) {
    return <h1>Loading</h1>;
  }

  return (
    <div className='home'>
      <div className='posts'>
        {data.map((item: PostTypes) => (
          <ItemPost
            key={item._id}
            _id={item._id}
            author={item.author}
            image={item.image}
            title={item.title}
            text={item.text}
            views={item.views}
            comments={item.comments}
            likes={item.likes}
            createdAt={item.createdAt}
          />
        ))}
      </div>
    </div>
  );
};

export { Home };
