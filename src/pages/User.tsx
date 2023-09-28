import { useEffect, useState } from 'react'
import { useAppSelector } from '../utils/hooks'
import ItemPost from '../components/ItemPost/ItemPost'
import { PostTypes } from '../types'
import axios from '../utils/axios'
import { Link } from 'react-router-dom';
import { Icon20ArticleOutline, Icon20NarrativeOutline, Icon20Info, Icon20MentionOutline, Icon20UsersOutline, Icon20PlaceOutline, Icon20LogoClipsOutline  } from '@vkontakte/icons';
import { Group, Title, Text, Gradient, Avatar, Button, MiniInfoCell, useAppearance } from '@vkontakte/vkui';
import { useParams } from 'react-router-dom'
import { User } from '../redux/userSlice';
import { useQuery } from '@tanstack/react-query';


const url = process.env.REACT_APP_URL

type StyleType = React.CSSProperties;

const UserProfile = () => {

  const me = useAppSelector(state => state.auth.user)
    
  const [user, setUser] = useState<User>() 

  const { id } = useParams()

  const getUser = async () => {
    try {
      const { data } = await axios.get(`user/fullinfo/${id}`)
      await setUser(data)
      console.log(user)
    } catch (error) {
      console.log(error)
    }
  }

  const following = async () => {
    try {
      await axios.put(`user/follow/${id}`)
      getUser()
    } catch (error) {
      console.log(error)
    }
  }

  const fetchUserPosts = async () => { 
    try {
      const { data } = await axios.get(`posts/userposts/${id}`)
      return data
    } catch (error) {
      console.log(error)
      throw error
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: [`user_post_${id}`],
    queryFn: fetchUserPosts
  });

  useEffect(() => {
    getUser()
    fetchUserPosts()
  }, [id])

  const apperance = useAppearance()
  
  const styles: StyleType = {
    backgroundImage: `url(${url}${user?.useravatar})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '200px',
    filter: 'blur(10px)'
  };

  return (
    <>
      <Group>
      <Gradient mode="tint" style={styles}>
       
       </Gradient>
        <div className='me-global'>
          <Avatar size={200}  src={`${url}${user?.useravatar}`} style={{border: `9px solid ${apperance === 'dark' ? '#19191a' : 'white'}`}}/>
          <Title style={{ marginBottom: 8, marginTop: 20 }} level="2" weight="2">
            {user?.firstName} {user?.lastName}
          </Title>
          <Text
            style={{
              marginBottom: 24,
              color: 'var(--vkui--color_text_secondary)',
            }}
          >
            {user?.username}
          </Text>
          {me?._id === user?._id ? (
            <Link to='edit'> 
              <Button size="m" mode="secondary">
                Edit profile
              </Button>
            </Link>
          ) : (
              <div>
                {me?._id && user?.followers?.includes(me?._id) ?
                (<Button
                  mode="secondary"
                  onClick={following}
                >Unfollow</Button>) :
                (<Button 
                  onClick={following}
                >
                Following
              </Button>)}
              </div>
          )}

          <div className='user-global-stat'>
            <Button mode='tertiary'  style={{margin: '10px', width: '90px'}}>
              <Title style={{ marginBottom: 8, marginTop: 20 }} level="2" weight="2">
                  {data?.length || '0'}
                </Title>
                <Text
                  style={{
                    marginBottom: 24,
                    color: 'var(--vkui--color_text_secondary)',
                  }}>Posts</Text>
            </Button>
            <Link to={`/user/following/${id}`} style={{margin: '10px' ,width: '90px'}}>
              <Button mode='tertiary'>
                <Title style={{ marginBottom: 8, marginTop: 20 }} level="2" weight="2">
                  {user?.following.length || '0'}
                </Title>
                <Text
                  style={{
                    marginBottom: 24,
                    color: 'var(--vkui--color_text_secondary)',
                  }}>Following</Text>
              </Button>
            </Link>
            <Link to={`/user/followers/${id}`} style={{margin: '10px' ,width: '90px'}}>
              <Button mode='tertiary'>
                <Title style={{ marginBottom: 8, marginTop: 20 }} level="2" weight="2">
                  {user?.followers.length || '0'}
                </Title>
                <Text
                  style={{
                    marginBottom: 24,
                    color: 'var(--vkui--color_text_secondary)',
                  }}>Followers</Text>
              </Button>
            </Link>
          </div>
    
        </div>
      </Group>
      <Group mode="plain">
        <Group style={{ padding: '20px 0px' }}>
          {user?.fullInfo?.myStatus && <MiniInfoCell before={<Icon20ArticleOutline />} textWrap="short">
            {user?.fullInfo?.myStatus}
          </MiniInfoCell>}

          <MiniInfoCell before={<Icon20NarrativeOutline />}>
            {user?.sex}
          </MiniInfoCell>

          {user?.fullInfo?.birthday &&<MiniInfoCell before={<Icon20LogoClipsOutline />}>
            {user?.fullInfo.birthday}
          </MiniInfoCell>}

          <MiniInfoCell before={<Icon20MentionOutline  />}>
            {user?.email}
          </MiniInfoCell>

          {user?.fullInfo?.country &&<MiniInfoCell before={<Icon20PlaceOutline />}>
            {user?.fullInfo.country}. {user?.fullInfo.sity}
          </MiniInfoCell>}

          <Link to={`/user/fullinfo/${user?._id}`}>
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

      {data && data.length > 0 && <div>
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
    </>
  )
}

export { UserProfile }
