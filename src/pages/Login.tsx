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
  Title,
  useAppearance,
  ScreenSpinner,
} from "@vkontakte/vkui";

const Login = () => {
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [errorForm, setErrorForm] = useState<string | null>('');

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const appearance = useAppearance()

  const status = useAppSelector(state => state.auth.status)
  const loading = useAppSelector(state => state.auth.loading)
  const token = useAppSelector(state => state.auth.token)
  
  if (token) navigate('/')

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
    if (status === 'You are logged in!') {
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
          {!token && <div className='log-in'>
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
                {errorForm && <FormItem>
                <p className={appearance === 'dark' ? 'input-error-dark' : 'input-error-light'}>{errorForm}</p>
              </FormItem>}
    
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
          </div>}
          {loading && <ScreenSpinner state="loading" />}
        </FormLayout>
      </Panel>
    </View>
  )
}

export { Login }
