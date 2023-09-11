import CommentItem from "./CommentItem";
import { useState } from 'react';

export type CommentTypes = {
    text: string;
};

type Props = {
    comments: CommentTypes[]
}

const Comments = ({ comments }: Props) => {
    
    const [comment, setComment] = useState('')

    const createComment = () => {
        
    }

    return (
        <div>
            <div>
                <input type="text" />
                <button>add comment</button>
            </div>
            <div>
                {comments.map((item) => (
                    <CommentItem
                        text={item.text}
                    />
                ))}
            </div>
        </div>
    )
}

export default Comments

