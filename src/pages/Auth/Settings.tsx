import { Group, Header, SimpleCell,ModalCard, Button, ButtonGroup } from "@vkontakte/vkui";
import { Icon24BookmarkCheckBadge, Icon24UsersOutline, Icon24GearOutline, Icon24DoorArrowRightOutline, Icon24UserAdded, Icon24Write } from '@vkontakte/icons';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../utils/hooks";
import { logOut } from '../../redux/userSlice';
import { toast } from 'react-toastify'
import { useAppSelector } from "../../utils/hooks";


const Settings = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const me = useAppSelector(state => state.auth.user);
    const token = useAppSelector(state => state.auth.token);

    const logOutAccount = () => {
        dispatch(logOut())
        navigate('/login')
        toast('You are logged out of your account!')
    }

    if (!token) navigate('/')

    return (
        <>
            <Group header={<Header mode="secondary">Menu</Header>}>
                <Link to={`/user/${me?._id}/edit`}>
                    <SimpleCell
                        expandable
                        before={<Icon24Write style={{width: '40px', height: '40px'}}/>}
                    >
                        Edit Profile
                    </SimpleCell>
                </Link>
                <Link to={`/user/favorite/${me?._id}`}>
                    <SimpleCell
                        expandable
                        before={<Icon24BookmarkCheckBadge style={{width: '40px', height: '40px'}}/>}
                    >
                        My Favorite
                    </SimpleCell>
                </Link>

            </Group>
            <Group header={<Header mode="secondary">Users</Header>}>
                <Link to={`/user/following/${me?._id}`}>
                    <SimpleCell
                        expandable
                        before={<Icon24UserAdded style={{width: '40px', height: '40px'}}/>}
                    >
                        My following
                    </SimpleCell>
                </Link>
                <Link to={`/user/followers/${me?._id}`}>
                    <SimpleCell
                        expandable
                        before={<Icon24UsersOutline style={{width: '40px', height: '40px'}}/>}
                    >
                        My followers
                    </SimpleCell>
                </Link>
            </Group>
            <Group header={<Header mode="secondary">System</Header>}>
                <Link to={`/change/pass/${me?._id}`}>
                    <SimpleCell before={<Icon24GearOutline style={{width: '40px', height: '40px'}}/>}>
                        Change password
                    </SimpleCell>
                </Link>
                <SimpleCell onClick={logOutAccount} before={<Icon24DoorArrowRightOutline style={{width: '40px', height: '40px'}}/>}>
                    Log out
                </SimpleCell>
            </Group>
        </>
    );
};

export { Settings }