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
    comments: string
    likes: string[],
    views: string[],
    author: Author,
    _id: string,
    createdAt: string
};