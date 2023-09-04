import { AiFillEye, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BiComment } from "react-icons/bi";

interface Props {
  img: string,
  title: string,
  text: string,
  comments: string,
  likes: string,
  views: number,
  author: string,
  useravatar: string,
  createdAt: string
}

const ItemPost = ({ img, title, text, comments, likes, views, author, useravatar, createdAt }: Props) => {
  
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

  return (
    <div className='post-item'>
      <div>
        <img
          className='ava-in-item'
          src={`http://localhost:4005/uploads/${useravatar}`} />
        <b className='author'>{author}</b>
      </div>
      {img && <img className='img-post-item' src={`http://localhost:4005${img}`} />}
      <b className='title-post'>{title}</b>
      <div>{text}</div>
      <div className='likes-comm-views'>
          {/*<AiFillHeart />*/}
        <AiOutlineHeart className='icons-lcv'/>
        <b className='count-icons'>{likes.length}</b>
        <BiComment className='icons-lcv'/>
        <b className='count-icons'>{comments.length}</b>
        <AiFillEye className='icons-lcv'/>
        <b className='count-icons'>{views}</b>
      </div>
      <div className="created-post-time">{getTimeMakingPost(createdAt)}</div>
    </div>
  )
}

export default ItemPost
