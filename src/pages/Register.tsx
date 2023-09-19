import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../utils/hooks'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../redux/userSlice'
import { toast } from 'react-toastify'
import { clearStatus } from '../redux/userSlice'
import { Link } from 'react-router-dom'
import {
  Panel,
  View,
  FormItem,
  Input,
  FormLayout,
  FormLayoutGroup,
  Button,
  Title,
  Select,
  useAppearance
} from "@vkontakte/vkui";
import { useForm } from 'react-hook-form'

type FormType = {
  firstName: string
}

const Register = () => {

  const {
    register,
    formState: {
      errors,
    },
    handleSubmit
  } = useForm<FormType>({
    mode: 'onBlur'
  })

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [twoPassword, setTwoPassword] = useState('')
  const [sex, setSex] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')


  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const appearance = useAppearance();

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
      twoPassword,
      useravatar: '',
      firstName,
      lastName,
      sex
    };
    await console.log(newUser)
    dispatch(registerUser(newUser));
    setEmail('')
    setPassword('')
    setUsername('')
  };

  
  return  (
    <View activePanel="new-user" >
      <Panel id="new-user">
        <FormLayout  onSubmit={handleSubmit(registration)}>
            <Title level="1" style={{ margin: 15 }}>
              Registration
            </Title>
            <FormItem htmlFor="name" top="User">
              <Input placeholder='username'  onChange={e => setUsername(e.target.value)}/>
            </FormItem>
            <FormItem
              htmlFor="email"
              top="E-mail"
              status={email ? 'valid' : 'error'}
              bottom={
                email ? 'Электронная почта введена верно!' : 'Please write email adress'
              }
              bottomId="email-type"
            >
              <Input
                aria-labelledby="email-type"
                id="email"
                type="email"
                name="email"
              />
            </FormItem>

            <FormItem top="Password" htmlFor="pass">
              <Input id="pass" type="password" placeholder="Password" />
            </FormItem>

            <FormItem bottomId="passwordDescription">
              <Input
                type="password"
                placeholder="Repeat password"
                aria-labelledby="passwordDescription"
              />
            </FormItem>

            <FormLayoutGroup mode="horizontal">
              <FormItem htmlFor="name" top="First Name"
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

              <FormItem htmlFor="lastname" top="Last Name">
                <Input id="lastname" placeholder='last name'  onChange={e => setLastName(e.target.value)}/>
              </FormItem>
            </FormLayoutGroup>

            <FormItem top="Sex">
              <Select
                placeholder="Choose sex"
                onChange={(e) => setSex(e.target.value)}
                  options={[
                    { value: 'Man', label: 'Man' },
                    { value: 'Woman', label: 'Woman' },
                  ]}
                />
            </FormItem>
            <FormItem>
              <p className='input-error'>{errorForm}</p>
            </FormItem>
            
            <FormItem type='submit'>
              <Button
                onClick={registration}
                size="l"
                stretched>
                  Registration
              </Button>
            </FormItem>
            <FormItem>
              <Link to='/login'>
                <Button style={{ background: '#4bb34b', color: 'white' }} size="l" stretched>Sign in</Button>
              </Link>
            </FormItem>
        </FormLayout>
      </Panel>
    </View>
  );
}

export { Register }