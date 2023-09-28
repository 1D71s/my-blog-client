import { Routes, Route  } from 'react-router-dom';
import './App.css';
import { useEffect } from 'react';
import { useAppDispatch } from './utils/hooks';
import { ToastContainer } from 'react-toastify'

import { Home } from './pages/Home';
import { UserProfile } from './pages/User';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { CreatePost } from './pages/CreatePost';
import { Post } from './pages/Post';
import { EditPost } from './pages/EditPost';
import { EditProfile } from './pages/EditProfile';
import { UserFullInfo } from './pages/UserFullInfo';
import { HashtagPost } from './pages/HashtagPost';
import { Followers } from './pages/Followers';
import { Following } from './pages/Following';
import { Favorite } from './pages/Favorite';
import { Settings } from './pages/Settings';
import { Search } from './pages/Search';


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
          <Route path='/user/:id' element={<UserProfile />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/create' element={<CreatePost />} />
          <Route path='/posts/:id' element={<Post />} />
          <Route path='/tag/:id' element={<HashtagPost />} />
          <Route path='/edit/:id' element={<EditPost />} />
          <Route path='/user/:id/edit' element={<EditProfile />} />
          <Route path='/user/fullinfo/:id' element={<UserFullInfo />} />
          <Route path='/user/followers/:id' element={<Followers />} />
          <Route path='/user/following/:id' element={<Following />} />
          <Route path='/user/favorite/:id' element={<Favorite />} />
          <Route path='/user/settings/:id' element={<Settings />} />
          <Route path='/search' element={<Search/>} />
        </Route>
      </Routes>

      <ToastContainer position='bottom-right'/>
    </>
  );
}

export default App;
