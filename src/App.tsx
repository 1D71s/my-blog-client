import { Routes, Route  } from 'react-router-dom';
import './App.css';
import { useEffect } from 'react';
import { useAppDispatch } from './utils/hooks';
import { ToastContainer } from 'react-toastify'

import { Home } from './pages/Posts/Home';
import { UserProfile } from './pages/Users/User';
import { Login } from './pages/Auth/Login';
import { Register } from './pages/Auth/Register';
import { CreatePost } from './pages/Posts/CreatePost';
import { Post } from './pages/Posts/Post';
import { EditPost } from './pages/Posts/EditPost';
import { EditProfile } from './pages/Users/EditProfile';
import { UserFullInfo } from './pages/Users/UserFullInfo';
import { HashtagPost } from './pages/Posts/HashtagPost';
import { Followers } from './pages/Users/Followers';
import { Following } from './pages/Users/Following';
import { Favorite } from './pages/Users/Favorite';
import { Settings } from './pages/Auth/Settings';
import { Search } from './pages/Other/Search';


import { Layout } from './components/Layout/Layout';
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
