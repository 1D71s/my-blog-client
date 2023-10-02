import { toast } from "react-toastify";
import CommentItem from "./CommentItem";
import { useState } from 'react';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../../utils/axios";
import { useAppSelector } from "../../utils/hooks";
import {
    Group,
    Textarea,
    Button,
    Title
} from "@vkontakte/vkui";

export type AuthorTypes = {
    username: string,
    useravatar: string,
    _id: string
}

export type CommentTypes = {
    text: string;
    author: AuthorTypes,
    createdAt: string,
    _id: string,
    idPost: string | undefined
};

type Props = {
    comments: CommentTypes[],
    id: string | undefined,
    fetchPost: () => void
}

const Comments = ({ comments, id, fetchPost }: Props) => {

    const token = useAppSelector(state => state.auth.token)
    
    const [comment, setComment] = useState('')

    const client = useQueryClient()

    const createComment = async () => {
        if (comment.length > 0) {
            try {
                const { data } = await axios.post(`comments/create/${id}`, { text: comment })
                toast(data.message)
                setComment('')
                fetchPost()
            } catch (error) {
                toast('Ошибка при добавления комментария!')
            }
        }
    }

    const { mutate: create } = useMutation({
        mutationFn: createComment,
        onSuccess: () => {
            client.invalidateQueries({
                queryKey: ['myposts']
            });
            client.invalidateQueries({
                queryKey: ['posts']
            });
            client.invalidateQueries({
                queryKey: ['postOne']
            });
        }
    })

    return (
        <>
            {token && <Group style={{marginTop: '15px', marginBottom: '-15px',padding: '15px'}}>
                <Textarea
                    value={comment}
                    placeholder="please write your comment here..."
                    onChange={(e) => setComment(e.target.value)}
                />
                <Button
                    style={{marginTop: '15px', padding: '3px 15px'}}
                    onClick={() => create()}
                >Send</Button>
            </Group>}
            {comments.length > 0 && <Group style={{marginTop: '15px'}}>
                {comments.map((item) => (
                    <CommentItem
                        key={item._id}
                        idPost={id}
                        _id={item._id}
                        text={item.text}
                        author={item.author}
                        createdAt={item.createdAt}
                    />
                ))}
            </Group>}
        </>
    )
}

export default Comments

