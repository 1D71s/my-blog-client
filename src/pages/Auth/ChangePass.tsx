import { Group, FormLayout, Button, Panel, Title, FormItem, Input, useAppearance } from "@vkontakte/vkui";
import {  } from '@vkontakte/icons';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { toast } from 'react-toastify'
import { Spinner } from '@chakra-ui/react';
import '../../style/Auth.css'
import { useEffect, useState } from 'react'


const ChangePass = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [errorForm, setErrorForm] = useState<string | null>('');

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const appearance = useAppearance()
    
    const loading = useAppSelector(state => state.auth.loading)
    const me = useAppSelector(state => state.auth.user);
    const token = useAppSelector(state => state.auth.token);

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
                        <FormItem top="Password" htmlFor="pass">
                            <Input id="pass" type="password" placeholder="password"
                        onChange={e => setPassword(e.target.value)}/>
                        </FormItem>
                        <FormItem top="Password" htmlFor="pass">
                            <Input id="pass" type="password" placeholder="password"
                        onChange={e => setPassword(e.target.value)}/>
                        </FormItem>
                            {errorForm && <FormItem>
                            <p className={appearance === 'dark' ? 'input-error-dark' : 'input-error-light'}>{errorForm}</p>
                        </FormItem>}
                        <FormItem>
                            <Button disabled={loading} size="l" stretched>
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