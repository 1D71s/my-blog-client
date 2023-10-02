import React from "react";
import { Link } from "react-router-dom";
import { Avatar, List, Group, RichCell, Button, Placeholder, Spinner } from "@vkontakte/vkui";
import { useAppSelector } from "../../utils/hooks";
import { Icon56ErrorOutline } from '@vkontakte/icons';


interface User {
  useravatar: string;
  username: string;
  _id: string;
  firstName: string;
  lastName: string;
  followers: string[];
}

interface UserListProps {
  users: User[];
  loading: boolean
  onFollowClick: (userId: string) => void;
}

const UserList: React.FC<UserListProps> = ({ users, loading, onFollowClick }) => {
    const url = process.env.REACT_APP_URL || "";
    
    const me = useAppSelector(state => state.auth.user)
    const token = useAppSelector(state => state.auth.token)

    return (
        <>
            <List>
                {users.length > 0 && users.map((user) => (
                    <Group key={user._id}>
                        {<RichCell
                            before={
                            <Link to={`/user/${user._id}`}>
                                <Avatar size={72} src={`${url}${user.useravatar}`} />
                            </Link>
                            }
                            caption={
                                <Link to={`/user/${user._id}`}>
                                    {user.firstName} {user.lastName}
                                </Link>
                            }
                            after={
                                token && <Button
                                    style={{ display: `${user._id === me?._id ? "none" : ""}` }}
                                    mode={user?.followers?.includes(me?._id) ? "secondary" : undefined}
                                    onClick={() => onFollowClick(user._id)}
                                >
                                    {me?._id && user?.followers?.includes(me?._id) ? "Unfollow" : "Follow"}
                                </Button>
                            }
                            
                            disabled
                        >
                            <Link to={`/user/${user._id}`}>
                                {user.username}
                            </Link>
                        </RichCell>}
                    </Group>
                ))}
            </List> 
            {users.length < 1 && <>
                {!loading ?
                    <Placeholder
                        icon={<Icon56ErrorOutline />}
                        stretched>
                        List is empty!
                    </Placeholder> : 
                    <Spinner size="large" style={{ margin: '20px 0' }} />}
            </>} 
        </>
    );
};

export default UserList;
