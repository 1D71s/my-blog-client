import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../hooks'
import { toast } from 'react-toastify'
import ItemPost from '../components/ItemPost/ItemPost'
import { getMyPosts } from '../redux/postSlice'

interface Post {
  _id: string;
  author: {
    useravatar: string;
    username: string;
  };
  image: string;
  title: string;
  text: string;
  views: number;
  comments: string;
  likes: string;
  createdAt: string;
}

const Me = () => {

  const me = useAppSelector(state => state.auth.user)
  const myPosts: Post[] = useAppSelector(state => state.post.myPosts);


  const dispatch = useAppDispatch()

  const fetchMyPosts = async () => { 
    try {
      await dispatch(getMyPosts());
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch my posts.');
    }
  };

  useEffect(() => { 
    fetchMyPosts();
  }, []);


  return (
    <div>
      <div className='cont-me'>
        <div className='my-info'>
          {me &&
            <div className='me'>
              <img className='ava-me' src={`http://localhost:4005/uploads/${me.useravatar}`} />
              <div>{me.username}</div>
            </div>}
        </div>
        <div className='my-posts'>
          {myPosts.map((item) => (
            <ItemPost
              key={item._id}
              useravatar={item.author.useravatar}
              author={item.author.username}
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
    </div>
  )
}

export { Me }
