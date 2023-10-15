import { useAppSelector } from '../../utils/hooks';
import ItemPost from '../../components/ItemPost/ItemPost';
import axios from '../../utils/axios';
import { PostTypes } from '../../types';
import { UserItems } from '../../components/UsersRandom/UsersRandom';
import { useQuery } from '@tanstack/react-query';
import {
  Group,
  Header,
  HorizontalScroll,
  Tabs,
  TabsItem,
} from "@vkontakte/vkui";
import { SkeletonPost } from '../../components/Sceletons/PostSleleton';
import { useEffect, useState } from 'react';
import ItemPostFollowers from '../../components/ItemPostFollowers/ItemPostFollowers';
import { Icon20ThumbsUpOutline, Icon20UsersOutline, Icon16Dropdown } from "@vkontakte/icons";


const Home = () => {

  const [postViews, setPostViews] = useState('recomendation')

  const token = useAppSelector(state => state.auth.token)

  const { data, isLoading, isError } = useQuery({
    queryKey: ['post'],
    queryFn: fetchPosts
  });

  async function fetchPosts() {
    try {
      const response = await axios.get('/posts/allposts');
      return response.data; 
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

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

      {token && <Tabs style={{marginBottom: '15px'}}>
        <HorizontalScroll arrowSize="m">
          <TabsItem
            onClick={() => setPostViews('recomendation')}
            selected={postViews == 'recomendation'}
            before={<Icon20ThumbsUpOutline />}
            after={<Icon16Dropdown />}
          >
            Recomendation
          </TabsItem>
          <TabsItem
            selected={postViews == 'following'}
            onClick={() => setPostViews('following')}
            before={<Icon20UsersOutline />}
            after={<Icon16Dropdown />}
          >
            Following
          </TabsItem>
        </HorizontalScroll>
      </Tabs>}

      {postViews === 'following' ? <ItemPostFollowers/> :
      <div>
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
      </div>}
    </div>
  );
};

export { Home };
