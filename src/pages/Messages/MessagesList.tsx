import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client'; 
import '../../style/Message.css'
import { Link } from 'react-router-dom';
import {
    Avatar,
    RichCell,
    Group,
    Counter,
    useAppearance,
    TabsItem
} from "@vkontakte/vkui";
import { useAppSelector, useAppDispatch } from '../../utils/hooks';
import { changeCountMessage } from '../../redux/userSlice';
import { Dialog } from '@mui/material';

const url = process.env.REACT_APP_URL

interface MessagesProps {
    socket: Socket;
}

export interface Dialog {
    _id: string;
    messages: {
        content: string;
        sender: string;
    };
    who: {
        _id: string;
        username: string;
        useravatar: string;
    };
    counter: number
}

const MessagesList: React.FC<MessagesProps>  = ({ socket }) => {
    
    const [dialogs, setDialogs] = useState<Dialog[]>([]);

    const me = useAppSelector(state => state.auth.user)

    const apperance = useAppearance()
    const dispatch = useAppDispatch()

    useEffect(() => {
        socket.emit('getAllDialogs', me?._id);

        socket.on('sendAllDialog', (data) => {
            setDialogs(data)
            const newCount = data.reduce((acc: number, dialog: Dialog) => acc + dialog.counter, 0);
            dispatch(changeCountMessage(newCount))
        })
    }, [socket , me?._id, dialogs]);

    return (
        <>
            <Group>
                <TabsItem  after={<Counter size="s"></Counter>}>
                    Direct
                </TabsItem>
            </Group>
            {dialogs.length !== 0 && <Group>
                {dialogs.map((item) => (
                    <Link to={`/direct/${me?._id}/${item.who._id}`}>
                        <RichCell
                            before={<Avatar
                                src={`${url}${item.who.useravatar}`}
                                size={60} />}
                            caption={<>
                                {item.messages.sender === me?._id && <b style={{color: `${apperance === 'light' ? '#0077FF' : '#71aaeb'}`}}>{me?.username}: </b>}
                                {item.messages.content}
                            </>}
                            after={
                                item.counter > 0 && <Counter style={{backgroundColor: `${apperance === 'light' ? '#0077FF' : '#71aaeb'}`}}>
                                    {item.counter}
                                </Counter>
                            }
                        >
                            {item.who.username}
                        </RichCell>
                </Link>
                ))}
            </Group> }
        </>
    )
}

export { MessagesList }