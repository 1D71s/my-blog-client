import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client'; 
import '../../style/Message.css'
import { Link } from 'react-router-dom';
import {
    Avatar,
    RichCell,
    Group,
    Counter,
    Spinner,
    Placeholder,
    useAppearance
} from "@vkontakte/vkui";
import { useAppSelector } from '../../utils/hooks';
import { Icon56ErrorOutline } from '@vkontakte/icons';


const url = process.env.REACT_APP_URL

interface MessagesProps {
    socket: Socket;
}

interface Dialog {
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
}

const MessagesList: React.FC<MessagesProps>  = ({ socket }) => {
    
    const [dialogs, setDialogs] = useState<Dialog[]>([]);

    const me = useAppSelector(state => state.auth.user)

    const apperance = useAppearance()

    useEffect(() => {
        socket.emit('getAllDialogs', me?._id);

        socket.on('sendAllDialog', (data) => {
            setDialogs(data)
            console.log(data)
        })
    }, [socket , me?._id, dialogs]);

    return (
        <>
            <>
                <Group>
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
                                <Counter>
                                    
                                </Counter>
                                }
                            >
                                {item.who.username}
                        </RichCell>
                    </Link>
                    ))}
                </Group> 
            </>
        </>
    )
}

export { MessagesList }