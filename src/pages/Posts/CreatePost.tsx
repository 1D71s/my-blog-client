import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from '../../utils/axios'
import { useNavigate } from 'react-router-dom'
import {
  FormItem,
  Textarea,
  Input,
  File,
  Button,
  Group,
  Spinner
} from "@vkontakte/vkui";
import {Icon24Camera} from "@vkontakte/icons";

const url = process.env.REACT_APP_URL

type PostForCreate = {
  image: string;
  text: string;
  title: string;
}


const CreatePost = () => {

  const [text, setText] = useState('')
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState('')

  const [image, setImage] = useState('');

  
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const deleteImage = () => {
    setImage('')
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

  const createPost = async (params: PostForCreate) => {
    try {
      await axios.post('posts/create', params)
      setLoading(false)
      navigate('/')
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  const addPost = async () => {
    const hashtags = tags.split('#').filter(item => item !== '').map(i => i.split('').filter(a => a !== ' ').join('').toLowerCase())
    const post = {
      image,
      text,
      title,
      tags: hashtags
    }
    console.log(post)
    createPost(post)
    setLoading(true)
  }
  
  return (
    <Group>
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
            <img className='img-foradd' src={`${url}${image}`} />
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
          disabled={!text || !title || loading}
          onClick={addPost}
          style={{ padding: '3px', marginTop: '10px' }}>
          {loading ? <Spinner style={{width: '20px', height: '20px'}}/> : 'Create post'}
        </Button>
      </FormItem>
    </Group>
  )
}

export { CreatePost }
