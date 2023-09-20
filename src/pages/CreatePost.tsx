import React, { useEffect, useState, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../utils/hooks'
import { createPost, clearStatus } from '../redux/postSlice'
import { toast } from 'react-toastify'
import axios from '../utils/axios'
import { useNavigate } from 'react-router-dom'
import {
  FormItem,
  Textarea,
  Input,
  File,
  Button
} from "@vkontakte/vkui";
import {Icon24Camera} from "@vkontakte/icons";

const CreatePost = () => {

  const [text, setText] = useState('')
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState('')

  const [image, setImage] = useState('');

  const status = useAppSelector(state => state.post.status)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
      tags: tags.split('#')
    }
    console.log(post)

    dispatch(createPost(post))
  }
  

  return (
    <>
      <FormItem style={{marginTop: '20px'}}>
        {!image ?
        <File before={<Icon24Camera role="presentation" />} size="m"
          onChange={(e) => e.target.files && addImage(e.target.files[0])}>
          Open gallery
          </File> :
          <div>
            <Button
              style={{padding: '3px'}}
              onClick={deleteImage}>Delete image</Button>
            <img className='img-foradd' src={`http://localhost:4005${image}`} />
          </div>}
      </FormItem>
      <FormItem top="Title*">
        <Input
          onChange={e => setTitle(e.target.value)}
          placeholder="please write title here" />
      </FormItem>
      <FormItem top="Text*">
        <Textarea
          onChange={e => setText(e.target.value)}
          placeholder="please write text here"
        />
      </FormItem>
      <FormItem top="Hashtags">
        <Input
          defaultValue={'#'}
          onChange={e => setTags(e.target.value)}
          placeholder="please write hashtag here" />
      </FormItem>
      <FormItem style={{marginBottom: '20px'}}>
        <Button
          onClick={addPost}
          style={{ padding: '3px', marginTop: '10px' }}>Create post</Button>
      </FormItem>
    </>
  )
}

export { CreatePost }
