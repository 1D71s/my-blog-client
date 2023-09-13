import { CommentTypes } from "./Comments"
import './Comment.css'
import { getTimeMakingPost } from "../../Functions"
import { RiDeleteBin6Line } from "react-icons/ri";
import { useAppSelector } from "../../hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../../axios";
import { toast } from "react-toastify";


const CommentItem = ({ text, author, createdAt, _id, idPost }: CommentTypes) => {
    
    const user = useAppSelector(state => state.auth.user)

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
        <div className="commentaries">
            <div className="header-comments">
                <div>
                    <img
                        className='ava-in-item'
                        src={`http://localhost:4005${author.useravatar}`} />
                    <b className='author'>{author.username}</b>
                </div>
                {user && user._id === author._id && <div className="cont-btn-delete-comment">
                    <RiDeleteBin6Line className="btn-delete-comment" onClick={() => deleteItem()}/>
                </div>}
            </div>
            <div className="text-comments">
                {text}
            </div>
            <div className="created-post-time">{getTimeMakingPost(createdAt)}</div>
        </div>
    )
}

export default CommentItem