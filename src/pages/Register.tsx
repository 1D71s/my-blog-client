import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../redux/userSlice'
import { toast } from 'react-toastify'


const Register = () => {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const status = useAppSelector(state => state.auth.status)

  useEffect(() => {
    if (status) toast(status)
    if (status === 'Регистрация прошла успешно') navigate('/')
  }, [status])

  const registration = async () => {
    const newUser = {
      username,
      email,
      password,
    };
    dispatch(registerUser(newUser));
    setEmail('')
    setPassword('')
    setUsername('')
  };
  

  return (
    <div>
      <div>
        <div>
          <div>Логин:</div>
          <input type="text" onChange={e => setUsername(e.target.value)} />
          <div>Email:</div>
          <input type="email" onChange={e => setEmail(e.target.value)} />
          <div>Пароль:</div>
          <input type="password" onChange={e => setPassword(e.target.value)}/>
        </div>
        <div>
          <button onClick={registration}>Зарегистрироваться</button>
        </div>
      </div>
    </div>
  )
}

export { Register }
