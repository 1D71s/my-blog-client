import { CommentTypes } from "./components/Comments/Comments";

export type Author = {
    _id: string,
    username: string,
    useravatar: string
}
  
export type PostTypes = {
    tags: string[]
    title: string;
    text: string;
    image: string,
    comments: CommentTypes[]
    likes: string[],
    views: string[],
    author: Author,
    _id: string,
    createdAt: string
};