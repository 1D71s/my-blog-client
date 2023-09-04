import { Routes, Route } from 'react-router-dom';
import './App.css';
import { useEffect } from 'react';
import { useAppDispatch } from './hooks';
import { ToastContainer } from 'react-toastify'

import { Home } from './pages/Home';
import { Me } from './pages/Me';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { CreatePost } from './pages/CreatePost';
import { Post } from './pages/Post';

import { Layout } from './components/Layout';
import { getMe } from './redux/userSlice';

function App() {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getMe())
  }, [])

  return (
    <>
      <Routes>
        <Route path='/'element={<Layout/>}>
          <Route path='/' element={<Home />} />
          <Route path='/me' element={<Me />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/create' element={<CreatePost />} />
          <Route path='/posts/:id' element={<Post/>} />
        </Route>
      </Routes>

      <ToastContainer position='bottom-right'/>
    </>
  );
}

export default App;
