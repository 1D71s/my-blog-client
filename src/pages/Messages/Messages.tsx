import { useEffect, useState } from 'react';
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

    const { companion } = useParams()

    const platform = usePlatform();

    useEffect(() => {
        socket.emit('message', () => {
            console.log('mes')
        });
    }, []);

    const getUser = async () => {
        try {
          const { data } = await axios.get(`user/fullinfo/${companion}`)
          await setUser(data)
          console.log(user)
        } catch (error) {
          console.log(error)
        }
    }

    useEffect(() => {
        getUser()
      }, [companion])

    const CameraOutlineIcon = (
        <AdaptiveIconRenderer
          IconCompact={platform === Platform.IOS ? Icon28CameraOutline : Icon24CameraOutline}
          IconRegular={Icon28CameraOutline}
        />
    );
    
    useEffect(() => {
        window.scrollTo(0, document.body.scrollHeight);
    }, []);
      
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
                            {user?.username}
                        </PanelHeaderContent>
                    </Link>
                </FixedLayout>
                <Div style={{
                    marginTop: '10px',
                    display: 'flex',
                    flexDirection: 'column-reverse',
                }}>
                    <div className='message-to-me'>gbgb</div>
                    <div className='message-to-me'>dfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgb</div>
                    <div className='message-from-me'>dfgb</div>
                    <div className='message-to-me'>dfgbdf</div>
                    <div className='message-from-me'>dfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgb</div>
                    <div className='message-to-me'>dfgbdfgbdfgb</div>
                    <div className='message-to-me'>dfgb</div>
                    <div className='message-to-me'>dfgbdf</div>
                    <div className='message-to-me'>gbgb</div>
                    <div className='message-to-me'>dfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgb</div>
                    <div className='message-from-me'>dfgb</div>
                    <div className='message-to-me'>dfgbdf</div>
                    <div className='message-from-me'>dfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgbdfgb</div>
                    <div className='message-to-me'>dfgbdfgbdfgb</div>
                    <div className='message-to-me'>dfgb</div>
                    <div className='message-to-me'>dfgbdf</div>
                    
                </Div>
                <FixedLayout filled vertical="bottom">
                    <WriteBar
                        after={
                            <WriteBarIcon>
                                <Icon28Send/>
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
