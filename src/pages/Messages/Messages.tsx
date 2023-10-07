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

    const apperance = useAppearance()

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
    }, [])

    useEffect(() => {
        window.scrollTo(0, document.body.scrollHeight);
    }, []);
    

    const messageFromMe = {
        backgroundColor: '#0077FF',
        color: 'white',
        alignSelf: 'flex-end',
        borderBottomRightRadius: '0px'
    };

    const messageToMe = {
        backgroundColor: `${apperance === 'light' ? 'rgb(224, 224, 224)' : 'rgb(32, 32, 33)'}`,
        color: `${apperance === 'dark' ? 'white' : 'black'}`,
        alignSelf: 'flex-start',
        borderBottomLeftRadius: '0px',
    };

    const messageStyles = {
        margin: '10px',
        width: 'max-content',
        padding: '10px',
        borderRadius: '10px',
        maxWidth: '80%',
    };
    
      
    return (
        <View activePanel="fixedLayout">
            <Panel id="fixedLayout">
                <PanelHeader fixed>Fixed layout</PanelHeader>
                <FixedLayout vertical="top" filled style={{padding: '20px'}}>
                    <Link to={`/user/${user?._id}`}>
                        <PanelHeaderContent
                            status={`${user?.firstName} ${user?.lastName}`}
                            before={<Avatar size={50} src={`${url}${user?.useravatar}`} />}
                        >
                            <span style={{color: `${apperance === 'dark' ? '#71aaeb' : 'black'}`}}>{user?.username}</span>
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
                                key={index}
                                style={
                                    mess.sender === me
                                        ? { ...messageFromMe, ...messageStyles }
                                        : { ...messageToMe, ...messageStyles }
                                }>
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
