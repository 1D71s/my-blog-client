import { useAppSelector } from '../hooks'
import ItemPost from '../components/ItemPost/ItemPost'
import { BsFillEnvelopeAtFill, BsFillPersonFill } from "react-icons/bs";

import { PostTypes } from '../types'
import { useQuery } from '@tanstack/react-query'
import axios from '../axios'
import { Link } from 'react-router-dom';

const url = process.env.REACT_APP_URL

const Me = () => {

  const me = useAppSelector(state => state.auth.user)

  const fetchMyPosts = async () => { 
    try {
      const { data } = await axios.get('posts/myposts')
      return data.reverse()
    } catch (error) {
      console.log(error)
      throw error
    }
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['myposts'],
    queryFn: fetchMyPosts
  });
  


  return (
    <div>
      <div className='cont-me'>
        <div className='my-info'>
          {me &&
            <div>
              <img className='ava-me' src={`${url}${me.useravatar}`} />
              <div className='me'>
                <div className='cont-for-icons'>
                  <BsFillPersonFill className='item-icons'/>
                  <b className='me-username info-items'>{me.username}</b>
                </div>
                <div className='cont-for-icons'>
                  <BsFillEnvelopeAtFill className='item-icons'/>
                  <p className='info-items'>{me.email}</p>
                </div>
                <Link to='edit'>
                  <div className='cont-for-icons'>
                      <button className='btn-for-edit'>Изменить профиль!</button>
                  </div>
                </Link>
              </div>
            </div>}
        </div>
        {data && data.length > 0 && <div className='my-posts'>
          {data.reverse().map((item: PostTypes) => (
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
        </div>}
      </div>
    </div>
  )
}

export { Me }
