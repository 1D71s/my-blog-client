import { CommentTypes } from "./Comments"

const CommentItem = ({text}: CommentTypes) => {
    return (
        <div>
            {text}
        </div>
    )
}

export default CommentItem