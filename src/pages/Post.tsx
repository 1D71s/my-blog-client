import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../utils/axios'
import ItemPost from '../components/ItemPost/ItemPost';
import Comments from '../components/Comments/Comments';
import { PostTypes } from '../types';
import { SkeletonComment, SkeletonPost } from '../components/Sceletons/PostSleleton';
import { Group } from "@vkontakte/vkui";

const Post = () => {

  const [post, setPost] = useState<PostTypes>()

  const { id } = useParams();

  const fetchPost = async () => {
    try {
      const { data } = await axios.get(`/posts/getonepost/${id}`)
      setPost(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchPost()
  }, [id])

  if (!post) {
    return (
      <>
        <Group>
          <SkeletonPost />
        </Group>
        <Group>
          <SkeletonComment />
        </Group>
        <Group>
          <SkeletonComment />
        </Group>
      </>
    )
  }

  return (
    <>
      {post && <div>
      <ItemPost
        key={post._id}
        _id={post._id}
        author={post.author}
        image={post.image}
        title={post.title}
        text={post.text}
        tags={post.tags}
        views={post.views}
        comments={post.comments}
        likes={post.likes}
        createdAt={post.createdAt}
      />
      
      <Comments comments={post.comments} id={id} />
    </div>}
    </>
  );
};

export { Post }