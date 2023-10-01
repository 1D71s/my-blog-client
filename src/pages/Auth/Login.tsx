import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../utils/hooks'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser, getMe } from '../../redux/userSlice'
import { toast } from 'react-toastify'
import { clearStatus } from '../../redux/userSlice'
import {
  Panel,
  Group,
  FormItem,
  Input,
  FormLayout,
  Button,
  Title,
  useAppearance,
} from "@vkontakte/vkui";
import { Spinner } from '@chakra-ui/react';
import '../../style/Auth.css'

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
      if (token) navigate(`/`)
    } else {
      setErrorForm(status)
    }
  }, [status])
  
  return (
    <Group>
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
                <Button disabled={loading} onClick={logIn} size="l" stretched>
                  {!loading ? 'Log in' : <Spinner color='red.500' style={{width: '20px', height: '20px', marginTop: '5px'}}/>}
                </Button>
            </FormItem>
              <FormItem>
                <Link to='/register'>
                  <Button style={{ background: '#4bb34b', color: 'white' }} size="l" stretched>Sign Up</Button>
                </Link>
              </FormItem>
          </div>}
        </FormLayout>
      </Panel>
    </Group>
  )
}

export { Login }
