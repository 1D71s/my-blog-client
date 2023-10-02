import { useState, useEffect } from 'react';
import '../../style/Post.css'
import { AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch} from "../../utils/hooks";
import { PostTypes } from "../../types";
import { getTimeMakingPost } from "../../utils/Functions";
import axios from "../../utils/axios";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Cell, Avatar, Group, CardGrid, Text, useAppearance, Button, SplitLayout, Footnote, Spinner, TabsItem } from '@vkontakte/vkui';
import { Icon24Message, Icon24Like, Icon24LikeOutline, Icon28MoreHorizontal } from '@vkontakte/icons';
import { CustomPopout } from '../Modals/ModalsMenuPost';
import { getMe } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const url = process.env.REACT_APP_URL


const ItemPost = ({ _id, image, title, text, tags, comments, likes, views, author, createdAt }: PostTypes) => {

  const isAuth = useAppSelector(state => state.auth.token);
  const user = useAppSelector(state => state.auth.user);

  const [likesPost, setLikesPost] = useState(likes.includes(user?._id))
  const [likesCount, setLikesCount] = useState(likes.length)
  const [loading, setLoading] = useState(false)

  const dispatch = useAppDispatch()
  const apperance = useAppearance()
  const client = useQueryClient()

  const navigate = useNavigate()

  const fetchLike = async () => {
    try {
      const { data } = await axios.post(`posts/like/${_id}`);
      setLikesCount((prevLikesCount) => {
        return data.count !== prevLikesCount ? data.count : prevLikesCount;
      });
      setLikesPost((prevLikesPost) => {
        return data.status !== prevLikesPost ? data.status : prevLikesPost;
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  
  const likeItem = async () => {
    if (user?._id && !loading) {
      await setLoading(true);
      setLikesPost((prevLikesPost) => !prevLikesPost);
      setLikesCount((prevLikesCount) => (likesPost ? prevLikesCount - 1 : prevLikesCount + 1));
      await fetchLike();
      toLike();
    } 
    if (!user?._id) {
      navigate('/login')
    }
  }
  
  const { mutate: toLike } = useMutation({
    mutationFn: likeItem,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['post'] 
      });
    }
  });
  
  const { mutate: remove } = useMutation({
    mutationFn: () => removePost(_id),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['post'],
      });
      client.invalidateQueries({
        queryKey: [`user_post_${user?._id}`],
      });
    }
  });

  const removePost = async (id: string) => {
    try {
      const { data } = await axios.delete(`posts/delete/${id}`)
      toast(data.message)
    } catch (error) {
        console.log(error)
        throw error
    }
  }

  const doFavoriteApi = async () => {
    try {
      await axios.put(`user/favorite/${_id}`)
      dispatch(getMe())
    } catch (error) {
        console.log(error)
        throw error
    }
  }

  const { mutate: doFavorite } = useMutation({
    mutationFn: doFavoriteApi,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['favorite'],
      });
      client.invalidateQueries({
        queryKey: ['posts'],
      });
    }
  });

  useEffect(() => {
    setLikesPost(likes.includes(user?._id))
    setLikesCount(likes.length)
  }, [likes])

  const [popout, setPopout] = useState<React.ReactNode | null>(null);

  const onClick = () => setPopout(<CustomPopout onClose={() => setPopout(null)} _id={_id} author={author} user={user} remove={remove} doFavorite={doFavorite} />);

  return (
    <CardGrid size="l">
      <Group style={{padding: '20px 15px', width: '100%'}}>
        <div className="cont-head-item">
          <Link to={`/user/${author?._id}`}>
            <Cell className='ava-menu-cont' before={<Avatar size={55} src={`${url}${author.useravatar}`}/>} subtitle={getTimeMakingPost(createdAt)}>
              <b style={{color: `${apperance === 'dark' ? '#71aaeb' : '#0077FF'}`, fontSize: '18px'}}>{author.username}</b>
            </Cell>
          </Link>
          
          {isAuth && <div className='btn-menu-post'>
            <SplitLayout popout={popout}>
              <Icon28MoreHorizontal
                onClick={onClick}
                style={{ cursor: 'pointer', margin: '10px' }} />
            </SplitLayout>
          </div>}
        </div>
      
        <div>
          <Link to={`/posts/${_id}`} className="post-text-title-tags">
            <Text className='title-post' weight="1"  style={{color: `${apperance === 'dark' ? 'white' : 'black'}`, margin: '20px'}}>{title}</Text>
            <Text className='title-post' style={{color: `${apperance === 'dark' ? 'white' : 'black'}`, marginLeft: '20px'}}>{text}</Text>
            {tags && <div className="tags">
              {tags.map(item => <Link style={{color: `${apperance === 'dark' ? '#71aaeb' : '#0077FF'}`}} to={`/tag/${item}`} className="item-tag">
                #{item}
              </Link>)}
            </div>}
            {image && <img className='img-post-item' src={`${url}${image}`} />}
          </Link>


          <div className='bottom-menu'>
            <div className='likes-comm-views'>
              {loading ?
                <Button
                  mode="secondary"
                  style={{ padding: '5px 20px', width: '80px'}}
                  before={<Spinner style={{width: '20px', height: '20px'}}/>}
                />:
                <Button
                  disabled={loading}
                  mode="secondary"
                  style={{ padding: '5px 20px', width: '80px'}}
                  onClick={() => toLike()}
                  after={likesCount > 0 ? likesCount : ''}
                  before={ user && likesPost ? <Icon24Like /> :
                  <Icon24LikeOutline />}
                />
              }
              <Link to={`/posts/${_id}`}>
                <Button
                  style={{marginLeft: '20px', padding: '5px 20px', width: '80px'}}
                  mode="secondary"
                  after={comments.length > 0 ? comments.length : ''}
                  before={<Icon24Message />}
                />
              </Link>
            </div>
            <span className='likes-comm-views count'>
              <TabsItem disabled before={<AiFillEye />}>
                <Footnote style={{marginTop: '3px'}}>{views.length}</Footnote>
              </TabsItem>
            </span>
          </div>


        </div>
      </Group>
    </CardGrid>      
  )
}

export default ItemPost