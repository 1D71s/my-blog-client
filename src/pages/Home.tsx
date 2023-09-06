import {useEffect, useState} from 'react'
import ItemPost from '../components/ItemPost/ItemPost'
import axios from '../axios'
import { PostTypes } from '../types'


const Home = () => {
  const [posts, setPosts] = useState<PostTypes[]>([]); 
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
    <div className='home'>
      <div className='posts'>
        {posts.map((item) => (
          <ItemPost
            key={item._id} 
            _id={item._id}
            author={item.author}
            image={item.image}
            title={item.title}
            text={item.text}
            views={item.views}
            comments={item.comments}
            likes={item.likes}
            createdAt={item.createdAt}
          />
        ))}
      </div>
    </div>
  )
}

export { Home }
