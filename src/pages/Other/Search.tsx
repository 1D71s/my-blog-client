import { Cell, Group, Search, Header, List, Avatar } from "@vkontakte/vkui";
import { useState } from 'react';
import { UserItems } from "../../components/UsersRandom/UsersRandom";
import { useQuery } from '@tanstack/react-query';
import axios from "../../utils/axios";
import { Link } from "react-router-dom";

const url = process.env.REACT_APP_URL

type ItemType = {
    _id: string
    username: string;
    useravatar: string
}

const SearchPage = () => {

    const { data, isLoading, isError } = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers
    });

    async function fetchUsers() {
        try {
          const response = await axios.get('/user/getall');
          return response.data; 
        } catch (error) {
          console.log(error);
          throw error;
        }
    }

    return (
        <>
            <Group>
                <Search/>
            </Group>
            <Group header={<Header>Recomendation:</Header>}>
                <List>
                    {data?.map((item: ItemType) => {
                        return (
                            <Link to={`/user/${item?._id}`}>
                                <Cell before={<Avatar src={`${url}${item.useravatar}`} />}>
                                    {item.username}
                                </Cell>
                            </Link>
                        )
                    })}
                </List>
            </Group>
        </>
    )
};

export { SearchPage }