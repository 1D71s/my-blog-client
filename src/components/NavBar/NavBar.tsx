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
                <Navbar.Brand href="#" className='hounter'>My_Blog</Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                    <Navbar.Offcanvas
                        id={`offcanvasNavbar-expand-${expand}`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                        placement="end"
                        >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                        Гость
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    {isAuth ? <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <div className='links' onClick={logOutAccount}>Выход</div>
                            <Link className='links' to="/login">Профиль</Link>
                            <Link className='links' to="/register">Створити публікацію</Link>
                        </Nav>
                    </Offcanvas.Body> :
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                        <Link className='links' to="/login">Вход</Link>
                        <Link className='links' to="/register">Регистрация</Link>
                        </Nav>
                    </Offcanvas.Body>}
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
};


export  { NavBar };