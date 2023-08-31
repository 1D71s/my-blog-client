import React from 'react'
import { useAppSelector } from '../hooks'

const Me = () => {

  const me = useAppSelector(state => state.auth.user)


  return (
    <div>
      <div className='cont-me'>
        <div className='my-info'>
          {me &&
            <div>
              <img className='ava-me' src={`http://localhost:4005/uploads/${me.useravatar}`} />
              <div>{me.username}</div>
            </div>}
        </div>
        <div className='my-posts'>
              
        </div>
      </div>
    </div>
  )
}

export { Me }
