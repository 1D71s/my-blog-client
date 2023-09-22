import { useAppSelector } from '../utils/hooks'
import ItemPost from '../components/ItemPost/ItemPost'
import { PostTypes } from '../types'
import { useQuery } from '@tanstack/react-query'
import axios from '../utils/axios'
import { Link } from 'react-router-dom';
import { Icon20ArticleOutline, Icon20FollowersOutline, Icon20GlobeOutline, Icon20WorkOutline, Icon20Info } from '@vkontakte/icons';
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
  };
  

  return (
    <>
      <Gradient mode="tint" style={styles}>
        <Avatar size={200}  src={`${url}${me?.useravatar}`}/>
        <Title style={{ marginBottom: 8, marginTop: 20 }} level="2" weight="2">
          Алексей Мазелюк
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
        <Group>
          <MiniInfoCell before={<Icon20ArticleOutline />} textWrap="short">
            ВКонтакте начинался как сайт для выпускников вузов, а сейчас это огромная экосистема
            с безграничными возможностями и миллионами пользователей.
          </MiniInfoCell>

          <MiniInfoCell
            before={<Icon20FollowersOutline />}
          >
            514,7K подписчиков · 77 друзей
          </MiniInfoCell>

          <MiniInfoCell before={<Icon20GlobeOutline />}>
            <Link to="https://vk.com/team">vk.com/team</Link>
          </MiniInfoCell>

          <MiniInfoCell
            mode="accent"
            before={<Icon20WorkOutline />}
            after={
              <Avatar
                size={24}
                src="https://sun9-29.userapi.com/c623616/v623616034/1c184/MnbEYczHxSY.jpg?ava=1"
              />
            }
          >
            Место работы: Команда ВКонтакте
          </MiniInfoCell>

          <MiniInfoCell
            before={<Icon20WorkOutline />}
            mode="add"
            onClick={() => console.log('Указать место учёбы')}
            textWrap="short"
            expandable
          >
            Укажите место учёбы
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
      <Group>
        {data && data.length > 0 && <div className='my-posts'>
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
        </div>}
      </Group>
    </>
  )
}

export { Me }
