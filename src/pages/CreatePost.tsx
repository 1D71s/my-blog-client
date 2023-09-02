import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { createPost } from '../redux/postSlice'
import { toast } from 'react-toastify'
import axios from '../axios'
import { useNavigate } from 'react-router-dom'

const CreatePost = () => {

  const [text, setText] = useState('')
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState('')

  const [image, setImage] = useState('');

  const status = useAppSelector(state => state.post.status)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const addImage = async (event: File | null) => {
    try {
      if (event) {
        const formData = new FormData()
        const file = event
        formData.append('image', file)
        const { data } = await axios.post('/upload', formData)
        setImage(data.url)
        toast('Изображение успешно загруженно!')
      } else {
        console.log('Файл не выбран')
      }
    } catch (error) {
      console.log(error)
      toast('Ошибка при загрузке файла!')
    }
  }

  const addPost = async () => {
    const post = {
      image,
      text,
      title,
    }
    dispatch(createPost(post))
    if (status === 'Пост добавлен!') {
      toast(status)
      navigate('/')
    }
  }
  

  return (
    <div className='create-post'>
      <input type="file" onChange={(e) => e.target.files && addImage(e.target.files[0])}/>
      <div>Заголовок</div>
      <input type="text" onChange={e => setTitle(e.target.value)}/>
      <div>Текст</div>
      <input type="text" onChange={e => setText(e.target.value)}/>
      <div>Хэштеги</div>
      <input type="text" />

      <div>
        <button onClick={addPost}>Добавить статью</button>
      </div>
    </div>
  )
}

export { CreatePost }
