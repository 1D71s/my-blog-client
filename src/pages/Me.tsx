import { useAppSelector } from '../utils/hooks'
import ItemPost from '../components/ItemPost/ItemPost'
import { PostTypes } from '../types'
import { useQuery } from '@tanstack/react-query'
import axios from '../utils/axios'
import { Link } from 'react-router-dom';
import { Icon20ArticleOutline, Icon20BasketballOutline, Icon20NarrativeOutline, Icon20EducationOutline, Icon20Info, Icon20MentionOutline, Icon20UsersOutline, Icon20ArticleBoxOutline, Icon20PlaceOutline, Icon20LogoClipsOutline, Icon20WorkOutline  } from '@vkontakte/icons';
import { Group, Title, Text, Gradient, Avatar, Button, MiniInfoCell, useAppearance } from '@vkontakte/vkui';


const url = process.env.REACT_APP_URL

type StyleType = React.CSSProperties;

const Me = () => {

  const apperance = useAppearance()

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
    backgroundImage: `url(${url}${me?.useravatar})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '200px',
    filter: 'blur(10px)'
  };
  
  return (
    <>
      <Gradient mode="tint" style={styles}>
       
      </Gradient>
      <div className='me-global'>
        <Avatar size={200}  src={`${url}${me?.useravatar}`} style={{border: `9px solid ${apperance === 'dark' ? '#19191a' : 'white'}`}}/>
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
        <MiniInfoCell
          style={{marginTop: '20px'}}
          before={<Icon20UsersOutline />}
        >
          0 Followers · 0 Following
        </MiniInfoCell>
      </div>
      <Group mode="plain">
        <Group style={{ padding: '20px 0px' }}>
          {me?.fullInfo?.myStatus && <MiniInfoCell before={<Icon20ArticleOutline />} textWrap="short">
            {me?.fullInfo?.myStatus}
          </MiniInfoCell>}

          <MiniInfoCell before={<Icon20NarrativeOutline />}>
            {me?.sex}
          </MiniInfoCell>

          {me?.fullInfo?.birthday &&<MiniInfoCell before={<Icon20LogoClipsOutline />}>
            {me?.fullInfo.birthday}
          </MiniInfoCell>}

          <MiniInfoCell before={<Icon20MentionOutline  />}>
            {me?.email}
          </MiniInfoCell>

          {me?.fullInfo?.country &&<MiniInfoCell before={<Icon20PlaceOutline />}>
            {me?.fullInfo.country}. {me?.fullInfo.sity}
          </MiniInfoCell>}

          <Link to={`/user/fullinfo/${me?._id}`}>
            <MiniInfoCell
              before={<Icon20Info />}
              mode="more"
              expandable
            >
              Подробная информация
            </MiniInfoCell>
          </Link>

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
