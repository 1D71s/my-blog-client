import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../redux/userSlice'
import { toast } from 'react-toastify'
import { clearStatus } from '../redux/userSlice'
import { Link } from 'react-router-dom'


const Register = () => {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [errorForm, setErrorForm] = useState<string | null>('');

  const status = useAppSelector(state => state.auth.status)

  useEffect(() => {
    dispatch(clearStatus())
  }, [])

  useEffect(() => {
    if (status === 'Регистрация прошла успешно!') {
      toast(status)
      navigate('/')
      dispatch(clearStatus())
    } else {
     setErrorForm(status)
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
        <b className='header-auth'>Регистрация</b>
        <div>
          <div className='el'>Логин:</div>
          <input
            className='el input-auth'
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)} />
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
            onChange={e => setPassword(e.target.value)} /><br />
          <p className='input-error'>{errorForm}</p>
        </div>
        <div className='cont-btn'>
          <button className='btn-form' onClick={registration}>Зарегистрироваться</button>
        </div>
        <div className='ask-auth'>
          <Link to='/login'>У вас уже есть аккаунт?</Link>
        </div>
      </div>
    </div>
  )
}

export { Register }
