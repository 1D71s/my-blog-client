import { useState, useEffect } from "react";
import {
    Avatar,
    List,
    Group,
    RichCell,
    Button,
} from "@vkontakte/vkui";
import axios from "../utils/axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAppSelector } from '../utils/hooks'


const url = process.env.REACT_APP_URL

interface User {
    useravatar: string;
    username: string;
    _id: string;
    firstName: string;
    lastName: string;
    followers: string[]
    fullInfo: {
        country: string;
        sity: string
    }
}

const Following = () => {

    const [users, setUsers] = useState<User[]>([]);

    const me = useAppSelector(state => state.auth.user)

    const { id } = useParams();

    useEffect(() => {
        fetchFollowing();
    }, []);

    const fetchFollowing = async () => {
        try {
            const { data } = await axios.get(`user/following/${id}`);
            setUsers(data);
            console.log(data)
        } catch (error) {
            console.log(error);
        }
    };

    const following = async (userid: string) => {
        try {
          await axios.put(`user/follow/${userid}`)
          fetchFollowing()
        } catch (error) {
          console.log(error)
        }
    }

    return (
        <>
            <List>
                {users.map((user) => (
                    <Group>
                        <RichCell
                            before={
                                <Link to={`/user/${user._id}`}>
                                     <Avatar size={72} src={`${url}${user.useravatar}`} />
                                </Link>}
                            caption={`${user.fullInfo.country} ${user.fullInfo.sity}`}
                            bottom={user.username}
                            actions={
                                <Button
                                    style={{ display: `${user._id === me?._id ? 'none' : ''}` }}
                                    mode="secondary"
                                    onClick={() => following(user._id)}
                                    >
                                    {me?._id && user?.followers?.includes(me?._id) ? 'Unfollow' : 'Follow'}
                                </Button>
                            }
                            disabled>
                            {user.firstName} {user.lastName}
                        </RichCell>
                    </Group>
                ))}
            </List>
        </>
    );
};

export { Following }