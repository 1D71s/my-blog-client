import { CommentTypes } from "./Comments"
import './Comment.css'
import { getTimeMakingPost } from "../../Functions"

const CommentItem = ({text, author, createdAt}: CommentTypes) => {
    return (
        <div className="commentaries">
            <div>
                <img
                    className='ava-in-item'
                    src={`http://localhost:4005/uploads/${author.useravatar}`} />
                <b className='author'>{author.username}</b>
            </div>
            <div className="text-comments">
                {text}
            </div>
            <div className="created-post-time">{getTimeMakingPost(createdAt)}</div>
        </div>
    )
}

export default CommentItem