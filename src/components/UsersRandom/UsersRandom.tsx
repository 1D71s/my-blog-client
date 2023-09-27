import { HorizontalCell, Avatar } from "@vkontakte/vkui";
import { User } from '../../redux/userSlice';
import { useQuery } from '@tanstack/react-query';
import axios from "../../utils/axios";
import { Link } from "react-router-dom";

const url = process.env.REACT_APP_URL

export const UserItems = () => {
    
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

    if (isLoading) {
        return (
            <>
                <HorizontalCell size="s" >
                    <Avatar size={56} />
                </HorizontalCell>
                <HorizontalCell size="s" >
                    <Avatar size={56} />
                </HorizontalCell>
                <HorizontalCell size="s" >
                    <Avatar size={56} />
                </HorizontalCell>
            </>
        )
    }
    
    if (isError) {
        return <div>Error...</div>;
    }

    return data.map((user: User) => (
        <Link to={`/user/${user?._id}`}>
            <HorizontalCell key={user._id} size="s" header={user.username}>
                <Avatar size={56} src={`${url}${user?.useravatar}`} />
            </HorizontalCell>
        </Link>
    ));
};