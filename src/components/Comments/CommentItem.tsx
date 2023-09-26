import { CommentTypes } from "./Comments"
import './Comment.css'
import { getTimeMakingPost } from "../../utils/Functions"
import { useAppSelector } from "../../utils/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../../utils/axios";
import { toast } from "react-toastify";
import {
    Avatar,
    useAppearance,
    RichCell,
    Panel
} from "@vkontakte/vkui";
import { BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";


const url = process.env.REACT_APP_URL

const CommentItem = ({ text, author, createdAt, _id, idPost }: CommentTypes) => {
    
    const user = useAppSelector(state => state.auth.user)

    const apperance = useAppearance()

    const client = useQueryClient()

    const deleteComment = async () => {
        try {
            const { data } = await axios.delete(`comments/remove/${_id}/post${idPost}`)
            toast(data.message)
        } catch (error) {
            toast('Ошибка при удалении комментария!')
        }
        
    }

    const { mutate: deleteItem } = useMutation({
        mutationFn: () => deleteComment(),
        onSuccess: () => {
            client.invalidateQueries({
                queryKey: ['postOne']
            });
        }
    })

    return (
        <Panel>
            <RichCell style={{marginBottom: '-25px'}}
                before={<Link to={`/user/${author?._id}`}><Avatar size={48} src={`${url}${author.useravatar}`} /></Link>}
                caption={getTimeMakingPost(createdAt)}
                after={user && user._id === author._id && 
                        <BiTrash style={{cursor: 'pointer', width: '20px', height: '20px'}} onClick={() => deleteItem()}/>
                }
                actions={text}
                multiline
                disabled
            >
                <Link to={`/user/${author?._id}`} style={{ color: `${apperance === 'dark' ? '#71aaeb' : '#0077FF'}`, fontSize: '18px', cursor: 'pointer' }}>
                    <b>{author.username}</b>
                </Link>
            </RichCell>
        </Panel>
    )
}

export default CommentItem