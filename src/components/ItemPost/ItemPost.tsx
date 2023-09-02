import React from 'react'

interface Props {
  img: string,
  title: string,
  text: string,
  comments: string,
  likes: string,
}

const ItemPost = ({img, title, text, comments, likes}: Props) => {
  return (
    <div>
      {img && <img src={`http://localhost:4005${img}`}/>}
      <div>{title}</div>
      <div>{text}</div>
      <span>{likes.length}</span>
      <span>{comments.length}</span>
    </div>
  )
}

export default ItemPost
