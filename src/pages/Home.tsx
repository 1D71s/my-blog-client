import { useEffect, useState } from 'react';
import ItemPost from '../components/ItemPost/ItemPost';
import axios from '../utils/axios';
import { PostTypes } from '../types';
import { UserItems } from '../components/UsersRandom/UsersRandom';
import {
  Group,
  Header,
  HorizontalScroll,
} from "@vkontakte/vkui";


const Home = () => {
  const [data, setData] = useState([]);

  async function fetchPosts() {
    try {
      const response = await axios.get('/posts/allposts');
      setData(response.data.posts); 
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div className='home'>
      <Group header={<Header>Recomendation:</Header>}>
        <HorizontalScroll>
          <div style={{ display: 'flex' }}>
            <UserItems />
          </div>
        </HorizontalScroll>
      </Group>

      {data.map((item: PostTypes) => (
        <ItemPost
          key={item._id}
          _id={item._id}
          author={item.author}
          image={item.image}
          title={item.title}
          text={item.text}
          tags={item.tags}
          views={item.views}
          comments={item.comments}
          likes={item.likes}
          createdAt={item.createdAt}
        />
      ))}
    </div>
  );
};

export { Home };
