import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../hooks'
import { toast } from 'react-toastify'
import ItemPost from '../components/ItemPost/ItemPost'
import { getMyPosts, clearStatus } from '../redux/postSlice'
import { BsFillEnvelopeAtFill, BsFillPersonFill } from "react-icons/bs";
import { PostTypes } from '../types'

const Me = () => {

  const me = useAppSelector(state => state.auth.user)
  const myPosts: PostTypes[] = useAppSelector(state => state.post.myPosts);

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
            <div>
              <img className='ava-me' src={`http://localhost:4005/uploads/${me.useravatar}`} />
              <div className='me'>
                <div className='cont-for-icons'>
                  <BsFillPersonFill className='item-icons'/>
                  <b className='me-username info-items'>{me.username}</b>
                </div>
                <div className='cont-for-icons'>
                  <BsFillEnvelopeAtFill className='item-icons'/>
                  <p className='info-items'>{me.email}</p>
                </div>
              </div>
            </div>}
        </div>
        {myPosts.length > 0 && <div className='my-posts'>
          {myPosts.map((item) => (
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
        </div>}
      </div>
    </div>
  )
}

export { Me }
