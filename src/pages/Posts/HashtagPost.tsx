import { useParams } from 'react-router-dom';
import axios from '../../utils/axios';
import {
  Image,
  Group,
  SimpleCell,
  Text
} from "@vkontakte/vkui";
import { useQuery } from '@tanstack/react-query';
import ItemPost from '../../components/ItemPost/ItemPost';
import { PostTypes } from '../../types';
import { SkeletonPost } from '../../components/Sceletons/PostSleleton';

const url = process.env.REACT_APP_URL


const HashtagPost = () => {

  const { id } = useParams()

  const { data, isLoading, isError } = useQuery({
    queryKey: [`${id}`],
    queryFn: fetchPosts
  });
    
  async function fetchPosts() {
    try {
      const response = await axios.get(`/posts/tag/${id}`);
      return response.data; 
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
 
  return (
    <>
      <Group>
        <SimpleCell before={<Image style={{margin: '15px 15px 15px 0px'}} size={100} src={`${url}${data && data[0].image}`} />}>
          {<div>
            <b style={{ fontSize: '25px' }}>#{id}</b>
            <Text>{data && data.length} posts</Text>
          </div> }
        </SimpleCell>
      </Group>

      {isLoading ?
      <Group>
        <SkeletonPost/>
      </Group> :
      data && data.map((item: PostTypes) => (
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
    </>
  );
}

export { HashtagPost }
