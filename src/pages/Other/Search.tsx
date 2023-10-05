import { Cell, Group, Search, Header, List, Avatar, Placeholder, Spinner, Panel, View } from "@vkontakte/vkui";
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from "../../utils/axios";
import { Link } from "react-router-dom";
import { Icon56ErrorOutline } from '@vkontakte/icons';


const url = process.env.REACT_APP_URL

type ItemType = {
    _id: string
    username: string;
    useravatar: string
}

const SearchPage = () => {

    const [search, setSearch] = useState('')

    const [result, setResult] = useState([])

    const [loading, setLoading] = useState(false)

    const searchFetch = async () => {
        try {
            const { data } = await axios.post('/user/search', {search})
            setLoading(false)
            setResult(data.users)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        if (search.length > 0) {
            searchFetch()
            setLoading(true)
        }
    }, [search])

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
                <Search value={search} onChange={e => setSearch(e.target.value)}/>
            </Group>
            
            {loading ?
                <Spinner size="large" style={{ margin: '20px 0' }} /> : 

                <>
                    {result.length > 0 &&
                    <Group header={<Header>Result: {result.length}</Header>}>
                        <List>
                            {result.length !== 0 && result?.map((item: ItemType) => {
                                return (
                                    <Link to={`/user/${item?._id}`}>
                                        <Cell before={<Avatar src={`${url}${item.useravatar}`} />}>
                                            {item.username}
                                        </Cell>
                                    </Link>
                                )
                            })}
                        </List>
                    </Group>}
                </>}
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