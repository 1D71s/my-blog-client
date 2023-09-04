import {useEffect, useState} from 'react'
import ItemPost from '../components/ItemPost/ItemPost'
import axios from '../axios'


type Author = {
  id: string,
  username: string,
  useravatar: string
}

type Post = {
  title: string;
  text: string;
  image: string,
  comments: string
  likes: string,
  views: number,
  author: Author,
  _id: string,
  createdAt: string
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
    <div className='home'>
      <div className='posts'>
        {posts.map((item) => (
          <ItemPost
            key={item._id} 
            id={item._id}
            useravatar={item.author.useravatar}
            author={item.author}
            img={item.image}
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
