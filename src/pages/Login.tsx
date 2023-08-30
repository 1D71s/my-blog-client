import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../redux/userSlice'
import { toast } from 'react-toastify'
import { clearStatus } from '../redux/userSlice'
import { getMe } from '../redux/userSlice'

const Login = () => {
  
  const [email, setEmail] = useState('koder2563@gmail.com')
  const [password, setPassword] = useState('12345')

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const status = useAppSelector(state => state.auth.status)

  const logIn = async () => {
    const form = {
      email,
      password,
    };
    dispatch(loginUser(form))
  };

  useEffect(() => {
    if (status === 'Вы вошли в систему') {
      toast(status)
      dispatch(getMe())
      navigate('/')
      dispatch(clearStatus())
    }
  }, [status])
  
  return (
    <div className='cont-login'>
      <div>
        <div>
          <div className='el'>Email:</div>
          <input className='el input-auth' type="email" onChange={e => setEmail(e.target.value)} />
          <div className='el'>Пароль:</div>
          <input className='el input-auth' type="password" onChange={e => setPassword(e.target.value)}/>
        </div>
        <div className='cont-btn'>
          <button className='btn-form' onClick={logIn}>Войти</button>
        </div>
      </div>
    </div>
  )
}

export { Login }
