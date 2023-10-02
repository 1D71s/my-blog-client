import { Group, FormLayout, Button, Panel, Title, FormItem, Input, useAppearance } from "@vkontakte/vkui";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../utils/hooks";
import { toast } from 'react-toastify'
import { Spinner } from '@chakra-ui/react';
import '../../style/Auth.css'
import { useState } from 'react'
import axios from "../../utils/axios";
import { useForm } from 'react-hook-form'


const ChangePass = () => {

    const { register, formState: { errors, isValid }, handleSubmit } = useForm({ mode: 'onBlur' })


    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const [errorForm, setErrorForm] = useState<string | null>('');

    const navigate = useNavigate()

    const appearance = useAppearance()
    
    const token = useAppSelector(state => state.auth.token);

    const changePassword = async () => {
        try {
            const { data } = await axios.patch('auth/edit/pass', {password, newPassword})
            setLoading(false)
            if (data.message === "The password has been changed!") {
                navigate('/')
            } else {
                setErrorForm(data.message)
            }
        } catch (error) {
            toast('error!')
            console.log(error)
        }
    }

    const editPass = () => {

        if (newPassword !== confirmPassword) return setErrorForm('Password mismatch!')

        setLoading(true)
        changePassword()
    }

    return (
        <>
           <Group>
                <Panel id="new-user">
                    <FormLayout>
                    {token && <div className='log-in'>
                        <Title level="1" style={{ margin: 15 }}>
                            Update Password
                        </Title>
                        <FormItem top="Password" htmlFor="pass">
                            <Input id="pass" type="password" placeholder="password"
                            onChange={e => setPassword(e.target.value)}/>
                        </FormItem>
                        <FormItem top="Password" htmlFor="pass"
                            status={!errors?.password ? 'valid' : 'error'}
                            bottom={
                                errors?.password && `${errors?.password.message}`
                            }
                            >
                            <input id="pass" type="password" placeholder="password"
                                value={newPassword}
                                {...register('password', {
                                required: 'Please enter your password',
                                pattern: {
                                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])(?=.*[a-zA-Z]).{8,}$/,
                                    message: 'Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character',
                                },
                                })}
                                className={`${appearance === 'dark' ? 'input-register-dark' : 'input-register-light'} ${errors?.password && appearance === 'dark' ? 'input-items-error-dark' : ''} ${errors?.password && appearance === 'light' ? 'input-items-error-light' : ''}`}
                                onChange={(e) => setNewPassword(e.target.value)}/>
                        </FormItem>
                        <FormItem top="Confirm New Password" htmlFor="pass">
                            <Input id="pass" type="password" placeholder="confirm password"
                        onChange={e => setConfirmPassword(e.target.value)}/>
                        </FormItem>
                            {errorForm && <FormItem>
                            <p className={appearance === 'dark' ? 'input-error-dark' : 'input-error-light'}>{errorForm}</p>
                        </FormItem>}
                        <FormItem>
                            <Button onClick={editPass} disabled={loading || !isValid} size="l" stretched>
                                {!loading ? 'Update password' : <Spinner color='red.500' style={{width: '20px', height: '20px', marginTop: '5px'}}/>}
                            </Button>
                        </FormItem>
                    </div>}
                    </FormLayout>
                </Panel>
            </Group>
        </>
    );
};

export { ChangePass }