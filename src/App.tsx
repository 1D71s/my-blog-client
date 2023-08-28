import { Routes, Route } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify'

import { Home } from './pages/Home';
import { Me } from './pages/Me';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

import { Layout } from './components/Layout';

function App() {
  return (
    <>
      <Routes>
        <Route path='/'element={<Layout/>}>
          <Route path='/' element={<Home />} />
          <Route path='/me' element={<Me />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register/>}/>
        </Route>
      </Routes>

      <ToastContainer position='bottom-right'/>
    </>
  );
}

export default App;
