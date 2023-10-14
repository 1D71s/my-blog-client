import { useEffect, useState } from 'react'
import { useAppDispatch } from '../../utils/hooks'
import { toast } from 'react-toastify'
import axios from '../../utils/axios'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
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

const EditPost = () => {

    const [text, setText] = useState('')
    const [title, setTitle] = useState('')
    const [tags, setTags] = useState('')

    const [loading, setLoading] = useState(false)

    const [image, setImage] = useState('');

    const navigate = useNavigate()
    const { id } = useParams()

    const getPost = async () => {
        try {
            const { data } = await axios.get(`/posts/getonepost/${id}`)
            setImage(data.image)
            setText(data.text)
            setTitle(data.title)
            setTags('#' + data.tags.join('#'))
        } catch (error) {
            toast('Не удалось получить статью!')
            navigate('/')
        }
    }

    useEffect(() => {
        getPost()
    }, [])


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

    const addPost = async () => {
        if (text && title) {
            await setLoading(true)
            try {
                const hashtags = tags.split('#').filter(item => item !== '').map(i => i.split('').filter(a => a !== ' ').join('').toLowerCase())
                const post = { image, text, title, tags: hashtags };
                const { data } = await axios.post(`posts/edit/${id}`, post);
                toast(data.message)
                navigate('/')
                setLoading(false)
            } catch (error) {
                console.log(error);
                throw error;
            }
        } else {
            toast(!text ? 'Заполните текстовое поле!' :  'Заполните заголовок!')
        }
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
                        onClick={deleteImage}
                    >Delete image</Button>
                    <img style={{marginTop: '30px'}} className='img-post-item' src={`${url}${image}`} />
                </div>}
            </FormItem>
            <FormItem top="Title*">
                <Input
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="please write title here"
                />
            </FormItem>
            <FormItem top="Text*">
                <Textarea
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder="please write text here"
                />
            </FormItem>
            <FormItem top="Hashtags">
                <Input
                    value={tags}
                    defaultValue={'#'}
                    onChange={e => setTags(e.target.value)}
                    placeholder="please write hashtag here"
                />
            </FormItem>
            <FormItem style={{marginBottom: '20px'}}>
                <Button
                    disabled={!text || !title || loading}
                    onClick={addPost}
                    style={{ padding: '3px', marginTop: '10px' }}
                >
                    {loading ? <Spinner style={{width: '20px', height: '20px'}}/> : 'Update post'}
                </Button>
            </FormItem>
        </Group>
    )
}

export { EditPost }
