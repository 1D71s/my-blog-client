import { AiFillEye, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiComment, BiBookmark, BiEditAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import { Popover } from 'antd';
import { RiDeleteBin6Line } from "react-icons/ri";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { deletePost } from "../../redux/postSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


interface Author {
  username: string,
  id: string
}

interface Props {
  img: string,
  title: string,
  text: string,
  comments: string,
  likes: string,
  views: string[],
  author: Author,
  useravatar: string,
  createdAt: string,
  id: string
}

const ItemPost = ({ id, img, title, text, comments, likes, views, author, useravatar, createdAt }: Props) => {
  
  const isAuth = useAppSelector(state => state.auth.token);
  const user = useAppSelector(state => state.auth.user);

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const getTimeMakingPost = (timeString: string) => {
    // Создаем объект Date из строки времени
  const date = new Date(timeString);

  // Проверяем, успешно ли прошло преобразование
  if (isNaN(date.getTime())) {
    return "Неверный формат даты и времени";
  } else {
    // Извлекаем компоненты даты и времени
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Месяцы в JavaScript начинаются с 0
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Форматируем строку без секунд
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

    return formattedDate;
    }
  };

  const removePost = async () => {
    try {
      await dispatch(deletePost(id))
      toast('Статью удалено!')
      navigate('/me')
    } catch (error) {
      console.log(error)
      toast('Не удалось удалить статью!')
    }
  }

  const content = (
    <div className="menu-list">
      <p className="menu-list-item"><BiBookmark className="icons-item-menu"/>Добавить в избраное</p>
      {user && (user as any)._id === author.id && (
        <div>
          <p className="menu-list-item"><BiEditAlt className="icons-item-menu"/>Изменить</p>
        <p className="menu-list-item delete" onClick={removePost}><RiDeleteBin6Line className="icons-item-menu"/>Удалить</p>
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
            src={`http://localhost:4005/uploads/${useravatar}`} />
          <b className='author'>{author.username}</b>
        </div>
        
        {isAuth && <div style={{ marginLeft: buttonWidth, clear: 'both', whiteSpace: 'nowrap' }}>
          <Popover placement="bottomRight" content={content} trigger="click">
            <button className="btn-none">
              <BsThreeDots className="icon-menu"/>
            </button>
          </Popover>
        </div>}

      </div>
      <Link to={`/posts/${id}`}>
        {img && <img className='img-post-item' src={`http://localhost:4005${img}`} />}
        <b className='title-post'>{title}</b>
        <div>{text}</div>
      </Link>
      <div className='likes-comm-views'>
          {/*<AiFillHeart />*/}
        <AiOutlineHeart className='icons-lcv'/>
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
