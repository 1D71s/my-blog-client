import { Link } from "react-router-dom"
import { useAppSelector, useAppDispatch } from '../../hooks';
import { logOut } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import './BottomMenu.css';
import { AiOutlineUserAdd, AiOutlineHome, AiOutlineUser, AiFillEdit } from "react-icons/ai";
import { SlLogin } from "react-icons/sl";
import { ImExit } from "react-icons/im";

const BottomMenu = () => {

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
        <div>
            {!getMeStateLoading && <div className='cont-for-bottom'>
                <div className="cont-butt-menu">
                    {isAuth ?
                        <div className="butt-menu">
                            <Link className='links' to="/"><AiOutlineHome className="icon-link"/></Link>
                            <Link className='links' to="/me"><AiOutlineUser className="icon-link"/></Link>
                            <Link className='links' to="/create"><AiFillEdit className="icon-link"/></Link>
                            <div className='links' onClick={logOutAccount}><ImExit className="icon-link"/></div>
                        </div> :    
                        <div className="butt-menu">
                            <Link className='links' to="/login"><SlLogin className="icon-link"/></Link>
                            <Link className='links' to="/register"><AiOutlineUserAdd className="icon-link"/></Link>
                        </div>}
                </div>
            </div>}
        </div>
    )
}

export { BottomMenu }