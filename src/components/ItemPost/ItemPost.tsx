import { AiFillEye, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiComment, BiBookmark, BiEditAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import { Popover } from 'antd';
import { RiDeleteBin6Line } from "react-icons/ri";
import { useAppSelector } from "../../hooks";
import { toast } from "react-toastify";
import { PostTypes } from "../../types";
import { getTimeMakingPost } from "../../Functions";
import { useState, useEffect, useRef } from "react";
import axios from "../../axios";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

const ItemPost = ({ _id, image, title, text, comments, likes, views, author, createdAt }: PostTypes) => {

  const isAuth = useAppSelector(state => state.auth.token);
  const user = useAppSelector(state => state.auth.user);

  const inputRef = useRef<HTMLButtonElement| null>(null);

  const client = useQueryClient()

  const [like, setLike] = useState<boolean>()


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
    }
  });

  useEffect(() => {
    setLike(likes.includes(user?._id));
  }, [likes, user]);

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
      
      toast(data)

    } catch (error) {
        console.log(error)
        throw error
    }
  }

  const handleClick= () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }

  const content = (
    <div className="menu-list">
      <p className="menu-list-item"><BiBookmark className="icons-item-menu"/>Добавить в избраное</p>
      {user && (user as any)._id === author.id && (
        <div>
          <p className="menu-list-item"><BiEditAlt className="icons-item-menu"/>Изменить</p>
        <p className="menu-list-item delete" onClick={() => remove()}><RiDeleteBin6Line className="icons-item-menu"/><span onClick={handleClick}>Удалить</span></p>
        </div>
      )}
    </div>
  );

  const buttonWidth = 70;

  return (
    <div className='post-item'>
      <div className="cont-head-item">
        <div>
          <img
            className='ava-in-item'
            src={`http://localhost:4005/uploads/${author.useravatar}`} />
          <b className='author'>{author.username}</b>
        </div>
        
        {isAuth && <div style={{ marginLeft: buttonWidth, clear: 'both', whiteSpace: 'nowrap' }}>
          <Popover  placement="bottomRight" content={content} trigger="click">
            <button ref={inputRef} className="btn-none">
              <BsThreeDots className="icon-menu"/>
            </button>
          </Popover>
        </div>}

      </div>
      <Link to={`/posts/${_id}`}>
        {image && <img className='img-post-item' src={`http://localhost:4005${image}`} />}
        <b className='title-post'>{title}</b>
        <div>{text}</div>
      </Link>
      <div className='likes-comm-views'>
        { user && like ? <AiFillHeart className='icons-lcv' onClick={likeItem}/> :
        <AiOutlineHeart className='icons-lcv' onClick={() => toLike()}/>}
        <span className='count-icons'>{likes.length}</span>
        <BiComment className='icons-lcv'/>
        <span className='count-icons'>{comments.length}</span>
        <AiFillEye className='icons-lcv'/>
        <span className='count-icons'>{views.length}</span>
      </div>
      <div className="created-post-time">{getTimeMakingPost(createdAt)}</div>
    </div>
  )
}

export default ItemPost
