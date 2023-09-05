import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from '../axios'
import { PostTypes } from '../types'
import { useAppDispatch, useAppSelector } from '../hooks'
import { getOnePosts } from '../redux/postSlice'


const Post = () => {

  const post = useAppSelector(state => state.post.onePost)

  const params = useParams()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (post === null) {
      dispatch(getOnePosts(params.id))
    }
  }, [dispatch, params.id])
  

  return (
    <div className='post-page-cont'>
      {post && <div>
        <div>{post.title}</div>
        <div>{post.text}</div>
        <div>{post.views}</div>
      </div>}
    </div>
  )
}

export { Post }