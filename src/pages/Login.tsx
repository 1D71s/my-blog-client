import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../redux/userSlice'
import { toast } from 'react-toastify'

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
    console.log(form)
  };

  useEffect(() => {
    if (status) toast(status)
    if (status === 'Вы вошли в систему') navigate('/')
  }, [status])
  

  return (
    <div>
      <div>
        <div>
          <div>Email:</div>
          <input type="email" onChange={e => setEmail(e.target.value)} />
          <div>Пароль:</div>
          <input type="password" onChange={e => setPassword(e.target.value)}/>
        </div>
        <div>
          <button onClick={logIn}>Войти</button>
        </div>
      </div>
    </div>
  )
}

export { Login }
