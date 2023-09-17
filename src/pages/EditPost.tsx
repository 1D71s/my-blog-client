import { useEffect, useState, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../utils/hooks'
import { clearStatus } from '../redux/postSlice'
import { toast } from 'react-toastify'
import axios from '../utils/axios'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'


const EditPost = () => {

    const [text, setText] = useState('')
    const [title, setTitle] = useState('')
    const [tags, setTags] = useState('')

    const [image, setImage] = useState('');

    const status = useAppSelector(state => state.post.status)

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { id } = useParams()

    const getPost = async () => {
        try {
            const { data } = await axios.get(`/posts/getonepost/${id}`)
            setImage(data.image)
            setText(data.text)
            setTitle(data.title)
        } catch (error) {
            toast('Не удалось получить статью!')
            navigate('/')
        }
    }

    useEffect(() => {
        getPost()
    }, [])

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
            navigate('/me')
            dispatch(clearStatus())
        }
    }, [status])

    const addPost = async () => {
        if (text && title) {
            try {
                const post = {image, text, title};
                const { data } = await axios.post(`posts/edit/${id}`, post);
                toast(data.message)
                navigate('/me')
            } catch (error) {
                console.log(error);
                throw error;
            }
        } else {
            toast(!text ? 'Заполните текстовое поле!' :  'Заполните заголовок!')
        }
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
                <input
                    value={title}
                    className='input-add-post' type="text"
                    onChange={e => setTitle(e.target.value)} />
                <div className='el'>Текст:</div>
                <textarea
                    value={text}
                    className='input-add-post textarea'
                    onChange={e => setText(e.target.value)} />
                <div className='el'>Хэштеги:</div>
                <input className='input-add-post' type="text" />

                <div className='cont-btn'>
                <button className='btn-form' onClick={addPost}>Изменить</button>
                </div>
            </div>
        </div>
    )
}

export { EditPost }
