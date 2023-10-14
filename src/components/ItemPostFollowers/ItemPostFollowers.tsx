import ItemPost from "../ItemPost/ItemPost"
import axios from '../../utils/axios';
import { PostTypes } from '../../types';
import { UserItems } from '../../components/UsersRandom/UsersRandom';
import { useQuery } from '@tanstack/react-query';
import {
  Group,
  Header,
  HorizontalScroll,
} from "@vkontakte/vkui";
import { SkeletonPost } from '../../components/Sceletons/PostSleleton';
import { useEffect } from 'react';


const ItemPostFollowers = () => {

    const { data, isLoading, isError } = useQuery({
        queryKey: ['postFollowing'],
        queryFn: fetchPosts
    });
    
    async function fetchPosts() {
        try {
            const response = await axios.get('/posts/following');
            return response.data; 
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    
    if (isLoading) {
        return (
            <Group>
                <SkeletonPost />
                <SkeletonPost />
                <SkeletonPost />
            </Group>
        )
    }
    
    if (isError) {
        return <h1>error!</h1>;
    }

    return (
        <>
            {data.reverse().map((item: PostTypes) => (
                <ItemPost
                    key={item._id}
                    _id={item._id}
                    author={item.author}
                    image={item.image}
                    title={item.title}
                    text={item.text}
                    tags={item.tags}
                    views={item.views}
                    comments={item.comments}
                    likes={item.likes}
                    createdAt={item.createdAt}
                />
            ))}
        </>
    )
}

export default ItemPostFollowers
