import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../redux/userSlice'
import { toast } from 'react-toastify'
import { clearStatus } from '../redux/userSlice'

const Register = () => {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const status = useAppSelector(state => state.auth.status)

  useEffect(() => {
    if (status === 'Регистрация прошла успешно') {
      toast(status)
      navigate('/')
      dispatch(clearStatus())
    }
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
    <div className='cont-login'>
      <div>
        <div>
          <div className='el'>Логин:</div>
          <input className='el input-auth' type="text" onChange={e => setUsername(e.target.value)} />
          <div className='el'>Email:</div>
          <input className='el input-auth' type="email" onChange={e => setEmail(e.target.value)} />
          <div className='el'>Пароль:</div>
          <input className='el input-auth' type="password" onChange={e => setPassword(e.target.value)}/>
        </div>
        <div className='cont-btn'>
          <button className='btn-form' onClick={registration}>Зарегистрироваться</button>
        </div>
      </div>
    </div>
  )
}

export { Register }
