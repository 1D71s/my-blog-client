import { useEffect, useState, useRef} from 'react';
import { Socket } from 'socket.io-client'; 
import '../../style/Message.css'
import axios from '../../utils/axios'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
    WriteBarIcon,
    Avatar,
    usePlatform,
    AdaptiveIconRenderer,
    Platform,
    PanelHeaderContent,
    WriteBar,
    Panel,
    FixedLayout,
    View,
    PanelHeader,
    Div,
} from "@vkontakte/vkui";
import { Icon28CameraOutline, Icon24CameraOutline } from '@vkontakte/icons';
import { Icon28Send } from '@vkontakte/icons';


const url = process.env.REACT_APP_URL

type User = {
    _id: string;
    username: string;
    useravatar: string;
    firstName: string;
    lastName: string
}

interface MessagesProps {
  socket: Socket;
}

const Messages: React.FC<MessagesProps> = ({ socket }) => {

    const [user, setUser] = useState<User | null>()
    const [messages, setMessages] = useState<{ content: string; sender: string }[] | null>(null);

    const [text, setText] = useState<string>('');

    const { companion, me } = useParams()

    const lastMessageRef = useRef<HTMLDivElement | null>(null);


    useEffect(() => {
        socket.emit('connectToChat', {
            user1: me,
            user2: companion
        });
        socket.on('sendAllMessage', (data) => {
            setMessages(data)
        })
        socket.on('sendNewMessage', (data) => {
            setMessages(data);
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
    }, [companion])

    
    useEffect(() => {
        window.scrollTo(0, document.body.scrollHeight);
    }, [socket]);
      
    return (
        <View activePanel="fixedLayout" style={{background: 'rgb(242, 242, 242)'}}>
            <Panel id="fixedLayout">
                <PanelHeader fixed>Fixed layout</PanelHeader>
                <FixedLayout vertical="top" filled style={{padding: '20px'}}>
                    <Link to={`/user/${user?._id}`}>
                        <PanelHeaderContent
                            status={`${user?.firstName} ${user?.lastName}`}
                            before={<Avatar size={50} src={`${url}${user?.useravatar}`} />}
                        >
                            {user?.username}
                        </PanelHeaderContent>
                    </Link>
                </FixedLayout>
                <Div style={{
                    background: 'rgb(242, 242, 242)',
                    minHeight: '75vh',
                    marginTop: '10px',
                    display: 'flex',
                    flexDirection: 'column-reverse'
                }}>

{messages
    ?.slice()
    .reverse()
    .map((mess, index) => (
        <div key={index} className={mess.sender === me ? 'message-from-me' : 'message-to-me'}>
            {mess.content}
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
