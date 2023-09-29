import ItemPost from '../../components/ItemPost/ItemPost';
import axios from '../../utils/axios';
import { PostTypes } from '../../types';
import { UserItems } from '../../components/UsersRandom/UsersRandom';
import { useQuery } from '@tanstack/react-query';
import {
  Group,
  Header,
  HorizontalScroll,
} from "@vkontakte/vkui";
import { SkeletonPost } from '../../components/Sceletons/PostSleleton';

const Home = () => {

  const { data, isLoading, isError } = useQuery({
    queryKey: ['post'],
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

  if (isLoading) {
    return (
      <>
        <Group header={<Header>Recomendation:</Header>}>
          <HorizontalScroll>
            <div style={{ display: 'flex' }}>
              <UserItems />
            </div>
          </HorizontalScroll>
        </Group>
        <Group>
          <SkeletonPost />
          <SkeletonPost />
          <SkeletonPost />
        </Group>
      </>
    )
  }

  if (isError) {
    return <h1>Loading</h1>;
  }

  return (
    <div>
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
