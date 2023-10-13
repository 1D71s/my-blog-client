import { useInView } from 'react-intersection-observer';
import { Icon16CheckOutline, Icon16CheckDoubleOutline } from '@vkontakte/icons';
import { getTimeMakingPost } from '../../utils/Functions';
import { useAppearance } from '@vkontakte/vkui';
import { Message } from '../../pages/Messages/Messages';

interface ChatMessageProps {
    mess: Message;
    read: () => void;
    me: string | undefined
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ mess, read, me }) => {

    const apperance = useAppearance()

    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.5,
    });

    if (inView) {
        read()
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
        <div ref={ref}
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
    );
};