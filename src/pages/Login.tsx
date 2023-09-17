import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../utils/hooks'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../redux/userSlice'
import { toast } from 'react-toastify'
import { clearStatus } from '../redux/userSlice'
import { getMe } from '../redux/userSlice'
import {
  Panel,
  View,
  FormItem,
  Input,
  FormLayout,
  Button,
  Title
} from "@vkontakte/vkui";

const Login = () => {
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [errorForm, setErrorForm] = useState<string | null>('');

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const status = useAppSelector(state => state.auth.status)

  const logIn = () => {
    const form = {
      username,
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
    <View activePanel="new-user">
      <Panel id="new-user">
        <FormLayout>
          <div className='log-in'>
            <Title level="1" style={{ margin: 15 }}>
              Log In
            </Title>
              <FormItem htmlFor="name" top="User">
                <Input id="name" placeholder='username'  onChange={e => setUsername(e.target.value)}/>
              </FormItem>
              <FormItem top="Password" htmlFor="pass">
                <Input id="pass" type="password" placeholder="password"
                onChange={e => setPassword(e.target.value)}/>
              </FormItem>
              <FormItem>
                <p className='input-error'>{errorForm}</p>
              </FormItem>
    
              <FormItem>
                <Button onClick={logIn} size="l" stretched>
                  Log in
                </Button>
              </FormItem>
              <FormItem>
                <Link to='/register'>
                  <Button style={{ background: '#4bb34b', color: 'white' }} size="l" stretched>Sign Up</Button>
                </Link>
              </FormItem>
          </div>
        </FormLayout>
      </Panel>
    </View>
  )
}

export { Login }
