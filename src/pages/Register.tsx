import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../utils/hooks'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../redux/userSlice'
import { toast } from 'react-toastify'
import { clearStatus } from '../redux/userSlice'
import { Link } from 'react-router-dom'
import { Panel, View, FormItem, FormLayout, FormLayoutGroup, Button, Title, Select,useAppearance } from "@vkontakte/vkui";
import { useForm } from 'react-hook-form'

type FormType = {
  firstName: string,
  lastName: string,
  email: string,
  userName: string,
  password: string,
  confirmPassword: string
}

const Register = () => {

  const { register, watch, formState: { errors, isValid }, handleSubmit } = useForm<FormType>({ mode: 'onBlur' })

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [sex, setSex] = useState('Man')
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
    if (status === 'Registration completed successfully!') {
      toast(status)
      navigate('/')
      dispatch(clearStatus())
    } else {
     setErrorForm(status)
    }
  }, [status])

  const registration = async () => {
    if (isValid) {
      const newUser = {
        username,
        email,
        password,
        useravatar: '',
        firstName,
        lastName,
        sex
      };
      await console.log(newUser)
      dispatch(registerUser(newUser));
    }
  };

  
  return  (
    <View activePanel="new-user" >
      <Panel id="new-user">
        <FormLayout  onSubmit={handleSubmit(registration)}>
            <Title level="1" style={{ margin: 15 }}>
              Registration
            </Title>
            <FormItem htmlFor="name" top="User"
              status={!errors?.userName ? 'valid' : 'error'}
              bottom={
                errors?.userName && `${errors?.userName.message}`
              }
            >
              <input
                className={`${appearance === 'dark' ? 'input-register-dark' : 'input-register-light'} ${errors?.userName && appearance === 'dark' ? 'input-items-error-dark' : ''} ${errors?.userName && appearance === 'light' ? 'input-items-error-light' : ''}`}
                {...register('userName', {
                  required: 'Please write username',
                })}
                placeholder='username'
                value={username}
                onChange={e => setUsername(e.target.value)}
                />
            </FormItem>
            <FormItem
              htmlFor="email"
              top="E-mail"
              status={!errors?.email ? 'valid' : 'error'}
              bottom={
                errors?.email && `${errors?.email.message}`
              }
              bottomId="email-type"
            >
            <input
                {...register('email', {
                  required: 'Please write your email',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                className={`${appearance === 'dark' ? 'input-register-dark' : 'input-register-light'} ${errors?.email && appearance === 'dark' ? 'input-items-error-dark' : ''} ${errors?.email && appearance === 'light' ? 'input-items-error-light' : ''}`}
                aria-labelledby="email-type"
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                id="email"
                type="email"
              name="email"
              placeholder='email'
              />
            </FormItem>

            <FormItem top="Password" htmlFor="pass"
              status={!errors?.password ? 'valid' : 'error'}
              bottom={
                errors?.password && `${errors?.password.message}`
              }
            >
              <input id="pass" type="password" placeholder="password"
                value={password}
                {...register('password', {
                  required: 'Please enter your password',
                  pattern: {
                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])(?=.*[a-zA-Z]).{8,}$/,
                    message: 'Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character',
                  },
                })}
                className={`${appearance === 'dark' ? 'input-register-dark' : 'input-register-light'} ${errors?.password && appearance === 'dark' ? 'input-items-error-dark' : ''} ${errors?.password && appearance === 'light' ? 'input-items-error-light' : ''}`}
                onChange={(e) => setPassword(e.target.value)}/>
            </FormItem>

            <FormItem bottomId="passwordDescription">
              <input
                placeholder="confirm password"
                value={confirmPassword}
                type="password"
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (value) => value === watch('password') || 'Passwords do not match', // Проверяем совпадение с первым паролем
                })}
                className={`${appearance === 'dark' ? 'input-register-dark' : 'input-register-light'} ${errors?.confirmPassword && appearance === 'dark' ? 'input-items-error-dark' : ''} ${errors?.confirmPassword && appearance === 'light' ? 'input-items-error-light' : ''}`}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {errors.confirmPassword && <p className={`error-item-text-${appearance === 'dark' ? 'dark' : 'light'}`}>{errors.confirmPassword.message}</p>}
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

            <FormItem htmlFor="lastname" top="Last Name"
              status={!errors?.lastName ? 'valid' : 'error'}
              bottom={
                errors?.lastName && `${errors?.lastName.message}`
              }>
              <input
                  className={`${appearance === 'dark' ? 'input-register-dark' : 'input-register-light'} ${errors?.lastName && appearance === 'dark' ? 'input-items-error-dark' : ''} ${errors?.lastName && appearance === 'light' ? 'input-items-error-light' : ''}`}
                  {...register('lastName', {
                    required: 'Please write your last name',
                  })}
                  placeholder='last name'
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                />
              </FormItem>
            </FormLayoutGroup>

            <FormItem top="Sex">
              <Select
                placeholder="Choose sex"
                onChange={(e) => setSex(e.target.value)}
                value={sex}
                  options={[
                    { value: 'Man', label: 'Man' },
                    { value: 'Woman', label: 'Woman' },
                  ]}
                />
            </FormItem>
            
            {errorForm && <FormItem>
              <p className={appearance === 'dark' ? 'input-error-dark' : 'input-error-light'}>{errorForm}</p>
            </FormItem>}
            
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