import { toast } from "react-toastify";
import CommentItem from "./CommentItem";
import { useState } from 'react';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../../axios";
import { useAppSelector } from "../../hooks";

export type AuthorTypes = {
    username: string,
    useravatar: string,
    _id: string
}

export type CommentTypes = {
    text: string;
    author: AuthorTypes,
    createdAt: string
};

type Props = {
    comments: CommentTypes[],
    id: string | undefined
}

const Comments = ({ comments, id }: Props) => {

    const token = useAppSelector(state => state.auth.token)
    
    const [comment, setComment] = useState('')

    const client = useQueryClient()

    const createComment = async () => {
        if (comment.length > 0) {
            try {
                await axios.post(`comments/create/${id}`, { text: comment })
                toast('success')
                setComment('')
            } catch (error) {
                toast('error')
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
        <div>
            {token && <div className="place-for-create-comments">
                <textarea
                    className="input-comments"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button
                    onClick={() => create()}
                    className="btn-for-adding-comm"
                >add comment</button>
            </div>}
            <div className="comments-container">
            <b className='title-comments'>Комментарии:</b>
                {comments.map((item) => (
                    <CommentItem
                        text={item.text}
                        author={item.author}
                        createdAt={item.createdAt}
                    />
                ))}
            </div>
        </div>
    )
}

export default Comments

