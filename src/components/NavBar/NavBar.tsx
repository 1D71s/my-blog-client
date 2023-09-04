import { Link } from 'react-router-dom';
import './NavBar.css';
import { useAppSelector, useAppDispatch } from '../../hooks';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { logOut } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'

const NavBar = () => {

    const isAuth = useAppSelector(state => state.auth.token);
    const user = useAppSelector(state => state.auth.user);
    const getMeStateLoading = useAppSelector(state => state.auth.getMeStateLoading);
    const expand = 'md'; 
    
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const logOutAccount = () => {
        dispatch(logOut())
        navigate('/')
        window.localStorage.removeItem('token')
        toast('Вы вышли из аккаунта')
    }
    
  
    return (
        <Navbar expand={expand} className='cont fixed-top'>
            <Container fluid>
                <Navbar.Brand href="#" className='hounter'>
                    <Link to='/'><b>My_Blog</b></Link>
                </Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-${expand}`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                        placement="end"
                        >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                        {isAuth ? user?.username  :'Гость'}
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    {!getMeStateLoading && <Offcanvas.Body>
                        {isAuth ?
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Link className='links' to="/me">Профиль</Link>
                            <Link className='links' to="/create">Створити публікацію</Link>
                            <div className='links' onClick={logOutAccount}>Выход</div>
                        </Nav> :    
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Link className='links' to="/login">Вход</Link>
                            <Link className='links' to="/register">Регистрация</Link>
                        </Nav>}
                    </Offcanvas.Body>}
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
};


export  { NavBar };