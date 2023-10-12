import { Routes, Route  } from 'react-router-dom';
import './style/App.css';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './utils/hooks';
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
import { SearchPage } from './pages/Other/Search';
import { ChangePass } from './pages/Auth/ChangePass';
import { MessagesList } from './pages/Messages/MessagesList';
import { Messages } from './pages/Messages/Messages';


import { Layout } from './components/Layout/Layout';
import { getMe, changeCountMessage } from './redux/userSlice';

import { io, Socket } from 'socket.io-client';

import { Dialog } from './pages/Messages/MessagesList';


type SocketType = Socket;
const url = process.env.REACT_APP_URL

const socket: SocketType | undefined = url ? io(url) : undefined;

function App() {

  const me = useAppSelector(state => state.auth.user)
  const messages = useAppSelector(state => state.auth.messages)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getMe())
  }, [])

  useEffect(() => {
    socket?.emit('getAllDialogs', me?._id);

    socket?.on('sendAllDialog', (data) => {
        const newCount = data.reduce((acc: number, dialog: Dialog) => acc + dialog.counter, 0);
        dispatch(changeCountMessage(newCount))
    })
  }, [me, socket, messages]);

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
          <Route path='/search' element={<SearchPage />} />
          <Route path='/change/pass/:id' element={<ChangePass />} />
          
          <Route
            path='/direct/:me/:companion'
            element={socket ? <Messages socket={socket} /> : null}
          />
          <Route path='/messages/:id' element={socket ? <MessagesList socket={socket}/> : null} />
        </Route>
      </Routes>

      <ToastContainer position='bottom-right'/>
    </>
  );
}

export default App;
