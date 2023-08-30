import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../redux/userSlice'
import { toast } from 'react-toastify'
import { clearStatus } from '../redux/userSlice'
import { getMe } from '../redux/userSlice'

const Login = () => {
  
  const [email, setEmail] = useState('koder2563@gmail.com')
  const [password, setPassword] = useState('123456')

  const [errorForm, setErrorForm] = useState<string | null>('');

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const status = useAppSelector(state => state.auth.status)

  const logIn = () => {
    const form = {
      email,
      password,
    };

    dispatch(loginUser(form))
  };

  useEffect(() => {
    dispatch(clearStatus())
  }, [])

  useEffect(() => {
    if (status === 'Вы вошли в систему!') {
      toast(status)
      dispatch(getMe())
      navigate('/')
    } else {
      setErrorForm(status)
    }
  }, [status])
  
  return (
    <div className='cont-login'>
      <div>
        <b className='header-auth'>Авторизация</b>
        <div>
          <div className='el'>Email:</div>
          <input
            className='el input-auth'
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)} />
          <div className='el'>Пароль:</div>
          <input
            className='el input-auth'
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)} />
          <p className='input-error'>{errorForm}</p>
        </div>
        <div className='cont-btn'>
          <button className='btn-form' onClick={logIn}>Войти</button>
        </div>
        <div className='ask-auth'>
          <Link to='/register'>У вас нет аккаунта?</Link>
        </div>
      </div>
    </div>
  )
}

export { Login }
