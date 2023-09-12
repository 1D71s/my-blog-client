import { useEffect, useState, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { clearStatus } from '../redux/postSlice'
import { toast } from 'react-toastify'
import axios from '../axios'
import { useNavigate } from 'react-router-dom'
import { getMe } from '../redux/userSlice'

type UserUpdate = {
    username?: string
    email?: string
    image?: string
}

const EditProfile = () => {

    const me = useAppSelector(state => state.auth.user)

    const [username, setUsername] = useState(me?.username)
    const [email, setEmail] = useState(me?.email)

    const [image, setImage] = useState(me?.useravatar);

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

    const updateProfile = async (user: UserUpdate) => {
        try {
            const { data } = await axios.put('user/change', user)
            console.log(data)
            toast(data.message)
            dispatch(getMe())
            if (data.message === 'Профиль обновлен!') navigate('/me')
        } catch (error) {
            
        }
    }

    const addPost = async () => {
        const user = {
            image: image === '' ? '/uploads/ava.webp' : image ,
            email,
            username
        }
        updateProfile(user)
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
                Сменить Фото профиля
                </button> : <div>
                <button className='btn-delete-image' onClick={deleteImage}>
                    Удалить
                </button>
                
                <img className='img-foradd' src={`http://localhost:4005${image}`}/>
                </div>}

                <div className='el'>Никнейм:</div>
                <input
                    className='input-add-post'
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)} />
                
                <div className='el'>Email:</div>
                <input
                    className='input-add-post'
                    type="text"
                    value={email}
                    onChange={e => setEmail(e.target.value)} />

                <div className='cont-btn'>
                <button className='btn-form' onClick={addPost}>Обновить профиль</button>
                </div>
            </div>
        </div>
    )
}

export { EditProfile }

