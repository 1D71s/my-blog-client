import { useEffect, useState, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../utils/hooks'
import { clearStatus } from '../redux/postSlice'
import { toast } from 'react-toastify'
import axios from '../utils/axios'
import { useNavigate } from 'react-router-dom'
import { getMe } from '../redux/userSlice'
import {
    FormItem,
    Textarea,
    Input,
    File,
    Button,
    NativeSelect,
    DatePicker,
    SegmentedControl
} from "@vkontakte/vkui";
import {Icon24Camera} from "@vkontakte/icons";

const url = process.env.REACT_APP_URL

type UserUpdate = {
    username?: string
    email?: string
    image?: string,
}

const EditProfile = () => {

    const me = useAppSelector(state => state.auth.user)

    const [username, setUsername] = useState(me?.username)
    const [email, setEmail] = useState(me?.email)
    const [sex, setSex] = useState(me?.sex)

    const [myStatus, setMyStatus] = useState(me?.fullInfo?.myStatus);
    const [birthday, setBirthday] = useState(me?.fullInfo?.birthday);
    const [country, setCountry] = useState(me?.fullInfo?.country);
    const [sity, setSity] = useState(me?.fullInfo?.sity);
    const [hobby, setHobby] = useState(me?.fullInfo?.hobby);
    const [university, setUniversity] = useState(me?.fullInfo?.university);
    const [job, setJob] = useState(me?.fullInfo?.job);
    const [about, setAbout] = useState(me?.fullInfo?.about);
   


    const [image, setImage] = useState(me?.useravatar);

    const status = useAppSelector(state => state.post.status)

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const deleteImage = () => {
        setImage('')
    }

    if (!username) {
        navigate('/me')
    }

    useEffect(() => {
        setImage(me?.useravatar === '/uploads/ava.webp' ? '' : me?.useravatar)
    }, [])

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

    const addInfo = async () => {
        const user = {
            image: image === '' ? '/uploads/ava.webp' : image ,
            email,
            username,
            sex,
            fullInfo: {myStatus, birthday, country, sity, hobby, university, job, about}
        }
        updateProfile(user)
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
                        onClick={deleteImage}
                    >Delete image</Button>
                    <img className='img-foradd' src={`${url}${image}`} />
                </div>}
            </FormItem>

            <FormItem top="My status">
                <Textarea
                    value={myStatus}
                    onChange={e => setMyStatus(e.target.value)}
                    placeholder="please write status here"
                />
            </FormItem>

            <FormItem top="Username*">
                <Input
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="please write title here"
                />
            </FormItem>
            <FormItem top="Email*">
                <Input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="please write text here"
                />
            </FormItem>

            <FormItem top="Выберите пол">
                <SegmentedControl
                    name="sex"
                    defaultValue={sex}
                    onChange={(value) => setSex(value?.toString())}
                    options={[
                        {
                            label: 'Man',
                            value: 'Man',
                        },
                        {
                            label: 'Woman',
                            value: 'Woman',
                        },
                    ]}
                />
            </FormItem>

            <FormItem top="Дата рождения">
                <DatePicker
                    min={{ day: 1, month: 1, year: 1901 }}
                    max={{ day: 1, month: 1, year: 2015 }}
                    onDateChange={(value) => {
                        console.log(value);
                        const formattedDate = `${value.day}.${value.month}.${value.year}`;
                        setBirthday(formattedDate);
                    }}
                    defaultValue={{ day: 2, month: 4, year: 1994 }}
                />
            </FormItem>

            <FormItem top="Country">
                <Input
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                    placeholder="please write your country here"
                />
            </FormItem> 

            <FormItem top="Sity">
                <Input
                    value={sity}
                    onChange={e => setSity(e.target.value)}
                    placeholder="please write your sity here"
                />
            </FormItem> 

            <FormItem top="Job">
                <Textarea
                    value={job}
                    onChange={e => setJob(e.target.value)}
                    placeholder="please write your job here"
                />
            </FormItem>

            <FormItem top="My Hobby">
                <Textarea
                    value={hobby}
                    onChange={e => setHobby(e.target.value)}
                    placeholder="please write your hobby here"
                />
            </FormItem>

            <FormItem top="About me">
                <Textarea
                    value={about}
                    onChange={e => setAbout(e.target.value)}
                    placeholder="please write info about you here"
                />
            </FormItem>

            <FormItem style={{marginBottom: '20px'}}>
                <Button
                    onClick={addInfo}
                    style={{ padding: '3px', marginTop: '10px' }}
                >Update profile</Button>
            </FormItem>
        </>
    )
}

export { EditProfile }

