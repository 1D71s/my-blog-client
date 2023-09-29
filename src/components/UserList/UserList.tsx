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

    return (
        <>
            <List>
                {users.map((user) => (
                    <Group key={user._id}>
                        <RichCell
                            before={
                            <Link to={`/user/${user._id}`}>
                                <Avatar size={72} src={`${url}${user.useravatar}`} />
                            </Link>
                            }
                            caption={`${user.firstName} ${user.lastName} `}
                            after={
                            <Button
                                style={{ display: `${user._id === me?._id ? "none" : ""}` }}
                                mode="secondary"
                                onClick={() => onFollowClick(user._id)}
                            >
                                {me?._id && user?.followers?.includes(me?._id) ? "Unfollow" : "Follow"}
                            </Button>
                            }
                            disabled
                        >
                            {user.username}
                        </RichCell>
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
