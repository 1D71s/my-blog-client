import { useState } from 'react';
import { AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../utils/hooks";
import { PostTypes } from "../../types";
import { getTimeMakingPost } from "../../utils/Functions";
import axios from "../../utils/axios";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Cell, Avatar, Group, CardGrid, Text, useAppearance, Button, SplitLayout } from '@vkontakte/vkui';
import { Icon24Message, Icon24Like, Icon24LikeOutline, Icon28MoreHorizontal } from '@vkontakte/icons';
import { CustomPopout } from '../Modals/ModalsMenuPost';


const url = process.env.REACT_APP_URL

const ItemPost = ({ _id, image, title, text, tags, comments, likes, views, author, createdAt }: PostTypes) => {

  const isAuth = useAppSelector(state => state.auth.token);
  const user = useAppSelector(state => state.auth.user);

  const navigate = useNavigate()
  const apperance = useAppearance()

  const client = useQueryClient()

  const likeItem = async () => {
    if (user) {
      try {
        await axios.post(`posts/like/${_id}`);
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  }

  const { mutate: toLike } = useMutation({
    mutationFn: likeItem,
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['myposts']
      });
      client.invalidateQueries({
        queryKey: ['posts']
      });
      client.invalidateQueries({
        queryKey: ['postOne']
      });
    }
  });

  const { mutate: remove } = useMutation({
    mutationFn: () => removePost(_id),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['myposts']
      });
      client.invalidateQueries({
        queryKey: ['posts']
      });
    }
  });

  const removePost = async (id: string) => {
    try {
      const { data } = await axios.delete(`posts/delete/${id}`)
      navigate('/me')
      toast(data.message)
    } catch (error) {
        console.log(error)
        throw error
    }
  }

  const [popout, setPopout] = useState<React.ReactNode | null>(null);

  const onClick = () => setPopout(<CustomPopout onClose={() => setPopout(null)} _id={_id} author={author} user={user}  remove={remove}/>);

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
      
        <div className="info-post">
          <Link to={`/posts/${_id}`} className="post-text-title-tags">
            <Text className='title-post' style={{color: `${apperance === 'dark' ? 'white' : 'black'}`, fontSize: '20px', margin: '20px'}}>{title}</Text>
            <Text className='title-post' weight="1" style={{color: `${apperance === 'dark' ? 'white' : 'black'}`, marginLeft: '20px'}}>{text}</Text>
            {tags && <div className="tags">
              {tags.map(item => <Link style={{color: `${apperance === 'dark' ? '#71aaeb' : '#0077FF'}`}} to={`/tag/${item}`} className="item-tag">
                #{item}
              </Link>)}
            </div>}
            {image && <img className='img-post-item' src={`${url}${image}`} />}
          </Link>
          <div className='cont-likes-comm-views'>
            <div className='likes-comm-views'>
              <Button
                mode="secondary"
                style={{ padding: '5px 20px', width: '100px'}}
                onClick={() => toLike()}
                after={likes.length > 0 ? likes.length : ''}
                before={ user && likes.includes(user._id) ? <Icon24Like  onClick={likeItem}/> :
                <Icon24LikeOutline />}
              />
              <Button
                style={{marginLeft: '20px', padding: '5px 20px', width: '100px'}}
                mode="secondary"
                after={comments.length > 0 ? comments.length : ''}
                before={<Icon24Message />}
              />
            </div>
            <span className='likes-comm-views count'>
              <AiFillEye className='icons-lcv'/>
              <span className='count-icons'>{views.length}</span>
            </span>
          </div>
        </div>

      </Group>
    </CardGrid>      
  )
}

export default ItemPost
