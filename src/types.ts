export type Author = {
    id: string,
    username: string,
    useravatar: string
}
  
export type PostTypes = {
    title: string;
    text: string;
    image: string,
    comments: string
    likes: string[],
    views: string[],
    author: Author,
    _id: string,
    createdAt: string
};