import { useAppSelector } from '../utils/hooks'
import ItemPost from '../components/ItemPost/ItemPost'
import { PostTypes } from '../types'
import { useQuery } from '@tanstack/react-query'
import axios from '../utils/axios'
import { Link } from 'react-router-dom';
import { Icon20ArticleOutline, Icon20FollowersOutline, Icon20NarrativeOutline, Icon20Info, Icon20MentionOutline  } from '@vkontakte/icons';
import { Group, Title, Text, Gradient, Avatar, Button, MiniInfoCell } from '@vkontakte/vkui';

const url = process.env.REACT_APP_URL

type StyleType = React.CSSProperties;

const Me = () => {

  const me = useAppSelector(state => state.auth.user)

  const fetchMyPosts = async () => { 
    try {
      const { data } = await axios.get('posts/myposts')
      return data.reverse()
    } catch (error) {
      console.log(error)
      throw error
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['myposts'],
    queryFn: fetchMyPosts
  });
  
  
  const styles: StyleType = {
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: 32,
    //backgroundImage: `url(${url}${me?.useravatar})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  };
  
  
  return (
    <>
      <Gradient mode="tint" style={styles}>
        <Avatar size={200}  src={`${url}${me?.useravatar}`}/>
        <Title style={{ marginBottom: 8, marginTop: 20 }} level="2" weight="2">
          {me?.firstName} {me?.lastName}
        </Title>
        <Text
          style={{
            marginBottom: 24,
            color: 'var(--vkui--color_text_secondary)',
          }}
        >
          {me?.username}
        </Text>
        <Link to='edit'> 
          <Button size="m" mode="secondary">
            Редактировать
          </Button>
        </Link>
      </Gradient>
      <Group mode="plain" style={{marginTop: '25px'}}>
        <Group style={{padding: '20px 0px'}}>
          <MiniInfoCell before={<Icon20ArticleOutline />} textWrap="short">
            ВКонтакте начинался как сайт для выпускников вузов, а сейчас это огромная экосистема
            с безграничными возможностями и миллионами пользователей.
          </MiniInfoCell>

          <MiniInfoCell
            before={<Icon20FollowersOutline />}
          >
            0 подписчиков · 0 друзей
          </MiniInfoCell>

          <MiniInfoCell before={<Icon20NarrativeOutline />}>
            {me?.sex}
          </MiniInfoCell>

          <MiniInfoCell before={<Icon20MentionOutline  />}>
            {me?.email}
          </MiniInfoCell>

          <MiniInfoCell
            before={<Icon20Info />}
            mode="more"
            expandable
          >
            Подробная информация
          </MiniInfoCell>
        </Group>
      </Group>
      {data && data.length > 0 && <Group>
          {data.reverse().map((item: PostTypes) => (
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
      </Group>}
    </>
  )
}

export { Me }
