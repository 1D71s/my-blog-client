import { Link } from 'react-router-dom';
import './NavBar.css';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { logOut } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'


const NavBar = () => {

    const isAuth = useAppSelector(state => state.auth.token);
    const user = useAppSelector(state => state.auth.user);
    const getMeStateLoading = useAppSelector(state => state.auth.getMeStateLoading);
    
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const logOutAccount = () => {
        dispatch(logOut())
        navigate('/login')
        window.localStorage.removeItem('token')
        toast('Вы вышли из аккаунта')
    }
    
    return (
        <div className='cont'>
            <div className='hounter'>
                <Link to='/'><b>My_Blog</b></Link>
            </div>
    
            <div className='contain'>
                {!getMeStateLoading && <div>
                    {isAuth ?
                        <div className='container-for-links'>
                            <Link className='links' to="/me">Профиль</Link>
                            <Link className='links' to="/create">Створити публікацію</Link>
                            <div className='links' onClick={logOutAccount}>Выход</div>
                        </div> :    
                        <div className='container-for-links'>
                            <Link className='links' to="/login">Вход</Link>
                            <Link className='links' to="/register">Регистрация</Link>
                        </div>}
                </div>}
            </div>
        </div>
    );
};


export  { NavBar };