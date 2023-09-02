import React, {useEffect, useState} from 'react'
import ItemPost from '../components/ItemPost/ItemPost'
import axios from '../axios'

type Post = {
  title: string;
  text: string;
  image: string,
  comments: string
  likes: string,
  _id: string
};


const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]); 
  const [whatIsPosts, setWhatisPosts] = useState('new')

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get('/posts/allposts')

      if (whatIsPosts === 'new')  setPosts(data.posts)
      else setPosts(data.popularPosts)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [whatIsPosts])
  

  return (
    <div className='posts'>
      {posts.map((item) => (
        <ItemPost
          key={item._id}
          img={item.image}
          title={item.title}
          text={item.text}
          comments={item.comments}
          likes={item.likes}
        />
      ))}
    </div>
  )
}

export { Home }
