import { Link } from 'react-router-dom';
import './NavBar.css';
import { useAppearance, Search } from '@vkontakte/vkui';
import { Icon28MoonOutline, Icon28SunOutline, Icon28SearchOutline } from '@vkontakte/icons';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { changeTheme } from '../../redux/userSlice';
import { useState } from 'react';


const NavBar = () => {

    const appearance = useAppearance()

    const dispath = useAppDispatch()

    const theme = useAppSelector(state => state.auth.theme)


    return (
        <div className='cont' style={{background: `${appearance === 'light' ? 'white' : '#202021'}`}}>
            <div className='hounter' >
                <Link to='/'><b style={{ color: appearance === 'light' ? 'black' : 'white' }}>My_Blog</b></Link>
            </div>
            
    
            <div className='contain'>
                <Link to='/search'>
                    <Icon28SearchOutline style={{color: `${appearance === 'light' ? '#0077FF' : '#71aaeb'}`}} className='theme-change search-header-mob'/>
                </Link>
                <button
                    onClick={() => dispath(changeTheme())}
                    className='theme-change'
                >
                    {theme ?
                        <Icon28MoonOutline style={{ color: '#0077FF' }}/> :
                        <Icon28SunOutline style={{ color: '#71aaeb' }} />}
                </button>
            </div>
        </div>
    );
};


export { NavBar };
