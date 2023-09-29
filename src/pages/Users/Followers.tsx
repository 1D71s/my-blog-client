import React, { useState, useEffect } from "react";
import { Group, Header, TabsItem, Tabs, Counter } from "@vkontakte/vkui";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";
import { useParams } from "react-router-dom";
import UserList from "../../components/UserList/UserList";

interface User {
    useravatar: string;
    username: string;
    _id: string;
    firstName: string;
    lastName: string;
    followers: string[];
}

const Followers: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        fetchFollowers();
        window.scrollTo(0, 0);
    }, [id]);

    const fetchFollowers = async () => {
        try {
            const { data } = await axios.get<User[]>(`user/followers/${id}`);
            await setUsers(data);
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    };

    const following = async (userid: string) => {
        try {
            await axios.put(`user/follow/${userid}`);
            fetchFollowers();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
        <Group header={<Header mode="secondary">users:</Header>}>
            <Tabs>
                <Link to={`/user/followers/${id}`}>
                    <TabsItem selected after={<Counter size="s">{users.length}</Counter>}>
                    Followers
                    </TabsItem>
                </Link>
                <Link to={`/user/following/${id}`}>
                    <TabsItem>Following</TabsItem>
                </Link>
            </Tabs>
        </Group>
        <UserList loading={loading} users={users} onFollowClick={following} />
        </>
    );
};

export { Followers }
