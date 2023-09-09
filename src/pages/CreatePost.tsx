import React, { useEffect, useState, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { createPost, clearStatus } from '../redux/postSlice'
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

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleAddImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const deleteImage = () => {
    setImage('')
    resetFileInput()
  }

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

  useEffect(() => {
    if (status === 'Пост добавлен!') {
      toast(status)
      navigate('/')
      dispatch(clearStatus())
    }
  }, [status])

  const addPost = async () => {
    const post = {
      image,
      text,
      title,
    }
    dispatch(createPost(post))
  }
  

  return (
    <div className='create-post'>
      <div className='form-for-addpost'>
        <input
          ref={fileInputRef}
          className='input-file'
          accept=".jpg, .jpeg, .png, image/*"
          type="file" onChange={(e) => e.target.files && addImage(e.target.files[0])} />
        
        {!image ? <button className='btn-add-image' onClick={handleAddImageClick}>
          Добавить картинку
        </button> : <div>
          <button className='btn-delete-image' onClick={deleteImage}>
            Удалить
          </button>
          
          <img className='img-foradd' src={`http://localhost:4005${image}`}/>
        </div>}

        <div className='el'>Заголовок:</div>
        <input className='input-add-post' type="text" onChange={e => setTitle(e.target.value)}/>
        <div className='el'>Текст:</div>
        <textarea className='input-add-post textarea' onChange={e => setText(e.target.value)}/>
        <div className='el'>Хэштеги:</div>
        <input className='input-add-post' type="text" />

        <div className='cont-btn'>
          <button className='btn-form' onClick={addPost}>Добавить статью</button>
        </div>
      </div>
    </div>
  )
}

export { CreatePost }
