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
    DatePicker,
    SegmentedControl,
    useAppearance,
    FormLayoutGroup,
    Select,
    Group
} from "@vkontakte/vkui";
import { Icon24Camera } from "@vkontakte/icons";
import { useForm } from 'react-hook-form'

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

    const birthdayForInput = birthday?.split('.').map((item) => parseInt(item, 10));
    console.log(birthdayForInput);


    const [country, setCountry] = useState(me?.fullInfo?.country);
    const [sity, setSity] = useState(me?.fullInfo?.sity);
    const [hobby, setHobby] = useState(me?.fullInfo?.hobby);
    const [university, setUniversity] = useState(me?.fullInfo?.university);
    const [job, setJob] = useState(me?.fullInfo?.job);
    const [about, setAbout] = useState(me?.fullInfo?.about);

    const [firstName, setFirstName] = useState(me?.firstName)
    const [lastName, setLastName] = useState(me?.lastName)

    const [image, setImage] = useState(me?.useravatar);

    const status = useAppSelector(state => state.post.status)

    const { register, formState: { errors, isValid } } = useForm({ mode: 'onChange' })


    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const appearance = useAppearance()

    const deleteImage = () => {
        setImage('')
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
            lastName,
            firstName,
            fullInfo: {myStatus, birthday, country, sity, hobby, university, job, about}
        }
        updateProfile(user)
    }

    const [countries, setCountries] = useState([{ label: '', value: '' }])

    useEffect(() => {
        const getCountry = async () => {
            const { data } = await axios.get('https://restcountries.com/v3.1/all') 
            const result = []
            for (let i = 0; i < data.length; i++) {
                result.push({ label: data[i].name.common, value: data[i].name.common })
            }
            
            if (result) setCountries(result)
        }
        getCountry()
    }, [])
    

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

            <FormItem top="Username*"
                status={!errors?.userName ? 'valid' : 'error'}
                bottom={
                  errors?.userName && `${errors?.userName.message}`
                }
            >
                <input
                    {...register('userName', {
                        required: 'Please write username',
                    })}
                    className={`${appearance === 'dark' ? 'input-register-dark' : 'input-register-light'} ${errors?.userName && appearance === 'dark' ? 'input-items-error-dark' : ''} ${errors?.userName && appearance === 'light' ? 'input-items-error-light' : ''}`}
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="please write title here"
                />
            </FormItem>
            <FormItem 
                htmlFor="email"
                top="E-mail*"
                status={!errors?.email ? 'valid' : 'error'}
                bottom={
                  errors?.email && `${errors?.email.message}`
                }
                bottomId="email-type"
            >
                <input
                    {...register('email', {
                        required: 'Please write your email',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address',
                        },
                    })}
                    className={`${appearance === 'dark' ? 'input-register-dark' : 'input-register-light'} ${errors?.email && appearance === 'dark' ? 'input-items-error-dark' : ''} ${errors?.email && appearance === 'light' ? 'input-items-error-light' : ''}`}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="please write text here"
                />
            </FormItem>

            <FormLayoutGroup mode="horizontal">
                <FormItem htmlFor="name" top="First Name*"
                        status={!errors?.firstName ? 'valid' : 'error'}
                        bottom={
                        errors?.firstName && `${errors?.firstName.message}`
                    }
                >
                <input
                    className={`${appearance === 'dark' ? 'input-register-dark' : 'input-register-light'} ${errors?.firstName && appearance === 'dark' ? 'input-items-error-dark' : ''} ${errors?.firstName && appearance === 'light' ? 'input-items-error-light' : ''}`}
                    {...register('firstName', {
                        required: 'Please write your first name',
                    })}
                    placeholder='first name'
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    />
                </FormItem>

                <FormItem top="Last Name*"
                        status={!errors?.lastName ? 'valid' : 'error'}
                        bottom={
                        errors?.lastName  && `${errors?.lastName.message}`
                    }>
                    <input
                        className={`${appearance === 'dark' ? 'input-register-dark' : 'input-register-light'} ${errors?.lastName && appearance === 'dark' ? 'input-items-error-dark' : ''} ${errors?.lastName && appearance === 'light' ? 'input-items-error-light' : ''}`}
                        {...register('lastName', {
                            required: 'Please write your last name',
                        })}
                        placeholder='last name'
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                    />
                </FormItem>
            </FormLayoutGroup>

            <FormItem top="Sex*">
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

            <FormItem top="Birthday">
                <DatePicker
                    min={{ day: 1, month: 1, year: 1901 }}
                    max={{ day: 1, month: 1, year: 2015 }}
                    onDateChange={(value) => {
                        console.log(value);
                        const formattedDate = `${value.day}.${value.month}.${value.year}`;
                        setBirthday(formattedDate);
                    }}
                    defaultValue={{ day: (birthdayForInput ? birthdayForInput[0] : 1), month: (birthdayForInput ? birthdayForInput[1] : 1), year: (birthdayForInput ? birthdayForInput[2] : 1901) }}
                />
            </FormItem>

            <FormItem top="Country">
                <Select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    options={countries}
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

            <FormItem top="University">
                <Textarea
                    value={university}
                    onChange={e => setUniversity(e.target.value)}
                    placeholder="please write your university here"
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
                    disabled={!isValid}
                    onClick={addInfo}
                    style={{ padding: '3px', marginTop: '10px' }}
                >Update profile</Button>
            </FormItem>
        </Group>
    )
}

export { EditProfile }

