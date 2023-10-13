import { useEffect, useState, useRef } from 'react';
import { Socket } from 'socket.io-client'; 
import '../../style/Message.css'
import axios from '../../utils/axios'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
    WriteBarIcon,
    Avatar,
    PanelHeaderContent,
    WriteBar,
    Panel,
    FixedLayout,
    View,
    PanelHeader,
    Div,
    useAppearance
} from "@vkontakte/vkui";
import { Icon28Send, Icon16CheckOutline, Icon16CheckDoubleOutline } from '@vkontakte/icons';
import { getTimeMakingPost } from '../../utils/Functions';


const url = process.env.REACT_APP_URL

type User = {
    _id: string;
    username: string;
    useravatar: string;
    firstName: string;
    lastName: string
}

type Message = {
    _id: string;
    content: string;
    sender: string;
    createdAt: string;
    read: boolean
}

interface MessagesProps {
  socket: Socket;
}

const Messages: React.FC<MessagesProps> = ({ socket }) => {

    const [user, setUser] = useState<User | null>()
    const [messages, setMessages] = useState<Message[] | null>(null);

    const [dialog, setDialog] = useState('')


    const [text, setText] = useState<string>('');

    const { companion, me } = useParams()

    const apperance = useAppearance()

    useEffect(() => {
        socket.emit('connectToChat', {
            user1: me,
            user2: companion
        });
        socket.on('sendAllMessage', (data) => {
            setMessages(data.messages)
            setDialog(data._id)
        })
        socket.on('sendNewMessage', (data) => {
            setMessages(data);
            setTimeout(() => {
                window.scrollTo(0, document.body.scrollHeight);
            }, 500)
        });

    }, [socket, messages]);

    const sendMessage = () => {
        if (text.trim() !== '') {
            socket.emit('writeMessage', {
                user1: me,
                user2: companion,
                text
            });
            setText(''); 
        }
    }

    const getUser = async () => {
        try {
            const { data } = await axios.get(`user/fullinfo/${companion}`)
            await setUser(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo(0, document.body.scrollHeight);
        }, 500)
    }, [messages?.length])

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo(0, document.body.scrollHeight);
        }, 100)
    }, [user]);
    
    const readMessage = (mess: Message) => {
        if (mess.sender !== me && !mess.read) {
            socket.emit('readed', {id: mess._id, dialog } )
        }
    }

    const messageFromMe = {
        backgroundColor: '#0077FF',
        color: 'white',
    };

    const messageToMe = {
        backgroundColor: `${apperance === 'light' ? 'rgb(224, 224, 224)' : 'rgb(32, 32, 33)'}`,
        color: `${apperance === 'dark' ? 'white' : 'black'}`,
    };
      
    return (
        <View activePanel="fixedLayout">
            <Panel id="fixedLayout">
                <PanelHeader fixed
                >Fixed layout</PanelHeader>
                <FixedLayout vertical="top" filled style={{padding: '15px', width: '100%'}}>
                    <Link to={`/user/${user?._id}`}>
                        <PanelHeaderContent
                            status={`${user?.firstName} ${user?.lastName}`}
                            before={<Avatar size={50} src={`${url}${user?.useravatar}`} />}
                        >
                            <span style={{ color: `${apperance === 'dark' ? '#71aaeb' : 'black'}` }}>{user?.username}
                            </span>
                        </PanelHeaderContent>
                    </Link>
                </FixedLayout>
                <Div style={{
                    background: `${apperance === 'light' ? 'rgb(242, 242, 242)' : 'black'}`,
                    minHeight: '75vh',
                    marginTop: '10px',
                    display: 'flex',
                    flexDirection: 'column-reverse'
                }}>
                    {messages
                        ?.slice()
                        .reverse()
                        .map((mess, index) => (
                            <div
                                onMouseEnter={() => readMessage(mess)}
                                key={index}
                                className={mess.sender === me ? 'message-from-me' : 'message-to-me'}
                                style={
                                    mess.sender === me
                                        ? { ...messageFromMe }
                                        : { ...messageToMe }
                                }>
                                {mess.content}
                                <div style={{fontSize: '11px', marginTop: '10px', display: 'flex'}}>
                                    <span>{getTimeMakingPost(mess.createdAt)}</span>
                                    <span style={{ marginLeft: '10px' }}>
                                        {mess.read ? <Icon16CheckDoubleOutline/> : <Icon16CheckOutline/>}
                                    </span>
                                </div>
                            </div>
                    ))}
                </Div>
                <FixedLayout filled vertical="bottom">
                    <WriteBar
                        value={text}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
                        after={
                            <WriteBarIcon>
                                <Icon28Send onClick={sendMessage}/>
                            </WriteBarIcon>
                        }
                        placeholder="Message"
                    />
                </FixedLayout>
              </Panel>
        </View>
    );
}

export { Messages };
