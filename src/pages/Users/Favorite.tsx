import ItemPost from '../../components/ItemPost/ItemPost';
import axios from '../../utils/axios';
import { PostTypes } from '../../types';
import { useQuery } from '@tanstack/react-query';
import {
    Group,
    TabsItem,
    Counter,
} from "@vkontakte/vkui";
import { Icon24BookmarkCheckBadge } from "@vkontakte/icons";
import { SkeletonPost } from '../../components/Sceletons/PostSleleton';

const Favorite = () => {

    const { data, isLoading, isError } = useQuery({
        queryKey: ['favorite'],
        queryFn: fetchPosts
    });
    
    async function fetchPosts() {
        try {
            const { data } = await axios.get('/user/favorite');
            return data; 
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    
    if (isLoading) {
        return (
            <Group>
                <SkeletonPost />
            </Group>
        )
    }

    return (
        <>
            <Group>
                <TabsItem selected disabled before={<Icon24BookmarkCheckBadge/>} after={<Counter size="s">{data.length}</Counter>}>
                    My favorite posts:
                </TabsItem>
            </Group>
            {data.map((item: PostTypes) => (
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
    );
};

export { Favorite }